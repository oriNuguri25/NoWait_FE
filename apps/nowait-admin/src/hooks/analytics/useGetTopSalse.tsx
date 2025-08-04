import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface TopSalesItem {
  currentRank: number;
  delta: number;
  departmentId: number;
  departmentName: string;
  orderCount: number;
  profileUrl: string;
  storeId: number;
  storeName: string;
  totalSales: number;
}

interface TopSalesResponse {
  success: boolean;
  response: TopSalesItem[];
}

const fetchTopSales = async (): Promise<TopSalesItem[]> => {
  const res = await AdminApi.get<TopSalesResponse>(
    "/admin/statistics/top-sales"
  );
  return res.data.response;
};

export const useGetTopSales = () => {
  return useQuery({
    queryKey: ["top-sales"],
    queryFn: fetchTopSales,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
