import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function ProductModel({ imageUrl }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef}>
        {/* Simple box representing t-shirt package */}
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive="#39ff14"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Neon outline effect */}
      <mesh>
        <boxGeometry args={[2.05, 2.55, 0.35]} />
        <meshBasicMaterial
          color="#39ff14"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

function GlowRing() {
  const ringRef = useRef()
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#39ff14" transparent opacity={0.6} />
    </mesh>
  )
}

export default function ProductShowcase({ imageUrl }) {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#39ff14"
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        
        <ProductModel imageUrl={imageUrl} />
        <GlowRing />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
