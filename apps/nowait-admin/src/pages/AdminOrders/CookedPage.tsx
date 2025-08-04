import { useState } from "react";
import { CookedCard, CookedDetail } from "./OrderCard";
import type { Order } from "../../types/order";

interface CookedPageProps {
  cookedOrders: Order[];
  isLoading?: boolean;
  error?: unknown;
  onRefresh?: () => void;
}

const CookedPage = ({
  cookedOrders,
  isLoading,
  error,
  onRefresh,
}: CookedPageProps) => {
  const [selectedCookedOrder, setSelectedCookedOrder] = useState<Order | null>(
    null
  );

  // 시간 포맷팅 함수 (17:30 형식)
  const getFormattedTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // CookedCard 클릭 핸들러
  const handleCookedCardClick = (cookedOrder: Order) => {
    setSelectedCookedOrder(cookedOrder);
  };

  // CookedDetail 닫기 핸들러
  const handleCloseCookedDetail = () => {
    setSelectedCookedOrder(null);
  };

  return (
    <div className="flex flex-row gap-2.5 flex-1 min-h-0 overflow-hidden w-full">
      {/* 조리 완료 블럭 */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <div className="flex flex-row ml-1.5 gap-1.5 flex-shrink-0 mb-3">
          <div className="text-title-20-bold text-[#363D4A]">조리 완료</div>
          <div className="text-title-20-bold text-[#363D4A]">
            {cookedOrders.length}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-black-30 flex-1 bg-white min-h-0 overflow-hidden">
          {/* 조리 완료 헤더 */}
          <div className="flex flex-row gap-2.5 px-5 py-4 bg-[#E8EDF1] rounded-t-2xl items-center flex-shrink-0">
            <div className="flex flex-[0.7] text-14-medium text-navy-35">
              테이블
            </div>
            <div className="flex flex-[1] text-14-medium text-navy-35">
              입금자
            </div>
            <div className="flex flex-[2.5] text-14-medium text-navy-35">
              메뉴
            </div>
            <div className="flex flex-[1.5] text-14-medium text-navy-35">
              금액
            </div>
            <div className="flex flex-[1.5] text-14-medium text-navy-35">
              주문 시간
            </div>
            <div className="flex-1"></div>
          </div>

          {/* 스크롤 가능한 내용 영역 */}
          <div
            className={`flex-1 min-h-0 relative ${
              selectedCookedOrder ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="text-16-medium text-black-60">로딩 중...</div>
              </div>
            ) : cookedOrders.length > 0 ? (
              cookedOrders.map((order) => (
                <CookedCard
                  key={order.id}
                  orderId={order.id}
                  tableNumber={order.tableId}
                  depositorName={order.depositorName}
                  menuNamesAndQuantities={order.menuNamesAndQuantities}
                  totalAmount={order.totalPrice || 0}
                  createdAt={getFormattedTime(order.createdAt)}
                  onSuccess={onRefresh}
                  onClick={() => handleCookedCardClick(order)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="text-16-medium text-black-60">
                  {error
                    ? "데이터를 불러오지 못했습니다."
                    : "조리 완료된 주문이 없어요!"}
                </div>
              </div>
            )}

            {/* CookedDetail 오버레이 */}
            {selectedCookedOrder && (
              <CookedDetail
                orderId={selectedCookedOrder.id}
                tableNumber={selectedCookedOrder.tableId}
                timeText={getFormattedTime(selectedCookedOrder.createdAt)}
                depositorName={selectedCookedOrder.depositorName}
                totalAmount={selectedCookedOrder.totalPrice || 0}
                menuNamesAndQuantities={
                  selectedCookedOrder.menuNamesAndQuantities
                }
                onClose={handleCloseCookedDetail}
                onSuccess={onRefresh}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookedPage;
