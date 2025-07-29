import { useState } from "react";
import dropIcon from "../../../assets/drop_down.svg";

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = ["00", "10", "20", "30", "40", "50"];

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
  <div className="relative w-[100px]">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm w-full"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      <img src={dropIcon} />
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
    <div className="mb-8">
      <label className="block text-title-16-bold mb-1">운영 시간</label>
      <p className="text-sm text-gray-400 mb-3">
        부스의 운영 시간을 설정해 주세요
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 mr-1">시작</span>
        <CustomSelect
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
          options={hours}
          placeholder="시"
        />
        <CustomSelect
          value={startMinute}
          onChange={(e) => setStartMinute(e.target.value)}
          options={minutes}
          placeholder="분"
        />

        <span className="mx-2 text-gray-600">-</span>

        <span className="text-sm text-gray-600 mr-1">종료</span>
        <CustomSelect
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
          options={hours}
          placeholder="시"
        />
        <CustomSelect
          value={endMinute}
          onChange={(e) => setEndMinute(e.target.value)}
          options={minutes}
          placeholder="분"
        />
      </div>
    </div>
  );
};

export default OperatingTimeSelector;
