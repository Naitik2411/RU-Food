import { create } from "zustand";

export const useMenuCache = create((set) => ({
  menuCache: {},
  setMenuCache: (key, data) =>
    set((state) => ({
      menuCache: { ...state.menuCache, [key]: data },
    })),
}));
