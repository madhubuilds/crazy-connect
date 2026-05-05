import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

function Chair({ ghost = false, ...props }) {
  const { scene } = useGLTF("/models/chair.glb");

  const centeredScene = useMemo(() => {
    const cloned = clone(scene);

    // --- compute bounding box ---
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    // --- center the model ---
    cloned.position.sub(center);

    // --- lift so it sits on floor ---
    cloned.position.y += size.y / 2;

    // --- ghost material handling ---
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = ghost;
        child.material.opacity = ghost ? 0.5 : 1;
        child.material.depthWrite = !ghost;
      }
    });

    return cloned;
  }, [scene, ghost]);

  return (
    <primitive
      object={centeredScene}
      scale={1} // ✅ now scale is REAL
      rotation={[0, 0, 0]}
      {...props}
    />
  );
}

useGLTF.preload("/models/chair.glb");

export default Chair;
