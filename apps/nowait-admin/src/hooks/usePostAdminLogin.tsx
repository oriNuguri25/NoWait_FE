// hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import adminApi from "../utils/AdminApi";

const postLogin = (data: { email: string; password: string }) => {
  return adminApi.post(`/admin/users/login`, data);
};

export const usePostLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
