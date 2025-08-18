import {create} from "zustand/react";

type Store = {
  sizeRatio: number;
  setSizeRatio: (ratio: number) => void;
  contentRef: React.RefObject<HTMLDivElement | null> | null;
  setContentRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
};

export const useLayoutStore = create<Store>((set) => ({
  sizeRatio: 1,
  contentRef: null,
  setSizeRatio: (ratio: number) => {
    set({ sizeRatio: ratio })
  },
  setContentRef: (ref: React.RefObject<HTMLDivElement | null>) => {
    set({ contentRef: ref })
  },
}));
