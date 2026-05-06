function ShadowBlob() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
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
