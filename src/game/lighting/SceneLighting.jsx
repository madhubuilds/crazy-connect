function SceneLighting() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight position={[4, 8, 5]} intensity={1.4} color="#fff2d6" />
    </>
  );
}
export default SceneLighting;
