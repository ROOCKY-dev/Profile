'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { BotStatus } from '@/lib/types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface TechOrbProps {
  status: BotStatus;
  voiceLevel?: number;
}

function TechCore({ status, voiceLevel = 0 }: TechOrbProps) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Group>(null!);
  const ringsRef = useRef<THREE.Group>(null!);

  // Color Mapping
  const color = useMemo(() => {
    const c = new THREE.Color();
    switch (status) {
      case 'IDLE': return c.set('#06b6d4'); // Cyan
      case 'THINKING': return c.set('#a855f7'); // Purple
      case 'WORKING': return c.set('#f97316'); // Orange
      case 'ALERT': return c.set('#ef4444'); // Red
      case 'OFFLINE': return c.set('#52525b'); // Zinc
      default: return c.set('#ffffff');
    }
  }, [status]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Core Pulse (Voice Reactive)
    const baseScale = 1;
    const pulse = 1 + (voiceLevel * 1.5) + (Math.sin(t * 2) * 0.05);
    coreRef.current.scale.setScalar(baseScale * pulse);

    // Rotation speeds based on status
    const speed = status === 'THINKING' ? 2 : status === 'WORKING' ? 4 : 0.5;
    
    // Rotate Wireframe Shell
    outerRef.current.rotation.y += delta * speed * 0.2;
    outerRef.current.rotation.z += delta * speed * 0.1;

    // Rotate Rings (Gyroscope style)
    if (ringsRef.current) {
        ringsRef.current.children[0].rotation.x += delta * speed * 0.5;
        ringsRef.current.children[1].rotation.y += delta * speed * 0.3;
        ringsRef.current.children[2].rotation.z += delta * speed * 0.4;
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <Sphere ref={coreRef} args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
          roughness={0} 
          metalness={0.5} 
        />
      </Sphere>

      {/* Wireframe Tech Shell */}
      <group ref={outerRef}>
        <Icosahedron args={[1.4, 0]}>
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </Icosahedron>
      </group>

      {/* Gyroscopic Rings */}
      <group ref={ringsRef}>
        <Torus args={[2.2, 0.02, 16, 100]}>
           <meshBasicMaterial color={color} transparent opacity={0.5} />
        </Torus>
        <Torus args={[2.6, 0.02, 16, 100]} rotation={[1.5, 0, 0]}>
           <meshBasicMaterial color={color} transparent opacity={0.4} />
        </Torus>
        <Torus args={[3.0, 0.02, 16, 100]} rotation={[0, 1.5, 0]}>
           <meshBasicMaterial color={color} transparent opacity={0.3} />
        </Torus>
      </group>
    </group>
  );
}

export default function CoreVisualizer({ status, voiceLevel }: TechOrbProps) {
  return (
    <div className="w-[400px] h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <TechCore status={status} voiceLevel={voiceLevel} />
        
        <EffectComposer disableNormalPass>
           <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
        </EffectComposer>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
