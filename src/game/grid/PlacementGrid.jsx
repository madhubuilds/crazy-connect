import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ROOM_SIZE } from "../../utils/constants";
import { useGameStore } from "../../store/gameStore/useGameStore";

export default function PlacementGrid() {
  const gridRef = useRef();
  const opacityRef = useRef(0);

  const mode = useGameStore((state) => state.mode);

  const shouldShowGrid = mode === "placing" || mode === "moving";

  useFrame((_, delta) => {
    if (!gridRef.current) return;

    const targetOpacity = shouldShowGrid ? 0.22 : 0;
    const fadeSpeed = 6;

    opacityRef.current +=
      (targetOpacity - opacityRef.current) * fadeSpeed * delta;

    gridRef.current.visible = opacityRef.current > 0.01;

    gridRef.current.traverse((child) => {
      if (!child.material) return;

      child.material.transparent = true;
      child.material.opacity = opacityRef.current;
      child.material.depthWrite = false;
    });
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[ROOM_SIZE, ROOM_SIZE, "#ffffff", "#ffffff"]}
      position={[0, 0.02, 0]}
    />
  );
}
