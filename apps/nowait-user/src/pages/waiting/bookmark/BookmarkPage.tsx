import HomeHeader from "../../../components/Header";
import { useBookmarkState } from "../../../hooks/useBookmarkState";
import BookmarkedStoreItem from "./components/BookmarkedStoreItem";

const dummyData = [
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    waitingCount: "대기 0팀",
    storeName: "스페이시스",
    departmentName: "바이오메카트로닉스공학과",
    storeId: "1",
  },
  {
    id: 2,
    image: "/bookmarkStoreImage.png",
    waitingCount: "대기 0팀",
    storeName: "스페이시스",
    departmentName: "약과",
    storeId: "2",
  },
];

const BookmarkPage = () => {
  const {bookmarkData} = useBookmarkState()
  return (
    <div>
      <div className="px-5">
        <HomeHeader />
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        <ul>
          {bookmarkData?.map((data:any) => {
            return (
              <BookmarkedStoreItem
                key={data.id}
                id={data.id}
                image={data.image}
                waitingCount={data.waitingCount}
                storeName={data.storeName}
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
