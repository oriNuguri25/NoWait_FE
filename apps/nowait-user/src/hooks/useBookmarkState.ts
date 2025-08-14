import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "../api/reservation";

export const useBookmarkState = (storeId?: number) => {
  const { data: isBookmarked, isLoading } = useQuery({
    queryKey: ["bookmark", storeId],
    queryFn: async () => {
      const res = await getBookmark();
      return res.response.some((bookmark) => {
        return bookmark.storeId === storeId;
      });
    },
  });

  return {
    isBookmarked: Boolean(isBookmarked),
    isLoading,
  };
};
