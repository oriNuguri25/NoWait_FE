import React from "react";

interface WaitingCardProps {
  number: number;
  time: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  onCall?: () => void;
  onEnter?: () => void;
  onClose?: () => void;
}

export function WaitingCard({
  number,
  time,
  waitMinutes,
  peopleCount,
  name,
  phone,
  onCall,
  onEnter,
  onClose,
}: WaitingCardProps) {
  return (
    <div className="relative w-[372px] h-[200px] bg-white rounded-2xl shadow-md px-5 py-4">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[28px] font-bold text-black-80">
            #{number < 10 ? `0${number}` : number}번
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black-50 font-medium">
          <span>{time}</span>
          <span>· {waitMinutes}분 대기 중</span>
          {onClose && (
            <button onClick={onClose} className="text-black-30 text-lg ml-1">
              ×
            </button>
          )}
        </div>
      </div>

      {/* 정보 구역 */}
      <div className="flex text-center border border-[#E5E5E5] rounded-lg overflow-hidden mb-4">
        <div className="flex-1 py-2">
          <div className="text-xs font-medium text-black-40 mb-1">입장인원</div>
          <div className="text-base font-bold text-black-80">
            {peopleCount}명
          </div>
        </div>
        <div className="w-px bg-[#E5E5E5]" />
        <div className="flex-1 py-2">
          <div className="text-xs font-medium text-black-40 mb-1">이름</div>
          <div className="text-base font-bold text-black-80">{name}</div>
        </div>
        <div className="w-px bg-[#E5E5E5]" />
        <div className="flex-1 py-2">
          <div className="text-xs font-medium text-black-40 mb-1">전화번호</div>
          <div className="text-base font-bold text-black-80">{phone}</div>
        </div>
      </div>

      {/* 버튼 구역 */}
      <div className="flex gap-2">
        <button
          onClick={onCall}
          className="flex-1 py-2 rounded-lg bg-[#FFF0EB] text-[#FF6736] font-semibold text-sm flex justify-center items-center gap-1 hover:bg-[#ffe5dc]"
        >
          <span className="text-lg">🔔</span> 호출
        </button>
        <button
          onClick={onEnter}
          className="flex-1 py-2 rounded-lg bg-[#E8F3FF] text-[#2C7CF6] font-semibold text-sm flex justify-center items-center gap-1 hover:bg-[#d2e9ff]"
        >
          <span className="text-lg">🏢</span> 입장
        </button>
      </div>
    </div>
  );
}
