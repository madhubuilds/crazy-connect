import { useEffect, useState } from "react";
import { Plus, RotateCw, Move, Trash2, X, Check, Sparkles } from "lucide-react";

import { useGameStore } from "../../store/gameStore/useGameStore";
import {FurnitureMenu} from "./FurnitureMenu";

function GameUI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (mode === "placing") {
      setIsMenuOpen(false);
    }
  }, [mode]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ---------- TOP STATUS PILL ---------- */}
      <div className="absolute left-4 top-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/75 px-4 py-2 text-sm font-bold text-[#4c1d95] shadow-lg backdrop-blur-xl">
          <Sparkles size={16} strokeWidth={2.5} />

          <span>
            {isPlacing
              ? "Placing item"
              : isSelecting
                ? "Editing item"
                : "My Room"}
          </span>
        </div>
      </div>

      {/* ---------- BOTTOM UI AREA ---------- */}
      <div className="pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)+2rem)] left-0 right-0 px-4">
        {/* ---------- VIEW MODE: FLOATING ADD BUTTON ---------- */}
        {!isPlacing && !isSelecting && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Add furniture"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-2xl shadow-fuchsia-500/30 transition active:scale-90"
            >
              <Plus size={34} strokeWidth={2.8} />
            </button>
          </div>
        )}

        {/* ---------- PLACING MODE ACTION BAR ---------- */}
        {isPlacing && (
          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-3 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={stopPlacing}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-3 text-sm font-bold text-slate-700 shadow-md transition active:scale-95"
              >
                <X size={18} strokeWidth={2.6} />
                <span>Cancel</span>
              </button>

              <button
                onClick={placePreviewItem}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition active:scale-95"
              >
                <Check size={18} strokeWidth={2.8} />
                <span>Place</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------- SELECTION / EDIT MODE ACTION BAR ---------- */}
        {isSelecting && (
          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-3 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-4 gap-2">
              {/* Move hint button */}
              <button
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 px-2 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 transition active:scale-95"
                title="Tap the floor to move"
              >
                <Move size={19} strokeWidth={2.6} />
                <span>Move</span>
              </button>

              <button
                onClick={rotateSelectedItem}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 px-2 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition active:scale-95"
              >
                <RotateCw size={19} strokeWidth={2.6} />
                <span>Rotate</span>
              </button>

              <button
                onClick={deleteSelectedItem}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 px-2 py-2 text-xs font-bold text-white shadow-md shadow-red-500/25 transition active:scale-95"
              >
                <Trash2 size={19} strokeWidth={2.6} />
                <span>Delete</span>
              </button>

              <button
                onClick={clearSelection}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 px-2 py-2 text-xs font-bold text-white shadow-md shadow-violet-500/25 transition active:scale-95"
              >
                <Check size={19} strokeWidth={2.8} />
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------- FURNITURE MENU ---------- */}
      <FurnitureMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelect={(assetId) => {
          startPlacing(assetId);
          setIsMenuOpen(false);
        }}
      />
    </div>
  );
}

export default GameUI;
