import HomeHeader from "../../../components/Header";
import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import BoothList from "./components/BoothList";
import useWindowHeight from "../../../hooks/useWindowHeight";
import { useState } from "react";
import BookmarkIcon from "../../../components/common/BookmarkIcon";
import Clock from "../../../assets/icon/clock.svg?react";
import { Button } from "@repo/ui";

const boothInfomation = [
  { id: 1, name: "스페이시스", department: "컴퓨터공학과", waitingCount: 0 },
  {
    id: 2,
    name: "그냥맛집임",
    department: "바이오메카트로닉스공학과",
    waitingCount: 2,
  },
  { id: 3, name: "특별한부스", department: "경영학과", waitingCount: 3 },
  { id: 4, name: "평범한부스", department: "문과", waitingCount: 0 },
];

const boothPosition: Record<number, { top: string; left: string }> = {
  1: { top: "45%", left: "60%" },
  2: { top: "45%", left: "70%" },
  3: { top: "45%", left: "80%" },
  4: { top: "45%", left: "90%" },
};

const booth = boothInfomation.map((booth) => ({
  ...booth,
  ...boothPosition[booth.id],
}));

const MapPage = () => {
  const height = useWindowHeight();
  const [openBooth, setOpenBooth] = useState(false);

  const openBoothButton = (id: number) => {
    setOpenBooth(true);
  };
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* 헤더 */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white px-5">
        <HomeHeader />
      </header>

      {/* 축제 맵 */}
      <div className="relative top-0 left-0 h-screen-dvh w-full">
        <div className="overflow-scroll">
          <img
            className=""
            // src={boothMap}
            src="/test-map.png"
            alt="축제 맵 이미지"
          />
        </div>
        {/* 마커 */}
        <ul className="absolute top-0 left-0 w-full h-full">
          {booth.map((booth) => (
            <li
              key={booth.id}
              className="absolute"
              style={{ top: booth.top, left: booth.left }}
            >
              <button onClick={() => openBoothButton(booth.id)}>
                <BoothMarker />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 부스 리스트 */}
      {openBooth ? (
        <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] bg-white rounded-[20px] z-30">
          <div className="pt-[20px] pb-[16px] px-[20px]">
            <div className="flex items-start justify-between">
              <div className="mb-[16px]">
                <h1 className="text-title-20-semibold text-black-90 mb-1">
                  스페이시스
                </h1>
                <h2 className="text-16-regular">컴퓨터공학과</h2>
              </div>
              <BookmarkIcon />
            </div>
            <p className="flex items-center text-16-regular text-black-80 mb-[20px]">
              <span className="w-[18px] flex justify-center mr-1.5">
                <Clock />
              </span>
              대기 없음
            </p>
            <Button>상세 보기</Button>
          </div>
        </div>
      ) : (
        <BoothList />
      )}
    </div>
  );
};

export default MapPage;
