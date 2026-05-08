



function FurnitureHitbox({ footprint = [1, 1], onSelect }) {
  const [width, depth] = footprint;

  return (
    <mesh
      position={[0, 0.5, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <boxGeometry args={[width, 1, depth]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export default FurnitureHitbox;


