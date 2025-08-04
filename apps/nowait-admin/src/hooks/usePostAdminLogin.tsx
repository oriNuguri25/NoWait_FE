import { useMutation } from "@tanstack/react-query";
import AdminApi from "../utils/AdminApi";

const postLogin = (data: { email: string; password: string }) => {
  return AdminApi.post("/admin/users/login", data);
};

export const usePostLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
