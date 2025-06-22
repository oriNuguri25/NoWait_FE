import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-[#F2F6F9] min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
