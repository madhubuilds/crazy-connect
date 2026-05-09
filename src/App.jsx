import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import CrazyConnectCanvas from "./game/CrazyConnectCanvas";
import { useGameStore } from "./store/gameStore/useGameStore";
import GameUI from "./components/gameUI/GameUI";

function App() {
  const mode = useGameStore((state) => state.mode);
  const startPlacing = useGameStore((state) => state.startPlacing);
  const stopPlacing = useGameStore((state) => state.stopPlacing);

  const isPlacing = mode === "placing";
  return (
    <main className="relative h-[100svh] w-screen overflow-hidden bg-gradient-to-b from-[#1b1b2b] via-[#2a2244] to-[#2c3e63]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" /> 
      <CrazyConnectCanvas />
      {/* UI Overlay */}
      <GameUI />
    </main>
  );
}

export default App;
