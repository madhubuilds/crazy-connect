import { useGameStore } from "../../store/gameStore/useGameStore";

function GameUI() {
  const mode = useGameStore((state) => state.mode);
  const startPlacing = useGameStore((state) => state.startPlacing);
  const stopPlacing = useGameStore((state) => state.stopPlacing);

  const isPlacing = mode === "placing";

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Top Status */}
      <div className="absolute left-4 top-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#6b4f35] shadow-md backdrop-blur-md">
          {isPlacing ? "Placing mode" : "My Room"}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)+2rem)] left-0 right-0 px-4">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white/90 p-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            {!isPlacing ? (
              <button
                onClick={startPlacing}
                className="min-h-12 flex-1 rounded-2xl bg-[#6b4f35] px-4 py-3 text-sm font-bold text-white shadow-md active:scale-95 sm:text-base"
              >
                Add Item
              </button>
            ) : (
              <>
                <button
                  onClick={stopPlacing}
                  className="min-h-12 flex-1 rounded-2xl bg-[#ead8bd] px-4 py-3 text-sm font-bold text-[#6b4f35] shadow-md active:scale-95 sm:text-base"
                >
                  Cancel
                </button>

                <button
                  onClick={stopPlacing}
                  className="min-h-12 flex-1 rounded-2xl bg-[#6b4f35] px-4 py-3 text-sm font-bold text-white shadow-md active:scale-95 sm:text-base"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameUI;
