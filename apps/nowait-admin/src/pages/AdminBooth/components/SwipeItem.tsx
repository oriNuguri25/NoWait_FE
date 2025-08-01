import { useState, useRef } from "react";
import ToggleSwitch from "../../AdminHome/components/ToggleSwitch";

interface Menu {
  id: number;
  name: string;
  price: number;
  soldOut: boolean;
  imageUrl?: string;
}

interface SwipeItemProps {
  menu: Menu;
  onDelete: () => void;
  onToggleSoldOut: (id: number) => void;
  setIsEditModalOpen: (isModal: boolean) => void;
}

const SwipeItem = ({
  menu,
  onDelete,
  onToggleSoldOut,
  setIsEditModalOpen,
}: SwipeItemProps) => {
  const [translateX, setTranslateX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;

    if (diff < 0) {
      // 왼쪽으로 스와이프
      setTranslateX(Math.max(diff, -70)); // 최대 -70px
    }
  };

  const handleTouchEnd = () => {
    if (translateX < -40) {
      setTranslateX(-70); // 절반 넘게 밀면 고정
      setIsOpen(true);
    } else {
      setTranslateX(0); // 아니면 원래대로
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* 삭제 버튼 */}
      <div
        className="absolute right-0 top-0 h-full flex items-center justify-center 
                   bg-[#FFF0EB] text-primary font-semibold w-[70px]"
      >
        <button onClick={() => onDelete()}>삭제</button>
      </div>

      {/* 메뉴 내용 */}
      <div
        className="flex justify-between items-center py-4 px-2 border-b border-gray-200 bg-white transition-transform duration-200"
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsEditModalOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div className="w-[48px] h-[48px] bg-black-5 rounded-md overflow-hidden">
            <img
              src={menu.imageUrl}
              className="w-full h-full object-cover"
              alt="menu"
            />
          </div>
          <div>
            <span className="text-sm font-semibold">{menu.name}</span>
            <p className="text-sm text-black-60">
              {menu.price.toLocaleString()}원
            </p>
          </div>
        </div>
        <ToggleSwitch
          isOn={menu.soldOut}
          toggle={() => onToggleSoldOut(menu.id)}
        />
      </div>
    </div>
  );
};

export default SwipeItem;
