'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { STATUS_HEX_COLORS } from '@/lib/constants';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface TechOrbProps {
  status: BotStatus;
  voiceLevel?: number;
  customColor?: string;
  focusLevel?: FocusLevel;
}

/**
 * TechCore Component
 *
 * The 3D scene content for the visualizer.
 * Renders a glowing core, a wireframe shell, and gyroscopic rings.
 * Animations are driven by the `useFrame` loop and respond to `status`, `focusLevel`, and `voiceLevel`.
 */
function TechCore({ status, voiceLevel = 0, customColor, focusLevel = 'NORMAL' }: TechOrbProps) {
  // References to 3D meshes for direct manipulation in the animation loop
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  /**
   * Memoize the color based on status and focus level to prevent unnecessary recalculations.
   * Prioritizes custom color if set.
   * If status is CODING and HYPER_FOCUSED, uses a special magenta color.
   */
  const color = useMemo(() => {
    const c = new THREE.Color();
    if (status === 'CUSTOM' && customColor) {
      return c.set(customColor);
    }
    if (status === 'CODING' && focusLevel === 'HYPER_FOCUSED') {
       return c.set('#d946ef'); // Magenta for hyper focus
    }

    // Use the centralized status color map
    return c.set(STATUS_HEX_COLORS[status] || '#ffffff');
  }, [status, customColor, focusLevel]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // --- Pulse Animation (Core) ---
    // Reacts to voice level and focus intensity
    let pulseIntensity = 1;
    if (focusLevel === 'HYPER_FOCUSED') pulseIntensity = 2;
    if (focusLevel === 'CALM') pulseIntensity = 0.5;

    const baseScale = 1;
    // Pulse calculation: Base + Voice Reaction + Rhythmic Breathing
    const pulse = 1 + (voiceLevel * 1.5) + (Math.sin(t * (pulseIntensity * 2)) * 0.05);

    if (coreRef.current) {
        coreRef.current.scale.setScalar(baseScale * pulse);
    }

    // --- Rotation Animation (Shell & Rings) ---
    // Speed varies by status
    let speed = 0.5;
    switch (status) {
        case 'CODING': speed = 2; break;
        case 'GAMING': speed = 3; break;
        case 'DISCORD': speed = 1.5; break;
        case 'BROWSING': speed = 1; break;
        case 'OFFLINE': speed = 0.1; break;
        default: speed = 1;
    }

    // Focus Level Modifiers
    if (focusLevel === 'HYPER_FOCUSED') speed *= 2.5;
    if (focusLevel === 'CALM') speed *= 0.5;
    
    // Rotate Wireframe Shell
    if (outerRef.current) {
        outerRef.current.rotation.y += delta * speed * 0.2;
        outerRef.current.rotation.z += delta * speed * 0.1;
    }

    // Rotate Rings (Gyroscope style - multiple axes)
    // Ring 1 (Inner) - Primary X, secondary Y
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x += delta * speed * 0.5;
        ring1Ref.current.rotation.y += delta * speed * 0.2;
    }

    // Ring 2 (Middle) - Primary Y, secondary Z
    if (ring2Ref.current) {
        ring2Ref.current.rotation.y += delta * speed * 0.4;
        ring2Ref.current.rotation.z += delta * speed * 0.2;
    }

    // Ring 3 (Outer) - Primary Z, secondary X
    if (ring3Ref.current) {
        ring3Ref.current.rotation.z += delta * speed * 0.3;
        ring3Ref.current.rotation.x += delta * speed * 0.2;
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <Sphere ref={coreRef} args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={focusLevel === 'HYPER_FOCUSED' ? 4 : 2}
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
      <group>
        <Torus ref={ring1Ref} args={[2.2, 0.02, 16, 100]}>
           <meshBasicMaterial color={color} transparent opacity={0.5} />
        </Torus>
        <Torus ref={ring2Ref} args={[2.6, 0.02, 16, 100]} rotation={[1.5, 0, 0]}>
           <meshBasicMaterial color={color} transparent opacity={0.4} />
        </Torus>
        <Torus ref={ring3Ref} args={[3.0, 0.02, 16, 100]} rotation={[0, 1.5, 0]}>
           <meshBasicMaterial color={color} transparent opacity={0.3} />
        </Torus>
      </group>
    </group>
  );
}

/**
 * CoreVisualizer Component
 *
 * Wrapper for the R3F Canvas. Sets up the camera, lighting, and post-processing.
 *
 * @param props TechOrbProps
 */
export default function CoreVisualizer({ status, voiceLevel, customColor, focusLevel }: TechOrbProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <TechCore
            status={status}
            voiceLevel={voiceLevel}
            customColor={customColor}
            focusLevel={focusLevel}
        />
        
        <EffectComposer>
           <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
        </EffectComposer>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
