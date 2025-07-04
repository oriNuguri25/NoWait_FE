import { create } from "zustand";

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

interface ToastState {
  message: string;
  isOpen: boolean;
  showToast: (message: string, duration?: number) => void;
  clearToastTimeout: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  isOpen: false,
  showToast: (message, duration = 2000) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    set({ message, isOpen: true });
    toastTimeout = setTimeout(() => {
      set({ message: "", isOpen: false });
      toastTimeout = null;
    }, duration);
  },
  clearToastTimeout: () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = null;
  },
}));
