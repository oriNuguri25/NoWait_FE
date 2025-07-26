import Arrow from "../../../assets/icon/arrow-right.svg?react";
import SubStract from "../../../assets/icon/subtract.svg?react";
import Clock from "../../../assets/icon/clock.svg?react";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import MenuList from "../../../components/common/MenuList";
import { useBookmarkMutation } from "../../../hooks/mutate/useBookmark";
import BookmarkIcon from "./components/BookmarkIcon";
import { useBookmarkState } from "../../../hooks/useBookmarkState";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../../api/reservation";
import CommonSwiper from "../../../components/CommonSwiper";
import SectionDivider from "../../../components/SectionDivider";

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const { isBookmarked, bookmarkData } = useBookmarkState();
  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation();
  const { data: store } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId),
    select: (data) => data.response,
  });

  const handleBookmarkButton = async () => {
    try {
      if (!isBookmarked) {
        await createBookmarkMutate.mutate(storeId);
      } else {
        await deleteBookmarkMutate.mutate(bookmarkData.bookmarkId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-5 w-full min-h-screen-dvh mb-[124px]">
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
            <img
              className="w-[52px] h-[52px] rounded-[100%] bg-black-60"
              src={store?.profileImage.imageUrl}
              alt="학과 대표 이미지"
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
              18:00 - 24:00
            </p>
          </div>
          <h2 className="mb-10 text-16-regular text-black-80">
            {store?.description}
          </h2>
          <button
            onClick={() =>
              navigate(`/store/${storeId}/notice`, { state: store?.notice })
            }
            className="flex justify-between items-center py-3.5 px-4 bg-black-15 rounded-[10px]"
          >
            <div className="flex gap-1.5 min-w-0">
              <p className="text-[14px] font-bold text-black-50 shrink-0">
                공지
              </p>
              <h1 className="text-14-medium text-black-70 overflow-hidden text-ellipsis line-clamp-1">
                입장 시 신분증 검사 필수
              </h1>
            </div>
            <Arrow className="shrink-0" fill="#AAAAAA" />
          </button>
        </section>
        <SectionDivider />
        {/* 주점 메뉴 리스트 */}
        <MenuList storeId={storeId} mode="store" />
      </div>
      <PageFooterButton className="gap-2">
        <Button
          className="border"
          backgroundColor="white"
          borderColor="#ececec"
          buttonType="icon"
          onClick={handleBookmarkButton}
        >
          <BookmarkIcon />
        </Button>
        {store?.isActive ? (
          <Button
            disabled={true}
          >
            지금은 대기할 수 없어요
          </Button>
        ) : (
          <Button
            disabled={store?.isWaiting}
            onClick={() => navigate(`/store/${storeId}/partysize`)}
          >
            {store?.isWaiting ? "대기하기" : "대기 중이에요"}
          </Button>
        )}
      </PageFooterButton>
    </div>
  );
};

export default StoreDetailPage;
