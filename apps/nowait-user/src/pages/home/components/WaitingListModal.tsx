import { Button } from "@repo/ui/button";

interface WaitingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  onSortChange: (option: string) => void;
}

const WaitingListModal = ({
  isOpen,
  onClose,
  selectedOption,
  onSortChange,
}: WaitingListModalProps) => {
  const sortOptions = [
    { id: "waiting", label: "대기 적은 순" },
    { id: "popular", label: "인기 순" },
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* 모달 */}
      <div className="fixed bottom-7.5 left-4 right-4 z-50 animate-slide-up">
        <div className="flex flex-col rounded-[20px] p-5 bg-white">
          <div className="flex text-title-20-semibold text-black-90 mb-7.5">
            정렬
          </div>
          <div className="flex flex-col gap-5">
            {sortOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-16-semibold text-black-90">
                  {option.label}
                </span>

                {/* 커스텀 라디오 버튼 */}
                <div className="relative">
                  <input
                    type="radio"
                    name="sort"
                    value={option.id}
                    checked={selectedOption === option.label}
                    onChange={() => onSortChange(option.label)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4.5 h-4.5 rounded-full border-[1px] flex items-center justify-center transition-colors ${
                      selectedOption === option.label
                        ? "border-black-90 bg-white"
                        : "border-black-35 bg-white"
                    }`}
                  >
                    {selectedOption === option.label && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black-90" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* 확인 버튼 */}
          <div className="mt-10">
            <Button
              buttonType="big"
              onClick={handleConfirm}
              className="rounded-[14px]"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingListModal;
