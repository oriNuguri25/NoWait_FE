import { motion, useMotionValue, animate } from "framer-motion";
import BookmarkedStoreItem from "../../bookmark/components/BookmarkedStoreItem";
import { useRef, useState } from "react";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";
import { useInfiniteStores } from "../../../../hooks/useInfiniteStores";

const snapPoints = [0, -400]; // 0: 닫힘, -400: 열림

interface BannerImages {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: number;
}

const dummyData = [
{
    id: 1,
    bannerImages: [
      {
        id: 1,
        imageType: "banner",
        imageUrl: "/bookmarkStoreImage.png",
        storeId: 1,
      },
    ],
    waitCount: "대기 0팀",
    name: "스페이시스",
    departmentName: "약과",
    storeId: "1",
    profileImage : {
      id:1,
      storeId:1,
      imageUrl : "/bookmarkStoreImage.png",
      imageType: "PROFILE"
    }
  },
  {
    id: 2,
    bannerImages: [
      {
        id: 2,
        imageType: "banner",
        imageUrl: "/bookmarkStoreImage.png",
        storeId: 2,
      },
    ],
    waitCount: "대기 0팀",
    name: "스페이시스",
    departmentName: "약과",
    storeId: "2",
    profileImage : {
      id:1,
      storeId:1,
      imageUrl : "/bookmarkStoreImage.png",
      imageType: "PROFILE"
    }
  },
  {
    id: 3,
    bannerImages: [
      {
        id: 3,
        imageType: "banner",
        imageUrl: "/bookmarkStoreImage.png",
        storeId: 3,
      },
    ],
    waitCount: "대기 0팀",
    name: "스페이시스",
    departmentName: "약과",
    storeId: "3",
    profileImage : {
      id:3,
      storeId:3,
      imageUrl : "/bookmarkStoreImage.png",
      imageType: "PROFILE"
    }
  },
  {
    id: 4,
    bannerImages: [
      {
        id: 4,
        imageType: "banner",
        imageUrl: "/bookmarkStoreImage.png",
        storeId: 4,
      },
    ],
    waitCount: "대기 0팀",
    name: "스페이시스",
    departmentName: "약과",
    storeId: "4",
    profileImage : {
      id:4,
      storeId:4,
      imageUrl : "/bookmarkStoreImage.png",
      imageType: "PROFILE"
    }
  },
];
interface ProfileImage {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: number;
}

interface PropsType {
  id: number;
  bannerImages: BannerImages[];
  waitingCount: number;
  ProfileImage: ProfileImage;
  name: string;
  departmentName: string;
  storeId: string;
}

const BoothList = () => {
  const y = useMotionValue(0);
const { bookmarkData } = useBookmarkState();
  const { stores } =
    useInfiniteStores();
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
      className="fixed -bottom-[615px] left-0 w-full bg-white rounded-[36px] z-30"
    >
      <p className="w-[40px] h-[4px] rounded-full bg-black-30 mx-auto mt-2.5 mb-[26px]"></p>
      <div className="px-5">
        <div className="mb-[30px]">
          <h1 className="text-title-20-semibold mb-1">부스 리스트</h1>
          <h2 className="text-14-regular text-[#8F8F8F]">39개의 부스</h2>
        </div>
        <ul className="h-[600px] overflow-y-scroll">
          {stores?.map((data:any) => {
            return (
              <BookmarkedStoreItem
                key={data.name}
                id={data.id}
                bannerImages={data.bannerImages}
                waitingCount={data.waitingCount}
                ProfileImage={data.ProfileImage}
                name={data.name}
                departmentName={data.departmentName}
                storeId={data.storeId}
              />
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default BoothList;
