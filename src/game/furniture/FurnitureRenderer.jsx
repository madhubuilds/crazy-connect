import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { furnitureCatalog } from "../../data/furnitureCatalog";

export const FurnitureRenderer = ({ assetId, ghost = false }) => {
  const asset = furnitureCatalog.find((a) => a.assetId === assetId);

  if (!asset) return null;

  const { scene } = useGLTF(asset.modelUrl);

  const preparedScene = useMemo(() => {
    const cloned = clone(scene);

    // --- Bounding box normalize ---
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    cloned.position.sub(center);
    cloned.position.y += size.y / 2;

    // --- Apply asset offsets ---
    cloned.position.y += asset.yOffset || 0;
    cloned.rotation.y += asset.rotationOffset || 0;
    cloned.scale.setScalar(asset.scale || 1);

    // --- Ghost / material handling ---
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = ghost;
        child.material.opacity = ghost ? 0.5 : 1;
        child.material.depthWrite = !ghost;
      }
    });

    return cloned;
  }, [scene, asset, ghost]);

  return <primitive object={preparedScene} />;
};
furnitureCatalog.forEach((asset) => {
  useGLTF.preload(asset.modelUrl);
});
