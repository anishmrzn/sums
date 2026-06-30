import * as THREE from 'three';

export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  position: THREE.Vector3;
  color: string;
  size: number;
  logoAspect?: number;
  glowSize?: number;
  logoScale?: number;
}

export const planets: PlanetData[] = [
  { id: 'cogknit', name: 'Cogknit', tagline: 'Smart Learning Platform', position: new THREE.Vector3(5, 0.5, -2),  color: '#FE6D00', size: 0.65, logoAspect: 1.0,  glowSize: 0.65, logoScale: 1.0  },
  { id: 'sip',     name: 'SIP',     tagline: 'Strategic Integrations',   position: new THREE.Vector3(-5, -0.8, -4), color: '#FE6D00', size: 0.70, logoAspect: 1.57, glowSize: 0.70, logoScale: 0.52 },
  { id: 'aic',     name: 'AIC',     tagline: 'Youth Skill Incubation',   position: new THREE.Vector3(4, -4, -8),   color: '#FE6D00', size: 0.80, logoAspect: 1.81, glowSize: 0.80, logoScale: 0.44 },
];

export const orbitParams = {
  cogknit: { speed: 0.35, baseAngle: 0 },
  sip:     { speed: 0.25, baseAngle: Math.PI / 2 },
  aic:     { speed: 0.12, baseAngle: 1.5 * Math.PI },
};

export const linePositions: { [key: string]: THREE.Vector3 } = {
  sums:    new THREE.Vector3(-8, 0, 0),
  cogknit: new THREE.Vector3(-3, 0, 0),
  sip:     new THREE.Vector3(2,  0, 0),
  aic:     new THREE.Vector3(7,  0, 0),
};
