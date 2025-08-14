import dropIcon from "../../../assets/drop_down.svg";
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

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
}) => (
  <div className="relative w-[120px]">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm w-full bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
      <img src={dropIcon} alt="dropdown" className="w-3 h-3" />
    </div>
  </div>
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
}: {
  startHour: string;
  setStartHour: (val: string) => void;
  startMinute: string;
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
}) => {
  return (
    <div className="mb-8 max-w-[614px]">
      <label className="block text-title-16-bold mb-1">운영 시간</label>
      <p className="text-sm text-gray-400 mb-3">
        부스의 운영 시간을 설정해 주세요
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 mr-1">시작</span>
        <DropdownSelect
          value={startHour}
          onChange={(val) => setStartHour(val)}
          options={hours}
          placeholder="시간"
        />
        <DropdownSelect
          value={startMinute}
          onChange={(val) => setStartMinute(val)}
          options={minutes}
          placeholder="분"
        />

        <span className="mx-2 text-gray-600">-</span>

        <span className="text-sm text-gray-600 mr-1">종료</span>
        <DropdownSelect
          value={endHour}
          onChange={(val) => setEndHour(val)}
          options={hours}
          placeholder="시간"
        />
        <DropdownSelect
          value={endMinute}
          onChange={(val) => setEndMinute(val)}
          options={minutes}
          placeholder="분"
        />
      </div>
    </div>
  );
};

export default OperatingTimeSelector;
