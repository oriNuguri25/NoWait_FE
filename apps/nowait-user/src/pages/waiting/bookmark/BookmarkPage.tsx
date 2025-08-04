import HomeHeader from "../../../components/Header";
import { useBookmarkState } from "../../../hooks/useBookmarkState";
import type { BookmarkListType } from "../../../types/wait/store";
import BookmarkedStoreItem from "./components/BookmarkedStoreItem";
import BookmarkEmptyPage from "./components/BookmarkEmptyPage";

const BookmarkPage = () => {
  const { bookmarkList } = useBookmarkState();

  return (
    <div>
      <div className="px-5">
        <HomeHeader />
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        {!bookmarkList || bookmarkList?.length < 1 ? (
          <BookmarkEmptyPage />
        ) : (
          <ul>
            {bookmarkList?.map((data: BookmarkListType) => {
              return (
                <BookmarkedStoreItem
                  key={data.bookmarkId}
                  bookmarkId={data.bookmarkId}
                  bannerImages={data.bannerImages[0].imageUrl}
                  waitingCount={data.waitingCount}
                  profileImage={data.profileImage.imageUrl}
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
