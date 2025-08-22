import { useNavigate } from "react-router-dom";
import Back from "../assets/icon/back.svg?react";

const BackOnlyHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full fixed left-0 top-0 bg-transparent">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2.5">
          <Back />
        </button>
        <div className="w-[48px] h-[48px]"></div>
      </div>
    </header>
  );
};

export default BackOnlyHeader;
