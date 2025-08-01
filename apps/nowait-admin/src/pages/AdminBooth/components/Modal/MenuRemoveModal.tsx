interface MenuRemoveModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const MenuRemoveModal = ({ onCancel, onConfirm }: MenuRemoveModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 bg-white rounded-[20px] p-6 w-[305px] h-[170px] md:w-[372px] text-center"
      >
        <h2 className="text-title-20-bold text-black-85 mb-2">
          메뉴를 삭제할까요?
        </h2>
        <p className="text-14-regular text-black-60 mb-6">
          삭제된 메뉴는 복구할 수 없습니다.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-[13px] rounded-md text-16-semibold text-black-65 bg-black-20"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-[13px] rounded-md bg-primary text-white text-16-semibold"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuRemoveModal;
