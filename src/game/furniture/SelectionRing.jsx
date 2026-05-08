function SelectionRing({ footprint = [1, 1] }) {
  const [width, depth] = footprint;

  const padding = 0.18;

  const radiusX = width / 2 + padding;
  const radiusZ = depth / 2 + padding;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.012, 0]}
      scale={[radiusX, radiusZ, 1]}
      renderOrder={2}
      raycast={() => null}
    >
      <ringGeometry args={[0.85, 1, 64]} />
      <meshBasicMaterial
        color="#9ddcff"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  );
}

export default SelectionRing;
