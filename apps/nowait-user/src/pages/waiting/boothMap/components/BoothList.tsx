import { motion, useMotionValue, animate } from "framer-motion";
import { useInfiniteStores } from "../../../../hooks/useInfiniteStores";
import BoothItem from "./BoothItem";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const snapPoints = [0, -400]; // 0: 닫힘, -400: 열림

const BoothList = () => {
  const y = useMotionValue(0);
  const { stores, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteStores();

  // 가상 스크롤을 위한 ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: stores.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 285,
  });

  // 무한 스크롤 트리거
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const lastItem = virtualItems[virtualItems.length - 1];

    if (
      lastItem &&
      lastItem.index >= stores.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("🚀 fetchNextPage 호출!");
      fetchNextPage();
    }
  }, [
    rowVirtualizer.getTotalSize(),
    stores.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // 추가 무한 스크롤 트리거 (스크롤 이벤트 기반)
  useEffect(() => {
    const handleStoreScroll = () => {
      if (parentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        console.log("스크롤 비율:", scrollPercentage);

        if (
          scrollPercentage > 0.8 && // 80% 스크롤했을 때
          hasNextPage &&
          !isFetchingNextPage
        ) {
          console.log("🚀 스크롤 이벤트로 fetchNextPage 호출!");
          fetchNextPage();
        }
      }
    };

    const storeScrollElement = parentRef.current;
    if (storeScrollElement) {
      storeScrollElement.addEventListener("scroll", handleStoreScroll);
      return () =>
        storeScrollElement.removeEventListener("scroll", handleStoreScroll);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      initial={{ opacity: 0, y: 400 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 400 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ y }}
      drag="y"
      dragConstraints={{ top: -400, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={(e) => e.stopPropagation()}
      className="fixed -bottom-[615px] left-0 w-full bg-white rounded-t-[36px] z-30"
    >
      <div>
        <p className="w-[40px] h-[4px] rounded-full bg-black-30 mx-auto mt-2.5 mb-[26px]"></p>
        <div className="px-5">
          <div className="mb-[30px]">
            <h1 className="text-title-20-semibold mb-1">부스 리스트</h1>
            <h2 className="text-14-regular text-[#8F8F8F]">
              {stores.length}개의 부스
            </h2>
          </div>
          {!isLoading && stores.length > 0 && (
            <div
              ref={parentRef}
              style={{
                height: "600px",
                overflow: "auto",
              }}
              className="scrollbar-hide"
            >
              <ul
                style={{
                  height: `calc(${rowVirtualizer.getTotalSize()}px - 200px)`,
                  position: "relative",
                  paddingBottom: "215px",
                }}
                className="overflow-y-scroll pb-[215px]"
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const store = stores[virtualRow.index];
                  if (!store) return null;
                  return (
                    <li
                      key={store.storeId}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <BoothItem
                        bannerImages={store.bannerImages[0]?.imageUrl}
                        waitingCount={store.waitingCount}
                        profileImage={store.profileImage?.imageUrl}
                        name={store.name}
                        departmentName={store.departmentName}
                        storeId={String(store.storeId)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BoothList;
