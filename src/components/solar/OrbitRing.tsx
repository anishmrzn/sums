import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitRingProps {
  orbitPlane: { u: THREE.Vector3; v: THREE.Vector3; radius: number };
  smoothedTransitionT: React.MutableRefObject<number>;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({ orbitPlane, smoothedTransitionT }) => {
  const COUNT = 128;

  const { lineObj, originPositions } = useMemo(() => {
    const originPositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      originPositions[i * 3]     = orbitPlane.u.x * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.x * Math.sin(angle) * orbitPlane.radius;
      originPositions[i * 3 + 1] = orbitPlane.u.y * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.y * Math.sin(angle) * orbitPlane.radius;
      originPositions[i * 3 + 2] = orbitPlane.u.z * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.z * Math.sin(angle) * orbitPlane.radius;
    }
    const TOTAL = COUNT + 1;
    const allPositions = new Float32Array(TOTAL * 3);
    for (let i = 0; i < TOTAL; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      allPositions[i * 3]     = orbitPlane.u.x * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.x * Math.sin(angle) * orbitPlane.radius;
      allPositions[i * 3 + 1] = orbitPlane.u.y * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.y * Math.sin(angle) * orbitPlane.radius;
      allPositions[i * 3 + 2] = orbitPlane.u.z * Math.cos(angle) * orbitPlane.radius + orbitPlane.v.z * Math.sin(angle) * orbitPlane.radius;
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
  }, [orbitPlane.radius, orbitPlane.u.x, orbitPlane.u.y, orbitPlane.u.z, orbitPlane.v.x, orbitPlane.v.y, orbitPlane.v.z]);

  // react-three-fiber's per-frame imperative escape hatch: three.js objects
  // (geometry buffers, materials) are inherently mutable and are meant to be
  // updated in place here rather than through React state.
  /* eslint-disable react-hooks/immutability */
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
  /* eslint-enable react-hooks/immutability */

  return <primitive object={lineObj} />;
};
