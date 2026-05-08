function ShadowBlob({ footprint = [1, 1] }) {
  const [width, depth] = footprint;
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.005, 0]}
      scale={[width * 0.45, depth * 0.45, 1]}
      renderOrder={0}
    >
      <circleGeometry args={[0.45, 32]} />
      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

export default ShadowBlob;
