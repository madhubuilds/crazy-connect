import { create } from "zustand";
const STORAGE_KEY = "crazyconnect-room-v1";
export const useGameStore = create((set) => {
  // ---- LOAD FROM STORAGE ON INIT ----
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialPlacedItems = saved ? JSON.parse(saved) : [];

  return {
    // ---------------- STATE ----------------
    mode: "view", // view | placing | moving

    previewItem: null,

    placedItems: initialPlacedItems,

    selectedItemId: null,

    // ---------------- PLACING ----------------
    startPlacing: (assetId) =>
      set({
        mode: "placing",
        previewItem: {
          id: Date.now(),
          assetId,
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

        const updatedItems = [...state.placedItems, state.previewItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

        return {
          placedItems: updatedItems,
          previewItem: null,
          mode: "view",
        };
      }),

    // ---------------- SELECTION ----------------
    selectItem: (id) =>
      set({
        selectedItemId: id,
        mode: "moving",
      }),

    clearSelection: () =>
      set({
        selectedItemId: null,
        mode: "view",
      }),

    // ---------------- MOVE ----------------
    moveSelectedItem: (position) =>
      set((state) => {
        if (!state.selectedItemId) return {};

        const updatedItems = state.placedItems.map((item) =>
          item.id === state.selectedItemId ? { ...item, position } : item,
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
        return { placedItems: updatedItems };
      }),

    // ---------------- ROTATE ----------------
    rotateSelectedItem: () =>
      set((state) => {
        if (!state.selectedItemId) return {};

        const updatedItems = state.placedItems.map((item) =>
          item.id === state.selectedItemId
            ? { ...item, rotation: item.rotation + Math.PI / 2 }
            : item,
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
        return { placedItems: updatedItems };
      }),

    // ---------------- DELETE ----------------
    deleteSelectedItem: () =>
      set((state) => {
        if (!state.selectedItemId) return {};

        const updatedItems = state.placedItems.filter(
          (item) => item.id !== state.selectedItemId,
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

        return {
          placedItems: updatedItems,
          selectedItemId: null,
          mode: "view",
        };
      }),
  };
});
