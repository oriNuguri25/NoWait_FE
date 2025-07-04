import { useToastStore } from "../../stores/toastStore";
import Toast from "../order/Toast";

const GlobalToast = () => {
  const { message, isOpen } = useToastStore();
  console.log("렌더")
  if (!isOpen) return null;
  return (
    <div className="fixed left-1/2 bottom-[124px] -translate-x-1/2 z-50">
      <Toast message={message} />
    </div>
  );
};

export default GlobalToast;
