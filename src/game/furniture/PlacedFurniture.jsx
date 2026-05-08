import { furnitureCatalog } from "../../data/furnitureCatalog";
import { useGameStore } from "../../store/gameStore/useGameStore";
import Chair from "./Chair";
import FurnitureHitbox from "./FurnitureHitbox";
import { FurnitureRenderer } from "./FurnitureRenderer";
import SelectionRing from "./SelectionRing";
import ShadowBlob from "./ShadowBlob";
function PlacedFurniture() {
  const placedItems = useGameStore((state) => state.placedItems);
  const selectItem = useGameStore((state) => state.selectItem);
  const selectedItemId = useGameStore((state) => state.selectedItemId);

  return (
    <>
      {placedItems.map((item) => {
        const isSelected = item.id === selectedItemId;
        const asset = furnitureCatalog.find(
          (asset) => asset.assetId === item.assetId,
        );
        const footprint = asset?.footprint || [1, 1];
        const hasSelectedItem = selectedItemId !== null;
        return (
          <group
            key={item.id}
            position={item.position}
            rotation={[0, item.rotation, 0]}
            onPointerDown={(e) => {
              e.stopPropagation();
              selectItem(item.id);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            {!hasSelectedItem && (
              <FurnitureHitbox
                footprint={footprint}
                onSelect={() => selectItem(item.id)}
              />
            )}

            <ShadowBlob footprint={footprint} />
            {isSelected && <SelectionRing footprint={footprint} />}
            <FurnitureRenderer assetId={item.assetId} ghost={isSelected} />
          </group>
        );
      })}
    </>
  );
}
export default PlacedFurniture;

{
  /* <Chair
  ghost={isSelected}
  pointerEvents={isSelected ? "none" : "auto"}
/> */
}
