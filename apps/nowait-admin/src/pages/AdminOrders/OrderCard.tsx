import ArrowRight from "../../assets/arrow_back.svg?react";
import { useState } from "react";
import { PaymentCheckModal, CookedModal } from "./OrderPageModal";
import type { MenuNamesAndQuantities } from "../../types/order";

interface PaymentCardProps {
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
  onClick?: () => void;
}

const PaymentCard = ({
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
  onClick,
}: PaymentCardProps) => {
  const [showPaymentCheckModal, setShowPaymentCheckModal] = useState(false);

  const handlePaymentCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 onClick 이벤트 방지
    setShowPaymentCheckModal(true);
  };

  const handleClosePaymentCheckModal = () => {
    setShowPaymentCheckModal(false);
  };

  return (
    <>
      <div
        className="flex flex-row justify-between items-center w-full cursor-pointer"
        onClick={onClick}
      >
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
          <div
            className="flex px-2.5 py-1.25 bg-black-20 rounded-lg text-14-semibold text-black-70 cursor-pointer hover:bg-black-30"
            onClick={handlePaymentCheckClick}
          >
            입금 확인
          </div>
        </div>
      </div>

      {/* PaymentCheckModal 오버레이 */}
      {showPaymentCheckModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={handleClosePaymentCheckModal}
        >
          <PaymentCheckModal
            tableNumber={tableNumber}
            depositorName={depositorName}
            totalAmount={totalAmount}
            timeText={timeText}
            onClose={handleClosePaymentCheckModal}
          />
        </div>
      )}
    </>
  );
};

interface PaymentDetailProps {
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
  menuNamesAndQuantities?: MenuNamesAndQuantities;
  onClose: () => void;
}

const PaymentDetail = ({
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
  menuNamesAndQuantities,
  onClose,
}: PaymentDetailProps) => {
  const [showPaymentCheckModal, setShowPaymentCheckModal] = useState(false);

  const menuEntries = menuNamesAndQuantities
    ? Object.entries(menuNamesAndQuantities)
    : [];

  const handlePaymentCheckClick = () => {
    setShowPaymentCheckModal(true);
  };

  const handleClosePaymentCheckModal = () => {
    setShowPaymentCheckModal(false);
  };

  return (
    <>
      <div className="absolute inset-0 bg-white z-10 flex flex-col px-5.5 py-4 justify-between">
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="flex flex-row cursor-pointer" onClick={onClose}>
            <ArrowRight className="flex icon-s" />
            <div className="flex text-16-semibold text-black-50">이전으로</div>
          </div>

          <div className="flex flex-row mt-6 gap-2.5">
            <div className="flex rounded-full bg-navy-50 w-9 h-9 items-center justify-center text-title-18-semibold text-white-100">
              {tableNumber}
            </div>
            <div className="flex text-title-18-semibold text-black-90 items-center">
              {tableNumber}번 테이블
            </div>
          </div>

          <div className="flex mt-6 text-title-18-semibold text-black-90">
            입금 내역
          </div>

          <div className="flex flex-col mt-4 gap-2.5">
            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">입금자</div>
              <div className="flex text-16-semibold text-black-80">
                {depositorName}
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">입금 금액</div>
              <div className="flex text-16-semibold text-black-80">
                {totalAmount.toLocaleString()}원
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">주문 시간</div>
              <div className="flex text-16-semibold text-black-80">
                {timeText}
              </div>
            </div>
          </div>

          <div className="flex mt-6 mb-6 border-t border-black-25" />

          <div className="flex text-title-18-semibold text-black-90">
            주문 메뉴 {menuEntries.length}
          </div>

          <div className="flex flex-col mt-4 gap-2.5 text-16-semibold text-black-80">
            {menuEntries.map(([menuName, quantity], index) => (
              <div key={index} className="flex flex-row justify-between">
                <div className="flex flex-[0.6]">{menuName}</div>
                <div className="flex flex-[0.4] justify-between">
                  <div className="flex">{quantity}</div>
                  <div className="flex">
                    {(12000 * quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex px-2.5 py-1.25 bg-black-20 items-center justify-center rounded-lg w-full h-10.5 text-14-semibold text-black-70 cursor-pointer"
          onClick={handlePaymentCheckClick}
        >
          입금 확인
        </div>
      </div>

      {/* PaymentCheckModal 오버레이 */}
      {showPaymentCheckModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={handleClosePaymentCheckModal}
        >
          <PaymentCheckModal
            tableNumber={tableNumber}
            depositorName={depositorName}
            totalAmount={totalAmount}
            timeText={timeText}
            onClose={handleClosePaymentCheckModal}
          />
        </div>
      )}
    </>
  );
};

import { useWindowWidth } from "../../hooks/useWindowWidth";

interface CookCardProps {
  tableNumber: number;
  menuNamesAndQuantities?: MenuNamesAndQuantities;
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
  menuNamesAndQuantities?: MenuNamesAndQuantities;
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
  const [showCookedModal, setShowCookedModal] = useState(false);

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

  const handleRestoreClick = () => {
    setShowCookedModal(true);
  };

  const handleCloseCookedModal = () => {
    setShowCookedModal(false);
  };

  return (
    <>
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
          <div
            className="rounded-lg border border-black-30 px-2.5 py-1.25 text-14-semibold text-black-70 flex-shrink-0 cursor-pointer hover:bg-black-10"
            onClick={handleRestoreClick}
          >
            주문 복구
          </div>
        </div>
      </div>

      {/* CookedModal 오버레이 */}
      {showCookedModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={handleCloseCookedModal}
        >
          <CookedModal
            tableNumber={tableNumber}
            depositorName={depositorName}
            totalAmount={totalAmount}
            timeText={createdAt}
            onClose={handleCloseCookedModal}
          />
        </div>
      )}
    </>
  );
};

export { PaymentCard, PaymentDetail, CookCard, CookedCard };
