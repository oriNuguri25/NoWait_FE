import BookmarkIcon from "../../storeDetail/components/BookmarkIcon";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";
import DepartmentImage from "../../../../components/DepartmentImage";
import defaultMenuImageLg from "../../../../assets/default-menu-image-lg.png"

interface BannerImages {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: number;
}

interface ProfileImage {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: number;
}

interface PropsType {
  id: number;
  bannerImages: BannerImages[];
  waitingCount: number;
  ProfileImage: ProfileImage;
  name: string;
  departmentName: string;
  storeId: string;
}

const BookmarkedStoreItem = ({
  id,
  bannerImages,
  waitingCount,
  ProfileImage,
  name,
  departmentName,
  storeId,
}: PropsType) => {
  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation();
  const { isBookmarked, bookmarkData } = useBookmarkState(storeId);
  console.log(bookmarkData, "북마크데이터 1");
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
          className="w-full h-[195px] rounded-[14px] overflow-hidden object-cover"
          src={bannerImages[0]?.imageUrl || defaultMenuImageLg}
          alt="북마크한 주점 메인 이미지"
        />
        {waitingCount !== 0 && (
          <p className="absolute top-[12px] right-[12px] text-primary bg-[#ffe9df] px-2 py-[7px] font-bold text-[12px] rounded-[6px]">
            {waitingCount}
          </p>
        )}
      </div>
      <div className="flex items-start justify-between py-3">
        <div className="flex items-center gap-2.5">
          <DepartmentImage
            width="40px"
            height="40px"
            src={ProfileImage?.imageUrl}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-title-16-bold text-black-90">{name}</h1>
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
