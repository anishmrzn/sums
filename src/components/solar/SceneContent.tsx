/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { planets, orbitParams, linePositions } from '../../data/solarSystem';
import { BRAND_HEX } from '../../constants/theme';
import { PlanetLogo } from './PlanetLogo';
import { SunCore } from './SunCore';
import { OrbitRing } from './OrbitRing';

interface SceneContentProps {
  scrollProgress: number;
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
  ecosystemRevealed: boolean;
}

const planetLogoPaths: Record<string, string> = {
  cogknit: '/cogknitlogo.png',
  sip: '/logos/sip_logo.png',
  aic: '/logos/aic_logo.png',
};

export const SceneContent: React.FC<SceneContentProps> = ({
  scrollProgress, activePlatform, zoomingPlatform, detailScrollY, onSelectPlatform, ecosystemRevealed,
}) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraTargetPos = useRef(new THREE.Vector3(0, 1.5, 24));
  const lookAtTargetPos = useRef(new THREE.Vector3(0, 0, 0));
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const sumsGroupRef = useRef<THREE.Group>(null);
  const planetGroupRefs = useRef<{ [key: string]: THREE.Group | null }>({});
  const lineRef = useRef<any>(null);
  const entryTime = useRef<number | null>(null);

  const [isAligned, setIsAligned] = useState(false);
  const isAlignedRef = useRef(false);

  const smoothedScrollProgress = useRef(scrollProgress);
  const smoothedTransitionT = useRef(0);
  const revealProgress = useRef(0);

  const orbitPlanes = useMemo(() => {
    return planets.map((planet) => {
      const radius = planet.position.length();
      const u = planet.position.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const v = new THREE.Vector3().crossVectors(u, up).normalize();
      return { id: planet.id, u, v, radius };
    });
  }, []);

  // Mutating `camera` (a three.js object) in place every frame is the
  // standard react-three-fiber pattern for smooth per-frame camera easing.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const targetPlatformId = zoomingPlatform || activePlatform;

    const lerpFactor = 1 - Math.exp(-8 * delta);
    smoothedScrollProgress.current = THREE.MathUtils.lerp(smoothedScrollProgress.current, scrollProgress, lerpFactor);

    revealProgress.current = THREE.MathUtils.lerp(revealProgress.current, ecosystemRevealed ? 1.0 : 0.0, lerpFactor);

    smoothedTransitionT.current = THREE.MathUtils.lerp(smoothedTransitionT.current, smoothedScrollProgress.current, lerpFactor);

    const sumsOrbitPos = new THREE.Vector3(0, 0, 0);
    const sumsTargetPos = linePositions.sums;
    const sumsPos = new THREE.Vector3().lerpVectors(sumsOrbitPos, sumsTargetPos, smoothedTransitionT.current);
    if (sumsGroupRef.current) {
      sumsGroupRef.current.position.copy(sumsPos);
      sumsGroupRef.current.scale.setScalar(1.0 + smoothedTransitionT.current * 0.3);
    }

    const currentPlanetPositions: { [key: string]: THREE.Vector3 } = {};
    planets.forEach((planet) => {
      const plane = orbitPlanes.find(p => p.id === planet.id);
      if (plane) {
        const params = orbitParams[planet.id as keyof typeof orbitParams];
        const speedFactor = activePlatform ? 0.0 : 1.0;
        const angle = params.baseAngle + elapsedTime * params.speed * speedFactor;
        const orbitPos = plane.u.clone().multiplyScalar(Math.cos(angle) * plane.radius)
          .add(plane.v.clone().multiplyScalar(Math.sin(angle) * plane.radius));
        const targetPos = linePositions[planet.id];
        const finalPos = new THREE.Vector3().lerpVectors(orbitPos, targetPos, smoothedTransitionT.current);
        currentPlanetPositions[planet.id] = finalPos;

        const ref = planetGroupRefs.current[planet.id];
        if (ref) {
          ref.position.copy(finalPos);
          if (activePlatform !== planet.id) {
            ref.scale.setScalar(activePlatform ? 1.0 : (1.0 + smoothedTransitionT.current * 0.8));
          }
        }
      }
    });

    if (targetPlatformId) {
      const targetPos = new THREE.Vector3();
      if (targetPlatformId === 'sums') {
        targetPos.copy(sumsPos);
      } else {
        targetPos.copy(currentPlanetPositions[targetPlatformId] || new THREE.Vector3());
      }

      const scrollOffsetZ = activePlatform ? detailScrollY * 0.012 : 0;
      const baseZoomOffset = THREE.MathUtils.lerp(3.2, 6.5, smoothedTransitionT.current);
      const offsetTarget = targetPos.clone();
      if (activePlatform) {
        const shiftProgress = Math.min(1.0, detailScrollY / 300);
        offsetTarget.x += 0.95 * shiftProgress;
      }
      cameraTargetPos.current.copy(offsetTarget).add(new THREE.Vector3(0, 0, baseZoomOffset + scrollOffsetZ));
      lookAtTargetPos.current.copy(offsetTarget);
    } else {
      const baseCamera = new THREE.Vector3(0, 1.5, 24);
      const isMobile = window.innerWidth < 1024;
      const zoomedCamera = new THREE.Vector3(0, -2.0, isMobile ? 22 : 17);
      const homeCameraPos = new THREE.Vector3().lerpVectors(baseCamera, zoomedCamera, revealProgress.current);
      const homeLookAt = new THREE.Vector3(0, 1.6, 0);

      const targetParallaxX = state.mouse.x * 1.0;
      const targetParallaxY = state.mouse.y * 0.6;
      homeLookAt.x += targetParallaxX;
      homeLookAt.y += targetParallaxY;
      homeCameraPos.x -= targetParallaxX * 0.4;
      homeCameraPos.y -= targetParallaxY * 0.4;

      cameraTargetPos.current.copy(homeCameraPos);
      lookAtTargetPos.current.copy(homeLookAt);
    }

    const cameraLerpFactor = targetPlatformId ? 0.08 : 0.05;
    camera.position.lerp(cameraTargetPos.current, cameraLerpFactor);
    currentTarget.current.lerp(lookAtTargetPos.current, cameraLerpFactor);
    camera.lookAt(currentTarget.current);

    let targetFov = targetPlatformId ? 40 : 50;
    if (!targetPlatformId) {
      const lineFov = window.innerWidth < 1024 ? 62 : 50;
      targetFov = THREE.MathUtils.lerp(targetFov, lineFov, smoothedTransitionT.current);
    }
    if (camera instanceof THREE.PerspectiveCamera) {
      // eslint-disable-next-line react-hooks/immutability -- see note above useFrame
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();
    }

    const targetFog = THREE.MathUtils.lerp(0.018, 0.005, revealProgress.current);
    state.scene.fog = new THREE.FogExp2('#040507', targetFog);

    if (activePlatform) {
      if (entryTime.current === null) entryTime.current = elapsedTime;
      const elapsed = elapsedTime - entryTime.current;
      const t = Math.min(1.0, elapsed / 0.8);
      const eased = 1 - Math.pow(1 - t, 3);
      const entryScale = 1.8 - eased * 0.8;
      const ref = planetGroupRefs.current[activePlatform];
      if (ref) ref.scale.setScalar(entryScale);
    } else {
      if (entryTime.current !== null) {
        entryTime.current = null;
        planets.forEach(p => {
          const ref = planetGroupRefs.current[p.id];
          if (ref) ref.scale.setScalar(1.0);
        });
      }
    }

    const nowAligned = smoothedTransitionT.current >= 0.9;
    if (nowAligned !== isAlignedRef.current) {
      isAlignedRef.current = nowAligned;
      setIsAligned(nowAligned);
    }

    if (lineRef.current && lineRef.current.material) {
      const targetLineOpacity = smoothedTransitionT.current >= 0.9 ? 0.22 : 0;
      lineRef.current.material.opacity = THREE.MathUtils.lerp(
        lineRef.current.material.opacity as number,
        targetLineOpacity,
        0.12
      );
    }
  });

  return (
    <group>
      <Stars radius={150} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1.2} />
      <Stars radius={280} depth={80} count={1200} factor={6} saturation={0.8} fade speed={0.4} />

      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color={BRAND_HEX} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" />

      <group ref={sumsGroupRef} position={[0, 0, 0]}>
        {!activePlatform && (
          <React.Suspense fallback={null}>
            <SunCore />
          </React.Suspense>
        )}
      </group>

      {!activePlatform && (
        <Line
          ref={lineRef}
          points={[new THREE.Vector3(-12, 0, 0), new THREE.Vector3(12, 0, 0)]}
          color="#ffffff"
          transparent
          opacity={0}
          lineWidth={1}
          dashed
          dashScale={1.5}
          renderOrder={-2}
        />
      )}

      {planets.map((planet) => {
        if (activePlatform && activePlatform !== planet.id) return null;
        const isFocussed = zoomingPlatform === planet.id || activePlatform === planet.id;

        return (
          <group key={planet.id}>
            {!activePlatform && (() => {
              const plane = orbitPlanes.find(p => p.id === planet.id);
              return plane ? <OrbitRing orbitPlane={plane} smoothedTransitionT={smoothedTransitionT} /> : null;
            })()}

            <group
              ref={(el) => { planetGroupRefs.current[planet.id] = el; }}
              position={planet.position}
            >
              <mesh
                scale={[1.15, 1.15, 1.15]}
                onClick={(e) => { e.stopPropagation(); if (!zoomingPlatform && !activePlatform) onSelectPlatform(planet.id); }}
                onPointerOver={(e) => { e.stopPropagation(); if (!zoomingPlatform && !activePlatform) { setHoveredPlatform(planet.id); document.body.style.cursor = 'pointer'; } }}
                onPointerOut={(e) => { e.stopPropagation(); setHoveredPlatform(null); document.body.style.cursor = 'default'; }}
              >
                <sphereGeometry args={[planet.size, 16, 16]} />
                <meshBasicMaterial
                  color={BRAND_HEX}
                  transparent
                  opacity={isFocussed ? 0.25 * Math.max(0, 1 - detailScrollY / 350) : 0.08}
                  side={THREE.BackSide}
                />
              </mesh>

              <React.Suspense fallback={null}>
                <PlanetLogo
                  texturePath={planetLogoPaths[planet.id]}
                  size={planet.size}
                  glowSize={planet.glowSize ?? planet.size}
                  aspect={planet.logoAspect ?? 1}
                  logoScale={planet.logoScale ?? 1}
                  opacity={activePlatform === planet.id ? Math.max(0, 1 - detailScrollY / 350) : 1.0}
                  onClick={(e) => { e.stopPropagation(); if (!zoomingPlatform && !activePlatform) onSelectPlatform(planet.id); }}
                  onPointerOver={(e) => { e.stopPropagation(); if (!zoomingPlatform && !activePlatform) { setHoveredPlatform(planet.id); document.body.style.cursor = 'pointer'; } }}
                  onPointerOut={(e) => { e.stopPropagation(); setHoveredPlatform(null); document.body.style.cursor = 'default'; }}
                />
              </React.Suspense>

              {hoveredPlatform === planet.id && (
                <Html position={[0, -(planet.size + 0.55), 0]} center zIndexRange={[100, 0]}>
                  <div style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center', background: 'rgba(4,5,7,0.96)', border: '1.5px solid rgba(253,68,0,0.6)', borderRadius: '12px', padding: '10px 20px', minWidth: '200px', boxShadow: '0 0 24px rgba(253,68,0,0.4)', backdropFilter: 'blur(12px)' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-brand)', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', margin: 0 }}>{planet.name}</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, sans-serif' }}>{planet.tagline}</p>
                  </div>
                </Html>
              )}

              {isAligned && ecosystemRevealed && !hoveredPlatform && !activePlatform && (
                <Html position={[0, -(planet.size + 0.58), 0]} center zIndexRange={[50, 0]}>
                  <div style={{ pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'explorePulse 2s ease-in-out infinite' }}>
                    <div style={{ background: 'rgba(253,68,0,0.18)', border: '1px solid rgba(253,68,0,0.55)', borderRadius: '999px', padding: '5px 14px', display: 'flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(8px)', boxShadow: '0 0 12px rgba(253,68,0,0.25)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-brand)', letterSpacing: '0.18em', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase' }}>
                        {planet.id === 'cogknit' ? 'Intelligence' : planet.id === 'sip' ? 'Innovation' : planet.id === 'aic' ? 'Employment' : 'Explore'}
                      </span>
                    </div>
                  </div>
                  <style>{`@keyframes explorePulse { 0%,100%{transform:translateY(0);opacity:0.65} 50%{transform:translateY(-5px);opacity:1} }`}</style>
                </Html>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
};
