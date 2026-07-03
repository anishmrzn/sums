import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, useLoader, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetLogoProps {
  texturePath: string;
  size: number;
  glowSize?: number;
  aspect?: number;
  opacity?: number;
  logoScale?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export const PlanetLogo: React.FC<PlanetLogoProps> = ({
  texturePath, size, glowSize, aspect = 1, opacity = 1, logoScale = 1,
  onClick, onPointerOver, onPointerOut,
}) => {
  const gs = glowSize ?? size;
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const meshRef = useRef<THREE.Mesh>(null);
  const halo1Ref = useRef<THREE.Mesh>(null);
  const halo2Ref = useRef<THREE.Mesh>(null);
  const halo3Ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const glowTextures = useMemo(() => {
    const makeGlow = (stops: [number, string][]) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const cx = 128;
      const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
      stops.forEach(([t, c]) => grad.addColorStop(t, c));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };
    return {
      inner: makeGlow([
        [0.00, 'rgba(255,150,50,0.75)'],
        [0.15, 'rgba(254,110,0,0.50)'],
        [0.40, 'rgba(254,70,0,0.18)'],
        [0.70, 'rgba(200,35,0,0.05)'],
        [1.00, 'rgba(0,0,0,0)'],
      ]),
      mid: makeGlow([
        [0.00, 'rgba(254,90,0,0.30)'],
        [0.35, 'rgba(180,40,0,0.08)'],
        [0.70, 'rgba(100,20,0,0.02)'],
        [1.00, 'rgba(0,0,0,0)'],
      ]),
      outer: makeGlow([
        [0.00, 'rgba(254,60,0,0.12)'],
        [0.50, 'rgba(150,25,0,0.03)'],
        [1.00, 'rgba(0,0,0,0)'],
      ]),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) meshRef.current.quaternion.copy(camera.quaternion);
    if (halo1Ref.current) {
      halo1Ref.current.quaternion.copy(camera.quaternion);
      const pulse = (Math.sin(t * 1.3) + 1) / 2;
      (halo1Ref.current.material as THREE.MeshBasicMaterial).opacity = (0.32 + pulse * 0.18) * opacity;
    }
    if (halo2Ref.current) {
      halo2Ref.current.quaternion.copy(camera.quaternion);
      const pulse2 = (Math.sin(t * 0.8 + 1.2) + 1) / 2;
      (halo2Ref.current.material as THREE.MeshBasicMaterial).opacity = (0.18 + pulse2 * 0.10) * opacity;
    }
    if (halo3Ref.current) {
      halo3Ref.current.quaternion.copy(camera.quaternion);
      const pulse3 = (Math.sin(t * 0.5 + 2.5) + 1) / 2;
      (halo3Ref.current.material as THREE.MeshBasicMaterial).opacity = (0.08 + pulse3 * 0.06) * opacity;
    }
  });

  return (
    <group onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <mesh ref={halo3Ref}>
        <planeGeometry args={[gs * 6.5, gs * 6.5]} />
        <meshBasicMaterial map={glowTextures.outer} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={halo2Ref}>
        <planeGeometry args={[gs * 4.2, gs * 4.2]} />
        <meshBasicMaterial map={glowTextures.mid} transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={halo1Ref}>
        <planeGeometry args={[gs * 2.8, gs * 2.8]} />
        <meshBasicMaterial map={glowTextures.inner} transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={meshRef} scale={[size * 2 * aspect * logoScale, size * 2 * logoScale, size * 2 * logoScale]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} alphaTest={0.01} />
      </mesh>
    </group>
  );
};
