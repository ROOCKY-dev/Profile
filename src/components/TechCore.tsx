'use client';

import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { STATUS_HEX_COLORS, VISUALIZER_CONFIG } from '@/lib/constants';

/**
 * Props for the TechCore component.
 */
export interface TechOrbProps {
  /** Current status of the bot, affecting color and base speed. */
  status: BotStatus;
  /** Audio reactivity level (0-1), affects pulse intensity. */
  voiceLevel?: number;
  /** Optional custom hex color override. */
  customColor?: string;
  /** Focus level state, affects speed multiplier and pulse intensity. */
  focusLevel?: FocusLevel;
}

/**
 * TechCore Component
 *
 * The 3D geometry of the visualizer.
 * Consists of a glowing core sphere, a wireframe icosahedron shell, and three rotating toruses (rings).
 * Animations are driven by the `useFrame` hook based on status and focus level.
 *
 * @param props - Configuration properties for the visualizer.
 */
export default function TechCore({ status, voiceLevel = 0, customColor, focusLevel = 'NORMAL' }: TechOrbProps) {
  // References to the mesh objects for direct manipulation in the animation loop
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

    // Determine Pulse Intensity based on Focus Level
    let pulseIntensity = VISUALIZER_CONFIG.PULSE.NORMAL;
    if (focusLevel === 'HYPER_FOCUSED') pulseIntensity = VISUALIZER_CONFIG.PULSE.HYPER_FOCUSED;
    if (focusLevel === 'CALM') pulseIntensity = VISUALIZER_CONFIG.PULSE.CALM;

    const baseScale = 1;
    // Calculate pulse: Base + Voice Impact + Sine Wave Animation
    const pulse = 1 + (voiceLevel * 1.5) + (Math.sin(t * (pulseIntensity * 2)) * 0.05);

    if (coreRef.current) {
        coreRef.current.scale.setScalar(baseScale * pulse);
    }

    // Determine Base Speed based on Status
    let speed = VISUALIZER_CONFIG.SPEED.DEFAULT;
    if (status === 'CODING') speed = VISUALIZER_CONFIG.SPEED.CODING;
    if (status === 'GAMING') speed = VISUALIZER_CONFIG.SPEED.GAMING;
    if (status === 'DISCORD') speed = VISUALIZER_CONFIG.SPEED.DISCORD;
    if (status === 'BROWSING') speed = VISUALIZER_CONFIG.SPEED.BROWSING;
    if (status === 'OFFLINE') speed = VISUALIZER_CONFIG.SPEED.OFFLINE;

    // Apply Focus Multiplier to Speed
    if (focusLevel === 'HYPER_FOCUSED') speed *= VISUALIZER_CONFIG.FOCUS_SPEED_MULTIPLIER.HYPER_FOCUSED;
    if (focusLevel === 'CALM') speed *= VISUALIZER_CONFIG.FOCUS_SPEED_MULTIPLIER.CALM;

    /**
     * Animation Loop
     * Rotates the wireframe shell and rings based on calculated speed.
     * Uses delta time for frame-rate independent animation.
     */

    // Rotate Wireframe Shell
    if (outerRef.current) {
        outerRef.current.rotation.y += delta * speed * 0.2;
        outerRef.current.rotation.z += delta * speed * 0.1;
    }

    // Rotate Rings (Gyroscope style - more dynamic)
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
