import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookmark } from "../api/reservation";

interface BookmarkType {
  // bookmarkId: string;
  // userId: string;
  storeId: string;
  waitingCount: number;
  departmentId: number;
  departmentName: string;
  name: string;
  location: string;
  description: string;
  profileImage: string | null;
  bannerImages: string[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

export const useBookmarkState = (storeId?: string) => {
  const { id: paramId } = useParams();
  console.log(paramId);
  const id = storeId ?? paramId;
  console.log(id)
  const { data, isLoading } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmark,
    select : (data) => data.response
    // select: (data) =>
    //   data.response.find(
    //     (bookmark: BookmarkType) => String(bookmark.storeId) === id
    //   ),
  });
  console.log(data,"북마크 데이터")
  const isBookmarked = data?.response?.find(
        (bookmark: BookmarkType) => String(bookmark.storeId) === id
      )
      console.log(isBookmarked,"이즈북마크드드드드드드드드")
  return {
    isBookmarked: isBookmarked !== undefined,
    bookmarkData: data,
    isLoading,
  };
};
