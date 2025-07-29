import HomeHeader from "../../../components/Header";
import { useBookmarkState } from "../../../hooks/useBookmarkState";
import type { StoreType } from "../../../types/wait/store";
import BookmarkedStoreItem from "./components/BookmarkedStoreItem";

const BookmarkPage = () => {
  const { bookmarkData } = useBookmarkState();
  console.log(bookmarkData);
  return (
    <div>
      <div className="px-5">
        <HomeHeader />
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        <ul>
          {bookmarkData?.map((data: StoreType) => {
            return (
              <BookmarkedStoreItem
                key={data.name}
                id={data.id}
                bannerImages={data.bannerImages}
                waitingCount={data.waitingCount}
                profileImage={data.profileImage}
                name={data.name}
                departmentName={data.departmentName}
                storeId={data.storeId}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
