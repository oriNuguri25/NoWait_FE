interface ConfirmRemoveModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  mode: string | null;
}

const ConfirmRemoveModal = ({
  onCancel,
  onConfirm,
  mode,
}: ConfirmRemoveModalProps) => {
  let title = "대기를 취소할까요?";
  let content = "취소 후에는 대기가 복구되지 않아요.";
  let cancel = "아니오";
  let confirm = "네";
  if (mode === "logout") {
    title = "로그아웃 하시겠습니까?";
    content = "";
    cancel = "최소";
    confirm = "확인";
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div
        className={`${
          mode === "logout" ? "h-[157px]" : "h-[170px]"
        } absolute flex flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
               bg-white rounded-[20px] w-[305px] md:w-[372px] text-center`}
      >
        <div
          className={`pt-5 px-[22px] ${
            mode === "logout" ? "pt-[30px] mb-[30px]" : "mb-5"
          }`}
        >
          <h2 className="text-title-20-bold text-black-85 mb-2">{title}</h2>
          <p className={`text-14-regular text-black-60 `}>{content}</p>
        </div>
        <div className="flex gap-2 px-[22px] h-[48px] mb-[22px]">
          <button
            onClick={onCancel}
            className="flex-1 py-[10px] px-3 rounded-[10px] text-16-semibold text-black-65 bg-black-20"
          >
            {cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-[10px] px-3 rounded-[10px] bg-primary text-white text-16-semibold"
          >
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveModal;
