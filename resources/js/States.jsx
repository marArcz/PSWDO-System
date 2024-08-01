import { create } from "zustand";

export const useNavState = create((set) => ({
    navActive: true,
    setNavActive: (st) => set({ navActive: st })
}))
