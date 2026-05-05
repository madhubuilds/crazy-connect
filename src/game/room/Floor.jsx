import { useGameStore } from "../../store/gameStore/useGameStore.js";
import { FLOOR_COLOR, ROOM_SIZE } from "../../utils/constants.js";

function Floor() {
  const mode = useGameStore((state) => state.mode);
  const updatePreviewPosition = useGameStore(
    (state) => state.updatePreviewPosition,
  );

  const half = ROOM_SIZE / 2;

  const handlePointerDown = (e) => {
    if (mode !== "placing") return;

    // World position where user tapped on the floor
    const { x, z } = e.point; 

    // Snap to grid (1 unit)
    const snappedX = Math.round(x);
    const snappedZ = Math.round(z);

    // Clamp inside room bounds
    const clampedX = Math.max(-half + 0.5, Math.min(half - 0.5, snappedX));
    const clampedZ = Math.max(-half + 0.5, Math.min(half - 0.5, snappedZ));

    updatePreviewPosition([clampedX, 0, clampedZ]);
  };
  return (
    <mesh
      position={[0, 0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
      <meshStandardMaterial color={FLOOR_COLOR} roughness={0.9} />
    </mesh>
  );
}
export default Floor;
