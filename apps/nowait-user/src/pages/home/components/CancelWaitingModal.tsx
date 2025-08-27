interface CancelWaitingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CancelWaitingModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: CancelWaitingModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      {/* 모달 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-8.75">
        <div className="flex flex-col bg-white rounded-[20px] w-full pt-7.5 px-5.5 pb-5.5 gap-5 justify-center items-center">
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="flex text-title-20-bold text-black-85">
              대기를 취소할까요?
            </div>
            <div className="flex text-[14px] font-[400] leading-[144%] tracking-normal text-black-60">
              삭제 후에는 대기 정보가 복구되지 않아요.
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            {/* 취소 버튼 */}
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-[10px] bg-black-20 text-[16px] font-semibold leading-[136%] tracking-normal text-black-65 items-center justify-center"
            >
              취소
            </button>

            {/* 확인 버튼 */}
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-[10px] bg-primary text-[16px] font-semibold leading-[136%] tracking-normal text-white-100 items-center justify-center"
            >
              {isLoading ? "취소 중..." : "확인"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelWaitingModal;
