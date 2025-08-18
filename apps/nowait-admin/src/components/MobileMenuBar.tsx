import nwIcon from "../assets/nwLogo.svg";
import nwTextIcon from "../assets/nw_text_logo.svg";
import menuIcon from "../assets/Menu.svg";
import MobileAdminNav from "./MobileAdminNav";
import { useEffect, useState } from "react";

const MobileMenuBar = ({
  handleClickLogout,
}: {
  handleClickLogout: () => void;
}) => {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    if (!showNav) return;

    const scrollY = window.scrollY;
    const body = document.body;

    // 잠금(사이드 바 제외 화면 고정)
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden"; // 안전빵

    return () => {
      // 해제 + 이전 스크롤 위치 복원
      const top = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, parseInt(top || "0") * -1);
    };
  }, [showNav]);
  return (
    <div className="flex items-center justify-between bg-white w-full h-[56px] px-[20px] py-[12px]">
      {/* 좌측: 로고 + 텍스트 */}
      <div className="flex items-center gap-2 w-[90px] h-[28px]">
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
      {/* 사이드 메뉴: 항상 렌더링되지만 translate-x로 제어 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[210px] bg-white shadow-xl transition-transform duration-300 ${
          showNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MobileAdminNav
          onClose={() => setShowNav(false)}
          handleClickLogout={handleClickLogout}
        />
      </div>
      {/* dim 영역 */}
      {showNav && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowNav(false)}
        />
      )}
    </div>
  );
};

export default MobileMenuBar;
