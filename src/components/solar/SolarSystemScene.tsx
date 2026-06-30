import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneContent } from './SceneContent';

interface SolarSystemSceneProps {
  scrollProgress: number;
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
  ecosystemRevealed: boolean;
  hideCanvas: boolean;
}

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  scrollProgress, activePlatform, zoomingPlatform, detailScrollY,
  onSelectPlatform, ecosystemRevealed, hideCanvas,
}) => {
  const isDimmed = !ecosystemRevealed && !activePlatform;
  const canvasOpacity = activePlatform ? 0 : hideCanvas ? 0 : isDimmed ? 0.45 : 1.0;

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#040507]">
      <div
        className="w-full h-full pointer-events-auto transition-all duration-500 ease-in-out"
        style={{
          opacity: canvasOpacity,
          transform: activePlatform ? 'translateY(0)' : 'translateY(70px)',
        }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 24], fov: 52, near: 0.1, far: 1000 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'default' }}
          onCreated={({ gl }) => { gl.setClearColor(new THREE.Color('#040507'), 1); }}
        >
          <fogExp2 attach="fog" args={['#040507', 0.018]} />
          <SceneContent
            scrollProgress={scrollProgress}
            activePlatform={activePlatform}
            zoomingPlatform={zoomingPlatform}
            detailScrollY={detailScrollY}
            onSelectPlatform={onSelectPlatform}
            ecosystemRevealed={ecosystemRevealed}
          />
        </Canvas>
      </div>
    </div>
  );
};
