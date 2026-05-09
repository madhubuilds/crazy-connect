import { X, Sparkles, PackageCheck } from "lucide-react";
import { furnitureCatalog } from "../../data/furnitureCatalog";

export function FurnitureMenu({ isOpen, onSelect, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="pointer-events-auto absolute inset-0 z-20">
      {/* Backdrop */}
      <button
        aria-label="Close furniture menu"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]"
      />

      {/* Bottom Sheet */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          max-h-[78vh] overflow-hidden
          rounded-t-[2rem]
          border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl

          md:bottom-6 md:left-1/2 md:right-auto
          md:w-[760px] md:max-w-[calc(100vw-3rem)]
          md:-translate-x-1/2
          md:rounded-[2rem]
"
      >
        {/* Top gradient strip */}
        <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

        <div className="p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:p-5">
          {/* Drag handle */}
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#4c1d95]">
                <Sparkles size={18} strokeWidth={2.6} />
                <h2 className="text-base font-extrabold md:text-lg">
                  Choose Furniture
                </h2>
              </div>

              <p className="mt-1 text-xs font-medium text-slate-500 md:text-sm">
                Pick an item and place it in your room
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm transition active:scale-90"
            >
              <X size={20} strokeWidth={2.6} />
            </button>
          </div>

          {/* Furniture Grid */}

          <div className="max-h-[52vh] overflow-y-auto pr-1 md:max-h-[420px]">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
              {furnitureCatalog.map((item) => (
                <button
                  key={item.assetId}
                  onClick={() => onSelect(item.assetId)}
                  className="group rounded-3xl bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-2 shadow-md shadow-violet-500/10 transition active:scale-95"
                >
                  {/* Thumbnail */}
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.label}
                      className="h-full w-full object-contain p-1"
                      draggable="false"
                    />

                    {item.isFree && (
                      <div className="absolute right-1.5 top-1.5 rounded-full bg-emerald-400 px-1.5 py-0.5 text-[9px] font-black text-white shadow-sm">
                        FREE
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-2 min-h-[2rem] text-center">
                    <p className="text-[11px] font-extrabold leading-tight text-slate-700">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-500">
                      {item.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer hint */}
          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-100 to-pink-100 px-3 py-2 text-xs font-bold text-violet-700">
            <PackageCheck size={15} strokeWidth={2.5} />
            Tap an item to start placing
          </div>
        </div>
      </div>
    </div>
  );
}
