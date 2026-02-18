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
  voiceLevel?: number; // 0 to 1, representing audio amplitude
  customColor?: string;
  focusLevel?: FocusLevel;
}

/**
 * TechCore Component
 *
 * Represents the 3D geometry of the AI Core.
 * Structure:
 * 1. Inner Sphere: pulsates based on voice activity and focus level.
 * 2. Outer Icosahedron: acts as a protective wireframe shell.
 * 3. Gyroscopic Rings: three torus meshes rotating on different axes.
 *
 * Animations are driven by the `useFrame` hook, ensuring smooth 60fps updates
 * independent of React renders.
 */
function TechCore({ status, voiceLevel = 0, customColor, focusLevel = 'NORMAL' }: TechOrbProps) {
  // References to mesh objects for direct manipulation in the animation loop
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  /**
   * Memoize the color calculation to optimize performance.
   * Logic:
   * - If status is CUSTOM and a color is provided, use it.
   * - If status is CODING and focus is HYPER_FOCUSED, override with Magenta (#d946ef).
   * - Otherwise, look up the color from STATUS_HEX_COLORS based on the status.
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

  /**
   * Animation Loop (Run per frame)
   *
   * Uses `delta` (time since last frame) to ensure consistent speed across different refresh rates.
   * `state.clock.getElapsedTime()` is used for sine wave calculations.
   */
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // --- 1. Core Pulse Animation ---
    // Intensity varies by focus level
    let pulseIntensity = 1;
    if (focusLevel === 'HYPER_FOCUSED') pulseIntensity = 2; // Faster, stronger pulse
    if (focusLevel === 'CALM') pulseIntensity = 0.5; // Slow, breathing pulse

    const baseScale = 1;
    // Calculate scale: Base + Voice Reactivity + Idle Breathing (Sine Wave)
    const pulse = 1 + (voiceLevel * 1.5) + (Math.sin(t * (pulseIntensity * 2)) * 0.05);

    if (coreRef.current) {
        coreRef.current.scale.setScalar(baseScale * pulse);
    }

    // --- 2. Rotation Speed Calculation ---
    // Speed varies significantly by status to convey "energy level"
    let speed = 0.5;
    if (status === 'CODING') speed = 2;
    if (status === 'GAMING') speed = 3;
    if (status === 'DISCORD') speed = 1.5;
    if (status === 'BROWSING') speed = 1;
    if (status === 'OFFLINE') speed = 0.1;

    // Apply Focus Level modifier to speed
    if (focusLevel === 'HYPER_FOCUSED') speed *= 2.5;
    if (focusLevel === 'CALM') speed *= 0.5;
    
    // --- 3. Apply Rotations ---

    // Rotate Wireframe Shell (Slow, steady background rotation)
    if (outerRef.current) {
        outerRef.current.rotation.y += delta * speed * 0.2;
        outerRef.current.rotation.z += delta * speed * 0.1;
    }

    // Rotate Rings (Gyroscope style - interlocking motion)

    // Ring 1 (Inner) - Primary X axis rotation
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x += delta * speed * 0.5;
        ring1Ref.current.rotation.y += delta * speed * 0.2;
    }

    // Ring 2 (Middle) - Primary Y axis rotation
    if (ring2Ref.current) {
        ring2Ref.current.rotation.y += delta * speed * 0.4;
        ring2Ref.current.rotation.z += delta * speed * 0.2;
    }

    // Ring 3 (Outer) - Primary Z axis rotation
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
 * The main container for the 3D scene.
 * Responsibilities:
 * - Initialize the R3F Canvas.
 * - Set up lighting (Ambient + Point).
 * - Configure Post-Processing (Bloom effect for the "neon" look).
 * - Render the `TechCore` with current props.
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
