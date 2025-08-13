import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface SalesData {
  storeId: number;
  date: string;
  todaySalesSum: number;
  yesterdaySalesSum: number;
  cumulativeSalesBeforeYesterday: number;
  ObjectallZero: boolean;
}

interface SalesResponse {
  success: boolean;
  response: SalesData | string;
}
const fetchSalesByDate = async (
  date: string
): Promise<SalesData | undefined> => {
  const res = await AdminApi.get<SalesResponse>(`/admin/statistics/sales`, {
    params: { date },
  });
  const response = res.data.response;

  return typeof response === "string" ? undefined : response;
};

export const useGetSalesByDate = (date: string) => {
  return useQuery({
    queryKey: ["sales-by-date", date],
    queryFn: () => fetchSalesByDate(date),
    enabled: !!date, // 날짜 있을 때만 실행
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
