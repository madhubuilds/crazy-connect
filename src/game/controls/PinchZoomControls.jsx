import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export default function PinchZoomControls({
  enabled = true,
  minZoom = 26,
  maxZoom = 70,
  zoomSpeed = 1.0,
}) {
  const { gl, camera } = useThree();
  const lastDistRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    // Only work with OrthographicCamera
    if (!camera.isOrthographicCamera) return;

    const el = gl.domElement;

    const getDist = (t1, t2) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        lastDistRef.current = getDist(e.touches[0], e.touches[1]);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 2) return;

      // Prevent browser pinch-zoom / scroll
      e.preventDefault();

      const dist = getDist(e.touches[0], e.touches[1]);
      const last = lastDistRef.current;

      if (!last) {
        lastDistRef.current = dist;
        return;
      }

      // ratio > 1 => fingers moved apart => zoom in
      const ratio = dist / last;

      // Convert ratio to zoom delta (smooth)
      const nextZoom = camera.zoom * Math.pow(ratio, zoomSpeed);
      camera.zoom = clamp(nextZoom, minZoom, maxZoom);
      camera.updateProjectionMatrix();

      lastDistRef.current = dist;
    };

    const onTouchEnd = () => {
      lastDistRef.current = null;
    };

    // passive:false is REQUIRED to allow preventDefault
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [enabled, gl, camera, minZoom, maxZoom, zoomSpeed]);

  return null;
}
