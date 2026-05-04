import { FLOOR_COLOR, ROOM_SIZE } from "../../utils/constants.js";

function Floor() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
      <meshStandardMaterial color={FLOOR_COLOR} roughness={0.9} />
    </mesh>
  );
}
export default Floor;
