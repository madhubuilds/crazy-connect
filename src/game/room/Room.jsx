import Wall from "./Wall";
import Floor from "./Floor";
import {
  ROOM_SIZE,
  HALF_ROOM_SIZE,
  WALL_HEIGHT,
  WALL_THICKNESS,
} from "../../utils/constants.js";

export default function Room() {
  return (
    <group>
      <Floor />

      {/* Back wall */}
      <Wall
        position={[0, WALL_HEIGHT / 2, -HALF_ROOM_SIZE]}
        scale={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]}
      />

      {/* Right wall */}
      <Wall
        position={[HALF_ROOM_SIZE, WALL_HEIGHT / 2, 0]}
        scale={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]}
      />
    </group>
  );
}
