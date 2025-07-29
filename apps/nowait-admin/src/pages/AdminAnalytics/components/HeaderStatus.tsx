import SalesCard from "./SalesCard";
import TotalSalesCard from "./TotalSalesCard";

interface HeaderStatusProps {
  sales?: {
    storeId: number;
    date: string;
    todaySalesSum: number;
    yesterdaySalesSum: number;
    cumulativeSalesBeforeYesterday: number;
    ObjectallZero: boolean;
  };
  popularMenu?: {
    menuId: number;
    menuName: string;
    soldCount: number;
  }[];
}

const HeaderStatus: React.FC<HeaderStatusProps> = ({ sales, popularMenu }) => {
  const todayAmount = sales?.todaySalesSum ?? 0;
  const yesterdayAmount = sales?.yesterdaySalesSum ?? 0;
  const diffAmount = todayAmount - yesterdayAmount;
  const percent = yesterdayAmount
    ? parseFloat(((diffAmount / yesterdayAmount) * 100).toFixed(1))
    : 0;

  const todayDate = sales?.date ?? "오늘";
  const yesterdayDate = "어제";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] w-[754px] h-[50%]">
      <div className="flex flex-col gap-[10px]">
        <SalesCard
          today={{
            date: todayDate,
            amount: todayAmount,
            diffAmount,
            percent,
          }}
          previous={{
            date: yesterdayDate,
            amount: yesterdayAmount,
          }}
        />

        <TotalSalesCard
          title="누적매출"
          date={`${todayDate} 기준`}
          amount={(sales?.cumulativeSalesBeforeYesterday ?? 0) + todayAmount}
          percent={percent}
        />
      </div>

      <div className="flex flex-col bg-white rounded-xl p-6">
        <div className="flex flex-col mb-[25px]">
          <p className="text-title-18-bold text-navy-80">인기 메뉴 TOP 5</p>
          <span className="text-13-regular text-black-60">{todayDate}</span>
        </div>
        <ul>
          {(popularMenu ?? []).slice(0, 5).map((menu, i) => (
            <li key={menu.menuId} className="flex justify-between h-[52px]">
              <span className="flex text-16-bold gap-[10px]">
                {i + 1} <p className="text-16-semibold">{menu.menuName}</p>
              </span>
              <span className="text-16-medium">{menu.soldCount}개</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default HeaderStatus;
