import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import SceneLighting from "./lighting/SceneLighting";
import IsometricCamera from "./camera/IsometricCamera";
import Room from "./room/Room";
import PlacementGrid from "./grid/PlacementGrid";
import Chair from "./furniture/Chair";
import FurniturePreview from "./furniture/FurniturePreview";
import PlacedFurniture from "./furniture/PlacedFurniture";
import PinchZoomControls from "./controls/PinchZoomControls";
function CrazyConnectCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
    >
      {/* <fog attach="fog" args={["#f6efe6", 15, 30]} /> */}

      {/* <color attach="background" args={["black"]} /> */}
      <IsometricCamera />
      <PinchZoomControls
        enabled={navigator.maxTouchPoints > 0}
        minZoom={28}
        maxZoom={80}
        zoomSpeed={1.0}
      />
      <SceneLighting />

      <Room />
      <FurniturePreview />
      <PlacedFurniture />
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.06}
        scale={12}
        blur={2.5}
        far={6}
      />
      <PlacementGrid />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
export default CrazyConnectCanvas;
