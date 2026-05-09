import { useGameStore } from "../../store/gameStore/useGameStore.js";
import {
  FLOOR_COLOR,
  ROOM_SIZE,
  FLOOR_THICKNESS,
} from "../../utils/constants.js";

function Floor() {
  const mode = useGameStore((state) => state.mode);
  const moveSelectedItem = useGameStore((state) => state.moveSelectedItem);
  const updatePreviewPosition = useGameStore(
    (state) => state.updatePreviewPosition,
  );

  const half = ROOM_SIZE / 2;

  const handlePointerDown = (e) => {
    // World position where user tapped on the floor
    const { x, z } = e.point;

    // Snap to grid (1 unit)
    const snappedX = Math.round(x);
    const snappedZ = Math.round(z);

    // Clamp inside room bounds
    const clampedX = Math.max(-half + 0.5, Math.min(half - 0.5, snappedX));
    const clampedZ = Math.max(-half + 0.5, Math.min(half - 0.5, snappedZ));

    const snappedPosition = [clampedX, 0, clampedZ];

    if (mode === "placing") {
      updatePreviewPosition(snappedPosition);
    }

    if (mode === "moving") {
      moveSelectedItem(snappedPosition);
    }
  };
  return (
    <mesh
      position={[0, -FLOOR_THICKNESS / 2, 0]}
      onPointerDown={handlePointerDown}
      receiveShadow
    >
      {/* width (X), height/thickness (Y), depth (Z) */}
      <boxGeometry args={[ROOM_SIZE, FLOOR_THICKNESS, ROOM_SIZE]} />
      <meshToonMaterial color={FLOOR_COLOR} roughness={0.9} flatShading />
    </mesh>
  );
}
export default Floor;
