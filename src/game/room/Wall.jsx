import { WALL_COLOR } from "../../utils/constants.js";

function Wall({ position, scale }) {
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={WALL_COLOR} roughness={0.9} metalness={0} />
    </mesh>
  );
}

export default Wall;
