import { Center } from "@react-three/drei";
import { useGameStore } from "../../store/gameStore/useGameStore";
import Chair from "./Chair";
import { FurnitureRenderer } from "./FurnitureRenderer";

function FurniturePreview() {
  const previewItem = useGameStore((state) => state.previewItem);

  if (!previewItem) return null;
  const { position, rotation, assetId } = previewItem;

  // TEMP: reuse Chair for all types
  const FurnitureComponent = Chair;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Center>
        <FurnitureRenderer assetId={assetId} ghost />
      </Center>
    </group>
  );
}
export default FurniturePreview;
