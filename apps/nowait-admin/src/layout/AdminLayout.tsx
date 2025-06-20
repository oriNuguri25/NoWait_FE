import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      AdminLayout
      <Outlet />
    </div>
  );
};

export default AdminLayout;
