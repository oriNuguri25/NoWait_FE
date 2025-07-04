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
  return (
    <div className="w-full">
      <HeaderStatus />
      <BoothSalesRankingCard date="2025.07.18 금" data={boothData} />
    </div>
  );
};

export default AdminAnalytics;
