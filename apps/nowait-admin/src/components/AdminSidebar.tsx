import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLocation } from "react-router-dom";
import NwIcon from "../assets/nwLogo.svg?react";
import NwTextIcon from "../assets/nw_text_logo.svg?react";
import waitIcon from "../assets/Waiting.svg"; // 대기 아이콘 등
import orderIcon from "../assets/Order.svg";
import statIcon from "../assets/Statistics.svg";
import boothIcon from "../assets/Tent.svg";
import waitIconActive from "../assets/waitIconActive.svg";
import orderIconActive from "../assets/orderIconActive.svg";
import statIconActive from "../assets/statIconActive.svg";
import boothIconActive from "../assets/boothIconActive.svg";
import logout from "../assets/log-out.svg";
import logout_text from "../assets/logout_text.svg";

const AdminSidebar = ({
  handleClickLogout,
}: {
  handleClickLogout: () => void;
}) => {
  const width = useWindowWidth();
  const navigate = useNavigate();

  // 768px 이하에서는 사이드바 완전히 숨김
  if (width < 768) return null;

  const isCompact = width < 1024;
  const location = useLocation();
  const pathname = location.pathname;
  const storeId = Number(localStorage.getItem("storeId"));

  return (
    <aside
      className={`
        h-full flex flex-col justify-between bg-white fixed border-r border-r-[#ECECEC]
        ${
          isCompact
            ? "w-[60px] items-center px-[10px] py-5"
            : "w-[210px] px-4 py-6"
        }
      `}
    >
      {/* 상단: 로고 & 메뉴 */}
      <div>
        {/* 로고 */}
        <div className="mb-8">
          {isCompact ? (
            <div
              className="flex justify-center"
              onClick={() => navigate("/admin")}
            >
              <NwIcon className="w-9 h-9" />
            </div>
          ) : (
            <div className="flex">
              <NwTextIcon
                className="w-17 h-9 cursor-pointer"
                onClick={() => navigate("/admin")}
              />
            </div>
          )}
        </div>

        {/* 메뉴 */}
        <nav className="flex flex-col gap-2">
          <NavItem
            to="/admin"
            icon={
              <img
                src={pathname === "/admin" ? waitIconActive : waitIcon}
                alt="웨이팅"
                className="w-6 h-6"
              />
            }
            label="대기"
            compact={isCompact}
          />
          <NavItem
            to={`/admin/orders/${storeId}`}
            icon={
              <img
                src={
                  pathname.includes("/admin/orders")
                    ? orderIconActive
                    : orderIcon
                }
                alt="주문"
                className="w-6 h-6"
              />
            }
            label="주문"
            compact={isCompact}
          />
          <NavItem
            to="/admin/analytics"
            icon={
              <img
                src={
                  pathname === "/admin/analytics" ? statIconActive : statIcon
                }
                alt="관리 및 통계"
                className="w-6 h-6"
              />
            }
            label="통계"
            compact={isCompact}
          />
          <NavItem
            to="/admin/booth"
            icon={
              <img
                src={pathname === "/admin/booth" ? boothIconActive : boothIcon}
                alt="부스 관리"
                className="w-6 h-6"
              />
            }
            label="부스 관리"
            compact={isCompact}
          />
        </nav>
      </div>

      {/* 하단: 프로필 */}
      <div className="px-4 flex items-center gap-2" onClick={handleClickLogout}>
        <img src={logout} alt="gnb" />
        {!isCompact && <img src={logout_text} />}
      </div>
    </aside>
  );
};

export default AdminSidebar;

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  compact: boolean;
}

const NavItem = ({ to, icon, label, compact }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center rounded-lg text-16-semibold ${
          isActive ? "bg-gray-100 text-black" : "text-gray-400"
        } ${
          compact
            ? "justify-center w-10 h-10"
            : "justify-start px-4 py-2 gap-[8px]"
        }`
      }
    >
      {icon}
      {!compact && label}
    </NavLink>
  );
};
