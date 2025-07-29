import BookMark from "../../../../assets/icon/bookmark.svg?react";
import FullfieldBookmark from "../../../../assets/icon/fullfieldBookmark.svg?react";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";

const BookmarkIcon = () => {
  const { isBookmarked } = useBookmarkState();
  console.log(isBookmarked,"여기")
  return !isBookmarked ? <FullfieldBookmark /> : <BookMark />;
};

export default BookmarkIcon;
