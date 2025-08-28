'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PresentationControls } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';

function FloatingProduct({ position, rotation, color, scale }: any) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? scale * 1.1 : scale}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-96 lg:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <PresentationControls
            global
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <FloatingProduct 
              position={[-2, 0, 0]} 
              rotation={[0, 0, 0]} 
              color="#1f2937" 
              scale={1.2}
            />
            <FloatingProduct 
              position={[0, 1, 0]} 
              rotation={[0, Math.PI / 4, 0]} 
              color="#374151" 
              scale={1}
            />
            <FloatingProduct 
              position={[2, -1, 0]} 
              rotation={[0, -Math.PI / 4, 0]} 
              color="#6b7280" 
              scale={0.8}
            />
          </PresentationControls>
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg"
        >
          <p className="text-lg font-semibold">3D Product Experience</p>
          <p className="text-sm opacity-90">Interactive & Immersive</p>
        </motion.div>
      </div>
    </div>
  );
}
