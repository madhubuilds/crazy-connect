import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./lighting/SceneLighting";
import IsometricCamera from "./camera/IsometricCamera";
function CrazyConnectCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      gl={{ antialias: true, alpha: false }}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#c99f6b" roughness={0.8} />
      </mesh>
      <IsometricCamera />
      <SceneLighting />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
export default CrazyConnectCanvas;
