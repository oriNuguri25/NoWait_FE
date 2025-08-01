interface ConfirmRemoveModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmRemoveModal = ({
  onCancel,
  onConfirm,
}: ConfirmRemoveModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
               bg-white rounded-[20px] p-6 w-[305px] h-[170px] md:w-[372px] text-center"
      >
        <h2 className="text-title-20-bold text-black-85 mb-2">
          대기를 취소할까요?
        </h2>
        <p className="text-14-regular text-black-60 mb-6">
          취소 후에는 대기가 복구되지 않아요.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-[13px] rounded-md text-16-semibold text-black-65 bg-black-20"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-[13px] rounded-md bg-primary text-white text-16-semibold"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveModal;
