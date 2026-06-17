'use client';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, MeshLambertMaterial, Color } from 'three';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

const _dummy = new Object3D();

// Fibonacci spiral — natural tree distribution
function genPositions(count) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const spots = [];
  for (let i = 0; i < count * 2 && spots.length < count; i++) {
    const r = Math.sqrt(i / (count * 2)) * 30 + 3.5;
    const theta = i * ((2 * Math.PI) / (PHI * PHI));
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r - 7;
    // Clear camera path & campfire
    if (Math.abs(x) < 2.2 && z > -5 && z < 3) continue;
    const h = 2.2 + Math.abs(Math.sin(i * 2.37)) * 2.2;
    const cr = 0.75 + Math.abs(Math.cos(i * 1.71)) * 0.65;
    spots.push({ x, z, h, cr, isOrange: i % 3 === 0 });
  }
  return spots;
}

const GREEN_A = new Color('#3A5F12');
const GREEN_B = new Color('#4A7018');
const ORANGE_TREE_COLOR = new Color('#3D601A');

export default function Trees() {
  const tier = useStore((s) => s.qualityTier);
  const count = QUALITY_CONFIG[tier]?.treeCount ?? 120;

  const positions = useMemo(() => genPositions(count), [count]);
  const timeUniform = useRef({ value: 0 });

  const canopyMat = useMemo(() => {
    const mat = new MeshLambertMaterial({ vertexColors: true, flatShading: true });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = timeUniform.current;
      shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // instanceMatrix[3][0/2] = world-space X/Z translation
        float windPhase = uTime * 1.55 + instanceMatrix[3][0] * 0.42 + instanceMatrix[3][2] * 0.28;
        float wave = sin(windPhase) * 0.068 + sin(windPhase * 1.83 + 1.1) * 0.024;
        float heightFactor = max(0.0, position.y * 0.55);
        transformed.x += wave * heightFactor;
        transformed.z += wave * 0.36 * heightFactor;
        `,
      );
    };
    mat.customProgramCacheKey = () => 'wind-canopy-v1';
    return mat;
  }, []);

  const trunkRef = useRef();
  const canopyRef = useRef();

  useEffect(() => {
    if (!trunkRef.current || !canopyRef.current) return;
    positions.forEach((p, i) => {
      // Trunk
      _dummy.position.set(p.x, p.h / 2, p.z);
      _dummy.scale.set(1, p.h, 1);
      _dummy.rotation.set(0, 0, 0);
      _dummy.updateMatrix();
      trunkRef.current.setMatrixAt(i, _dummy.matrix);

      // Canopy
      _dummy.position.set(p.x, p.h + p.cr * 0.6, p.z);
      _dummy.scale.setScalar(p.cr);
      _dummy.updateMatrix();
      canopyRef.current.setMatrixAt(i, _dummy.matrix);
      canopyRef.current.setColorAt(i, p.isOrange ? ORANGE_TREE_COLOR : (i % 2 === 0 ? GREEN_A : GREEN_B));
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;
    canopyRef.current.instanceMatrix.needsUpdate = true;
    if (canopyRef.current.instanceColor) canopyRef.current.instanceColor.needsUpdate = true;
  }, [positions]);

  useFrame(({ clock }) => {
    timeUniform.current.value = clock.getElapsedTime();
  });

  useEffect(() => () => canopyMat.dispose(), [canopyMat]);

  return (
    <>
      <instancedMesh ref={trunkRef} args={[null, null, count]} castShadow frustumCulled>
        <cylinderGeometry args={[0.07, 0.13, 1, 5]} />
        <meshLambertMaterial color="#3D1F0A" />
      </instancedMesh>

      <instancedMesh ref={canopyRef} args={[null, null, count]} material={canopyMat} castShadow frustumCulled>
        <icosahedronGeometry args={[1, 1]} />
      </instancedMesh>
    </>
  );
}
