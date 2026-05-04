import { WALL_COLOR } from "../../utils/constants.js";

function Wall({ position, scale }) {
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
    </mesh>
  );
}

export default Wall;
