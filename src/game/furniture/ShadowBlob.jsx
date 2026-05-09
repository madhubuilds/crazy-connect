function ShadowBlob({ footprint = [1, 1] }) {
  const [width, depth] = footprint;

  // Tweak these multipliers to taste
  const sx = width * 0.55;
  const sz = depth * 0.55;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.005, 0]}
      scale={[sx, sz, 1]}
      renderOrder={0}
      raycast={() => null}
    >
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.10}
        depthWrite={false}
      />
    </mesh>
  );
}

export default ShadowBlob;
