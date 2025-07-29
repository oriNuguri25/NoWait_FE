import BookmarkIcon from "../../storeDetail/components/BookmarkIcon";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";

interface PropsType {
  id: number;
  image: string;
  waitingCount: string;
  storeName: string;
  departmentName: string;
  storeId: string;
}

const BookmarkedStoreItem = ({
  id,
  image,
  waitingCount,
  storeName,
  departmentName,
  storeId,
}: PropsType) => {
  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation();
  const { isBookmarked, bookmarkData } = useBookmarkState(storeId);

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
    <li key={id} className="mb-6">
      <div className="relative top-0 right-0">
        <img
          className="w-full object-cover"
          src={image}
          alt="북마크한 주점 메인 이미지"
        ></img>
        <p className="absolute top-[12px] right-[12px] text-primary bg-[#ffe9df] px-2 py-[7px] font-bold text-[12px] rounded-[6px]">
          {waitingCount}
        </p>
      </div>
      <div className="flex items-start justify-between py-3">
        <div className="flex items-center gap-2.5">
          <img
            className="w-[40px] h-[40px] object-cover rounded-full bg-black-40"
            src=""
            alt="학과 메인 이미지"
          ></img>
          <div className="flex flex-col justify-between">
            <h1 className="text-title-16-bold text-black-90">{storeName}</h1>
            <h2 className="text-14-regular text-black-70">{departmentName}</h2>
          </div>
        </div>
        <button className="mr-[5px]" onClick={handleBookmarkButton}>
          <BookmarkIcon />
        </button>
      </div>
    </li>
  );
};

export default BookmarkedStoreItem;
