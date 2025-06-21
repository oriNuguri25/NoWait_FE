import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-[100dvh] min-w-[375px] max-w-[430px] mx-auto bg-amber-300 px-5">
      <Outlet />
    </div>
  );
};

export default Layout;
