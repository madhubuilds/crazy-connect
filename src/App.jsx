import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import CrazyConnectCanvas from "./game/CrazyConnectCanvas";

function App() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#f5ead8]">
      <CrazyConnectCanvas />

      <div className="pointer-events-none absolute inset-0">
        {/* Future UI will go here */}
      </div>
    </main>
  );
}

export default App;
