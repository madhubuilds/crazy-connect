import { useGameStore } from "../../store/gameStore/useGameStore";
import Chair from "./Chair";
function PlacedFurniture() {
  const placedItems = useGameStore((state) => state.placedItems);
  const selectItem = useGameStore((state) => state.selectItem);
  const selectedItemId = useGameStore((state) => state.selectedItemId);

  return (
    <>
      {placedItems.map((item) => {
        const isSelected = item.id === selectedItemId;
        return (
          <group
            key={item.id}
            position={item.position}
            rotation={[0, item.rotation, 0]}
            onPointerDown={(e) => {
              e.stopPropagation();
              selectItem(item.id);
            }}
          >
            <Chair ghost={isSelected} />
          </group>
        );
      })}
    </>
  );
}
export default PlacedFurniture;
