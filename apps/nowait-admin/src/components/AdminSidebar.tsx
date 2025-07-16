import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLocation } from "react-router-dom";
import NwIcon from "../assets/nwLogo.svg?react";
import NwTextIcon from "../assets/nw_text_logo.svg?react";
import ArrowDown from "../assets/keyboard_arrow_down.svg?react";
import profile from "../assets/profile.png";
import waitIcon from "../assets/Waiting.svg"; // 대기 아이콘 등
import orderIcon from "../assets/Order.svg";
import statIcon from "../assets/Statistics.svg";
import boothIcon from "../assets/Tent.svg";
import waitIconActive from "../assets/waitIconActive.svg";
import orderIconActive from "../assets/orderIconActive.svg";
import statIconActive from "../assets/statIconActive.svg";
import boothIconActive from "../assets/boothIconActive.svg";

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
        h-screen flex flex-col justify-between bg-white px-4 py-6 fixed
        ${isCompact ? "w-[60px] items-center" : "w-[210px]"}
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
            label="웨이팅"
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
            label="관리 · 통계"
            compact={isCompact}
          />
          <NavItem
            to="/admin/booth"
            icon={
              <img
                src={pathname === "/admin/booths" ? boothIconActive : boothIcon}
                alt="부스 관리"
                className="w-5 h-5"
              />
            }
            label="부스"
            compact={isCompact}
          />
        </nav>
      </div>

      {/* 하단: 프로필 */}
      <div className="flex items-center gap-2">
        <img
          src={profile}
          alt="프로필"
          className="w-8 h-8 rounded-full object-cover"
        />
        {!isCompact && (
          <div className="flex flex-row">
            <span className="text-sm font-medium text-black">스페이시스</span>
            <ArrowDown />
          </div>
        )}
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
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold justify-center ${
          isActive ? "bg-gray-100 text-black" : "text-gray-400"
        } ${compact ? "justify-center" : "justify-start"}`
      }
    >
      {icon}
      {!compact && label}
    </NavLink>
  );
};
