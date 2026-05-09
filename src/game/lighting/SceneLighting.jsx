function SceneLighting() {
  return (
    <>
      {/* Soft base light, not too high */}
      <ambientLight intensity={0.65} color="#fff7ed" />

      {/* Warm main light */}
      <directionalLight position={[5, 8, 6]} intensity={1.15} color="#ffe8bf" />

      {/* Very soft cool fill */}
      <directionalLight
        position={[-5, 5, -4]}
        intensity={0.25}
        color="#dbeafe"
      /> 
      {/* Gentle sky/ground balance */}
      <hemisphereLight
        skyColor="#f8fbff"
        groundColor="#d7b98c"
        intensity={0.45}
      />
    </>
  );
}
export default SceneLighting;
