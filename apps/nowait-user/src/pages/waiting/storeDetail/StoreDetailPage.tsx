import Arrow from "../../../assets/icon/arrow-right.svg?react";
import SubStract from "../../../assets/icon/subtract.svg?react";
import Clock from "../../../assets/icon/clock.svg?react";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import MenuList from "../../../components/common/MenuList";
import { useBookmarkMutation } from "../../../hooks/mutate/useBookmark";
import BookmarkIcon from "../../../components/common/BookmarkIcon";
import { useBookmarkState } from "../../../hooks/useBookmarkState";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../../api/reservation";
import CommonSwiper from "../../../components/CommonSwiper";
import SectionDivider from "../../../components/SectionDivider";
import { formatTimeRange } from "../../../utils/formatTimeRange";
import DepartmentImage from "../../../components/DepartmentImage";
import NotFound from "../../NotFound/NotFound";
import { getStoreMenus } from "../../../api/menu";
import FullPageLoader from "../../../components/FullPageLoader";

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const { id: storeId } = useParams();

  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation(
    { withInvalidate: true },
    Number(storeId)
  );
  const { isBookmarked } = useBookmarkState(Number(storeId));

  const {
    data: store,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(Number(storeId)),
    select: (data) => data?.response,
  });
  const { data: menus, isLoading: menusIsLoading } = useQuery({
    queryKey: ["storeMenus", store?.publicCode],
    queryFn: () => getStoreMenus(store!.publicCode),
    select: (data) => data?.response,
    enabled: !!store?.publicCode,
  });

  const handleBookmarkButton = async () => {
    try {
      if (!isBookmarked) {
        await createBookmarkMutate.mutate();
      } else {
        await deleteBookmarkMutate.mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <FullPageLoader />;
  if (isError) return <NotFound />;
  return (
    <div>
      <div className="px-5 w-full min-h-dvh mb-[112px]">
        {/* 주점 배너 이미지 */}
        <CommonSwiper slideImages={store?.bannerImages || []}></CommonSwiper>
        {/* 학과 정보 섹션 */}
        <section className="border-b-1 border-[#f4f4f4]">
          <div className="flex justify-between items-center py-[21px]">
            <div className="flex flex-col justify-between gap-[3px]">
              <p className="text-14-regular text-black-70">
                {store?.departmentName}
              </p>
              <h1 className="text-headline-22-bold">{store?.name}</h1>
            </div>
            <DepartmentImage
              width="52px"
              height="52px"
              src={store?.profileImage?.imageUrl}
            />
          </div>
          {/* 주점 대기팀 인원 수 */}
          {store?.waitingCount !== 0 && (
            <div className="pb-5">
              <p className="inline-block text-[12px] font-bold rounded-[6px] px-2 py-[7px] bg-[#ffeedf] text-[#ff5e07]">
                대기 {store?.waitingCount}팀
              </p>
            </div>
          )}
        </section>
        {/* 주점 정보(위치,운영 시간, 공지사항) */}
        <section className="pt-5 pb-[28px]">
          <div className="mb-6">
            <p className="flex items-center mb-1.5 text-16-regular text-black-80">
              <span className="w-[18px] flex justify-center  mr-1.5">
                <SubStract />
              </span>
              {store?.location}
            </p>
            <p className="flex items-center text-16-regular text-black-80">
              <span className="w-[18px] flex justify-center mr-1.5">
                <Clock />
              </span>
              {formatTimeRange(store?.openTime)}
            </p>
          </div>
          <h2
            className={`${
              store?.noticeTitle ? "mb-10" : "mb-0"
            } text-16-regular text-black-80 whitespace-pre-line break-keep`}
          >
            {store?.description}
          </h2>
          {/* 공지사항 */}
          {store?.noticeTitle && (
            <button
              onClick={() =>
                navigate(`/store/${storeId}/notice`, {
                  state: {
                    title: store?.noticeTitle,
                    content: store?.noticeContent,
                  },
                })
              }
              className="w-full flex justify-between items-center gap-4 py-3.5 px-4 bg-black-15 rounded-[10px]"
            >
              <div className="flex gap-1.5 min-w-0">
                <p className="text-[14px] font-bold text-black-50 shrink-0">
                  공지
                </p>
                <h1 className="text-14-medium text-black-70 truncate">
                  {store?.noticeTitle}
                </h1>
              </div>
              <Arrow className="shrink-0" fill="#AAAAAA" />
            </button>
          )}
        </section>
        <SectionDivider />
        {/* 주점 메뉴 리스트 */}
        <MenuList
          mode="store"
          menus={menus?.menuReadDto!}
          isLoading={menusIsLoading}
        />
      </div>
      <PageFooterButton background="gradient" className="gap-2">
        <Button
          className="border"
          backgroundColor="white"
          borderColor="#ececec"
          buttonType="icon"
          onClick={handleBookmarkButton}
          disabled={
            createBookmarkMutate.isPending || deleteBookmarkMutate.isPending
          }
        >
          <BookmarkIcon isBookmarked={isBookmarked} />
        </Button>
        {/* 주점 미오픈 시 버튼 */}
        {!store?.isActive ? (
          <Button disabled={!store?.isActive}>지금은 대기할 수 없어요</Button>
        ) : (
          // 내 웨이팅 등록 현황에 따른 버튼
          <Button
            disabled={store?.isWaiting}
            onClick={() =>
              navigate(`/store/${storeId}/partysize`, { state: store?.name })
            }
          >
            {store?.isWaiting ? "대기 중이에요" : "대기하기"}
          </Button>
        )}
      </PageFooterButton>
    </div>
  );
};

export default StoreDetailPage;
