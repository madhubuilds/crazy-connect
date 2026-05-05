import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
function IsometricCamera() {
  const cameraRef = useRef();
  const [zoom, setZoom] = useState(36);
  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setZoom(28);
      } else if (width < 768) {
        setZoom(32);
      } else if (width < 1280) {
        setZoom(48); // 👈 IMPORTANT
      } else {
        setZoom(56); // large desktop
      }
    };
    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  useEffect(() => {
    if (!cameraRef.current) return;

    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.updateProjectionMatrix();
  }, [zoom]);
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[-10, 10, 10]}
      zoom={zoom}
      near={0.1}
      far={100}
    />
  );
}

export default IsometricCamera;
