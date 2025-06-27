import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";

const AdminLayout = () => {
  const width = useWindowWidth();
  return (
    <div className="flex [@media(max-width:431px)]:flex-col">
      {width <= 431 ? <MobileMenuBar /> : <AdminSidebar />}
      <main className="flex justify-between bg-[#F2F6F9] mx-auto min-h-screen overflow-y-auto py-6 md:px-[30px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
