import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLocation } from "react-router-dom";

const AdminLayout = () => {
  const width = useWindowWidth();

  const isCompact = width < 1024;
  const isMobile = width <= 767;

  const { pathname } = useLocation();
  const isBoothPage =
    pathname === "/admin/booth" || pathname === "/admin/booth/guides";

  return (
    <div className={`${isMobile ? "flex flex-col" : "flex"} w-screen`}>
      {isMobile ? <MobileMenuBar /> : <AdminSidebar />}
      <main
        className={`
        flex bg-[#F2F6F9] min-h-screen
        ${isBoothPage ? "" : "py-5"}
        ${
          isMobile || width <= 768
            ? `w-full ${isBoothPage ? "" : "px-5"}`
            : isCompact
            ? `w-[calc(100vw-60px)] ml-[60px] ${isBoothPage ? "" : "px-7.5"}`
            : `w-[calc(100vw-210px)] ml-[210px] ${isBoothPage ? "" : "px-7.5"}`
        }
      `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
