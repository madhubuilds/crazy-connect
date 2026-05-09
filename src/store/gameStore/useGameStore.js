import { create } from "zustand";
import { isPositionOccupied } from "../../utils/collision";

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

        const blocked = isPositionOccupied({
          position: state.previewItem.position,
          assetId: state.previewItem.assetId,
          rotation: state.previewItem.rotation,
          placedItems: state.placedItems,
        });

        if (blocked) {
          console.log("Blocked: item already exists here");
          return {};
        }

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

        const selectedItem = state.placedItems.find(
          (item) => item.id === state.selectedItemId,
        );

        if (!selectedItem) return {};

        const blocked = isPositionOccupied({
          position,
          assetId: selectedItem.assetId,
          rotation: selectedItem.rotation,
          placedItems: state.placedItems,
          ignoreItemId: selectedItem.id,
        });

        if (blocked) {
          console.log("Blocked: cannot move here");
          return {};
        }

        const updatedItems = state.placedItems.map((item) =>
          item.id === state.selectedItemId ? { ...item, position } : item,
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
        return { placedItems: updatedItems };
      }),

    // ---------------- ROTATE ----------------
    rotateSelectedItem: () =>
      set((state) => {
        // 1. Guard clause: Ensure something is actually selected
        if (!state.selectedItemId) return {};

        const selectedItem = state.placedItems.find(
          (item) => item.id === state.selectedItemId,
        );

        // 2. Guard clause: Ensure the selected item exists in the placedItems array
        if (!selectedItem) return {};

        // 3. Calculate the new rotation (+90 degrees)
        const nextRotation = (selectedItem.rotation || 0) + Math.PI / 2;

        // 4. Collision Check: Can the item actually fit in its new orientation?
        const blocked = isPositionOccupied({
          position: selectedItem.position,
          assetId: selectedItem.assetId,
          rotation: nextRotation,
          placedItems: state.placedItems,
          ignoreItemId: selectedItem.id, // Don't let the item collide with its "old" self
        });

        if (blocked) {
          console.warn("Rotation blocked: Not enough space!");
          return {}; // Return empty object to make no changes to state
        }

        // 5. Create the updated array
        const updatedItems = state.placedItems.map((item) =>
          item.id === state.selectedItemId
            ? { ...item, rotation: nextRotation }
            : item,
        );

        // 6. Sync to Local Storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

        // 7. Update State
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
