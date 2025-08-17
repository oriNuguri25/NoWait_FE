export const UnsavedChangesModal = ({
  onReset,
  onSave,
}: {
  onReset: () => void;
  onSave: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-[400px] w-full">
        <h3 className="text-lg font-bold mb-2">
          저장하지 않은 변경사항이 있어요
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          이 페이지를 나가면 변경사항이 저장되지 않아요.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
            onClick={onReset}
          >
            재설정
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-black text-white"
            onClick={onSave}
          >
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
};
