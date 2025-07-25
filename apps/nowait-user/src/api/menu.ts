import axios from "axios";
import UserApi from "../utils/UserApi";

export const getStoreMenus = async (storeId: string | undefined) => {
  try {
      const res = await UserApi.get(`/v1/menus/all-menus/stores/${storeId}`);
  return res.data;
  } catch (error) {
    console.log(error)
  }

};
