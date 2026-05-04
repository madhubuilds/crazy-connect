import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
function IsometricCamera() {
  const cameraRef = useRef();

  useEffect(() => {
    if (!cameraRef.current) return;

    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.updateProjectionMatrix();
  }, []);
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
    
 position={[-10, 10, 10]}
      zoom={35}

      near={0.1}
      far={100}
    />
  );
}

export default IsometricCamera;
