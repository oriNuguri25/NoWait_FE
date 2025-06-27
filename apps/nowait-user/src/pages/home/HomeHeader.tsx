import LogoBlack from "../../assets/logo-black.svg?react";
import menu from "../../assets/icon/menu.svg";

const HomeHeader = () => {
  return (
    <div className="flex justify-between items-center px-5 py-4">
      <LogoBlack className="w-14.5 h-6" />
      <button onClick={() => {}} className="cursor-pointer">
        <img src={menu} alt="menu" className="icon-m" />
      </button>
    </div>
  );
};

export default HomeHeader;
