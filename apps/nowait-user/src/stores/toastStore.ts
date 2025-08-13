import { create } from "zustand";

let toastTimeout: ReturnType<typeof setTimeout> | null = null;
let errorToastTimeout: ReturnType<typeof setTimeout> | null = null;

interface ToastState {
  message: string;
  isOpen: boolean;
  errorMessage: string;
  isErrorOpen: boolean;
  showToast: (message: string, duration?: number) => void;
  showErrorToast: (message: string, duration?: number) => void;
  clearToastTimeout: () => void;
  clearErrorToastTimeout: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  isOpen: false,
  errorMessage: "",
  isErrorOpen: false,
  showToast: (message, duration = 1500) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    set({ message, isOpen: true });
    toastTimeout = setTimeout(() => {
      set({ message: "", isOpen: false });
      toastTimeout = null;
    }, duration);
  },
  showErrorToast: (message, duration = 2000) => {
    if (errorToastTimeout) clearTimeout(errorToastTimeout);
    set({ errorMessage: message, isErrorOpen: true });
    errorToastTimeout = setTimeout(() => {
      set({ errorMessage: "", isErrorOpen: false });
      errorToastTimeout = null;
    }, duration);
  },
  clearToastTimeout: () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = null;
  },
  clearErrorToastTimeout: () => {
    if (errorToastTimeout) clearTimeout(errorToastTimeout);
    errorToastTimeout = null;
  },
}));
