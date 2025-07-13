import { motion } from "framer-motion";
import { useLocation, useNavigationType } from "react-router-dom";

interface PropsType {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PropsType) => {
  const location = useLocation();
  const navigateType = useNavigationType();

  const isBack = navigateType === "POP" || navigateType === "REPLACE";

  return (
    <div className="overflow-hidden">
      <motion.main
        key={location.pathname}
        initial={isBack ? false : { x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: "easeOut",
          duration: 0.2,
        }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PageTransitionWrapper;
