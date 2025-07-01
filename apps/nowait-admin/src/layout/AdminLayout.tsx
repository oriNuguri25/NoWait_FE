import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";

const AdminLayout = () => {
  const width = useWindowWidth();

  const isCompact = width < 1024;
  const isMobile = width <= 431;

  // 사이드바 너비 계산
  const getSidebarWidth = () => {
    if (isMobile || width <= 768) return 0;
    return isCompact ? 60 : 220;
  };

  return (
    <div className="flex [@media(max-width:431px)]:flex-col">
      {width <= 431 ? <MobileMenuBar /> : <AdminSidebar />}
      <main
        className={`flex bg-[#F2F6F9] min-h-screen py-5 w-full ${
          width <= 431 ? "px-5" : "px-7.5"
        }`}
        style={{ marginLeft: `${getSidebarWidth()}px` }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
