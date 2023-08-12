import { StateCreator } from 'zustand';

export interface LayoutSlice {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

export const layoutSlice: StateCreator<LayoutSlice> = (set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  showLoading: () => set({ loading: true }),
  hideLoading: () => set({ loading: false }),
});
