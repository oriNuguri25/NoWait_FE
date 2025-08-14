import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "../../api/reservation";

export const useBookmarkMutation = (
  { withInvalidate = true } = {},
  storeId?: number
) => {
  const queryClient = useQueryClient();

  const createBookmarkMutate = useMutation({
    mutationFn: () => {
      const controller = new AbortController();
      return createBookmark(storeId!, controller.signal);
    },
    onMutate: async () => {
      console.log("----------------------실행");
      await queryClient.cancelQueries({ queryKey: ["bookmark", storeId] });
      const prevData = queryClient.getQueryData(["bookmark", storeId]) || [];
      if (prevData && storeId) {
        queryClient.setQueryData(["bookmark", storeId], prevData);
      }

      return { prevData };
    },
    // 실패 시 이전 데이터로 복구
    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["bookmark", storeId], context.prevData);
      }
    },
    // 성공 실패 여부에 상관없이 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark", storeId] });
    },
  });

  const deleteBookmarkMutate = useMutation({
    mutationFn: () => {
      const controller = new AbortController();
      return deleteBookmark(storeId!, controller.signal);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["bookmark", storeId] });
      const prevData = queryClient.getQueryData(["bookmark"]);

      if (prevData && storeId) {
        queryClient.setQueryData(["bookmark", storeId], prevData);
      }

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["bookmark", storeId], context.prevData);
      }
    },
    onSettled: () => {
      if (withInvalidate) {
        queryClient.invalidateQueries({ queryKey: ["bookmark", storeId] });
      }
    },
  });
  return { createBookmarkMutate, deleteBookmarkMutate };
};
