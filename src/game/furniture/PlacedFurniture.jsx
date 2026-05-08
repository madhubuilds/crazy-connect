import { useGameStore } from "../../store/gameStore/useGameStore";
import Chair from "./Chair";
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
        const FurnitureComponent = Chair; // TEMP
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
            <ShadowBlob />
            {isSelected && <SelectionRing />}
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
