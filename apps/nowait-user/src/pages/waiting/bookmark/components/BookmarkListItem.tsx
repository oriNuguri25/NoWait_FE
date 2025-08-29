import BookmarkIcon from "../../../../components/common/BookmarkIcon";
import DepartmentImage from "../../../../components/DepartmentImage";
import defaultMenuImageLg from "../../../../assets/default-image-lg.png";
import { useState } from "react";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";
import { Link } from "react-router-dom";

interface PropsType {
  bookmarkId?: number;
  bannerImages?: string;
  waitingCount: number;
  profileImage?: string;
  name: string;
  departmentName: string;
  storeId: number;
  publicCode:string;
}

const BookmarkListItem = ({
  bannerImages,
  waitingCount,
  profileImage,
  name,
  departmentName,
  storeId,
  publicCode
}: PropsType) => {
  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation(
    {
      withInvalidate: false,
    },
    Number(storeId)
  );

  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmarkButton = async () => {
    try {
      if (isBookmarked) {
        await deleteBookmarkMutate.mutate();
        setIsBookmarked(false);
      } else {
        await createBookmarkMutate.mutate();
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="mb-6">
      <div className="relative top-0 right-0">
        <Link to={`/store/${publicCode}`}>
          <img
            className="w-full h-[195px] rounded-[14px] overflow-hidden object-cover"
            src={bannerImages || defaultMenuImageLg}
            alt="북마크한 주점 메인 이미지"
          />
          {waitingCount !== 0 && (
            <p className="absolute top-[12px] right-[12px] text-primary bg-[#ffe9df] px-2 py-[7px] font-bold text-[12px] rounded-[6px]">
              대기 {waitingCount}팀
            </p>
          )}
        </Link>
      </div>
      <div className="flex items-start justify-between py-3">
        <div>
          <Link to={`/store/${publicCode}`} className="flex items-center gap-2.5">
            <DepartmentImage width="40px" height="40px" src={profileImage} />
            <div className="flex flex-col justify-between">
              <h1 className="text-title-16-bold text-black-90">{name}</h1>
              <h2 className="text-14-regular text-black-70">
                {departmentName}
              </h2>
            </div>
          </Link>
        </div>
        <button className="mr-[5px]" onClick={handleBookmarkButton}>
          <BookmarkIcon isBookmarked={isBookmarked} />
        </button>
      </div>
    </li>
  );
};

export default BookmarkListItem;
