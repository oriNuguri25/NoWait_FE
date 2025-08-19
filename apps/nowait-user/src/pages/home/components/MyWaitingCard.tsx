import { useState, useEffect, memo, useCallback, useMemo } from "react";
import Refresh from "../../../assets/icon/refresh.svg?react";

// 대기 중인 주점 데이터 타입
interface WaitingStoreData {
  storeId: number;
  storeName: string;
  departmentName: string;
  rank: number;
  teamsAhead: number;
  partySize: number;
  status: string;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
}

// MyWaitingCard Props - 카드 내용만 담당
interface MyWaitingCardProps {
  waitingStores: WaitingStoreData[];
  currentSlide: number;
  onSlideChange: (slide: number) => void;
  onClick?: () => void;
  onRefresh?: () => void;
}

// 내 대기 카드 컴포넌트 - 카드 내용만 담당
const MyWaitingCard = memo(
  ({
    waitingStores,
    currentSlide,
    onSlideChange,
    onClick,
    onRefresh,
  }: MyWaitingCardProps) => {
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // 현재 남은 시간 (초, CALLING 상태일 때만 설정)

    const totalSlides = waitingStores?.length || 0;

    // 슬라이드별 초기 시간 (초 단위) - 모두 10분으로 통일
    const initialTimes = useMemo(
      () => Array(totalSlides).fill(600),
      [totalSlides]
    );

    // 시간을 MM:SS 형식으로 포맷팅
    const formatTime = useCallback((seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }, []);

    // 현재 슬라이드의 데이터 가져오기
    const currentStore = waitingStores[currentSlide];

    // 슬라이드가 변경될 때 타이머 리셋 (CALLING 상태일 때만)
    useEffect(() => {
      if (currentStore?.status === "CALLING") {
        setTimeLeft(initialTimes[currentSlide] || 600);
      }
    }, [currentSlide, initialTimes, currentStore?.status]);

    // 타이머 로직 (CALLING 상태일 때만 작동)
    useEffect(() => {
      // CALLING 상태가 아니면 타이머 비활성화
      if (currentStore?.status !== "CALLING" || timeLeft <= 0) {
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [timeLeft, currentStore?.status]);

    // 터치 시작
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      setStartX(e.touches[0].clientX);
      setIsDragging(true);
    }, []);

    // 터치 끝
    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // 슬라이드 감지 임계값

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            // 왼쪽으로 스와이프 (다음 슬라이드) - 순환 로직
            onSlideChange((currentSlide + 1) % totalSlides);
          } else if (diff < 0) {
            // 오른쪽으로 스와이프 (이전 슬라이드) - 순환 로직
            onSlideChange((currentSlide - 1 + totalSlides) % totalSlides);
          }
        }

        setIsDragging(false);
      },
      [isDragging, startX, totalSlides, currentSlide, onSlideChange]
    );

    // waitingStores가 변경될 때 currentSlide를 리셋
    useEffect(() => {
      if (totalSlides > 0 && currentSlide >= totalSlides) {
        onSlideChange(0);
      }
    }, [totalSlides, currentSlide, onSlideChange]);

    return (
      <div>
        <div
          className="flex flex-col mt-4.5 mb-2.5 pb-9 w-full rounded-2xl items-center justify-center cursor-pointer relative overflow-hidden"
          style={{
            background: "linear-gradient(190deg, #FFDFD5 0%, #F7F7F7 100%)",
          }}
          onClick={onClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 슬라이드 인디케이터 - 예약이 2개 이상일 때만 표시 */}
          {totalSlides > 1 && (
            <div className="absolute flex flex-row gap-1 top-5 right-5">
              {Array.from({ length: totalSlides }, (_, index) => (
                <div
                  key={index}
                  className={`flex w-1.5 h-1.5 rounded-md transition-colors duration-300 ${
                    currentSlide === index ? "bg-[#101010]" : "bg-[#000000]/10"
                  }`}
                ></div>
              ))}
            </div>
          )}

          <div className="flex mt-6.5 text-14-semibold text-[#4D2E2E] leading-[130%] tracking-[0em]">
            {currentStore?.storeName || ""}
          </div>

          <div className="flex flex-row mt-1 items-center">
            <div className="flex mr-1 text-title-20-bold leading-[130%] tracking-[0em] text-[#512727]">
              내 앞에 대기
            </div>
            <div className="flex text-title-20-bold leading-[130%] tracking-[0em] text-primary mr-1.5">
              {currentStore?.teamsAhead || 0}팀
            </div>
            <div
              className="flex justify-center items-center icon-m rounded-full bg-[#FFFFFF]/50 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // 카드 클릭 이벤트와 충돌 방지
                onRefresh?.();
              }}
            >
              <Refresh className="icon-s" />
            </div>
          </div>

          <div className="flex flex-row mt-8">
            <div className="flex flex-row">
              {Array.from({ length: totalSlides }, (_, positionIndex) => {
                // 위치별 스타일 (고정)
                const isActivePosition = positionIndex === 0; // 첫 번째 위치가 항상 활성
                const isSecondPosition = positionIndex === 1;
                const isThirdPosition = positionIndex === 2;

                // z-index 결정 (첫 번째 > 두 번째 > 세 번째)
                let zIndex = 10;
                if (isActivePosition) zIndex = 30;
                else if (isSecondPosition) zIndex = 20;
                else if (isThirdPosition) zIndex = 15;

                // 투명도 결정 (첫 번째 위치만 밝게, 두 번째와 세 번째는 같게)
                let opacity = isActivePosition ? 100 : 30;

                // 이미지 인덱스 계산 (순환)
                const imageIndex = (positionIndex + currentSlide) % totalSlides;

                // 배경색 결정 (이미지가 없을 때만 사용)
                const bgColors = ["bg-amber-50", "bg-gray-200", "bg-blue-100"];

                // 이미지가 있는지 확인
                const currentStoreAtIndex = waitingStores[imageIndex];
                const hasImage =
                  currentStoreAtIndex?.profileImageUrl &&
                  currentStoreAtIndex.profileImageUrl !== "sampleProfileImg";

                return (
                  <div
                    key={positionIndex}
                    className={`relative w-17.5 h-17.5 bg-white rounded-full transition-all duration-500 ease-in-out ${
                      positionIndex > 0 ? "-ml-8" : ""
                    }`}
                    style={{ zIndex: zIndex }}
                  >
                    {/* 안쪽 원 (이미지/배경색) */}
                    <div className="relative w-full h-full p-[3.5px]">
                      <div
                        className={`relative w-full h-full rounded-full transition-all duration-500 ease-in-out ${
                          hasImage
                            ? "bg-cover bg-center"
                            : bgColors[imageIndex % bgColors.length]
                        }`}
                        style={{
                          backgroundImage: hasImage
                            ? `url(${currentStoreAtIndex.profileImageUrl})`
                            : undefined,
                          transform: `scale(${isActivePosition ? 1 : 0.95})`,
                        }}
                      >
                        {/* 투명도 오버레이 원 */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-full bg-white transition-opacity duration-600 ease-out"
                          style={{
                            opacity: (100 - opacity) / 100, // 역투명도 (밝을수록 오버레이가 투명해짐)
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {currentStore?.status === "CALLING" && (
          <div className="flex flex-row justify-between items-center bg-[#F8F7F7] rounded-2xl px-4 py-4 h-15">
            <div className="flex text-[14px] font-[400] leading-[144%] tracking-normal text-black-70">
              10분 안에 입장해주세요!
            </div>

            <div className="flex text-title-14-semibold text-black-80">
              {formatTime(timeLeft)}
            </div>
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 참조가 같으면 리렌더링하지 않음
    if (prevProps === nextProps) return true;

    // waitingStores 배열의 참조가 같으면 리렌더링하지 않음
    if (prevProps.waitingStores !== nextProps.waitingStores) {
      return false;
    }

    // currentSlide가 변경되었을 때만 리렌더링
    if (prevProps.currentSlide !== nextProps.currentSlide) {
      return false;
    }

    // 함수 참조가 변경되었을 때만 리렌더링
    if (prevProps.onSlideChange !== nextProps.onSlideChange) {
      return false;
    }

    if (prevProps.onClick !== nextProps.onClick) {
      return false;
    }

    if (prevProps.onRefresh !== nextProps.onRefresh) {
      return false;
    }

    return true; // 모든 props가 같으면 리렌더링하지 않음
  }
);

MyWaitingCard.displayName = "MyWaitingCard";

export default MyWaitingCard;
