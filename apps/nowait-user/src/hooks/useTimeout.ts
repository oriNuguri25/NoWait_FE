import { useEffect } from "react";

const useTimeout = (delay:number) => {
  useEffect(() => {
    const timeOut = setTimeout(() => console.log(), delay);
    return () => {
      clearTimeout(timeOut);
    };
  });
};
