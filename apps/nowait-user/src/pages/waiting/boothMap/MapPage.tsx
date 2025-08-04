import HomeHeader from "../../../components/Header";
import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import BoothList from "./components/BoothList";
import useWindowHeight from "../../../hooks/useWindowHeight";
import { useState } from "react";
import { useInfiniteStores } from "../../../hooks/useInfiniteStores";
import BoothDetail from "./components/BoothDetail";

const boothPosition: Record<number, { top: string; left: string }> = {
  1: { top: "45%", left: "60%" },
  2: { top: "45%", left: "70%" },
  3: { top: "45%", left: "80%" },
  4: { top: "45%", left: "90%" },
};

const MapPage = () => {
  const height = useWindowHeight();
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  // const {data:storeMarkers} = useQuery({
  //       queryKey: ["stores"],
  //   queryFn: getAllStores,
  //   // initialPageParam: 0,
  //   // getNextPageParam: (lastPage, allPages) => {
  //   //   // 서버에서 받은 hasNext를 기준으로 다음 페이지 여부 결정
  //   //   if (!lastPage.hasNext) {
  //   //     return undefined;
  //   //   }
  //   //   return allPages.length;
  //   // },
  // })
  const { stores } = useInfiniteStores();
  const booths = stores?.map((booth) => ({
    ...booth,
    ...boothPosition[booth.storeId],
  }));

  // const detailBooth = booths.find((booth) => booth.storeId === selectedBooth);

  const openBoothButton = (id: number) => {
    if (selectedBooth === id) {
      // 이미 선택된 마커를 다시 클릭 → 초기화
      setSelectedBooth(null);
    } else {
      // 새로운 마커 클릭 → 해당 마커 정보 표시
      setSelectedBooth(id);
    }
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
          {booths.map((booth) => (
            <li
              key={booth.storeId}
              className="absolute"
              style={{ top: booth.top, left: booth.left }}
            >
              <button
                className={`transition-transform origin-bottom duration-200 ${
                  selectedBooth === booth.storeId ? "scale-120" : "scale-100"
                }`}
                onClick={() => openBoothButton(booth.storeId)}
              >
                <BoothMarker />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 부스 리스트 */}
      {/* <AnimatePresence></AnimatePresence> */}
      {selectedBooth !== null ? (
        <BoothDetail
          storeId={String(
            booths.find((booth) => booth.storeId === selectedBooth)?.storeId
          )}
        />
      ) : (
        <BoothList />
      )}
    </div>
  );
};

export default MapPage;
