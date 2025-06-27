import React from "react";
import { Button } from "@repo/ui";

interface PropsType {
  children: string;
  onClick: () => void;
}

const PageFooterButton = ({ children, onClick }: PropsType) => {
  return (
    <footer className="w-full bg-white fixed bottom-0 left-0">
      <div className="text-center py-8 px-6">
        <Button textColor={"white"} onClick={onClick}>
          {children}
        </Button>
      </div>
    </footer>
  );
};

export default PageFooterButton;
