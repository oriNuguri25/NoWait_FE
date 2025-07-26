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
  const [scrollOffset, setScrollOffset] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "up" | "down" | null
  >(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  // 숫자 애니메이션 효과
  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      // 슬라이드 방향 판단
      const isRightSlide = currentIndex > prevIndexRef.current;

      // 애니메이션 방향 설정
      setAnimationDirection(isRightSlide ? "up" : "down");

      // 강제 리렌더링을 위한 키 변경
      setAnimationKey((prev) => prev + 1);

      // 애니메이션 완료 후 방향 리셋
      const timer = setTimeout(() => {
        setAnimationDirection(null);
      }, 300);

      prevIndexRef.current = currentIndex;

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

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
        setCurrentIndex(boundedIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length, currentIndex]);

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
                <span
                  key={animationKey}
                  className={`text-22-bold ${
                    animationDirection === "up"
                      ? "animate-number-slide-up"
                      : animationDirection === "down"
                      ? "animate-number-slide-down"
                      : ""
                  }`}
                >
                  {items[currentIndex]?.waitingCount || 0}
                </span>
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
