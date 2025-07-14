import React from "react";

interface PropsType {
  label: string;
  children: React.ReactNode;
}

const RadioGroup = ({ label, children }: PropsType) => {
  return (
    <fieldset className="flex flex-col gap-y-5">
      <legend className="text-14-medium text-black-60 mb-5">{label}</legend>
      {children}
    </fieldset>
  );
};

export default RadioGroup;
