import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls , Environment  } from '@react-three/drei'

function RotatingBox(props) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)

  useFrame((_, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
    }
  })

  return (
    <mesh {...props} ref={ref} scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    onPointerDown={() => setRotate(!rotate)}
    onPointerOver={() => setHover(true)}
    onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <meshBasicMaterial color={hovered ? 'blue': 'red'}  />
    </mesh>
  )
}

function Splash() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [2, 2, 2] }}>
        <color attach="background" args={['black']} />
        <RotatingBox position={[0.75, 0, 0]}/>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <OrbitControls
  minAzimuthAngle={-Math.PI / 4}
  maxAzimuthAngle={Math.PI / 4}
  minPolarAngle={Math.PI / 6}
  maxPolarAngle={Math.PI - Math.PI / 6}
/>
              </Canvas>
    </div>
  )
}

export default Splash;