import waitIcon from "../assets/Waiting.svg"; // 대기 아이콘 등
import waitIconActive from "../assets/waitIconActive.svg";
import orderIcon from "../assets/Order.svg";
import orderIconActive from "../assets/orderIconActive.svg";
import statIcon from "../assets/Statistics.svg";
import statIconActive from "../assets/statIconActive.svg";
import boothIcon from "../assets/Tent.svg";
import boothIconActive from "../assets/boothIconActive.svg";
import cancelIcon from "../assets/Cancel.svg";
import logoutIcon from "../assets/log-out.svg";
import { useLocation, useNavigate } from "react-router";

const MobileAdminNav = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // localStorage에서 storeId 가져오기
  const storeId = localStorage.getItem("storeId");

  // 주문 페이지 경로 생성
  const getOrderPath = () => {
    return storeId ? `/admin/orders/${storeId}` : "/admin";
  };

  // 현재 주문 페이지인지 확인
  const isOrderPage = pathname.startsWith("/admin/orders/");

  const menuItems = [
    {
      label: "대기",
      icon: waitIcon,
      activeIcon: waitIconActive,
      path: "/admin",
    },
    {
      label: "주문",
      icon: orderIcon,
      activeIcon: orderIconActive,
      path: getOrderPath(),
    },
    {
      label: "통계",
      icon: statIcon,
      activeIcon: statIconActive,
      path: "/admin/analytics",
    },
    {
      label: "부스 관리",
      icon: boothIcon,
      activeIcon: boothIconActive,
      path: "/admin/booth",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("storeId");
    navigate("/");
  };

  return (
    <div
      className={`w-[210px] h-full bg-white flex flex-col px-4 py-6 fixed top-0 right-0 z-50 `}
    >
      {/* 상단 - 닫기 버튼 */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose}>
          <img src={cancelIcon} alt={"닫기"} className="w-6" />
        </button>
      </div>

      {/* 메뉴 목록 */}
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-2">
          {menuItems.map(({ label, icon, activeIcon, path }) => {
            const isActive =
              pathname === path || (label === "주문" && isOrderPage);
            return (
              <li
                key={label}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-title-18-semibold ${
                  isActive ? "bg-[#f5f5f5] text-black" : "text-black-50"
                }`}
                onClick={() => navigate(path)}
              >
                {isActive ? (
                  <img src={activeIcon} alt={label} className="w-5 h-5" />
                ) : (
                  <img src={icon} alt={label} className="w-5 h-5" />
                )}

                <span>{label}</span>
              </li>
            );
          })}
        </ul>

        {/* 하단 - 로그아웃 */}
        <div
          className="flex justify-start items-center text-[#999999] text-16-semibold gap-[2.5px] px-3 mt-8"
          onClick={handleLogout}
        >
          <img src={logoutIcon} />
          {"로그아웃"}
        </div>
      </div>
    </div>
  );
};

export default MobileAdminNav;
