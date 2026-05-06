function SelectionRing() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.1, 0]}
      renderOrder={1}
    >
      <ringGeometry args={[0.55, 0.65, 32]} />
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
