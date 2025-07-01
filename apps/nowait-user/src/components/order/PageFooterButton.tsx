import React from "react";

const PageFooterButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <footer className=" bg-white sticky bottom-0">
      <div className={`flex justify-center py-8 px-5 ${className}`}>
        {children}
      </div>
    </footer>
  );
};

export default PageFooterButton;
