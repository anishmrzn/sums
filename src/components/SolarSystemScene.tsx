/* eslint-disable react-hooks/immutability */
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Line, Html } from '@react-three/drei';
import * as THREE from 'three';



// Predefined spline curve path through the solar system (camera position)
const cameraSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.5, 24),   // Start (Hero view — perfectly centred)
  new THREE.Vector3(0, 1, 18),     // Scroll entry (closing in)
  new THREE.Vector3(4, 0.5, 12),   // Cogknit focus milestone
  new THREE.Vector3(-4, -0.5, 7),  // SIP focus milestone
  new THREE.Vector3(-2, -1.8, 3),  // Academia focus milestone
  new THREE.Vector3(3, -2.8, -1)   // AIC focus milestone
]);

// Predefined targets the camera looks at along the journey
const targetSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),     // Hero looks at SUMS Core
  new THREE.Vector3(0, 0, 0),     // Entering looks at Core
  new THREE.Vector3(5, 0.5, -2),  // Focus Cogknit
  new THREE.Vector3(-5, -0.8, -4), // Focus SIP
  new THREE.Vector3(-3, -2.5, -6), // Focus Academia
  new THREE.Vector3(4, -4, -8)    // Focus AIC
]);

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
  { id: 'academia', name: 'Academia', tagline: 'Research & Peer Review', position: new THREE.Vector3(-3, -2.5, -6), color: '#FE6D00', size: 0.65 },
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
  } else if (id === 'academia') {
    ctx.beginPath();
    ctx.arc(256, 240, 70, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(256, 240, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(256, 205);
    ctx.lineTo(300, 240);
    ctx.lineTo(256, 275);
    ctx.lineTo(212, 240);
    ctx.closePath();
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
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), 256, 385);

  ctx.font = 'bold 16px Inter, sans-serif';
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



const orbitParams = {
  cogknit: { speed: 0.35, baseAngle: 0 },
  sip: { speed: 0.25, baseAngle: Math.PI / 2 },
  academia: { speed: 0.18, baseAngle: Math.PI },
  aic: { speed: 0.12, baseAngle: 1.5 * Math.PI }
};

const linePositions: { [key: string]: THREE.Vector3 } = {
  sums: new THREE.Vector3(-20, 0, 0),
  cogknit: new THREE.Vector3(-10, 0, 0),
  sip: new THREE.Vector3(0, 0, 0),
  academia: new THREE.Vector3(10, 0, 0),
  aic: new THREE.Vector3(20, 0, 0)
};

// Inner component to handle frame-by-frame updates in the Three.js canvas
const SceneContent: React.FC<{ 
  scrollProgress: number; 
  scrollY: number;
  heroFadeProgress: number;
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
}> = ({ scrollProgress, scrollY, heroFadeProgress, activePlatform, zoomingPlatform, detailScrollY, onSelectPlatform }) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraTargetPos = useRef(new THREE.Vector3(0, 1.5, 24));
  const lookAtTargetPos = useRef(new THREE.Vector3(0, 0, 0));
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const sumsGroupRef = useRef<THREE.Group>(null);
  const planetGroupRefs = useRef<{ [key: string]: THREE.Group | null }>({});
  const lineRef = useRef<any>(null);
  // Tracks when the detail page was entered, for the zoom-out entrance animation
  const entryTime = useRef<number | null>(null);

  // Smooth transitions
  const smoothedScrollProgress = useRef(scrollProgress);
  const smoothedTransitionT = useRef(0);

  // Generate procedural textures once
  const textures = useMemo(() => ({
    sums: createLogoTexture('sums', 'SUMS', '#FD4400'),
    cogknit: createLogoTexture('cogknit', 'Cogknit', '#FD4400'),
    sip: createLogoTexture('sip', 'SIP', '#FD4400'),
    academia: createLogoTexture('academia', 'Academia', '#FD4400'),
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

  // Full opacity through phases 1–3 (0–3vh). Fade out from 3vh → 3.5vh as HTML sections appear.
  const sectionStart = window.innerHeight * 3.0;
  const fadeRange  = window.innerHeight * 0.5;
  const scrollFade = activePlatform
    ? 1.0
    : scrollY >= sectionStart
      ? Math.max(0, 1.0 - (scrollY - sectionStart) / fadeRange)
      : 1.0;

  const globalOpacity = scrollFade;

  // Dim scene while hero text is on screen so text stays readable.
  // Ramps from 0.25 (text fully visible) → 1.0 (text gone) as heroFadeProgress goes 0→1.
  const heroVisibility = activePlatform
    ? 1.0
    : Math.min(1.0, 0.25 + heroFadeProgress * 0.75);

  const finalOpacity = globalOpacity * heroVisibility;

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

    let targetTransitionT = 0;
    if (smoothedScrollProgress.current > 0.5) {
      const rawT = Math.min(1.0, (smoothedScrollProgress.current - 0.5) / 0.3);
      targetTransitionT = rawT * rawT * (3 - 2 * rawT); // smoothstep
    }
    smoothedTransitionT.current = THREE.MathUtils.lerp(
      smoothedTransitionT.current,
      targetTransitionT,
      lerpFactor
    );

    // 1. Calculate dynamic positions for all planets and core this frame
    const sumsOrbitPos = new THREE.Vector3(0, 0, 0);
    const sumsTargetPos = linePositions.sums;
    const sumsPos = new THREE.Vector3().lerpVectors(sumsOrbitPos, sumsTargetPos, smoothedTransitionT.current);
    if (sumsGroupRef.current) {
      sumsGroupRef.current.position.copy(sumsPos);
      const sumsScale = 1.0 + smoothedTransitionT.current * 1.5;
      sumsGroupRef.current.scale.setScalar(sumsScale);
    }

    const currentPlanetPositions: { [key: string]: THREE.Vector3 } = {};
    planets.forEach((planet) => {
      const plane = orbitPlanes.find(p => p.id === planet.id);
      if (plane) {
        const params = orbitParams[planet.id as keyof typeof orbitParams];
        // Orbit always on homepage; freeze position when inside a detail page
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
            const sizeScale = activePlatform ? 1.0 : (1.0 + smoothedTransitionT.current * 4.0);
            ref.scale.setScalar(sizeScale);
          }
        }
      }
    });

    // 2. Camera journey positioning
    if (targetPlatformId) {
      let targetPos = new THREE.Vector3();
      if (targetPlatformId === 'sums') {
        targetPos.copy(sumsPos);
      } else {
        targetPos.copy(currentPlanetPositions[targetPlatformId] || new THREE.Vector3());
      }

      // Zoom closely into the dynamic position
      // In straight-line mode planets are at z=0 — lerp to a larger offset so we don't over-zoom
      const scrollOffsetZ = activePlatform ? detailScrollY * 0.012 : 0;
      const baseZoomOffset = THREE.MathUtils.lerp(3.2, 6.5, smoothedTransitionT.current);
      
      const offsetTarget = targetPos.clone();
      if (activePlatform) {
        // Shift camera target right (moving the planet left relative to the viewport) as user scrolls down,
        // matching the leftward translation of the moons circles.
        const shiftProgress = Math.min(1.0, detailScrollY / 300);
        offsetTarget.x += 0.95 * shiftProgress;
      }
      
      cameraTargetPos.current.copy(offsetTarget).add(new THREE.Vector3(0, 0, baseZoomOffset + scrollOffsetZ));
      lookAtTargetPos.current.copy(offsetTarget);
    } else {
      // Camera progress: slower in the first half to capture orbiting
      let cameraProgress = smoothedScrollProgress.current;
      if (smoothedScrollProgress.current <= 0.5) {
        cameraProgress = smoothedScrollProgress.current * 0.5; // goes from 0 to 0.25
      } else if (smoothedScrollProgress.current <= 0.8) {
        const t = (smoothedScrollProgress.current - 0.5) / 0.3;
        cameraProgress = 0.25 + t * 0.25; // goes from 0.25 to 0.5
      } else {
        const t = (smoothedScrollProgress.current - 0.8) / 0.2;
        cameraProgress = 0.5 + t * 0.2; // goes from 0.5 to 0.7
      }

      const splinePoint = cameraSpline.getPointAt(cameraProgress);
      const splineTarget = targetSpline.getPointAt(cameraProgress);

      // Align camera perspective perfectly flat/centered when in line mode
      const lineCameraPos = new THREE.Vector3(0, 0.8, 31);
      const lineLookAt = new THREE.Vector3(0, 0, 0);

      cameraTargetPos.current.lerpVectors(splinePoint, lineCameraPos, smoothedTransitionT.current);
      lookAtTargetPos.current.lerpVectors(splineTarget, lineLookAt, smoothedTransitionT.current);
    }

    const cameraLerpFactor = targetPlatformId ? 0.08 : 0.05;
    camera.position.lerp(cameraTargetPos.current, cameraLerpFactor);
    currentTarget.current.lerp(lookAtTargetPos.current, cameraLerpFactor);
    camera.lookAt(currentTarget.current);

    let targetFov = targetPlatformId ? 40 : 50 - smoothedScrollProgress.current * 5;
    // Widen field of view slightly in line mode to make sure all platforms fit nicely side-by-side
    if (!targetPlatformId) {
      targetFov = THREE.MathUtils.lerp(targetFov, 55, smoothedTransitionT.current);
    }

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();
    }

    // In straight-line mode clear the fog so outer planets at x=±20 aren't obscured.
    // Lerp fog density toward near-zero as smoothedTransitionT reaches 1.
    const orbitFog = activePlatform
      ? 0.02 + (detailScrollY * 0.003)
      : 0.018 + (smoothedScrollProgress.current * 0.02); // softer fog during orbit
    const targetFog = THREE.MathUtils.lerp(orbitFog, 0.003, smoothedTransitionT.current);
    state.scene.fog = new THREE.FogExp2('#040507', targetFog);

    // Zoom-out entrance animation on the active planet
    if (activePlatform) {
      // Record the moment we entered the detail page
      if (entryTime.current === null) entryTime.current = elapsedTime;
      const elapsed = elapsedTime - entryTime.current;
      const DURATION = 0.8;
      const t = Math.min(1.0, elapsed / DURATION);
      // Cubic ease-out: starts fast, decelerates to rest
      const eased = 1 - Math.pow(1 - t, 3);
      const entryScale = 1.8 - eased * 0.8; // 1.8 → 1.0
      const ref = planetGroupRefs.current[activePlatform];
      if (ref) ref.scale.setScalar(entryScale);
    } else {
      // Reset entry timer and scale when leaving detail page
      if (entryTime.current !== null) {
        entryTime.current = null;
        planets.forEach(p => {
          const ref = planetGroupRefs.current[p.id];
          if (ref) ref.scale.setScalar(1.0);
        });
      }
    }

    // Smoothly update line opacity
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.opacity = 0.25 * finalOpacity * smoothedTransitionT.current;
    }
  });

  return (
    <group>
      {/* Stars Background */}
      {finalOpacity > 0.01 && (
        <Stars 
          radius={150} 
          depth={50} 
          count={Math.floor(5000 * finalOpacity)} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1.2} 
        />
      )}

      {/* Ambient and Point Lights */}
      <ambientLight intensity={0.2 * finalOpacity} />
      <pointLight position={[10, 10, 10]} intensity={1.8 * finalOpacity} color="#FD4400" />
      <pointLight position={[-10, -10, -10]} intensity={0.6 * finalOpacity} color="#ffffff" />

      {/* SUMS Central Core — hidden in detail page */}
      <group ref={sumsGroupRef} position={[0, 0, 0]}>
        {finalOpacity > 0.01 && !activePlatform && (
          <>
            <PlanetBillboard texture={textures.sums} scale={2.0} opacity={finalOpacity} />
            <mesh scale={[1.15, 1.15, 1.15]}>
              <sphereGeometry args={[2.0, 32, 32]} />
              <meshBasicMaterial 
                color="#FD4400" 
                transparent 
                opacity={0.12 * finalOpacity} 
                side={THREE.BackSide} 
              />
            </mesh>
          </>
        )}
      </group>

      {/* Straight line connector that fades in when aligning */}
      {finalOpacity > 0.01 && !activePlatform && (
        <Line 
          ref={lineRef}
          points={[
            new THREE.Vector3(-20, 0, 0),
            new THREE.Vector3(20, 0, 0)
          ]} 
          color="#ffffff"
          transparent
          opacity={0}
          lineWidth={1} 
          dashed 
          dashScale={1.5}
        />
      )}

      {/* Planets and orbits */}
      {planets.map((planet) => {
        // In detail view: skip all planets except the active one
        if (activePlatform && activePlatform !== planet.id) return null;

        // Generate a tilted 3D orbit circle that passes exactly through the planet position
        const points = [];
        const radius = planet.position.length();
        const u = planet.position.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        // Find a vector perpendicular to both the planet direction and the up vector
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
            {/* Orbit line */}
            {finalOpacity > 0.01 && !activePlatform && (
              <Line 
                points={points} 
                color="#ffffff"
                transparent
                opacity={0.25 * finalOpacity * (1 - smoothedTransitionT.current)}
                lineWidth={1} 
                dashed 
                dashScale={1.5}
              />
            )}

            {/* Clickable Planet group */}
            <group 
              ref={(el) => { planetGroupRefs.current[planet.id] = el; }}
              position={planet.position}
            >
              {finalOpacity > 0.01 && (
                <>
                  {/* Outer atmosphere halo */}
                  <mesh 
                    scale={[1.1, 1.1, 1.1]}
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
                          : 0.08 * finalOpacity
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
                        ? finalOpacity * Math.max(0, 1 - detailScrollY / 350)
                        : finalOpacity
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

                  {/* Drei HTML Hover Tooltip — no distanceFactor = fixed pixel size always */}
                  {hoveredPlatform === planet.id && (
                    <Html position={[0, planet.size + 0.8, 0]} center zIndexRange={[100, 0]}>
                      <div style={{ transform: 'scale(1)', pointerEvents: 'none', userSelect: 'none', textAlign: 'center', background: 'rgba(4,5,7,0.96)', border: '1.5px solid rgba(253,68,0,0.6)', borderRadius: '14px', padding: '14px 24px', minWidth: '240px', boxShadow: '0 0 28px rgba(253,68,0,0.45)', backdropFilter: 'blur(12px)' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.18em', color: '#FD4400', textTransform: 'uppercase', fontFamily: 'serif', margin: 0 }}>{planet.name}</h4>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', marginTop: '6px', whiteSpace: 'nowrap', fontFamily: 'sans-serif' }}>{planet.tagline}</p>
                      </div>
                    </Html>
                  )}
                </>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
};

interface SolarSystemSceneProps {
  scrollProgress: number;
  scrollY: number;
  heroFadeProgress: number;
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
}

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  scrollProgress,
  scrollY,
  heroFadeProgress,
  activePlatform,
  zoomingPlatform,
  detailScrollY,
  onSelectPlatform,
}) => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto bg-[#040507]">
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
          scrollY={scrollY}
          heroFadeProgress={heroFadeProgress}
          activePlatform={activePlatform}
          zoomingPlatform={zoomingPlatform}
          detailScrollY={detailScrollY}
          onSelectPlatform={onSelectPlatform}
        />
      </Canvas>
    </div>
  );
};
