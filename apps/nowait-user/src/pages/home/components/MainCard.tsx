import { useColor } from "color-thief-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NotOpenIcon, WaitingIcon, WaitingCardIcon } from "./HomeIcon";
import type { WaitingItem } from "../../../types/WaitingItem";
import block from "../../../assets/block.png";
import Refresh from "../../../assets/icon/refresh.svg?react";

// WaitingCard Props
interface WaitingCardProps {
  type: "waiting";
  item: WaitingItem;
}

// StoreCard Props
interface StoreCardProps {
  type: "store";
  storeId: number;
  name: string;
  departmentName: string;
  profileImageUrl: string;
  isActive: boolean;
  deleted: boolean;
  waitingCount?: number;
}

// HomeWaitingCard Props
interface HomeWaitingCardProps {
  type: "homeWaiting";
  storeName: string;
  queueNumber: number;
  onClick?: () => void;
}

// HomeCard Props
interface HomeCardProps {
  type: "homeCard";
  imageUrl: string;
  waitingCount?: number;
  storeName: string;
  departmentName: string;
  onClick?: () => void;
}

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

// MyWaitingCard Props
interface MyWaitingCardProps {
  type: "myWaitingCard";
  waitingStores: WaitingStoreData[]; // 여러 주점 데이터 배열
  onClick?: () => void;
  onRefresh?: () => void;
}

type MainCardProps =
  | WaitingCardProps
  | StoreCardProps
  | HomeWaitingCardProps
  | HomeCardProps
  | MyWaitingCardProps;

// 대기 카드 컴포넌트
const WaitingCard = ({ item }: { item: WaitingItem }) => {
  // 각 카드마다 개별적으로 색상 추출
  const { data: dominantColor } = useColor(item.imageUrl, "rgbArray", {
    crossOrigin: "anonymous",
    quality: 10,
  });

  // RGB 배열을 RGBA 문자열로 변환하는 함수
  const formatRgbaColor = (
    rgbArray: [number, number, number] | undefined,
    alpha: number = 1
  ) => {
    if (!rgbArray) return `rgba(139, 92, 246, ${alpha})`; // 기본 보라색
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${alpha})`;
  };

  // 그라데이션용 색상 설정
  const startColor = formatRgbaColor(
    dominantColor as [number, number, number] | undefined,
    0.7
  );
  const endColor = formatRgbaColor(
    dominantColor as [number, number, number] | undefined,
    1.0
  );

  return (
    <div className="flex-shrink-0 w-72 h-full snap-center">
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          background: `linear-gradient(to bottom, 
            ${startColor} 0%, 
            ${startColor} 20%, 
            ${endColor} 45%, 
            ${endColor} 100%)`,
        }}
      >
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${item.imageUrl}')`,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 60%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 60%)",
          }}
        >
          {/* 이미지 위 그라데이션 오버레이 (기존과 동일하게 70에서 100으로) */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${startColor} 0%, ${startColor} 30%, ${endColor} 100%)`,
            }}
          />
        </div>

        {/* 상단 번호 */}
        <div className="absolute top-6 left-6 text-30-semibold text-white-100 z-10">
          #{item.number}
        </div>

        {/* 하단 정보 블럭 */}
        <div className="absolute bottom-0 left-0 right-0 px-7.5 pt-9 pb-7.5">
          <div className="text-white-100">
            <div className="mb-4">
              <div className="text-22-bold leading-[150%]">
                {item.storeName}
              </div>
              <div className="text-16-regular text-[#DBDBDB]">
                {item.category}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  인원
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.people}명
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  일시
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.date}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex text-bold-16 leading-[150%] text-[#FFFFFF]/60">
                  위치
                </div>
                <div className="flex text-16-regular text-white-100">
                  {item.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 스토어 카드 컴포넌트
const StoreCardComponent = ({
  storeId,
  name,
  departmentName,
  profileImageUrl,
  isActive,
  deleted,
  waitingCount,
}: Omit<StoreCardProps, "type">) => {
  const navigate = useNavigate();

  // 삭제된 주점은 렌더링하지 않음
  if (deleted) {
    return null;
  }

  const status = isActive ? "open" : "closed";

  // 스토어 클릭 핸들러
  const handleStoreClick = () => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div
      className="flex flex-row py-3 gap-3 w-full min-w-0 items-center cursor-pointer"
      onClick={handleStoreClick}
    >
      <div className="rounded-full w-11 h-11 bg-gray-200 flex-shrink-0 flex items-center justify-center">
        {profileImageUrl ? (
          <img
            alt={`${name} 주점 이미지`}
            src={profileImageUrl}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="text-16-bold text-black-60 flex items-center justify-center">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row gap-2 items-center min-w-0">
          <div className="text-title-16-bold text-black-90 text-start truncate flex-shrink min-w-0">
            {name}
          </div>
          <div className="flex-shrink-0">
            {status === "open" ? (
              <WaitingIcon waitingCount={waitingCount} />
            ) : (
              <NotOpenIcon />
            )}
          </div>
        </div>
        <div className="flex text-13-regular text-black-70 text-start">
          {departmentName}
        </div>
      </div>
    </div>
  );
};

// 홈 대기 카드 컴포넌트
const HomeWaitingCardComponent = ({
  storeName,
  queueNumber,
  onClick,
}: Omit<HomeWaitingCardProps, "type">) => {
  return (
    <div
      className="bg-primary flex text-start pl-5.25 pb-2.75 relative overflow-hidden w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="mt-7 text-14-medium text-black-100">현재 내 순서</div>
        <div className="mt-1 text-title-20-bold text-black-100">
          {storeName}
        </div>
        <div className="mt-9 text-black-100 font-bold tracking-[-0.02em] text-xl">
          <span className="font-work-sans text-[54px] font-semibold tracking-[-0.03em] pr-0.5">
            {queueNumber}
          </span>
          번째
        </div>
      </div>
      <div className="mt-12 ml-4.5 absolute bottom-0 right-0">
        <img src={block} alt="block" className="icon-l w-44 h-34" />
      </div>
    </div>
  );
};

// 홈 카드 컴포넌트
const HomeCardComponent = ({
  imageUrl,
  waitingCount,
  storeName,
  departmentName,
  onClick,
}: Omit<HomeCardProps, "type">) => {
  return (
    <div
      className={`relative flex flex-col justify-end w-65 h-42.5 pl-5 pb-5 rounded-2xl bg-cover bg-center bg-no-repeat cursor-pointer ${
        imageUrl ? "bg-white-100" : "bg-black-60"
      }`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      }}
      onClick={onClick}
    >
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 rounded-2xl z-10" />
      <div className="relative z-20">
        <div className="flex flex-col gap-2">
          <WaitingCardIcon waitingCount={waitingCount} />
          <div className="flex flex-col">
            <div className="text-16-bold text-white-100">{storeName}</div>
            <div className="text-12-regular text-black-60">
              {departmentName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 내 대기 카드 컴포넌트
const MyWaitingCardComponent = ({
  waitingStores,
  onClick,
  onRefresh,
}: Omit<MyWaitingCardProps, "type">) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 현재 남은 시간 (초, CALLING 상태일 때만 설정)

  const totalSlides = waitingStores?.length || 0;

  // 슬라이드별 초기 시간 (초 단위) - 모두 10분으로 통일
  const initialTimes = Array(totalSlides).fill(600); // 데이터 개수에 맞춰 동적 생성

  // 시간을 MM:SS 형식으로 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

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
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  // 터치 끝
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50; // 슬라이드 감지 임계값

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 (다음 슬라이드) - 순환 로직
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else if (diff < 0) {
        // 오른쪽으로 스와이프 (이전 슬라이드) - 순환 로직
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }

    setIsDragging(false);
  };

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
        {/* 슬라이드 인디케이터 */}
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
          <div className="flex text-14-medium text-[#474D57] leading-[130%]">
            10분 안에 입장해주세요!
          </div>

          <div className="flex text-14-bold text-[#1A3149]">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
};

// 메인 카드 컴포넌트
const MainCard = (props: MainCardProps) => {
  if (props.type === "waiting") {
    return <WaitingCard item={props.item} />;
  } else if (props.type === "store") {
    return (
      <StoreCardComponent
        storeId={props.storeId}
        name={props.name}
        departmentName={props.departmentName}
        profileImageUrl={props.profileImageUrl}
        isActive={props.isActive}
        deleted={props.deleted}
        waitingCount={props.waitingCount}
      />
    );
  } else if (props.type === "homeWaiting") {
    return (
      <HomeWaitingCardComponent
        storeName={props.storeName}
        queueNumber={props.queueNumber}
        onClick={props.onClick}
      />
    );
  } else if (props.type === "homeCard") {
    return (
      <HomeCardComponent
        imageUrl={props.imageUrl}
        waitingCount={props.waitingCount}
        storeName={props.storeName}
        departmentName={props.departmentName}
        onClick={props.onClick}
      />
    );
  } else if (props.type === "myWaitingCard") {
    return (
      <MyWaitingCardComponent
        waitingStores={props.waitingStores}
        onClick={props.onClick}
        onRefresh={props.onRefresh}
      />
    );
  }

  return null;
};

export default MainCard;
