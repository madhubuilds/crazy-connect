import { furnitureCatalog } from "../../data/furnitureCatalog";
import { FURNITURE_TYPES } from "../../game/furniture/furnitureConfig";

export const FurnitureMenu = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;
  furnitureCatalog;
  return (
    <div className="pointer-events-auto absolute inset-0 z-20">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 shadow-2xl">
        <div className="mb-3 text-center text-sm font-semibold text-[#6b4f35]">
          Choose Furniture
        </div>

        <div className="grid grid-cols-3 gap-4">
          {furnitureCatalog.map((item) => (
            <button
              key={item.assetId}
              onClick={() => onSelect(item.assetId)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#f5efe6] p-4 active:scale-95"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.label}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <span className="text-xs font-semibold text-[#6b4f35]">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-2xl bg-[#ead8bd] py-3 text-sm font-bold text-[#6b4f35]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
