/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MousePointerClick } from 'lucide-react';



interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  position: THREE.Vector3;
  color: string;
  size: number;
}

// Planets sized smaller (0.5 to 0.7) so they fit nicely within the hero view
const planets: PlanetData[] = [
  { id: 'cogknit', name: 'Cogknit', tagline: 'Smart Learning Platform', position: new THREE.Vector3(5, 0.5, -2), color: '#FE6D00', size: 0.6 },
  { id: 'sip', name: 'SIP', tagline: 'Strategic Integrations', position: new THREE.Vector3(-5, -0.8, -4), color: '#FE6D00', size: 0.7 },
  { id: 'aic', name: 'AIC', tagline: 'Youth Skill Incubation', position: new THREE.Vector3(4, -4, -8), color: '#FE6D00', size: 0.55 }
];

// Helper to create high-resolution procedural logo textures
const createLogoTexture = (id: string, name: string, color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  ctx.clearRect(0, 0, 512, 512);

  // Draw dark semi-transparent glass background
  ctx.fillStyle = 'rgba(4, 5, 7, 0.95)';
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.fill();

  // Draw double outer rings
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(256, 256, 210, 0, Math.PI * 2);
  ctx.stroke();

  // Draw central symbols
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (id === 'sums') {
    ctx.beginPath();
    ctx.arc(256, 256, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(254, 109, 0, 0.4)';
    for (let i = 0; i < 3; i++) {
      const radius = 90 + i * 30;
      ctx.beginPath();
      ctx.arc(256, 256, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      const angle = (i * Math.PI * 2 / 3) + Math.PI / 6;
      ctx.beginPath();
      ctx.arc(256 + Math.cos(angle) * radius, 256 + Math.sin(angle) * radius, 12, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  } else if (id === 'cogknit') {
    const nodes = [
      { x: 256, y: 160 },
      { x: 170, y: 220 },
      { x: 342, y: 220 },
      { x: 200, y: 310 },
      { x: 312, y: 310 }
    ];
    ctx.strokeStyle = color;
    ctx.beginPath();
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
      }
    }
    ctx.stroke();
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  } else if (id === 'sip') {
    ctx.beginPath();
    ctx.arc(206, 240, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(306, 240, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 240, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'aic') {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4);
      ctx.moveTo(256 + Math.cos(angle) * 30, 240 + Math.sin(angle) * 30);
      ctx.lineTo(256 + Math.cos(angle) * 80, 240 + Math.sin(angle) * 80);
    }
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 240, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(256, 240, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Platform Text
  ctx.font = 'bold 36px Poppins, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), 256, 385);

  ctx.font = 'bold 16px Poppins, sans-serif';
  ctx.fillStyle = color;
  ctx.fillText(id === 'sums' ? 'CORE ECOSYSTEM' : 'PLATFORM HUB', 256, 430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Component for a billboarded planet logo
const PlanetBillboard: React.FC<{
  texture: THREE.Texture;
  scale?: number;
  opacity?: number;
  onClick?: (e: any) => void;
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
}> = ({ texture, scale = 1, opacity = 1, onClick, onPointerOver, onPointerOut }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh 
      ref={meshRef}
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

/// ── SUMS Sun Core: renders sums_logo.png as a glowing 3D sun ──────────────────
const SunCore: React.FC = () => {
  const logoTexture = useLoader(THREE.TextureLoader, '/sums_logo.png');
  const meshRef = useRef<THREE.Mesh>(null);
  const halo1Ref = useRef<THREE.Mesh>(null);
  const halo2Ref = useRef<THREE.Mesh>(null);
  const halo3Ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Radial gradient glow textures — white/orange center fading to transparent
  // This makes the halos appear as perfect soft circles, not squares
  const glowTextures = useMemo(() => {
    const makeGlow = (size: number, innerRgba: string, midRgba: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const cx = size / 2;
      const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
      grad.addColorStop(0,   innerRgba);
      grad.addColorStop(0.35, midRgba);
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };
    return {
      inner: makeGlow(512, 'rgba(255,150,50,1)',   'rgba(255,80,0,0.55)'),
      mid:   makeGlow(512, 'rgba(255,100,20,0.75)','rgba(220,50,0,0.25)'),
      outer: makeGlow(512, 'rgba(255,60,0,0.45)',  'rgba(180,20,0,0.0)'),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Billboard — always face the camera
    if (meshRef.current)  meshRef.current.quaternion.copy(camera.quaternion);
    if (halo1Ref.current) halo1Ref.current.quaternion.copy(camera.quaternion);
    if (halo2Ref.current) halo2Ref.current.quaternion.copy(camera.quaternion);
    if (halo3Ref.current) halo3Ref.current.quaternion.copy(camera.quaternion);

    // Independent breathing pulse on each halo
    const pulse  = (Math.sin(t * 1.4) + 1) / 2;
    const pulse2 = (Math.sin(t * 0.9 + 1.0) + 1) / 2;
    const pulse3 = (Math.sin(t * 0.6 + 2.5) + 1) / 2;

    if (halo1Ref.current) {
      (halo1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.55 + pulse  * 0.30;
    }
    if (halo2Ref.current) {
      (halo2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + pulse2 * 0.20;
    }
    if (halo3Ref.current) {
      (halo3Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.20 + pulse3 * 0.15;
    }
  });

  return (
    <group>
      {/* Outermost wide corona — large soft circular glow */}
      <mesh ref={halo3Ref}>
        <planeGeometry args={[7.0, 7.0]} />
        <meshBasicMaterial
          map={glowTextures.outer}
          transparent
          opacity={0.20}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mid glow halo */}
      <mesh ref={halo2Ref}>
        <planeGeometry args={[4.8, 4.8]} />
        <meshBasicMaterial
          map={glowTextures.mid}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner hot glow — closest to the logo */}
      <mesh ref={halo1Ref}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={glowTextures.inner}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* The actual logo — PNG alpha makes it appear as a circle naturally */}
      <mesh ref={meshRef} scale={[2.4, 2.4, 2.4]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={1.0}
          depthWrite={false}
          alphaTest={0.01}
        />
      </mesh>

      {/* Point light — casts orange light onto orbiting planets */}
      <pointLight color="#FF5500" intensity={3.5} distance={18} decay={2} />
    </group>
  );
};

const orbitParams = {
  cogknit: { speed: 0.35, baseAngle: 0 },
  sip: { speed: 0.25, baseAngle: Math.PI / 2 },
  aic: { speed: 0.12, baseAngle: 1.5 * Math.PI }
};

const linePositions: { [key: string]: THREE.Vector3 } = {
  sums: new THREE.Vector3(-8, 0, 0),
  cogknit: new THREE.Vector3(-3, 0, 0),
  sip: new THREE.Vector3(2, 0, 0),
  aic: new THREE.Vector3(7, 0, 0)
};

// Orbit ring that morphs its geometry every frame from circle → flat line
const OrbitRing: React.FC<{
  orbitPlane: { u: THREE.Vector3; v: THREE.Vector3; radius: number };
  smoothedTransitionT: React.MutableRefObject<number>;
}> = ({ orbitPlane, smoothedTransitionT }) => {
  const COUNT = 128;

  const { lineObj, originPositions } = useMemo(() => {
    const originPositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      originPositions[i * 3]     = orbitPlane.u.x * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.x * Math.sin(angle) * orbitPlane.radius;
      originPositions[i * 3 + 1] = orbitPlane.u.y * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.y * Math.sin(angle) * orbitPlane.radius;
      originPositions[i * 3 + 2] = orbitPlane.u.z * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.z * Math.sin(angle) * orbitPlane.radius;
    }
    // COUNT+1 closes the loop so LineDashedMaterial draws dashes all the way around
    const TOTAL = COUNT + 1;
    const allPositions = new Float32Array(TOTAL * 3);
    for (let i = 0; i < TOTAL; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      allPositions[i * 3]     = orbitPlane.u.x * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.x * Math.sin(angle) * orbitPlane.radius;
      allPositions[i * 3 + 1] = orbitPlane.u.y * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.y * Math.sin(angle) * orbitPlane.radius;
      allPositions[i * 3 + 2] = orbitPlane.u.z * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.z * Math.sin(angle) * orbitPlane.radius;
      // copy back into originPositions (only first COUNT entries needed for morph)
      if (i < COUNT) {
        originPositions[i * 3]     = allPositions[i * 3];
        originPositions[i * 3 + 1] = allPositions[i * 3 + 1];
        originPositions[i * 3 + 2] = allPositions[i * 3 + 2];
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(allPositions, 3));
    const mat = new THREE.LineDashedMaterial({
      color: 0xffffff, transparent: true, opacity: 0.22,
      dashSize: 0.35, gapSize: 0.25,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    line.renderOrder = -1;
    return { lineObj: line, originPositions };
  }, []);

  useFrame(() => {
    const t = smoothedTransitionT.current;
    const pos = lineObj.geometry.attributes.position.array as Float32Array;
    const TOTAL = COUNT + 1;
    for (let i = 0; i < TOTAL; i++) {
      const srcIdx = Math.min(i, COUNT - 1);
      pos[i * 3]     = originPositions[srcIdx * 3];
      pos[i * 3 + 1] = THREE.MathUtils.lerp(originPositions[srcIdx * 3 + 1], 0, t);
      pos[i * 3 + 2] = THREE.MathUtils.lerp(originPositions[srcIdx * 3 + 2], 0, t);
    }
    lineObj.geometry.attributes.position.needsUpdate = true;
    lineObj.computeLineDistances();
    const mat = lineObj.material as THREE.LineDashedMaterial;
    const targetOpacity = 0.22 * Math.max(0, 1 - Math.max(0, t - 0.8) / 0.2);
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.12);
  });

  return <primitive object={lineObj} />;
};

// Inner component to handle frame-by-frame updates in the Three.js canvas
const SceneContent: React.FC<{
  scrollProgress: number; 
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
  ecosystemRevealed: boolean;
}> = ({ scrollProgress, activePlatform, zoomingPlatform, detailScrollY, onSelectPlatform, ecosystemRevealed }) => {
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

  // Generate procedural textures once (planet faces only)
  const textures = useMemo(() => ({
    cogknit: createLogoTexture('cogknit', 'Cogknit', '#FD4400'),
    sip: createLogoTexture('sip', 'SIP', '#FD4400'),
    aic: createLogoTexture('aic', 'AIC', '#FD4400'),
  }), []);

  const orbitPlanes = useMemo(() => {
    return planets.map((planet) => {
      const radius = planet.position.length();
      const u = planet.position.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const v = new THREE.Vector3().crossVectors(u, up).normalize();
      return { id: planet.id, u, v, radius };
    });
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const targetPlatformId = zoomingPlatform || activePlatform;

    // Smooth scrollProgress and transitionT (frame-rate independent)
    const lerpFactor = 1 - Math.exp(-8 * delta);
    smoothedScrollProgress.current = THREE.MathUtils.lerp(
      smoothedScrollProgress.current,
      scrollProgress,
      lerpFactor
    );

    // Zoom and reveal transition progress
    revealProgress.current = THREE.MathUtils.lerp(
      revealProgress.current,
      ecosystemRevealed ? 1.0 : 0.0,
      lerpFactor
    );

    smoothedTransitionT.current = THREE.MathUtils.lerp(
      smoothedTransitionT.current,
      smoothedScrollProgress.current,
      lerpFactor
    );

    // 1. Calculate dynamic positions for all planets and core this frame
    const sumsOrbitPos = new THREE.Vector3(0, 0, 0);
    const sumsTargetPos = linePositions.sums;
    const sumsPos = new THREE.Vector3().lerpVectors(sumsOrbitPos, sumsTargetPos, smoothedTransitionT.current);
    if (sumsGroupRef.current) {
      sumsGroupRef.current.position.copy(sumsPos);
      const sumsScale = 1.0 + smoothedTransitionT.current * 0.3;
      sumsGroupRef.current.scale.setScalar(sumsScale);
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
            const sizeScale = activePlatform ? 1.0 : (1.0 + smoothedTransitionT.current * 0.8);
            ref.scale.setScalar(sizeScale);
          }
        }
      }
    });

    // 2. Camera journey positioning
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
      // DEFAULT / HOME / ECOSYSTEM REVEAL VIEW
      const baseCamera = new THREE.Vector3(0, 1.5, 24);
      const isMobile = window.innerWidth < 768;
      const zoomedCamera = new THREE.Vector3(0, -2.0, isMobile ? 23 : 17); // Shifted from -1.6 to -2.0
      
      const homeCameraPos = new THREE.Vector3().lerpVectors(baseCamera, zoomedCamera, revealProgress.current);
      const homeLookAt = new THREE.Vector3(0, 1.6, 0); // Shifted from 1.3 to 1.6 to push the scene downward

      // Apply subtle mouse hover parallax
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
      const lineFov = window.innerWidth < 768 ? 68 : 50;
      targetFov = THREE.MathUtils.lerp(targetFov, lineFov, smoothedTransitionT.current);
    }

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();
    }

    // Fog Density transitions smoothly based on ecosystem reveal zoom
    const targetFog = THREE.MathUtils.lerp(0.018, 0.005, revealProgress.current);
    state.scene.fog = new THREE.FogExp2('#040507', targetFog);

    // Zoom-out entrance animation on the active planet
    if (activePlatform) {
      if (entryTime.current === null) entryTime.current = elapsedTime;
      const elapsed = elapsedTime - entryTime.current;
      const DURATION = 0.8;
      const t = Math.min(1.0, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      const entryScale = 1.8 - eased * 0.8; // 1.8 → 1.0
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

    // Track when planets are fully aligned so the click hint can appear
    const nowAligned = smoothedTransitionT.current >= 0.9;
    if (nowAligned !== isAlignedRef.current) {
      isAlignedRef.current = nowAligned;
      setIsAligned(nowAligned);
    }

    // Straight line only appears once planets are fully aligned
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
      {/* Stars Background */}
      <Stars 
        radius={150} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1.2} 
      />
      <Stars 
        radius={280} 
        depth={80} 
        count={1200} 
        factor={6} 
        saturation={0.8} 
        fade 
        speed={0.4} 
      />

      {/* Ambient and Point Lights */}
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color="#FD4400" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" />

      {/* SUMS Central Core — real logo as glowing 3D sun */}
      <group ref={sumsGroupRef} position={[0, 0, 0]}>
        {!activePlatform && (
          <React.Suspense fallback={null}>
            <SunCore />
          </React.Suspense>
        )}
      </group>

      {/* Straight line connector — always behind planets */}
      {!activePlatform && (
        <Line
          ref={lineRef}
          points={[
            new THREE.Vector3(-12, 0, 0),
            new THREE.Vector3(12, 0, 0)
          ]}
          color="#ffffff"
          transparent
          opacity={0}
          lineWidth={1}
          dashed
          dashScale={1.5}
          renderOrder={-2}
        />
      )}

      {/* Planets and orbits */}
      {planets.map((planet) => {
        if (activePlatform && activePlatform !== planet.id) return null;

        const points = [];
        const radius = planet.position.length();
        const u = planet.position.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const v = new THREE.Vector3().crossVectors(u, up).normalize();
        
        for (let i = 0; i <= 64; i++) {
          const angle = (i / 64) * Math.PI * 2;
          const p = u.clone().multiplyScalar(Math.cos(angle) * radius)
            .add(v.clone().multiplyScalar(Math.sin(angle) * radius));
          points.push(p);
        }

        const textureKey = planet.id as keyof typeof textures;
        const isFocussed = zoomingPlatform === planet.id || activePlatform === planet.id;

        return (
          <group key={planet.id}>
            {/* Orbit ring — geometry morphs circle → flat line each frame */}
            {!activePlatform && (() => {
              const plane = orbitPlanes.find(p => p.id === planet.id);
              return plane ? <OrbitRing orbitPlane={plane} smoothedTransitionT={smoothedTransitionT} /> : null;
            })()}

            {/* Clickable Planet group */}
            <group 
              ref={(el) => { planetGroupRefs.current[planet.id] = el; }}
              position={planet.position}
            >
              <>
                {/* Outer atmosphere halo */}
                <mesh 
                  scale={[1.15, 1.15, 1.15]}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!zoomingPlatform && !activePlatform) {
                      onSelectPlatform(planet.id);
                    }
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    if (!zoomingPlatform && !activePlatform) {
                      setHoveredPlatform(planet.id);
                      document.body.style.cursor = 'pointer';
                    }
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredPlatform(null);
                    document.body.style.cursor = 'default';
                  }}
                >
                  <sphereGeometry args={[planet.size, 16, 16]} />
                  <meshBasicMaterial 
                    color="#FD4400" 
                    transparent 
                    opacity={
                      isFocussed 
                        ? 0.25 * Math.max(0, 1 - detailScrollY / 350)
                        : 0.08
                    } 
                    side={THREE.BackSide} 
                  />
                </mesh>

                {/* Billboard Logo Face */}
                <PlanetBillboard 
                  texture={textures[textureKey]} 
                  scale={planet.size} 
                  opacity={
                    activePlatform === planet.id 
                      ? Math.max(0, 1 - detailScrollY / 350)
                      : 1.0
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!zoomingPlatform && !activePlatform) {
                      onSelectPlatform(planet.id);
                    }
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    if (!zoomingPlatform && !activePlatform) {
                      setHoveredPlatform(planet.id);
                      document.body.style.cursor = 'pointer';
                    }
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredPlatform(null);
                    document.body.style.cursor = 'default';
                  }}
                />

                {/* Tooltip — shown below planet on hover, closer distance */}
                {hoveredPlatform === planet.id && (
                  <Html position={[0, -(planet.size + 0.55), 0]} center zIndexRange={[100, 0]}>
                    <div style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center', background: 'rgba(4,5,7,0.96)', border: '1.5px solid rgba(253,68,0,0.6)', borderRadius: '12px', padding: '10px 20px', minWidth: '200px', boxShadow: '0 0 24px rgba(253,68,0,0.4)', backdropFilter: 'blur(12px)' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.15em', color: '#FD4400', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif', margin: 0 }}>{planet.name}</h4>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: 'Poppins, sans-serif' }}>{planet.tagline}</p>
                    </div>
                  </Html>
                )}

                {/* Click hint icon — only on Cogknit, only after planets are fully aligned */}
                {isAligned && ecosystemRevealed && !hoveredPlatform && !activePlatform && planet.id === 'cogknit' && (
                  <Html position={[0, -(planet.size + 0.38), 0]} center zIndexRange={[50, 0]}>
                    <div style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center', animation: 'clickHintBounce 2s ease-in-out infinite' }}>
                      <MousePointerClick size={20} color="#FD4400" strokeWidth={1.5} style={{ opacity: 0.85, filter: 'drop-shadow(0 0 6px rgba(253,68,0,0.6))' }} />
                    </div>
                    <style>{`@keyframes clickHintBounce { 0%,100%{transform:translateY(0) scale(1);opacity:0.5} 50%{transform:translateY(-5px) scale(1.1);opacity:1} }`}</style>
                  </Html>
                )}
              </>
            </group>
          </group>
        );
      })}
    </group>
  );
};

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
  scrollProgress,
  activePlatform,
  zoomingPlatform,
  detailScrollY,
  onSelectPlatform,
  ecosystemRevealed,
  hideCanvas,
}) => {
  const isDimmed = !ecosystemRevealed && !activePlatform;
  const canvasOpacity = (hideCanvas && !activePlatform) ? 0 : isDimmed ? 0.45 : 1.0;

  return (
    <div
      className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#040507]"
    >
      <div
        className="w-full h-full pointer-events-auto transition-all duration-1000 ease-in-out"
        style={{
          opacity: canvasOpacity,
          transform: activePlatform ? 'translateY(0)' : 'translateY(70px)',
        }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 24], fov: 52, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#040507'), 1);
          }}
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
