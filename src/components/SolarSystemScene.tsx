/* eslint-disable react-hooks/immutability */
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Line, Html } from '@react-three/drei';
import * as THREE from 'three';



// Predefined spline curve path through the solar system (camera position)
const cameraSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 6, 28),    // Start (Hero view - wider and higher to see everything)
  new THREE.Vector3(0, 3, 20),    // Scroll entry (closer)
  new THREE.Vector3(4, 1.5, 12),  // Cogknit focus milestone
  new THREE.Vector3(-4, -0.2, 7), // SIP focus milestone
  new THREE.Vector3(-2, -1.8, 3), // Academia focus milestone
  new THREE.Vector3(3, -2.8, -1)  // AIC focus milestone
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
  size: number;
  onClick?: (e: any) => void;
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
}> = ({ texture, size, onClick, onPointerOver, onPointerOut }) => {
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
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[size * 2, size * 2]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
};



// Inner component to handle frame-by-frame updates in the Three.js canvas
const SceneContent: React.FC<{ 
  scrollProgress: number; 
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
}> = ({ scrollProgress, activePlatform, zoomingPlatform, detailScrollY, onSelectPlatform }) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraTargetPos = useRef(new THREE.Vector3(0, 6, 28));
  const lookAtTargetPos = useRef(new THREE.Vector3(0, 0, 0));
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  // Generate procedural textures once
  const textures = useMemo(() => ({
    sums: createLogoTexture('sums', 'SUMS', '#FD4400'),
    cogknit: createLogoTexture('cogknit', 'Cogknit', '#FD4400'),
    sip: createLogoTexture('sip', 'SIP', '#FD4400'),
    academia: createLogoTexture('academia', 'Academia', '#FD4400'),
    aic: createLogoTexture('aic', 'AIC', '#FD4400'),
  }), []);

  const detailFade = Math.max(0, 1 - detailScrollY / 500);
  const scrollFade = activePlatform ? 1 : Math.max(0, 1 - Math.max(0, scrollProgress - 0.9) / 0.1);
  const globalOpacity = detailFade * scrollFade;

  useFrame((state) => {
    const targetPlatformId = zoomingPlatform || activePlatform;

    if (targetPlatformId) {
      const selectedPlanet = planets.find(p => p.id === targetPlatformId);
      if (selectedPlanet) {
        // Zoom closely into the planet, keeping it perfectly centered vertically (no Y offset)
        const scrollOffsetZ = activePlatform ? detailScrollY * 0.012 : 0;
        cameraTargetPos.current.copy(selectedPlanet.position).add(new THREE.Vector3(0, 0, 3.2 + scrollOffsetZ));
        lookAtTargetPos.current.copy(selectedPlanet.position);
      }
    } else {
      // standard spline journey
      const splinePoint = cameraSpline.getPointAt(scrollProgress);
      const splineTarget = targetSpline.getPointAt(scrollProgress);
      cameraTargetPos.current.copy(splinePoint);
      lookAtTargetPos.current.copy(splineTarget);
    }

    const lerpFactor = targetPlatformId ? 0.08 : 0.05;
    camera.position.lerp(cameraTargetPos.current, lerpFactor);
    currentTarget.current.lerp(lookAtTargetPos.current, lerpFactor);
    camera.lookAt(currentTarget.current);

    const targetFov = targetPlatformId ? 40 : 50 - scrollProgress * 5;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();
    }

    const targetFog = activePlatform 
      ? 0.02 + (detailScrollY * 0.003) 
      : 0.018 + (scrollProgress * 0.04);
    state.scene.fog = new THREE.FogExp2('#040507', targetFog);
  });

  return (
    <group>
      {/* Stars Background */}
      {globalOpacity > 0.01 && (
        <Stars 
          radius={150} 
          depth={50} 
          count={Math.floor(5000 * globalOpacity)} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1.2} 
        />
      )}

      {/* Ambient and Point Lights */}
      <ambientLight intensity={0.2 * globalOpacity} />
      <pointLight position={[10, 10, 10]} intensity={1.8 * globalOpacity} color="#FD4400" />
      <pointLight position={[-10, -10, -10]} intensity={0.6 * globalOpacity} color="#ffffff" />

      {/* SUMS Central Core */}
      <group position={[0, 0, 0]}>
        {globalOpacity > 0.01 && (
          <>
            <PlanetBillboard texture={textures.sums} size={2.0} />
            <mesh scale={[1.15, 1.15, 1.15]}>
              <sphereGeometry args={[2.0, 32, 32]} />
              <meshBasicMaterial 
                color="#FD4400" 
                transparent 
                opacity={0.12 * globalOpacity} 
                side={THREE.BackSide} 
              />
            </mesh>
          </>
        )}
      </group>

      {/* Planets and orbits */}
      {planets.map((planet) => {
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
            {globalOpacity > 0.01 && !activePlatform && (
              <Line 
                points={points} 
                color={`rgba(253, 68, 0, ${0.1 * globalOpacity})`}
                lineWidth={1} 
                dashed 
                dashScale={1.5}
              />
            )}

            {/* Clickable Planet group */}
            <group position={planet.position}>
              {globalOpacity > 0.01 && (
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
                      opacity={isFocussed ? 0.25 : 0.08 * globalOpacity} 
                      side={THREE.BackSide} 
                    />
                  </mesh>

                  {/* Billboard Logo Face */}
                  <PlanetBillboard 
                    texture={textures[textureKey]} 
                    size={planet.size} 
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

                  {/* Drei HTML Hover Tooltip */}
                  {hoveredPlatform === planet.id && (
                    <Html distanceFactor={12} position={[0, planet.size + 0.5, 0]} center>
                      <div className="bg-[#040507]/95 border border-[#FD4400]/40 px-3 py-2 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(253,68,0,0.3)] pointer-events-none min-w-[160px] text-center select-none">
                        <h4 className="text-[11px] font-bold tracking-widest text-[#FD4400] uppercase font-serif">{planet.name}</h4>
                        <p className="text-[9px] text-white/60 font-sans mt-0.5 whitespace-nowrap">{planet.tagline}</p>
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
  activePlatform: string | null;
  zoomingPlatform: string | null;
  detailScrollY: number;
  onSelectPlatform: (id: string) => void;
}

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  scrollProgress,
  activePlatform,
  zoomingPlatform,
  detailScrollY,
  onSelectPlatform,
}) => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto bg-[#040507]">
      <Canvas
        camera={{ position: [0, 6, 28], fov: 50, near: 0.1, far: 1000 }}
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
        />
      </Canvas>
    </div>
  );
};
