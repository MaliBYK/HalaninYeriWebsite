'use client';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, MeshLambertMaterial, Color } from 'three';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

const _dummy = new Object3D();

// Forest positions — dense near camera corridor at z > 2 for the parting effect
function genPositions(count) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const spots = [];
  for (let i = 0; i < count * 3 && spots.length < count; i++) {
    const r = Math.sqrt(i / (count * 3)) * 26 + 2.5;
    const theta = i * ((2 * Math.PI) / (PHI * PHI));
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r - 3;
    // Always keep tent area clear (shader displacement handles the rest)
    if (Math.abs(x) < 4.5 && z < 2.5 && z > -9) continue;
    if (z > 23) continue;
    const h = 2.2 + Math.abs(Math.sin(i * 2.37)) * 2.2;
    const cr = 0.75 + Math.abs(Math.cos(i * 1.71)) * 0.65;
    spots.push({ x, z, h, cr, isOrange: i % 3 === 0 });
  }
  return spots;
}

const GREEN_A = new Color('#3A5F12');
const GREEN_B = new Color('#4A7018');
// Orange-red autumn colour for accent trees
const ORANGE_TREE = new Color('#A0521A');

// GLSL snippet injected into both trunk and canopy shaders
const PARTING_GLSL = `
  float tX  = instanceMatrix[3][0];
  float tZ  = instanceMatrix[3][2];
  float hash = fract(tZ * 0.917 + tX * 0.341 + 0.5);
  float side = abs(tX) > 1.5 ? sign(tX) : (hash > 0.5 ? 1.0 : -1.0);
  float zFact   = smoothstep(-2.0, 9.0, tZ);
  float cFact   = 1.0 - smoothstep(0.0, 7.0, abs(tX));
  float strength = mix(4.0, 15.0, cFact);
  transformed.x += side * uOpenProgress * strength * zFact;
`;

export default function Trees({ openProgress = 0 }) {
  const tier = useStore((s) => s.qualityTier);
  const count = QUALITY_CONFIG[tier]?.treeCount ?? 150;

  const positions = useMemo(() => genPositions(count), [count]);

  const timeRef = useRef({ value: 0 });
  const openRef = useRef({ value: 0 });
  const openProgressRef = useRef(openProgress);

  useEffect(() => { openProgressRef.current = openProgress; }, [openProgress]);

  // ── Canopy material: wind + parting ──
  const canopyMat = useMemo(() => {
    const mat = new MeshLambertMaterial({ vertexColors: true, flatShading: true });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = timeRef.current;
      shader.uniforms.uOpenProgress = openRef.current;
      shader.vertexShader = `
        uniform float uTime;
        uniform float uOpenProgress;
      ${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>

        // Wind sway
        float windPhase = uTime * 1.55
          + instanceMatrix[3][0] * 0.42
          + instanceMatrix[3][2] * 0.28;
        float wave = sin(windPhase) * 0.068 + sin(windPhase * 1.83 + 1.1) * 0.024;
        float hf = max(0.0, position.y * 0.55);
        transformed.x += wave * hf;
        transformed.z += wave * 0.36 * hf;

        // Forest parting
        ${PARTING_GLSL}
        `,
      );
    };
    mat.customProgramCacheKey = () => 'wind-part-canopy-v3';
    return mat;
  }, []);

  // ── Trunk material: parting only (wind imperceptible on thin cylinders) ──
  const trunkMat = useMemo(() => {
    const mat = new MeshLambertMaterial({ color: '#3D1F0A' });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uOpenProgress = openRef.current;
      shader.vertexShader = `uniform float uOpenProgress;\n${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        ${PARTING_GLSL}
        `,
      );
    };
    mat.customProgramCacheKey = () => 'part-trunk-v3';
    return mat;
  }, []);

  const trunkRef  = useRef();
  const canopyRef = useRef();

  // Set instance matrices once
  useEffect(() => {
    if (!trunkRef.current || !canopyRef.current) return;
    positions.forEach((p, i) => {
      _dummy.position.set(p.x, p.h / 2, p.z);
      _dummy.scale.set(1, p.h, 1);
      _dummy.rotation.set(0, 0, 0);
      _dummy.updateMatrix();
      trunkRef.current.setMatrixAt(i, _dummy.matrix);

      _dummy.position.set(p.x, p.h + p.cr * 0.6, p.z);
      _dummy.scale.setScalar(p.cr);
      _dummy.updateMatrix();
      canopyRef.current.setMatrixAt(i, _dummy.matrix);
      canopyRef.current.setColorAt(
        i,
        p.isOrange ? ORANGE_TREE : (i % 2 === 0 ? GREEN_A : GREEN_B),
      );
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;
    canopyRef.current.instanceMatrix.needsUpdate = true;
    if (canopyRef.current.instanceColor) canopyRef.current.instanceColor.needsUpdate = true;
  }, [positions]);

  useFrame(({ clock }) => {
    timeRef.current.value = clock.getElapsedTime();
    openRef.current.value = openProgressRef.current;
  });

  useEffect(() => () => { canopyMat.dispose(); trunkMat.dispose(); }, [canopyMat, trunkMat]);

  return (
    <>
      <instancedMesh ref={trunkRef} args={[null, null, count]} material={trunkMat} castShadow frustumCulled>
        <cylinderGeometry args={[0.07, 0.13, 1, 5]} />
      </instancedMesh>

      <instancedMesh ref={canopyRef} args={[null, null, count]} material={canopyMat} castShadow frustumCulled>
        <icosahedronGeometry args={[1, 1]} />
      </instancedMesh>
    </>
  );
}
