interface SalesCardProps {
  title: string; // 예: "오늘 매출" 또는 "누적 매출"
  date: string;
  amount: number;
  diffAmount: number;
  percent: number;
}

const SalesCard: React.FC<SalesCardProps> = ({
  title,
  date,
  amount,
  diffAmount,
  percent,
}) => (
  <div className="bg-white rounded-[12px] p-6 shadow-sm w-full h-full flex flex-col justify-between">
    <div>
      <p className="text-title-18-bold text-navy-80">{title}</p>
      <p className="text-13-regular text-black-60 mt-1">{date}</p>
    </div>
    <div>
      <div className="flex items-baseline gap-2">
        <p className="text-headline-22-bold text-navy-80">
          {amount.toLocaleString()}원
        </p>
        <span className="text-14-regular text-primary">+{percent}%</span>
      </div>
      <p className="text-13-regular text-black-80 mt-1">
        어제보다 {diffAmount.toLocaleString()}원 더 벌었어요!
      </p>
    </div>
  </div>
);
export default SalesCard;
