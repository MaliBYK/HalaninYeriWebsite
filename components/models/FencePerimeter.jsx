'use client';
import { useRef, useEffect, useMemo } from 'react';
import { Matrix4 } from 'three';

// Camp perimeter bounds
const X1 = -8;       // left wall x
const X2 = 8;        // right wall x
const Z_NEAR = 4;    // front wall z  (camera enters from z > 4)
const Z_FAR  = -13;  // back wall z
const GATE_L = -2.5; // gate opening left edge
const GATE_R =  2.5; // gate opening right edge
const POST_SPACING = 3;

const POST_COLOR = '#6B4226';
const RAIL_COLOR = '#7A5228';

function Rail({ x1, z1, x2, z2, y }) {
  const cx = (x1 + x2) / 2;
  const cz = (z1 + z2) / 2;
  const len = Math.hypot(x2 - x1, z2 - z1);
  const rotY = Math.atan2(x2 - x1, z2 - z1);
  return (
    <mesh position={[cx, y, cz]} rotation-y={rotY}>
      <boxGeometry args={[0.07, 0.07, len]} />
      <meshLambertMaterial color={RAIL_COLOR} />
    </mesh>
  );
}

function GatePost({ x }) {
  return (
    <group position={[x, 0, Z_NEAR]}>
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.095, 1.3, 8]} />
        <meshLambertMaterial color="#5A3010" />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.11, 8, 6]} />
        <meshLambertMaterial color="#3A1A04" />
      </mesh>
    </group>
  );
}

export default function FencePerimeter() {
  const postRef = useRef();

  const posts = useMemo(() => {
    const arr = [];

    // Front left: X1 → GATE_L
    for (let x = X1; x < GATE_L; x += POST_SPACING)  arr.push([x, Z_NEAR]);
    // Front right: GATE_R → X2
    for (let x = GATE_R; x <= X2 + 0.01; x += POST_SPACING) arr.push([x, Z_NEAR]);
    // Back wall: X1 → X2
    for (let x = X1; x <= X2 + 0.01; x += POST_SPACING) arr.push([x, Z_FAR]);
    // Left wall (exclude corners already in front/back)
    for (let z = Z_NEAR - POST_SPACING; z > Z_FAR + 0.01; z -= POST_SPACING) arr.push([X1, z]);
    // Right wall
    for (let z = Z_NEAR - POST_SPACING; z > Z_FAR + 0.01; z -= POST_SPACING) arr.push([X2, z]);

    return arr;
  }, []);

  useEffect(() => {
    if (!postRef.current) return;
    const m = new Matrix4();
    posts.forEach(([x, z], i) => {
      m.makeTranslation(x, 0.475, z);
      postRef.current.setMatrixAt(i, m);
    });
    postRef.current.instanceMatrix.needsUpdate = true;
  }, [posts]);

  return (
    <group>
      {/* All regular posts — one draw call via instanced mesh */}
      <instancedMesh ref={postRef} args={[undefined, undefined, posts.length]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.95, 8]} />
        <meshLambertMaterial color={POST_COLOR} />
      </instancedMesh>

      {/* Gate posts — taller with spherical cap */}
      <GatePost x={GATE_L} />
      <GatePost x={GATE_R} />

      {/* Front wall rails (split by gate) */}
      <Rail x1={X1}    z1={Z_NEAR} x2={GATE_L} z2={Z_NEAR} y={0.72} />
      <Rail x1={X1}    z1={Z_NEAR} x2={GATE_L} z2={Z_NEAR} y={0.42} />
      <Rail x1={GATE_R} z1={Z_NEAR} x2={X2}   z2={Z_NEAR} y={0.72} />
      <Rail x1={GATE_R} z1={Z_NEAR} x2={X2}   z2={Z_NEAR} y={0.42} />

      {/* Back wall rails */}
      <Rail x1={X1} z1={Z_FAR} x2={X2} z2={Z_FAR} y={0.72} />
      <Rail x1={X1} z1={Z_FAR} x2={X2} z2={Z_FAR} y={0.42} />

      {/* Left wall rails */}
      <Rail x1={X1} z1={Z_NEAR} x2={X1} z2={Z_FAR} y={0.72} />
      <Rail x1={X1} z1={Z_NEAR} x2={X1} z2={Z_FAR} y={0.42} />

      {/* Right wall rails */}
      <Rail x1={X2} z1={Z_NEAR} x2={X2} z2={Z_FAR} y={0.72} />
      <Rail x1={X2} z1={Z_NEAR} x2={X2} z2={Z_FAR} y={0.42} />
    </group>
  );
}
