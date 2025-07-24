import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface TopSalesItem {
  rank: number;
  name: string;
  department: string;
  salesCount: number;
  isCurrentBooth: boolean;
  rankChange: number;
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
