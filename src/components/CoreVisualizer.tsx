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

// Animation Constants
const ANIMATION_CONFIG = {
  BASE_PULSE_INTENSITY: 1,
  HYPER_FOCUS_INTENSITY: 2,
  CALM_FOCUS_INTENSITY: 0.5,
  BASE_SCALE: 1,
  VOICE_SENSITIVITY: 1.5,
  SPEED_MODIFIERS: {
    CODING: 2,
    GAMING: 3,
    DISCORD: 1.5,
    BROWSING: 1,
    OFFLINE: 0.1,
    DEFAULT: 0.5
  }
};

/**
 * TechCore Component
 *
 * The central 3D object representing the "AI Core".
 * Composed of:
 * 1. Inner Glowing Sphere (Pulse reactive)
 * 2. Wireframe Icosahedron Shell (Rotates)
 * 3. Three Torus Rings (Gyroscopic rotation)
 */
function TechCore({ status, voiceLevel = 0, customColor, focusLevel = 'NORMAL' }: TechOrbProps) {
  // References to mesh objects for direct manipulation in the animation loop
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  /**
   * Memoize the color calculation.
   * Logic:
   * 1. Custom color takes precedence.
   * 2. Special case: Coding + Hyper Focused = Magenta.
   * 3. Fallback to standard status color map.
   */
  const color = useMemo(() => {
    const c = new THREE.Color();
    if (status === 'CUSTOM' && customColor) {
      return c.set(customColor);
    }
    if (status === 'CODING' && focusLevel === 'HYPER_FOCUSED') {
       return c.set('#d946ef'); // Magenta for hyper focus
    }

    return c.set(STATUS_HEX_COLORS[status] || '#ffffff');
  }, [status, customColor, focusLevel]);

  /**
   * Main Animation Loop (running at ~60fps)
   * Handles rotation, pulsing, and dynamic speed adjustments based on state.
   */
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // --- 1. Pulse Calculation ---
    // Determine intensity based on focus level
    let pulseIntensity = ANIMATION_CONFIG.BASE_PULSE_INTENSITY;
    if (focusLevel === 'HYPER_FOCUSED') pulseIntensity = ANIMATION_CONFIG.HYPER_FOCUS_INTENSITY;
    if (focusLevel === 'CALM') pulseIntensity = ANIMATION_CONFIG.CALM_FOCUS_INTENSITY;

    // Calculate scale pulse: Base + Voice Reaction + Sine Wave Heartbeat
    const pulse = ANIMATION_CONFIG.BASE_SCALE + (voiceLevel * ANIMATION_CONFIG.VOICE_SENSITIVITY) + (Math.sin(t * (pulseIntensity * 2)) * 0.05);

    // Apply scale to inner core
    if (coreRef.current) {
        coreRef.current.scale.setScalar(pulse);
    }

    // --- 2. Rotation Speed Calculation ---
    // Base speed derived from current status
    let speed = ANIMATION_CONFIG.SPEED_MODIFIERS.DEFAULT;
    if (status === 'CODING') speed = ANIMATION_CONFIG.SPEED_MODIFIERS.CODING;
    if (status === 'GAMING') speed = ANIMATION_CONFIG.SPEED_MODIFIERS.GAMING;
    if (status === 'DISCORD') speed = ANIMATION_CONFIG.SPEED_MODIFIERS.DISCORD;
    if (status === 'BROWSING') speed = ANIMATION_CONFIG.SPEED_MODIFIERS.BROWSING;
    if (status === 'OFFLINE') speed = ANIMATION_CONFIG.SPEED_MODIFIERS.OFFLINE;

    // Apply Focus Level Modifiers to speed
    if (focusLevel === 'HYPER_FOCUSED') speed *= 2.5;
    if (focusLevel === 'CALM') speed *= 0.5;
    
    // --- 3. Apply Rotations ---
    // Use delta time for frame-rate independence

    // Rotate Wireframe Shell
    if (outerRef.current) {
        outerRef.current.rotation.y += delta * speed * 0.2;
        outerRef.current.rotation.z += delta * speed * 0.1;
    }

    // Rotate Rings (Gyroscopic style - varying axes and speeds)
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
 * CoreVisualizer
 *
 * Top-level component that sets up the React Three Fiber Canvas, Lights, and Post-processing effects.
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
