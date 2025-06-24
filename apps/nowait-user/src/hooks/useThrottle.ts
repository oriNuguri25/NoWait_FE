import { useRef, useCallback } from "react";

const useThrottle = (callback: () => void, delay: number) => {
  const lastRun = useRef(0);

  return useCallback(() => {
    const now = Date.now();

    const timeElapsed = now - lastRun.current;

    if (timeElapsed >= delay) {
      callback();
      lastRun.current = now;
    }
  }, [callback, delay]);
};

export default useThrottle;
