import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "../../api/reservation";

export const useBookmarkMutation = (
  { withInvalidate = true } = {},
  storeId?: number
) => {
  const queryClient = useQueryClient();
  const bookmarkKey = ["bookmark", storeId];

  const createBookmarkMutate = useMutation({
    mutationFn: async () => {
      const controller = new AbortController();
      console.log(controller);
      return createBookmark(storeId!, controller.signal);
    },
    onMutate: async () => {
      console.log("onMutate 실행", Date.now());
      await queryClient.cancelQueries({ queryKey: bookmarkKey });

      const prevData = queryClient.getQueryData<boolean>(bookmarkKey);

      // 낙관적 업데이트: true (북마크됨)
      queryClient.setQueryData(bookmarkKey, true);

      return { prevData };
    },
    onError: (_err, _vars, context) => {
      // 실패 시 이전 값으로 롤백
      console.log("onError 발생, 롤백!", context?.prevData);
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(bookmarkKey, context.prevData);
      }
    },
    onSettled: () => {
      if (withInvalidate) {
        queryClient.invalidateQueries({ queryKey: bookmarkKey });
      }
    },
  });

  const deleteBookmarkMutate = useMutation({
    mutationFn: async () => {
      const controller = new AbortController();
      return deleteBookmark(storeId!, controller.signal);
    },
    onMutate: async () => {
      console.log("onMutate 삭제", Date.now());
      await queryClient.cancelQueries({ queryKey: bookmarkKey });

      const prevData = queryClient.getQueryData<boolean>(bookmarkKey);

      // 낙관적 업데이트: false (북마크 해제)
      queryClient.setQueryData(bookmarkKey, false);

      return { prevData };
    },
    onError: (_err, _vars, context) => {
      console.log("onError 발생, 롤백!", context?.prevData);
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(bookmarkKey, context.prevData);
      }
    },
    onSettled: () => {
      if (withInvalidate) {
        queryClient.invalidateQueries({ queryKey: bookmarkKey });
      }
    },
  });

  return { createBookmarkMutate, deleteBookmarkMutate };
};
