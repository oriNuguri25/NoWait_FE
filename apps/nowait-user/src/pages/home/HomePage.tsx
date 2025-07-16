import { useRef, useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import Search from "../../assets/icon/search.svg?react";
import ArrowDown from "../../assets/icon/arrow_down.svg?react";
import MainCard from "./components/MainCard";
import InfiniteStoreList from "./components/InfiniteStoreList";
import WaitingListModal from "./components/WaitingListModal";
import MyWaitingDetail from "./components/MyWaitingDetail";
import BannerMap from "../../assets/icon/banner_img.svg?react";
import { mockWaitingItems } from "../../data/mockData";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("대기 적은 순");
  const [isWaitingDetailOpen, setIsWaitingDetailOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleWaitingCardClick = () => {
    setIsWaitingDetailOpen(true);
  };

  const handleWaitingDetailClose = () => {
    setIsWaitingDetailOpen(false);
  };

  const getSectionTitle = () => {
    return sortOption === "대기 적은 순"
      ? "대기가 가장 적어요"
      : "인기가 가장 많아요";
  };

  return (
    <div className="flex flex-col px-5">
      <HomeHeader />
      <div>
        {/* 주점명, 메뉴, 학과 검색 기능 */}
        <div className="mt-1 flex flex-row justify-start items-center px-4 py-3.5 bg-black-10 gap-2 rounded-lg">
          <Search />
          <div className="text-black-50 text-16-regular">
            주점명, 메뉴, 학과 검색
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {/* 주점 순서 */}
          <div className="mt-3">
            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-2xl"
            >
              <div className="flex">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-start px-0"
                  >
                    <MainCard
                      type="homeWaiting"
                      storeName={`주점주점주점명${index + 1}`}
                      queueNumber={13 + index}
                      onClick={handleWaitingCardClick}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 페이지 인디케이터 */}
            <div className="flex justify-center mt-2.5 gap-1.25">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className={`h-1.5 transition-all duration-300 ${
                    index === activeIndex
                      ? "w-3.5 rounded-md bg-[#000000]"
                      : "w-1.5 rounded-sm bg-[#000000] opacity-20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 바로 입장 가능한 주점 */}
          <div className="flex flex-col">
            <div className="flex flex-row gap-1.5 items-center mb-3.5">
              <div className="flex text-start text-headline-22-bold text-black-90">
                {getSectionTitle()}
              </div>
              <div
                onClick={handleModalOpen}
                className="flex w-6 h-6 bg-black-15 rounded-full items-center justify-center cursor-pointer"
              >
                <ArrowDown className="text-black-60 icon-s" />
              </div>
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {mockWaitingItems.map((store) => (
                <div key={store.id} className="flex-shrink-0">
                  <MainCard
                    type="homeCard"
                    imageUrl={store.imageUrl}
                    storeName={store.storeName}
                    departmentId={store.departmentId}
                    waitingCount={store.waitingCount}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 축제 부스 찾기 안내 */}
          <div className="flex flex-row rounded-2xl bg-black-15 gap-3.75 justify-between pl-5 items-center">
            <div className="flex flex-col py-5">
              <div className="flex text-18-bold text-black-90">
                축제 부스 한눈에 찾기
              </div>
              <div className="flex text-13-regular text-black-80 leading-[130%]">
                지도로 부스의 위치를 확인해 보세요!
              </div>
            </div>
            <BannerMap className="w-25 h-25" />
          </div>

          {/* 무한 스크롤 주점 목록 */}
          <InfiniteStoreList />
        </div>
      </div>

      {/* 정렬 모달 */}
      <WaitingListModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedOption={sortOption}
        onSortChange={handleSortChange}
      />

      {/* 웨이팅 상세 모달 */}
      {isWaitingDetailOpen && (
        <MyWaitingDetail
          onClose={handleWaitingDetailClose}
          waitingItems={mockWaitingItems}
        />
      )}
    </div>
  );
};

export default HomePage;
