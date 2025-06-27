import React from "react";

const PageFooterButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className=" bg-white sticky bottom-0">
      <div className="flex justify-center py-8 px-5">{children}</div>
    </footer>
  );
};

export default PageFooterButton;
