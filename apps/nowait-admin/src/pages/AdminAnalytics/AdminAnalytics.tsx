import { useGetPopularMenu } from "../../hooks/analytics/useGetPopularMenu";
import { useGetSalesByDate } from "../../hooks/analytics/useGetSalesByDate";
import { useGetTopSales } from "../../hooks/analytics/useGetTopSalse";
import { useWindowWidth } from "../../hooks/useWindowWidth";
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
  const width = useWindowWidth();
  const isTablet = width >= 768;
  const { data: boothRank } = useGetTopSales();
  const { data: sales } = useGetSalesByDate(formatted);
  const { data: popularMenu } = useGetPopularMenu();
  console.log(boothRank, "부스별 판매순위");
  console.log(sales, formatted, "판매량");

  console.log(popularMenu, "인기 메뉴");
  const boothDisabled = boothRank?.length === 0;
  const storeId = localStorage.getItem("storeId");
  const saleDisabled =
    typeof sales === "string" ||
    sales === undefined ||
    (sales?.todaySalesSum === 0 && sales?.yesterdaySalesSum === 0);
  const poupularMenuDisabled = popularMenu?.length === 0;

  const boothRankingData: BoothRanking[] =
    boothRank && boothRank.length > 0
      ? boothRank.map((item) => ({
          rank: item.currentRank,
          name: item.storeName,
          department: item.departmentName,
          salesCount: item.orderCount,
          rankChange: item.delta,
          isCurrentBooth: storeId == item.storeId.toString(),
          profileImageUrl: item.profileUrl,
        }))
      : [];

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <HeaderStatus
        isTablet={isTablet}
        sales={sales}
        popularMenu={popularMenu}
        saleDisabled={saleDisabled}
        poupularMenuDisabled={poupularMenuDisabled}
      />
      <BoothSalesRankingCard
        isTablet={isTablet}
        date={formatted}
        data={boothRankingData}
        disabled={boothDisabled}
      />
    </div>
  );
};

export default AdminAnalytics;
