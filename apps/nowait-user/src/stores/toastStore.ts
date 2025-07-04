import { create } from "zustand";

interface ToastState {
  message: string;
  isOpen: boolean;
  showToast: (message: string, duration: number) => void;
//   hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  isOpen: false,
  showToast: (message, duration) => {
    set({ message, isOpen: true });
    setTimeout(() => {
      set({ message: "", isOpen: false });
    }, duration);
  },
}));
