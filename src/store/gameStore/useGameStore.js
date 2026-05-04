import { create } from "zustand";

export const useGameStore = create((set) => ({
  mode: "view",
  setMode: () => set({ mode }),

  startPlacing: () => set({ mode: "placing" }),
  stopPlacing: () => set({ mode: "view" }),
}));
