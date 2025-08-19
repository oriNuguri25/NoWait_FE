interface WaitingIconProps {
  waitingCount?: number;
}

export function WaitingIcon({ waitingCount = 0 }: WaitingIconProps) {
  return (
    <div className="h-[21px] flex items-center px-1.5 pb-1.5 pt-1.25 rounded-md bg-[#FFF0EB]">
      <div className="font-bold text-[10px] leading-[100%] tracking-normal text-[#FF5E07]">
        대기 {waitingCount}팀
      </div>
    </div>
  );
}

export function WaitingCardIcon({ waitingCount = 0 }: WaitingIconProps) {
  return (
    <div className="flex w-13">
      <div className="h-[21px] flex items-center px-1.5 pb-1.5 pt-1.25 rounded-md bg-[#FFFFFF]/30">
        <div className="font-bold text-[10px] leading-[100%] tracking-normal text-white">
          대기 {waitingCount}팀
        </div>
      </div>
    </div>
  );
}

export function NotOpenIcon() {
  return (
    <div className="h-[21px] flex items-center px-1.5 pb-1.5 pt-1.25 rounded-md bg-[#F7F7F7]">
      <div className="font-bold text-[10px] leading-[100%] tracking-normal text-[#AAAAAA]">
        오픈 전
      </div>
    </div>
  );
}
