'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TechCore, { TechOrbProps } from './TechCore';

/**
 * CoreVisualizer Component
 *
 * Sets up the React Three Fiber canvas and environment.
 * Includes Post-Processing (Bloom) for the neon aesthetic.
 *
 * It wraps the `TechCore` geometry component which handles the actual 3D objects and animations.
 *
 * @param props - Configuration properties passed down to TechCore (status, voiceLevel, etc.)
 */
export default function CoreVisualizer(props: TechOrbProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <TechCore {...props} />
        
        <EffectComposer>
           <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
        </EffectComposer>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
