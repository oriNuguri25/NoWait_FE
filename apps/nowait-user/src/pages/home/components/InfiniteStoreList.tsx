import { useRef, useEffect, memo, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import MainCard from "./MainCard";
import { useInfiniteStores } from "../../../hooks/useInfiniteStores";
import { useInfiniteScrollStore } from "../../../stores/infiniteScrollStore";

const InfiniteStoreList = memo(() => {
  // 커스텀 훅에서 무한 스크롤 로직 가져오기
  const { stores, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteStores();

  // stores 배열을 메모이제이션하여 불필요한 리렌더링 방지
  const memoizedStores = useMemo(() => stores, [stores]);

  // Zustand store에서 무한 스크롤 상태 관리
  const { setHasMore, setIsLoading } = useInfiniteScrollStore();

  // 가상 스크롤을 위한 ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: memoizedStores.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  // 무한 스크롤 트리거
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const lastItem = virtualItems[virtualItems.length - 1];

    console.log("=== 무한 스크롤 디버깅 ===");
    console.log("현재 stores 수:", memoizedStores.length);
    console.log("마지막 보이는 아이템 인덱스:", lastItem?.index);
    console.log("hasNextPage:", hasNextPage);
    console.log("isFetchingNextPage:", isFetchingNextPage);
    console.log("트리거 조건:", lastItem?.index >= memoizedStores.length - 5);

    if (
      lastItem &&
      lastItem.index >= memoizedStores.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("🚀 fetchNextPage 호출!");
      fetchNextPage();
    }
  }, [
    rowVirtualizer.getTotalSize(),
    memoizedStores.length,
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

  // Zustand store 상태 동기화
  useEffect(() => {
    setHasMore(hasNextPage);
    setIsLoading(isLoading);
  }, [hasNextPage, isLoading, setHasMore, setIsLoading]);

  return (
    <div className="flex flex-col">
      <div className="mb-0.25 text-start text-headline-22-bold text-black-90">
        모든 주점
      </div>

      {/* 로딩 중일 때 */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-black-50 text-16-regular">
            주점 정보를 불러오는 중...
          </div>
        </div>
      )}

      {/* 주점 데이터가 없을 때 */}
      {!isLoading && memoizedStores.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-black-50 text-16-regular mb-2">
            주점이 아직 준비되지 않았어요.
          </div>
          <div className="text-black-40 text-14-regular">
            곧 다양한 주점들이 추가될 예정입니다!
          </div>
        </div>
      )}

      {/* 주점 데이터가 있을 때만 가상 스크롤 컨테이너 렌더링 */}
      {!isLoading && memoizedStores.length > 0 && (
        <div
          ref={parentRef}
          style={{
            height: "400px",
            overflow: "auto",
          }}
          className="scrollbar-hide"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {/* 가상화된 아이템들 */}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const store = memoizedStores[virtualRow.index];
              if (!store) return null;

              return (
                <div
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
                  <MainCard
                    type="store"
                    storeId={store.storeId}
                    name={store.name}
                    departmentName={store.departmentName}
                    profileImageUrl={store.profileImage?.imageUrl || ""}
                    isActive={store.isActive}
                    deleted={store.deleted}
                    waitingCount={store.waitingCount}
                  />
                </div>
              );
            })}
          </div>

          {/* 로딩 표시 */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="text-black-50 text-14-regular">로딩 중...</div>
            </div>
          )}

          {/* 더 이상 데이터가 없을 때 */}
          {!hasNextPage && memoizedStores.length > 0 && (
            <div className="flex justify-center py-4">
              <div className="text-black-50 text-14-regular">
                더 이상 주점이 없습니다
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

InfiniteStoreList.displayName = "InfiniteStoreList";

export default InfiniteStoreList;
