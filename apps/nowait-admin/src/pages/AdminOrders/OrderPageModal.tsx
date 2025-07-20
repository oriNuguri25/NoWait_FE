import { useUpdateOrderStatus } from "../../hooks/useUpdateOrderStatus";

// Payment Check Modal
interface PaymentCheckModalProps {
  orderId: number;
  tableNumber: number;
  depositorName: string;
  totalAmount: number;
  timeText: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const PaymentCheckModal = ({
  orderId,
  tableNumber,
  depositorName,
  totalAmount,
  timeText,
  onClose,
  onSuccess,
}: PaymentCheckModalProps) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const handleConfirm = async () => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: "COOKING",
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("주문 상태 업데이트 실패:", error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-[20px] max-w-sm w-full px-5.5 pt-7.5 pb-5.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col text-center justify-center items-center gap-2.5">
        <div className="flex text-title-20-bold text-black-85">
          입금 확인 하셨나요?
        </div>
        <div className="flex flex-col justify-center items-center text-14-regular text-black-60">
          <div className="flex">입금이 되었는지 다시 한번 확인해주세요.</div>
          <div className="flex">
            입금 확인 후에는 주문 상태가 조리중으로 변경돼요.
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-7.5 bg-black-15 rounded-[14px] px-3.5 py-3.5 w-70 gap-2.5">
        <div className="flex rounded-full bg-navy-50 w-9 h-9 items-center justify-center text-title-18-semibold text-white-100">
          {tableNumber}
        </div>
        <div className="flex flex-col">
          <div className="flex text-14-medium text-black-60 items-center">
            {timeText}
          </div>
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

      <div className="flex flex-row w-full mt-7.5 gap-2">
        <div
          className="flex flex-1 bg-black-20 rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-black-65 cursor-pointer"
          onClick={onClose}
        >
          취소
        </div>
        <div
          className={`flex flex-1 bg-cool-black rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-white cursor-pointer ${
            updateOrderStatus.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={updateOrderStatus.isPending ? undefined : handleConfirm}
        >
          {updateOrderStatus.isPending ? "처리중..." : "확인"}
        </div>
      </div>
    </div>
  );
};

// Cooked Modal
interface CookedModalProps {
  orderId: number;
  tableNumber: number;
  depositorName: string;
  totalAmount: number;
  timeText: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const CookedModal = ({ orderId, onClose, onSuccess }: CookedModalProps) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const handleConfirm = async () => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: "COOKING",
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("주문 상태 업데이트 실패:", error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-[20px] max-w-sm w-full px-5.5 pt-7.5 pb-5.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col text-center justify-center items-center gap-2.5">
        <div className="flex text-title-20-bold text-black-85">
          주문을 복구할까요?
        </div>
        <div className="flex flex-col justify-center items-center text-14-regular text-black-60">
          <div className="flex">주문 상태가 조리 중으로 변경됩니다.</div>
        </div>
      </div>

      <div className="flex flex-row w-full mt-5 gap-2">
        <div
          className="flex flex-1 bg-black-20 rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-black-65 cursor-pointer"
          onClick={onClose}
        >
          취소
        </div>
        <div
          className={`flex flex-1 bg-cool-black rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-white cursor-pointer ${
            updateOrderStatus.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={updateOrderStatus.isPending ? undefined : handleConfirm}
        >
          {updateOrderStatus.isPending ? "처리중..." : "확인"}
        </div>
      </div>
    </div>
  );
};

export { PaymentCheckModal, CookedModal };
export type { PaymentCheckModalProps, CookedModalProps };
