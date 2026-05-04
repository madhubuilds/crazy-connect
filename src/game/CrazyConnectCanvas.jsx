import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./lighting/SceneLighting";
import IsometricCamera from "./camera/IsometricCamera";
import Room from "./room/Room";
import PlacementGrid from "./grid/PlacementGrid";
function CrazyConnectCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#f5ead8"]} />
      <IsometricCamera />
      <SceneLighting />

      <Room />
      <PlacementGrid />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
export default CrazyConnectCanvas;
