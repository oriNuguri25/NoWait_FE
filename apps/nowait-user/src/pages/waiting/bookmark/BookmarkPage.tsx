import HomeHeader from "../../../components/Header";
import BookmarkedStoreItem from "./components/BookmarkedStoreItem";

const dummyData = [
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "바이오메카트로닉스공학과",
    storeId: "1",
  },
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    storeName: "스페이시스",
    lesson: "약과",
    storeId: "2",
  },
];

const BookmarkPage = () => {
  return (
    <div>
      <div className="px-5">
        <HomeHeader />
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        <ul>
          {dummyData.map((data) => {
            return (
              <BookmarkedStoreItem
                key={data.id}
                id={data.id}
                image={data.image}
                wait={data.wait}
                storeName={data.storeName}
                lesson={data.lesson}
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
