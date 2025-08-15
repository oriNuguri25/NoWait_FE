import { useEffect, memo } from "react";
import MainCard from "./MainCard";
import { useInfiniteStores } from "../../../hooks/useInfiniteStores";

const InfiniteStoreList = memo(() => {
  // 커스텀 훅에서 무한 스크롤 로직 가져오기
  const { stores, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteStores();

  // 무한 스크롤 트리거 (스크롤 이벤트 기반)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      if (
        scrollPercentage > 0.8 && // 80% 스크롤했을 때
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="mb-0.25 text-start text-headline-22-bold text-black-90">
        모든 주점
      </div>

      {/* 초기 로딩 중일 때 */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-black-20 border-t-black-60 rounded-full animate-spin"></div>
            <div className="text-black-50 text-16-regular">
              주점 정보를 불러오는 중...
            </div>
          </div>
        </div>
      )}

      {/* 주점 데이터가 없을 때 */}
      {!isLoading && stores.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-black-50 text-16-regular mb-2">
            주점이 아직 준비되지 않았어요.
          </div>
          <div className="text-black-40 text-14-regular">
            곧 다양한 주점들이 추가될 예정입니다!
          </div>
        </div>
      )}

      {/* 주점 데이터가 있을 때 렌더링 */}
      {!isLoading && stores.length > 0 && (
        <div className="flex flex-col gap-3">
          {stores.map((store) => (
            <MainCard
              key={store.storeId}
              type="store"
              storeId={store.storeId}
              name={store.name}
              departmentName={store.departmentName}
              profileImageUrl={store.profileImage?.imageUrl || ""}
              isActive={store.isActive}
              deleted={store.deleted}
              waitingCount={store.waitingCount}
            />
          ))}

          {/* 다음 페이지 로딩 표시 */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black-20 border-t-black-60 rounded-full animate-spin"></div>
                <div className="text-black-50 text-14-regular">
                  다음 주점을 불러오는 중...
                </div>
              </div>
            </div>
          )}

          {/* 더 이상 데이터가 없을 때 */}
          {!hasNextPage && stores.length > 0 && (
            <div className="flex justify-center py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="text-black-50 text-14-regular">
                  더 이상 불러올 주점이 없습니다.
                </div>
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
