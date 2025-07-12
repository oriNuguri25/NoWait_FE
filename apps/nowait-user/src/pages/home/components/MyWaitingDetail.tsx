import ArrowBack from "../../../assets/icon/arrow_back.svg?react";
import MapPin from "../../../assets/icon/map-pin.svg?react";
import Share from "../../../assets/icon/share.svg?react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 288 + 6; // w-72 (288px) + gap-1.5 (6px)
      const newIndex = Math.round(scrollLeft / cardWidth);
      const boundedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

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

  // 숫자 애니메이션 컴포넌트
  const AnimatedNumber = ({
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
    return (
      <span
        className="relative inline-block overflow-hidden align-baseline"
        style={{
          width: "max-content",
          minWidth: "1ch",
          height: "1em",
          lineHeight: "inherit",
        }}
      >
        <span
          className={`inline-block transition-transform duration-300 ease-out ${
            !isAnimating
              ? ""
              : direction === "up"
              ? "animate-slide-up"
              : "animate-slide-down"
          }`}
        >
          {value}
        </span>
        {isAnimating && (
          <span
            className={`absolute top-0 left-0 inline-block transition-transform duration-300 ease-out ${
              direction === "up"
                ? "animate-slide-up-out"
                : "animate-slide-down-out"
            }`}
          >
            {prevValue}
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
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
          <div className="text-22-bold text-black-90">
            내 앞 대기{" "}
            <span className="text-primary ml-1">
              <AnimatedNumber
                value={items[currentIndex]?.waitingCount || 0}
                prevValue={items[prevIndex]?.waitingCount || 0}
                direction={animationDirection}
                isAnimating={isAnimating}
              />
              팀
            </span>
          </div>
        </div>

        {/* 카드 영역 */}
        <div className="w-full flex-1 flex flex-col mb-7.5">
          {/* 가로 스크롤 카드 컨테이너 */}
          <div className="flex-1 flex">
            <div
              ref={scrollContainerRef}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide w-full snap-x snap-mandatory"
              style={{
                paddingLeft: "calc(50vw - 144px)",
                paddingRight: "calc(50vw - 144px)",
              }}
            >
              {items.map((item, index) => (
                <MainCard key={item.id} type="waiting" item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex gap-2.5 pb-7.5 max-w-sm">
          <button className="flex-1 w-15 h-15 flex rounded-full items-center justify-center p-4 bg-[#F4F4F4]">
            <MapPin className="icon-m" />
          </button>
          <button className="flex-1 w-15 h-15 flex rounded-full items-center justify-center p-4 bg-[#F4F4F4]">
            <Share />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWaitingDetail;
