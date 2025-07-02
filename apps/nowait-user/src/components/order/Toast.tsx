import { motion } from "framer-motion";

interface PropsType {
  message: string;
}

const Toast = ({ message }: PropsType) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "30%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex justify-center items-center px-4 py-2.5 rounded-[999px] bg-[#F2F6F9]"
    >
      <p className="text-14-medium text-navy-70">{message}</p>
    </motion.div>
  );
};

export default Toast;
