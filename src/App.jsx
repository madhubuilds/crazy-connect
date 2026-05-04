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
    <main className="relative h-[100svh] w-screen overflow-hidden bg-[#f5ead8]">
      <CrazyConnectCanvas />

      {/* UI Overlay */}
      <GameUI />
    </main>
  );
}

export default App;
