import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBookmark,
  deleteBookmark,
} from "../../api/reservation";

export const useBookmarkMutation = () => {
  const queryclient = useQueryClient();
  const onSuccess = () => {
    queryclient.invalidateQueries({ queryKey: ["bookmark"] });
  };
  const createBookmarkMutate = useMutation({
    mutationFn: createBookmark,
    onSuccess: onSuccess,
  });

  const deleteBookmarkMutate = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: onSuccess,
  });
  return { createBookmarkMutate, deleteBookmarkMutate };
};
