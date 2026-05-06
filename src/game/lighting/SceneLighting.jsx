function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.9} />

      <directionalLight position={[6, 10, 6]} intensity={1.0} color="#fff0d5" />
      <directionalLight
        position={[-6, 6, -6]}
        intensity={0.25}
        color="#cfefff"
      />
    </>
  );
}
export default SceneLighting;
