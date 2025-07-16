import React from "react";

const PageFooterButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
<<<<<<< HEAD
    <footer className="sticky bottom-0 w-full">
      <div className={`flex justify-center py-8 px-5 ${className}`}>{children}</div>
=======
    <footer className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[430px] min-w-[320px] bg-[linear-gradient(to_top,_white_80%,_transparent_100%)]">
      <div className="flex flex-col justify-center py-8 px-5">{children}</div>
>>>>>>> develop
    </footer>
  );
};

export default PageFooterButton;
