// hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import userApi from "../utils/UserApi";

const postLogin = (data: { email: string; password: string }) => {
  return userApi.post(`/admin/users/login`, data);
};

export const usePostLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
