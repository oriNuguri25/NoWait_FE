interface WaitingIconProps {
  waitingCount?: number;
}

export function WaitingIcon({ waitingCount = 0 }: WaitingIconProps) {
  return (
    <div className="px-1.5 py-1.25 rounded-md bg-[#FFF0EB]">
      <div className="font-bold text-[10px] text-[#FF5E07]">
        대기 {waitingCount}팀
      </div>
    </div>
  );
}

export function WaitingCardIcon({ waitingCount = 0 }: WaitingIconProps) {
  return (
    <div className="px-1.5 py-1.25 w-13.5 h-5 rounded-md bg-white/30 flex items-center justify-center">
      <div className="font-bold text-[10px] text-white">
        대기 {waitingCount}팀
      </div>
    </div>
  );
}

export function NotOpenIcon() {
  return (
    <div className="px-1.5 py-1.25 rounded-md bg-[#F7F7F7]">
      <div className="font-bold text-[10px] text-[#AAAAAA]">오픈 전</div>
    </div>
  );
}
