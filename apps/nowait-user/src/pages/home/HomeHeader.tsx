import LogoBlack from "../../assets/logo-black.svg?react";
import Menu from "../../assets/icon/menu.svg?react";
import Search from "../../assets/icon/search_black.svg?react";

const HomeHeader = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <LogoBlack className="w-14.5 h-6" />
      <div className="flex flex-row gap-3">
        <button onClick={() => {}} className="cursor-pointer">
          <Search className="icon-m" />
        </button>
        <button onClick={() => {}} className="cursor-pointer">
          <Menu className="icon-m" />
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
