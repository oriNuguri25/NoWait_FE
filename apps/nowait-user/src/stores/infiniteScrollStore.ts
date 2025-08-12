import { create } from "zustand";

interface InfiniteScrollState {
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useInfiniteScrollStore = create<InfiniteScrollState>((set) => ({
  page: 1,
  hasMore: true,
  isLoading: false,
  setPage: (page: number) => set({ page }),
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  reset: () => set({ page: 1, hasMore: true, isLoading: false }),
}));
