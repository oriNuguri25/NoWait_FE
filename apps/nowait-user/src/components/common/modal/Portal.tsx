import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const rootPortal = document.getElementById("rootPortal") as HTMLElement;
  return createPortal(children, rootPortal);
};

export default Portal;
