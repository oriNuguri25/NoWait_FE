import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLocation } from "react-router-dom";
import NwIcon from "../assets/nwLogo.svg?react";
import NwTextIcon from "../assets/nw_text_logo.svg?react";
import profile from "../assets/profile.png";
import waitIcon from "../assets/Waiting.svg"; // 대기 아이콘 등
import orderIcon from "../assets/Order.svg";
import statIcon from "../assets/Statistics.svg";
import boothIcon from "../assets/Tent.svg";
import waitIconActive from "../assets/waitIconActive.svg";
import orderIconActive from "../assets/orderIconActive.svg";
import statIconActive from "../assets/statIconActive.svg";
import boothIconActive from "../assets/boothIconActive.svg";
import logout from "../assets/log-out.png";

const AdminSidebar = () => {
  const width = useWindowWidth();
  const navigate = useNavigate();

  // 375px 이하에서는 사이드바 완전히 숨김
  if (width <= 375) return null;
  if (width < 768) return null;

  const isCompact = width < 1024;
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside
      className={`
        h-screen flex flex-col justify-between bg-white fixed
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
                className="w-5 h-5"
              />
            }
            label="대기"
            compact={isCompact}
          />
          <NavItem
            to="/admin/orders"
            icon={
              <img
                src={pathname === "/admin/orders" ? orderIconActive : orderIcon}
                alt="주문"
                className="w-5 h-5"
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
                className="w-5 h-5"
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
                className="w-5 h-5"
              />
            }
            label="부스 관리"
            compact={isCompact}
          />
        </nav>
      </div>

      {/* 하단: 프로필 */}
      <div className="flex items-center gap-2">
        <img src={logout} alt="gnb" />
        <span className="text-16-semibold text-black-55">로그아웃</span>
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
        `flex items-center rounded-lg text-sm font-semibold ${
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
