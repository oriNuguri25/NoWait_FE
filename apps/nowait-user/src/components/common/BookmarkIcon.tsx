import BookMark from "../../assets/icon/bookmark.svg?react";
import FullfieldBookmark from "../../assets/icon/fullfieldBookmark.svg?react";

interface PropsType {
  isBookmarked: boolean;
}
const BookmarkIcon = ({ isBookmarked }: PropsType) => {
  return isBookmarked ? <FullfieldBookmark /> : <BookMark />;
};

export default BookmarkIcon;
