import React from "react";

const PageFooterButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <footer className="sticky bottom-0 w-full">
      <div className="flex justify-center py-8 px-5">{children}</div>
    </footer>
  );
};

export default PageFooterButton;
