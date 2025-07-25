import axios from "axios";

export const getStoreMenus = async (storeId: string | undefined) => {
  const res = await axios.get(`/v1/menus/all-menus/stores/${storeId}`);
  return res.data;
};
