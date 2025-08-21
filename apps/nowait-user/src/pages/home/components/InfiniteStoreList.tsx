import { useEffect, memo, useRef, useCallback } from "react";
import MainCard from "./MainCard";
import { useInfiniteStores } from "../../../hooks/useInfiniteStores";
import { DropdownLoader } from "@repo/ui";

const InfiniteStoreList = memo(() => {
  // 커스텀 훅에서 무한 스크롤 로직 가져오기
  const { stores, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteStores();

  // 디바이스 및 브라우저 정보 로깅 (디버깅용)
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    console.log("디바이스 정보:", {
      userAgent,
      isIOS,
      isAndroid,
      isChrome,
      isSafari,
      supportIntersectionObserver: "IntersectionObserver" in window,
      windowHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
    });
  }, []);

  // Intersection Observer를 위한 ref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // fetchNextPage를 useCallback으로 메모이제이션
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("무한 스크롤 트리거: 다음 페이지 로딩");
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Intersection Observer를 사용한 무한 스크롤 (브라우저 호환성 개선)
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log("Intersection Observer 감지:", {
          isIntersecting: entry.isIntersecting,
          hasNextPage,
          isFetchingNextPage,
        });

        if (entry.isIntersecting) {
          handleFetchNextPage();
        }
      },
      {
        // 루트 여백: 트리거 시점을 조정 (100px 전에 미리 로딩)
        rootMargin: "100px",
        // 임계값: 타겟 요소가 10% 보일 때 트리거
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleFetchNextPage]);

  // 백업용 스크롤 이벤트 (Intersection Observer 미지원 브라우저용)
  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      // 스크롤 이벤트 쓰로틀링 (성능 개선)
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

        console.log("스크롤 백업 이벤트:", {
          scrollPercentage: scrollPercentage.toFixed(2),
          hasNextPage,
          isFetchingNextPage,
        });

        if (
          scrollPercentage > 0.8 && // 80% 스크롤했을 때
          hasNextPage &&
          !isFetchingNextPage
        ) {
          console.log("백업 스크롤 트리거: 다음 페이지 로딩");
          fetchNextPage();
        }
      }, 100); // 100ms 쓰로틀링
    };

    // 패시브 리스너로 성능 개선
    window.addEventListener("scroll", handleScroll, { passive: true });
    // 터치 이벤트도 추가 (모바일 호환성)
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="mb-0.25 text-start text-title-20-bold text-black-90">
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

          {/* Intersection Observer 타겟 요소 (무한 스크롤 트리거) */}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center"
              aria-label="더 많은 주점을 로딩하는 중..."
            >
              {isFetchingNextPage ? (
                <DropdownLoader />
              ) : (
                <div className="text-black-40 text-14-regular">
                  스크롤하여 더 많은 주점 보기
                </div>
              )}
            </div>
          )}

          {/* 더 이상 로드할 데이터가 없을 때 */}
          {!hasNextPage && stores.length > 0 && (
            <div className="flex justify-center pb-4">
              <div className="text-black-40 text-14-regular">
                모든 주점을 확인했습니다
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
