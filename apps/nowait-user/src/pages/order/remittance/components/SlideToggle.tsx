import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface PropsType {
  children: React.ReactNode;
  toggle: boolean;
}
const SlideToggle = ({ children, toggle }: PropsType) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  console.log(contentHeight);
  useEffect(() => {
    if (toggle && contentRef.current) {
      setContentHeight(contentRef?.current?.scrollHeight);
    }
  }, [toggle]);
  return (
    <AnimatePresence>
      {toggle && (
        <motion.div
            ref={contentRef}
            className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: contentHeight }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideToggle;
