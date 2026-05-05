import { useGameStore } from "../../store/gameStore/useGameStore";
import Chair from "./Chair";

function FurniturePreview() {
  const previewItem = useGameStore((state) => state.previewItem);

  if (!previewItem) return null;
  const { position, rotation } = previewItem;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Chair
        position={[0, 0.02, 0]} // slight lift above floor
        renderOrder={1}
        ghost
      />
    </group>
  );
}
export default FurniturePreview;