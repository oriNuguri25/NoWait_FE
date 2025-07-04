import { useEffect } from "react";
import { useToastStore } from "../../stores/toastStore";
import { motion } from "framer-motion";

const Toast = () => {
  const { message, isOpen, clearToastTimeout } = useToastStore();

  useEffect(() => {
    return () => {
      clearToastTimeout();
    };
  }, [clearToastTimeout]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-1/2 bottom-[124px] -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "30%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex justify-center items-center px-4 py-2.5 rounded-[999px] bg-[#F2F6F9]"
      >
        <p className="text-14-medium text-navy-70">{message}</p>
      </motion.div>
    </div>
  );
};

export default Toast;
