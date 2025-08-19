import HomeHeader from "../../../components/Header";
import type { BookmarkListType } from "../../../types/wait/store";
import BookmarkEmptyPage from "./components/BookmarkEmptyPage";
import StoreListItem from "../../../components/common/StoreListItem";
import { getBookmark } from "../../../api/reservation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const BookmarkPage = () => {
  const { id: storeId } = useParams();
  const { data: bookmarkList, isLoading } = useQuery({
    queryKey: ["bookmark", storeId],
    queryFn: getBookmark,
    select: (data) => data.response,
  });
  if(isLoading) return <div>로딩중....</div>
  return (
    <div>
      <HomeHeader />
      <div className="px-5">
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        {!bookmarkList || bookmarkList?.length < 1 ? (
          <BookmarkEmptyPage />
        ) : (
          <ul>
            {bookmarkList?.map((data: BookmarkListType) => {
              return (
                <StoreListItem
                  key={data.bookmarkId}
                  bookmarkId={data.bookmarkId}
                  bannerImages={data.bannerImages[0]?.imageUrl}
                  waitingCount={data.waitingCount}
                  profileImage={data.profileImage?.imageUrl}
                  name={data.name}
                  departmentName={data.departmentName}
                  storeId={data.storeId}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
