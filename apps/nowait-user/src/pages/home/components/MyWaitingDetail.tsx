import ArrowBack from "../../../assets/icon/arrow_back.svg?react";
import MapPin from "../../../assets/icon/map-pin.svg?react";
import { useState, useRef, useEffect } from "react";
import type { WaitingItem } from "../../../types/WaitingItem";
import { mockWaitingItems } from "../../../data/mockData";
import MainCard from "./MainCard";

interface MyWaitingDetailProps {
  onClose?: () => void;
  waitingItems?: WaitingItem[];
}

const MyWaitingDetail = ({
  onClose,
  waitingItems = [],
}: MyWaitingDetailProps) => {
  // 기본 더미 데이터 (API 데이터가 없을 경우)
  const items = waitingItems.length > 0 ? waitingItems : mockWaitingItems;

  // 현재 활성 카드 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "up" | "down" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
      const newIndex = Math.round(scrollLeft / cardWidth);
      const boundedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

      // 스크롤 오프셋 계산 (현재 카드 위치 대비 얼마나 벗어났는지)
      const exactPosition = scrollLeft / cardWidth;
      const offset = exactPosition - boundedIndex;
      setScrollOffset(offset);

      if (boundedIndex !== currentIndex) {
        setPrevIndex(currentIndex);

        // 애니메이션 방향 결정
        if (boundedIndex > currentIndex) {
          setAnimationDirection("up");
        } else {
          setAnimationDirection("down");
        }

        setIsAnimating(true);
        setCurrentIndex(boundedIndex);

        // 애니메이션 완료 후 상태 초기화
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationDirection(null);
        }, 300);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length, currentIndex]);

  // 숫자 애니메이션 컴포넌트 (각 자릿수별 애니메이션)
  const AnimatedDigits = ({
    value,
    prevValue,
    direction,
    isAnimating,
  }: {
    value: number;
    prevValue: number;
    direction: "up" | "down" | null;
    isAnimating: boolean;
  }) => {
    // 숫자를 문자열로 변환 후 각 자릿수로 분리
    const currentDigits = value.toString().split("").map(Number);
    const prevDigits = prevValue.toString().split("").map(Number);

    // 단일 자릿수 애니메이션 컴포넌트
    const SingleDigit = ({
      digit,
      prevDigit,
      digitIndex,
      totalDigits,
    }: {
      digit: number;
      prevDigit: number;
      digitIndex: number;
      totalDigits: number;
    }) => {
      // 오른쪽부터 애니메이션 (delay 계산: 일의자리가 먼저, 십의자리가 나중에)
      const reverseIndex = totalDigits - 1 - digitIndex;
      const animationDelay = reverseIndex * 100; // 100ms씩 지연

      // 이 자릿수가 실제로 변경되었는지 확인
      const isDigitChanged = digit !== prevDigit;
      const shouldAnimate = isAnimating && isDigitChanged;

      return (
        <span className="relative inline-block overflow-hidden align-baseline text-22-bold min-w-[0.6em] text-center">
          <span
            className={`inline-block transition-transform duration-300 ease-out ${
              !shouldAnimate
                ? ""
                : direction === "up"
                ? "animate-slide-up"
                : "animate-slide-down"
            }`}
            style={{
              transitionDelay: shouldAnimate ? `${animationDelay}ms` : "0ms",
            }}
          >
            {digit}
          </span>
          {shouldAnimate && (
            <span
              className={`absolute top-0 left-0 inline-block transition-transform duration-300 ease-out w-full text-center ${
                direction === "up"
                  ? "animate-slide-up-out"
                  : "animate-slide-down-out"
              }`}
              style={{
                transitionDelay: `${animationDelay}ms`,
              }}
            >
              {prevDigit}
            </span>
          )}
        </span>
      );
    };

    return (
      <span className="inline-flex items-baseline">
        {currentDigits.map((digit, index) => (
          <SingleDigit
            key={index}
            digit={digit}
            prevDigit={prevDigits[index] || 0}
            digitIndex={index}
            totalDigits={currentDigits.length}
          />
        ))}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#222] flex items-center justify-center">
      <div className="max-w-[430px] min-w-[360px] w-full h-full bg-white flex flex-col mx-auto">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 bg-white">
          <button onClick={onClose} className="p-2">
            <ArrowBack className="icon-m" />
          </button>
          <div className="flex px-2.5 py-2 rounded-lg bg-white border-black-20 border-[1px] bg-black-20 text-14-semibold text-black-70 ">
            대기취소
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex flex-col flex-1 items-center pt-2.5">
          {/* 상태 텍스트 */}
          <div className="text-center mb-7.5 px-14">
            <div className="text-16-medium text-black-100 mb-0.75">
              입장 대기 중
            </div>
            <div className="text-22-bold text-black-90 flex items-baseline justify-center gap-1">
              <span>내 앞 대기</span>
              <span className="text-primary flex items-baseline">
                <AnimatedDigits
                  value={items[currentIndex]?.waitingCount || 0}
                  prevValue={items[prevIndex]?.waitingCount || 0}
                  direction={animationDirection}
                  isAnimating={isAnimating}
                />
                <span>팀</span>
              </span>
            </div>
          </div>

          {/* 카드 영역 */}
          <div className="w-full flex-1 flex flex-col mb-7.5">
            {/* 가로 스크롤 카드 컨테이너 */}
            <div className="flex-1 flex overflow-visible">
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide w-full snap-x snap-mandatory"
                style={{
                  paddingLeft: "calc((100% - 288px) / 2)",
                  paddingRight: "calc((100% - 288px) / 2)",
                  paddingTop: "20px",
                  paddingBottom: "40px",
                }}
              >
                {items.map((item, index) => {
                  // 현재 스크롤 위치를 고려한 정확한 카드 위치 계산
                  const cardPosition = index - currentIndex - scrollOffset;

                  // 카드가 중앙에서 얼마나 떨어져 있는지에 따라 점진적으로 회전 각도 계산
                  let rotation = 0;
                  let translateX = 0;
                  let translateY = 0;

                  if (cardPosition !== 0) {
                    // 거리에 따른 최대 회전 각도와 이동 거리
                    const maxRotation = 3;
                    const maxTranslateX = 8;
                    const maxTranslateY = 8;

                    // 거리에 따른 비율 계산 (최대 1.0으로 제한)
                    const distance = Math.abs(cardPosition);
                    const ratio = Math.min(distance, 1.0);

                    // 점진적인 변화 적용
                    rotation =
                      cardPosition > 0
                        ? maxRotation * ratio
                        : -maxRotation * ratio;
                    translateX =
                      cardPosition > 0
                        ? maxTranslateX * ratio
                        : -maxTranslateX * ratio;
                    translateY = maxTranslateY * ratio;
                  }

                  return (
                    <div
                      key={item.id}
                      className="transition-transform duration-150 ease-out"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        transformOrigin: "center center",
                      }}
                    >
                      <MainCard type="waiting" item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="flex gap-2.5 pb-7.5 max-w-sm">
            <button className="flex-1 w-15 h-15 flex rounded-full items-center justify-center p-4 bg-[#F4F4F4]">
              <MapPin className="icon-m" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWaitingDetail;
