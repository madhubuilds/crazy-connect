import { create } from "zustand";

export const useGameStore = create((set) => ({
  // modes: view | placing | moving
  mode: "view",
  setMode: () => set({ mode }),

  // furniture being previewed (ghost)
  previewItem: null,

  // real placed furniture
  placedItems: [],
  selectedItemId: null,
  startPlacing: () =>
    set({
      mode: "placing",
      previewItem: {
        id: Date.now(),
        type: "chair",
        position: [0, 0, 0],
        rotation: 0,
      },
    }),

  stopPlacing: () =>
    set({
      mode: "view",
      previewItem: null,
    }),

  updatePreviewPosition: (position) =>
    set((state) => ({
      previewItem: state.previewItem
        ? { ...state.previewItem, position }
        : null,
    })),

  updatePreviewRotation: (rotation) =>
    set((state) => ({
      previewItem: state.previewItem
        ? { ...state.previewItem, rotation }
        : null,
    })),

  placePreviewItem: () =>
    set((state) => {
      if (!state.previewItem) return {};
      return {
        placedItems: [...state.placedItems, state.previewItem],
        previewItem: null,
        mode: "view",
      };
    }),

  selectItem: (id) =>
    set({
      selectedItemId: id,
      mode: "moving", // reuse moving mode
    }),

  clearSelection: () =>
    set({
      selectedItemId: null,
      mode: "view",
    }),

  moveSelectedItem: (position) =>
    set((state) => {
      if (!state.selectedItemId) return {};

      return {
        placedItems: state.placedItems.map((item) =>
          item.id === state.selectedItemId ? { ...item, position } : item,
        ),
      };
    }),

  rotateSelectedItem: () =>
    set((state) => {
      if (!state.selectedItemId) return {};

      return {
        placedItems: state.placedItems.map((item) =>
          item.id === state.selectedItemId
            ? {
                ...item,
                rotation: item.rotation + Math.PI / 2, // 90°
              }
            : item,
        ),
      };
    }),

  deleteSelectedItem: () =>
    set((state) => {
      if (!state.selectedItemId) return {};

      return {
        placedItems: state.placedItems.filter(
          (item) => item.id !== state.selectedItemId,
        ),
        selectedItemId: null,
        mode: "view",
      };
    }),
}));
