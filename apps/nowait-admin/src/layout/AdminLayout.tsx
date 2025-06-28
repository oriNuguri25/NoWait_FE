import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";

const AdminLayout = () => {
  const width = useWindowWidth();

  const isCompact = width < 1024;
  const isMobile = width <= 431;
  return (
    <div className="flex [@media(max-width:431px)]:flex-col">
      {width <= 431 ? <MobileMenuBar /> : <AdminSidebar />}
      <main
        className={`${
          isCompact
            ? isMobile
              ? "w-full"
              : "ml-[60px] w-[calc(100%-60px)]"
            : "ml-[220px] w-[calc(100%-220px)]"
        }  bg-[#F2F6F9] min-h-screen overflow-y-auto py-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
