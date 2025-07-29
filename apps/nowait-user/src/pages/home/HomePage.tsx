import { useState } from "react";
import HomeHeader from "../../components/Header";
import ArrowDown from "../../assets/icon/arrow_down.svg?react";
import MainCard from "./components/MainCard";
import InfiniteStoreList from "./components/InfiniteStoreList";
import WaitingListModal from "./components/WaitingListModal";
import MyWaitingDetail from "./components/MyWaitingDetail";
import BannerMap from "../../assets/icon/banner_img.svg?react";
import { useWaitingStores } from "../../hooks/useWaitingStores";
import { useMyWaitingList } from "../../hooks/useMyWaitingList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("대기 적은 순");
  const [isWaitingDetailOpen, setIsWaitingDetailOpen] = useState(false);

  // 정렬 옵션에 따른 order 설정
  const order = sortOption === "대기 적은 순" ? "asc" : "desc";
  const { waitingStores, isLoading, error } = useWaitingStores(order);

  // 내 대기 목록 가져오기
  const { myWaitingList, refetch: refetchMyWaitingList } = useMyWaitingList();

  // myWaitingList를 WaitingItem 형태로 변환
  const waitingItems = myWaitingList.map((store) => ({
    id: store.storeId.toString(),
    number: store.rank,
    storeName: store.storeName,
    waitingCount: store.teamsAhead,
    departmentName: store.departmentName,
    category: store.departmentName, // category는 departmentName과 동일하게 설정
    people: store.partySize,
    date: (() => {
      const date = new Date(store.registeredAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    })(),
    location: store.location,
    imageUrl: store.bannerImageUrl || store.profileImageUrl, // bannerImage가 있다면 사용, 없으면 profileImage 사용
    departmentId: store.storeId, // departmentId는 storeId로 설정
  }));

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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col px-5 pb-8">
        <HomeHeader />
        {/* 내 대기 순서 */}
        {myWaitingList.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-row mt-4.5 gap-1.5 text-title-20-bold text-black-100">
              <div className="flex">나의 대기카드</div>
            </div>

            <MainCard
              type="myWaitingCard"
              waitingStores={myWaitingList}
              onClick={handleWaitingCardClick}
              onRefresh={refetchMyWaitingList}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col px-5 gap-10">
        {/* 바로 입장 가능한 주점 */}
        {!isLoading && !error && waitingStores.length > 0 && (
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
              {waitingStores.map((store) => (
                <div key={store.storeId} className="flex-shrink-0">
                  <MainCard
                    type="homeCard"
                    imageUrl={store.bannerImageUrl || ""}
                    storeName={store.storeName}
                    departmentName={store.departmentName}
                    waitingCount={store.waitingCount}
                    onClick={() => navigate(`/store/${store.storeId}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 축제 부스 찾기 안내 */}
        <div
          onClick={() => navigate("/map")}
          className="flex flex-row rounded-2xl bg-black-15 gap-3.75 justify-between pl-5 items-center"
        >
          <div className="flex flex-col py-5 gap-1.5">
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
          waitingItems={waitingItems}
        />
      )}
    </div>
  );
};

export default HomePage;
