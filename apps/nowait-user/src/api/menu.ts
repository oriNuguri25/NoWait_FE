import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

//주점에 해당하는 모든 메뉴 조회
export const getStoreMenus = async (storeId: string | undefined) => {
  try {
      const res = await axios.get(`${API_URI}/v1/menus/all-menus/stores/${storeId}`);
  return res.data;
  } catch (error) {
    console.log(error)
  }

};
