export const UnsavedChangesModal = ({
  onReset,
  onSave,
}: {
  onReset: () => void;
  onSave: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex items-center bg-white rounded-[20px] p-[30px] w-[324px] h-[185px]">
        <div className="flex flex-col justify-center items-center w-full">
          <h3 className="text-title-20-bold">
            저장하지 않은 변경사항이 있어요
          </h3>
          <p className="text-13-regular text-black-60 mb-[20px] mt-[10px]">
            이 페이지를 나가면 변경사항이 저장되지 않아요.
          </p>
          <div className="flex justify-between h-[48px] w-full">
            <button
              className="px-[20px] py-[13px] w-[128px] rounded-[10px] bg-black-20 text-black-80"
              onClick={onReset}
            >
              재설정
            </button>
            <button
              className="px-[20px] py-[13px] w-[128px] rounded-[10px] bg-black text-white"
              onClick={onSave}
            >
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
