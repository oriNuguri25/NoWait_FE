import { useGetPopularMenu } from "../../hooks/analytics/useGetPopularMenu";
import { useGetSalesByDate } from "../../hooks/analytics/useGetSalesByDate";
import { useGetTopSales } from "../../hooks/analytics/useGetTopSalse";
import BoothSalesRankingCard from "./components/BoothSalesRankingCard ";
import HeaderStatus from "./components/HeaderStatus";

interface BoothRanking {
  rank: number;
  name: string;
  department: string;
  salesCount: number;
  rankChange: number;
  isCurrentBooth?: boolean;
  profileImageUrl: string;
}

const AdminAnalytics = () => {
  const today = new Date();
  const formatted = today.toISOString().slice(0, 10);
  const { data: boothRank } = useGetTopSales();
  const { data: sales } = useGetSalesByDate(formatted);
  const { data: popularMenu } = useGetPopularMenu();
  console.log(boothRank, "부스별 판매순위");
  console.log(sales, "판매량");
  console.log(popularMenu, "인기 메뉴");
  if (typeof sales === "string") {
    return <p>매출 데이터가 없습니다.</p>;
  }

  const boothRankingData: BoothRanking[] =
    boothRank && boothRank.length > 0
      ? boothRank.map((item) => ({
          rank: item.currentRank, // currentRank → rank
          name: item.storeName, // storeName → name
          department: item.departmentName, // departmentName → department
          salesCount: item.orderCount, // orderCount → salesCount
          rankChange: item.delta, // delta → rankChange
          isCurrentBooth: 1 == item.storeId, // 필요 시 조건 넣어 true/false 처리
          profileImageUrl: item.profileUrl,
        }))
      : [];

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <HeaderStatus sales={sales} popularMenu={popularMenu} />
      <BoothSalesRankingCard
        date={formatted}
        data={boothRankingData}
        disabled={boothRank?.length === 0}
      />
    </div>
  );
};

export default AdminAnalytics;
