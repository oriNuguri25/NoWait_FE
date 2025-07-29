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
}

// fakeData
const boothData: BoothRanking[] = [
  {
    rank: 1,
    name: "불타는닭발부스",
    department: "컴퓨터공학과",
    salesCount: 52,
    rankChange: 1,
    isCurrentBooth: false,
  },
  {
    rank: 2,
    name: "하이볼의집",
    department: "식품영양학과",
    salesCount: 52,
    rankChange: -1,
    isCurrentBooth: false,
  },
  {
    rank: 3,
    name: "치즈폭탄존",
    department: "관광경영학과",
    salesCount: 52,
    rankChange: 0,
    isCurrentBooth: false,
  },
  {
    rank: 4,
    name: "치킨사교클럽",
    department: "치위생학과",
    salesCount: 52,
    rankChange: 3,
    isCurrentBooth: false,
  },
  {
    rank: 27,
    name: "스페이시스",
    department: "경찰행정학과",
    salesCount: 52,
    rankChange: 3,
    isCurrentBooth: true,
  },
];

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

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <HeaderStatus sales={sales} popularMenu={popularMenu} />
      <BoothSalesRankingCard
        date={formatted}
        data={boothRank?.length === 0 ? boothData : boothRank ?? []}
      />
    </div>
  );
};

export default AdminAnalytics;
