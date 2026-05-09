import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { furnitureCatalog } from "../../data/furnitureCatalog";

export const FurnitureRenderer = ({ assetId, ghost = false }) => {
  const asset = furnitureCatalog.find((a) => a.assetId === assetId);

  if (!asset) {
    console.warn("FurnitureRenderer: assetId not found:", assetId);
    return null;
  }

  const { scene } = useGLTF(asset.modelUrl);

  const preparedScene = useMemo(() => {
    const cloned = clone(scene);

    // 1) Apply materials + ghost style safely
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = ghost;
        child.material.opacity = ghost ? 0.5 : 1;
        child.material.depthWrite = !ghost;

        // Optional: make materials softer (helps "plastic" look)
        if ("roughness" in child.material) child.material.roughness = 0.75;
        if ("metalness" in child.material) child.material.metalness = 0;
      }
    });

    // 2) Apply asset base transforms FIRST (scale + rotationOffset)
    const scale = asset.scale ?? 1;
    cloned.scale.setScalar(scale);

    const rotationOffset = asset.rotationOffset ?? 0;
    cloned.rotation.y += rotationOffset;

    // Make sure world matrices are correct before measuring bounding box
    cloned.updateMatrixWorld(true);

    // 3) Compute bounding box for centering/ground align
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    box.getCenter(center);

    // Center X/Z so rotation feels correct around center
    cloned.position.x -= center.x;
    cloned.position.z -= center.z;

    // Update world and recompute box after centering
    cloned.updateMatrixWorld(true);
    const boxAfterCenter = new Box3().setFromObject(cloned);

    // 4) Ground align using min.y (MOST RELIABLE)
    // Move model up so the lowest point touches y=0
    cloned.position.y -= boxAfterCenter.min.y;

    // 5) Apply asset vertical offset (tiny tweaks)
    const yOffset = asset.yOffset ?? 0;
    cloned.position.y += yOffset;

    // 6) Optional manual per-model offset for weird assets
    // (use only when a model "feels off-center")
    const modelOffset = asset.modelOffset ?? [0, 0, 0];
    cloned.position.x += modelOffset[0] || 0;
    cloned.position.y += modelOffset[1] || 0;
    cloned.position.z += modelOffset[2] || 0;

    cloned.updateMatrixWorld(true);

    return cloned;
  }, [
    scene,
    ghost,
    asset.scale,
    asset.rotationOffset,
    asset.yOffset,
    asset.modelOffset,
    assetId,
  ]);

  return <primitive object={preparedScene} />;
};
furnitureCatalog.forEach((asset) => {
  useGLTF.preload(asset.modelUrl);
});
