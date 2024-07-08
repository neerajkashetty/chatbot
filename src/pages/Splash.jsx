import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";


function Splash() {
  return (
    <div id="canvas-container" className="w-screen h-screen bg-black flex justify-center">
    <video autoPlay muted loop >
      <source src="/uc.mp4" type="video/mp4"/>
    </video>
    </div>
  );
}

export default Splash;
