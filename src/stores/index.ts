import { create } from 'zustand';
import { LayoutSlice, layoutSlice } from './layoutSlice';

type Store = LayoutSlice;

export const useStore = create<Store>()((...args) => ({
  ...layoutSlice(...args),
}));
