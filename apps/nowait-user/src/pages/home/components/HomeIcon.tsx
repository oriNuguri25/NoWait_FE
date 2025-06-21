interface WaitingIconProps {
  waitingCount?: number;
}

export function WaitingIcon({ waitingCount = 0 }: WaitingIconProps) {
  return (
    <div className="px-1.75 py-1.25 rounded-[10px] bg-[#FFEEDF]">
      <div className="font-bold text-[10px] text-[#FF5E07]">
        웨이팅 {waitingCount}팀
      </div>
    </div>
  );
}

export function NotOpenIcon() {
  return (
    <div className="px-1.75 py-1.25 rounded-[10px] bg-[#F7F7F7]">
      <div className="font-bold text-[10px] text-[#AAAAAA]">오픈 전</div>
    </div>
  );
}
