import nwIcon from "../assets/nwLogo.svg";
import nwTextIcon from "../assets/nw_text_logo.svg";

const MobileMenuBar = () => {
  return (
    <div className="flex items-center justify-between bg-white w-full px-[20px] py-[12px]">
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
      <button className="w-[24px] h-[24px] flex flex-col justify-between items-center cursor-pointer">
        <span className="block w-full h-[2px] bg-black-90"></span>
        <span className="block w-full h-[2px] bg-black-90"></span>
        <span className="block w-full h-[2px] bg-black-90"></span>
      </button>
    </div>
  );
};

export default MobileMenuBar;
