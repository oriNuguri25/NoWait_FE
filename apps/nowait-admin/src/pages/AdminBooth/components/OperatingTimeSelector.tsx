import { DropdownSelect } from "./DropDown/DropDownSelect";

// 오전/오후 + 시 조합 (01시~12시)
const hours = Array.from({ length: 12 }, (_, i) =>
  [`오전`, `오후`].flatMap(
    (period) => `${period} ${String(i + 1).padStart(2, "0")}시`
  )
).flat();

// 분: 00 ~ 55 (5분 단위)
const minutes = Array.from(
  { length: 12 },
  (_, i) => `${String(i * 5).padStart(2, "0")}분`
);

const OperatingTimeSelector = ({
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  isMobile,
}: {
  startHour: string;
  setStartHour: (val: string) => void;
  startMinute: string;
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
  isMobile: boolean;
}) => {
  return (
    <div className="mb-[50px] max-w-[614px]">
      <label className="block text-title-18-bold text-black-80 mb-1">
        운영 시간
      </label>
      <p className="text-14-regular text-black-70 mb-3">
        부스의 운영 시간을 설정해 주세요
      </p>
      <div
        className={`w-full ${
          isMobile ? "flex flex-col gap-[14px]" : "flex flex-row items-center"
        }`}
      >
        <div className="flex items-center gap-[10px]">
          <span className="w-[28px] text-14-semibold text-black-90">시작</span>
          <DropdownSelect
            value={startHour}
            onChange={(val) => {
              setStartHour(val);
            }}
            options={hours}
            placeholder="시간"
          />
          <DropdownSelect
            value={startMinute}
            onChange={(val) => {
              setStartMinute(val);
            }}
            options={minutes}
            placeholder="분"
          />
        </div>

        {!isMobile && <span className="mx-[10px] text-gray-600">-</span>}
        <div className="flex gap-[10px] items-center">
          <span className="w-[28px] text-14-semibold text-black-90">종료</span>
          <DropdownSelect
            value={endHour}
            onChange={(val) => {
              setEndHour(val);
            }}
            options={hours}
            placeholder="시간"
          />
          <DropdownSelect
            value={endMinute}
            onChange={(val) => {
              setEndMinute(val);
            }}
            options={minutes}
            placeholder="분"
          />
        </div>
      </div>
    </div>
  );
};

export default OperatingTimeSelector;
