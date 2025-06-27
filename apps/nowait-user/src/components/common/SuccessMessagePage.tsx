import React from "react";
import PageFooterButton from "../order/PageFooterButton";
import { Button } from "@repo/ui";

interface PropsType {
  imageSrc: string;
  imageAlt: string;
  title: string;
  message: string;
  onClick: () => void;
  buttonText: string;
}

const SuccessMessagePage = ({
  imageSrc,
  imageAlt,
  title,
  message,
  onClick,
  buttonText,
}: PropsType) => {
  return (
    <div className="flex min-h-full">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <img
          className="mb-2.5 w-[210px] h-[210px] bg-amber-300"
          src={imageSrc}
          alt={imageAlt}
        />
        <h1 className="text-headline-24-bold mb-2">{title}</h1>
        <h2 className="whitespace-pre-line text-16-regular text-black-70">
          {message}
        </h2>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={onClick}>
          {buttonText}
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default SuccessMessagePage;
