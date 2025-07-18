import { Button } from "@repo/ui";
import BookMark from "../../../../assets/icon/bookmark.svg?react";
import FullfieldBookmark from "../../../../assets/icon/fullfieldBookmark.svg?react";
import { useParams } from "react-router-dom";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";
import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "../../../../api/reservation";

interface BookmarkType {
  bookmarkId: string;
  userId: string;
  storeId: string;
}

const IsBookmark = () => {
  const { id } = useParams();

  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation();
  const { data: isBookmark } = useQuery({
    queryKey: ["bookmark", id],
    queryFn: getBookmark,
    select: (data) =>
      data.response.find(
        (bookmark: BookmarkType) => String(bookmark.storeId) === id
      ),
  });

  const handleBookmarkButton = async () => {
    try {
      if (isBookmark === undefined) {
        await createBookmarkMutate.mutate(id);
      } else {
        await deleteBookmarkMutate.mutate(isBookmark.bookmarkId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className="border"
      backgroundColor="white"
      borderColor="#ececec"
      buttonType="icon"
      onClick={handleBookmarkButton}
    >
      {isBookmark !== undefined ? <FullfieldBookmark /> : <BookMark />}
    </Button>
  );
};

export default IsBookmark;
