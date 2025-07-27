import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

export const getStoreMenus = async (storeId: string | undefined | null) => {
  const res = await axios.get(
    `${API_URI}/v1/menus/all-menus/stores/${storeId}`
  );
  return res.data;
};
