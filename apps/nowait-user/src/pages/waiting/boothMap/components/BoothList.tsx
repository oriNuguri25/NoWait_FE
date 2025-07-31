import { motion, useMotionValue, animate } from "framer-motion";
import BookmarkedStoreItem from "../../bookmark/components/BookmarkedStoreItem";
import { useRef, useState } from "react";
import { useInfiniteStores } from "../../../../hooks/useInfiniteStores";

const snapPoints = [0, -400]; // 0: 닫힘, -400: 열림

const dummyData = [
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "바이오메카트로닉스공학과",
    storeId: "1",
  },
  {
    id: 2,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "약과",
    storeId: "2",
  },
  {
    id: 3,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "약과",
    storeId: "2",
  },
  {
    id: 4,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "약과",
    storeId: "2",
  },
];

const BoothList = () => {
  const { stores } = useInfiniteStores();

  const y = useMotionValue(0);

  const handleDragEnd = () => {
    const currentY = y.get();
    // 가장 가까운 스냅 지점으로 스냅
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
    );
    animate(y, closest);
  };

  return (
    <motion.div
      style={{ y }}
      drag="y"
      dragConstraints={{ top: -400, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={(e) => e.stopPropagation()}
      className="fixed -bottom-[615px] left-0 w-full bg-white rounded-[36px] z-30"
    >
      <p className="w-[40px] h-[4px] rounded-full bg-black-30 mx-auto mt-2.5 mb-[26px]"></p>
      <div className="px-5">
        <div className="mb-[30px]">
          <h1 className="text-title-20-semibold mb-1">부스 리스트</h1>
          <h2 className="text-14-regular text-[#8F8F8F]">
            {stores.length}개의 부스
          </h2>
        </div>
        <ul className="h-[600px] overflow-y-scroll">
          {stores.map((data) => {
            return (
              <BookmarkedStoreItem
                key={data.storeId}
                id={data.storeId}
                image={data?.bannerImages[0]?.imageUrl}
                waitingCount={data.waitingCount}
                storeName={data.name}
                departmentName={data.departmentName}
                storeId={String(data.storeId)}
              />
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default BoothList;
