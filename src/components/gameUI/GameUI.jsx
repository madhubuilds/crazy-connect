import { useGameStore } from "../../store/gameStore/useGameStore";

function GameUI() {
  const mode = useGameStore((state) => state.mode);

  const startPlacing = useGameStore((state) => state.startPlacing);
  const stopPlacing = useGameStore((state) => state.stopPlacing);
  const placePreviewItem = useGameStore((state) => state.placePreviewItem);

  const selectedItemId = useGameStore((state) => state.selectedItemId);
  const clearSelection = useGameStore((state) => state.clearSelection);

  const rotateSelectedItem = useGameStore((state) => state.rotateSelectedItem);
  const deleteSelectedItem = useGameStore((state) => state.deleteSelectedItem);

  const isPlacing = mode === "placing";
  const isSelecting = mode === "moving" && selectedItemId !== null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ---------- TOP STATUS ---------- */}
      <div className="absolute left-4 top-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#6b4f35] shadow-md backdrop-blur-md">
          {isPlacing
            ? "Placing item"
            : isSelecting
              ? "Item selected"
              : "My Room"}
        </div>
      </div>

      {/* ---------- BOTTOM ACTION BAR ---------- */}
      <div className="pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)+2rem)] left-0 right-0 px-4">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white/90 p-3 shadow-xl backdrop-blur-md">
          {/* ===== PLACING MODE ===== */}
          {isPlacing && (
            <div className="flex items-center gap-3">
              <button
                onClick={stopPlacing}
                className="min-h-12 flex-1 rounded-2xl bg-[#ead8bd] px-4 py-3 text-sm font-bold text-[#6b4f35] active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={placePreviewItem}
                className="min-h-12 flex-1 rounded-2xl bg-[#6b4f35] px-4 py-3 text-sm font-bold text-white active:scale-95"
              >
                Done
              </button>
            </div>
          )}

          {/* ===== SELECTION MODE ===== */}
          {isSelecting && (
            <div className="flex items-center gap-3">
              <button
                onClick={rotateSelectedItem}
                className="min-h-12 flex-1 rounded-2xl bg-[#ead8bd] px-4 py-3 text-sm font-bold text-[#6b4f35]"
              >
                Rotate
              </button>

              <button
                onClick={deleteSelectedItem}
                className="min-h-12 flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
              >
                Delete
              </button>

              <button
                onClick={clearSelection}
                className="min-h-12 flex-1 rounded-2xl bg-[#6b4f35] px-4 py-3 text-sm font-bold text-white"
              >
                Done
              </button>
            </div>
          )}

          {/* ===== VIEW MODE ===== */}
          {!isPlacing && !isSelecting && (
            <div className="flex items-center">
              <button
                onClick={startPlacing}
                className="min-h-12 flex-1 rounded-2xl bg-[#6b4f35] px-4 py-3 text-sm font-bold text-white active:scale-95"
              >
                Add Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameUI;
