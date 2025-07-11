interface PaymentCardProps {
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
}

const PaymentCard = ({
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
}: PaymentCardProps) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row items-center">
        <div className="flex rounded-full bg-navy-50 w-9 h-9 items-center justify-center text-title-18-semibold text-white-100">
          {tableNumber}
        </div>

        <div className="flex flex-col ml-2.5">
          <div className="flex text-14-medium text-black-60">{timeText}</div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex text-16-semibold text-black-80">
              {depositorName}
            </div>
            <div className="flex w-[1.5px] bg-[#D5D5D5] h-3.5" />
            <div className="flex text-16-semibold text-black-80">
              {totalAmount.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex px-2.5 py-1.25 bg-black-20 rounded-lg text-14-semibold text-black-70">
          입금 확인
        </div>
      </div>
    </div>
  );
};

interface CookCardProps {
  tableNumber: number;
  menuNamesAndQuantities?: Record<string, number>;
}

const CookCard = ({ tableNumber, menuNamesAndQuantities }: CookCardProps) => {
  const menuEntries = menuNamesAndQuantities
    ? Object.entries(menuNamesAndQuantities)
    : [];
  const isOneMenu = menuEntries.length === 1;

  return (
    <div
      className={`flex flex-row gap-2.5 w-full ${
        isOneMenu ? "items-center" : "items-start"
      }`}
    >
      <div
        className={`flex flex-[0.6] ${
          isOneMenu ? "items-center" : "items-start"
        }`}
      >
        <div className="flex rounded-full bg-navy-50 w-9 h-9 items-center justify-center text-title-18-semibold text-white-100">
          {tableNumber}
        </div>
      </div>

      <div
        className={`flex flex-col gap-2.5 flex-[2.5] ${
          isOneMenu ? "justify-center" : ""
        }`}
      >
        {menuEntries.map(([menuName, quantity], index) => (
          <div key={index} className="flex flex-row gap-2.5">
            <div className="text-16-semibold text-left text-black-80 truncate overflow-hidden whitespace-nowrap flex-1 min-w-0 max-w-[170px] lg:max-w-[170px] md:max-w-[140px] sm:max-w-[100px] [@media(max-width:480px)]:max-w-[80px]">
              {menuName}
            </div>
            <div className="text-16-medium text-black-80 text-center flex-[0.2] flex-shrink-0">
              {quantity}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`flex flex-[1] justify-end ${
          isOneMenu ? "items-center" : ""
        }`}
      >
        <div className="flex px-2.5 py-1.25 bg-black-20 rounded-lg text-14-semibold text-black-70 flex-shrink-0 whitespace-nowrap">
          조리 완료
        </div>
      </div>
    </div>
  );
};

interface CookedCardProps {
  tableNumber: number;
  depositorName: string;
  menuNamesAndQuantities?: Record<string, number>;
  totalAmount: number;
  createdAt: string;
}

const CookedCard = ({
  tableNumber,
  depositorName,
  menuNamesAndQuantities,
  totalAmount,
  createdAt,
}: CookedCardProps) => {
  // 첫 번째 메뉴 이름과 나머지 메뉴 개수 계산
  const menuEntries = menuNamesAndQuantities
    ? Object.entries(menuNamesAndQuantities)
    : [];
  const firstMenuName = menuEntries[0]?.[0] || "";
  const remainingMenuCount = menuEntries.length - 1;
  const menuDisplayText =
    menuEntries.length > 1
      ? `${firstMenuName} 외 ${remainingMenuCount}개`
      : firstMenuName;

  return (
    <div className="flex flex-row gap-2.5 px-5 py-4 border-b border-black-20 items-center">
      <div className="flex flex-[0.7] text-16-regular text-black-70">
        {tableNumber}번
      </div>
      <div className="flex flex-[1] text-16-regular text-black-70">
        {depositorName}
      </div>
      <div className="flex flex-[2.5] text-16-regular text-black-70 truncate overflow-hidden whitespace-nowrap">
        {menuDisplayText}
      </div>
      <div className="flex flex-[1.5] text-16-regular text-black-70">
        {totalAmount.toLocaleString()}원
      </div>
      <div className="flex flex-[1.5] text-16-regular text-black-70">
        {createdAt}
      </div>
      <div className="flex-1 flex justify-end">
        <div className="rounded-lg border border-black-30 px-2.5 py-1.25 text-14-semibold text-black-70 flex-shrink-0">
          주문 복구
        </div>
      </div>
    </div>
  );
};

export { PaymentCard, CookCard, CookedCard };
