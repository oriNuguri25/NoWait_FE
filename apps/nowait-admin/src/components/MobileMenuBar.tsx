import nwIcon from "../assets/nwLogo.svg";
import nwTextIcon from "../assets/nw_text_logo.svg";
import menuIcon from "../assets/Menu.svg";
import MobileAdminNav from "./MobileAdminNav";
import { useState } from "react";

const MobileMenuBar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex items-center justify-between bg-white w-full h-[56px] px-[20px] py-[12px]">
      {/* 좌측: 로고 + 텍스트 */}
      <div className="flex items-center gap-2">
        <div>
          <img src={nwIcon} alt="nwlogo" />
        </div>
        <span>
          <img src={nwTextIcon} alt="nwTextlogo" />
        </span>
      </div>

      {/* 우측: 햄버거 메뉴 */}
      <button className="cursor-pointer" onClick={() => setShowNav(true)}>
        <img src={menuIcon} />
      </button>
      {showNav && <MobileAdminNav onClose={() => setShowNav(false)} />}
    </div>
  );
};

export default MobileMenuBar;
