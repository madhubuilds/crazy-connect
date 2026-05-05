function SceneLighting() {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight position={[6, 10, 6]} intensity={1.2} color="#fff0d8" />
    </>
  );
}
export default SceneLighting;
