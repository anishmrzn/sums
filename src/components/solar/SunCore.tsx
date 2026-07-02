import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const SunCore: React.FC = () => {
  const logoTexture = useLoader(THREE.TextureLoader, '/sums_logo.png');
  const meshRef = useRef<THREE.Mesh>(null);
  const halo1Ref = useRef<THREE.Mesh>(null);
  const halo2Ref = useRef<THREE.Mesh>(null);
  const halo3Ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const glowTextures = useMemo(() => {
    const makeGlow = (size: number, innerRgba: string, midRgba: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const cx = size / 2;
      const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
      grad.addColorStop(0, innerRgba);
      grad.addColorStop(0.35, midRgba);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };
    return {
      inner: makeGlow(512, 'rgba(255,150,50,1)',    'rgba(255,80,0,0.55)'),
      mid:   makeGlow(512, 'rgba(255,100,20,0.75)', 'rgba(220,50,0,0.25)'),
      outer: makeGlow(512, 'rgba(255,60,0,0.45)',   'rgba(180,20,0,0.0)'),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current)  meshRef.current.quaternion.copy(camera.quaternion);
    if (halo1Ref.current) halo1Ref.current.quaternion.copy(camera.quaternion);
    if (halo2Ref.current) halo2Ref.current.quaternion.copy(camera.quaternion);
    if (halo3Ref.current) halo3Ref.current.quaternion.copy(camera.quaternion);

    const pulse  = (Math.sin(t * 1.4) + 1) / 2;
    const pulse2 = (Math.sin(t * 0.9 + 1.0) + 1) / 2;
    const pulse3 = (Math.sin(t * 0.6 + 2.5) + 1) / 2;

    if (halo1Ref.current) (halo1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.55 + pulse  * 0.30;
    if (halo2Ref.current) (halo2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + pulse2 * 0.20;
    if (halo3Ref.current) (halo3Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.20 + pulse3 * 0.15;
  });

  return (
    <group>
      <mesh ref={halo3Ref}>
        <planeGeometry args={[7.0, 7.0]} />
        <meshBasicMaterial map={glowTextures.outer} transparent opacity={0.20} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={halo2Ref}>
        <planeGeometry args={[4.8, 4.8]} />
        <meshBasicMaterial map={glowTextures.mid} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={halo1Ref}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial map={glowTextures.inner} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={meshRef} scale={[2.4, 2.4, 2.4]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={logoTexture} transparent opacity={1.0} depthWrite={false} alphaTest={0.01} />
      </mesh>
      <pointLight color="#FF5500" intensity={3.5} distance={18} decay={2} />
    </group>
  );
};
