import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookmark } from "../api/reservation";

interface BookmarkType {
  bookmarkId: string;
  userId: string;
  storeId: string;
}

export const useBookmarkState = (storeId?: string) => {
  const { id: paramId } = useParams();
  console.log(paramId)
  const id = storeId ?? paramId;

  const { data, isLoading } = useQuery({
    queryKey: ["bookmark", id],
    queryFn: getBookmark,
    select: (data) =>
      data.response.find(
        (bookmark: BookmarkType) => String(bookmark.storeId) === id
      ),
  });
  console.log(data)
  return {
    isBookmarked: data !== undefined,
    bookmarkData: data,
    isLoading,
  };
};
