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

import { useWindowWidth } from "../../hooks/useWindowWidth";

interface CookCardProps {
  tableNumber: number;
  menuNamesAndQuantities?: Record<string, number>;
}

const CookCard = ({ tableNumber, menuNamesAndQuantities }: CookCardProps) => {
  const windowWidth = useWindowWidth();
  const menuEntries = menuNamesAndQuantities
    ? Object.entries(menuNamesAndQuantities)
    : [];
  const isOneMenu = menuEntries.length === 1;

  return (
    <div
      className={`flex flex-row w-full ${
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
        {menuEntries.map(([menuName, quantity], index) => {
          // 화면 크기에 따른 글자 수 제한
          const getDisplayText = (text: string) => {
            // xl: 전체 표시, lg: 12글자, md: 7글자, sm: 6글자, xs: 4글자
            if (windowWidth >= 1280) {
              return text; // 전체 화면에서는 모든 글자 표시
            } else if (windowWidth >= 1024) {
              return text.length > 12 ? `${text.slice(0, 12)}...` : text;
            } else if (windowWidth >= 768) {
              return text.length > 7 ? `${text.slice(0, 7)}...` : text;
            } else if (windowWidth >= 640) {
              return text.length > 6 ? `${text.slice(0, 6)}...` : text;
            } else {
              return text.length > 4 ? `${text.slice(0, 4)}...` : text;
            }
          };

          const isLargeScreen = windowWidth >= 1280;

          return (
            <div key={index} className="flex flex-row gap-2.5">
              <div
                className={`text-16-semibold text-left text-black-80 flex-[8] min-w-0 ${
                  isLargeScreen
                    ? ""
                    : "truncate overflow-hidden whitespace-nowrap"
                }`}
              >
                {getDisplayText(menuName)}
              </div>
              <div className="text-16-medium text-black-80 text-center flex-[2] flex-shrink-0">
                {quantity}
              </div>
            </div>
          );
        })}
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
