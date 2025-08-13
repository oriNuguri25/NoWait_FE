import { useEffect } from "react";
import { useToastStore } from "../../../stores/toastStore";
import { motion, AnimatePresence } from "framer-motion";

const ErrorToast = () => {
  const { errorMessage, isErrorOpen, clearErrorToastTimeout } = useToastStore();

  useEffect(() => {
    return () => {
      clearErrorToastTimeout();
    };
  }, [clearErrorToastTimeout]);

  return (
    <AnimatePresence>
      {isErrorOpen && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-50">
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "30%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex justify-center items-center px-3.5 py-2 rounded-full bg-[#16191E]/80"
          >
            <p className="text-14-medium text-white">{errorMessage}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
