'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import useStore from '../../store/useStore';
import { useCameraPath } from '../../hooks/useCameraPath';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import {
  GALLERY_START,
  BOOKING_START,
  GALLERY_CENTER,
  ORBIT_RADIUS,
} from '../../lib/config';

const _camTarget = new Vector3();
const _lookTarget = new Vector3();
const _pxTarget = new Vector3();

const GC = new Vector3(...GALLERY_CENTER);

export default function CameraRig() {
  const { camera } = useThree();
  const curve = useCameraPath();
  const pointer = usePointerParallax();

  // Smooth current state
  const posRef = useRef(new Vector3(0, 2.5, 14));
  const lookRef = useRef(new Vector3(0, 1.5, 8));
  const pxRef = useRef(new Vector3());
  const fovRef = useRef(60);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const progress = useStore.getState().scrollProgress;

    if (progress < GALLERY_START) {
      // ── Path traversal: map 0→GALLERY_START to curve t 0→1 ──
      const t = MathUtils.clamp(progress / GALLERY_START, 0, 1);
      curve.getPointAt(t, _camTarget);

      const lookT = MathUtils.clamp(t + 0.07, 0, 1);
      curve.getPointAt(lookT, _lookTarget);
      _lookTarget.y -= 0.3;

      fovRef.current = MathUtils.lerp(fovRef.current, 60, delta * 3);

    } else if (progress < BOOKING_START) {
      // ── Gallery orbit: camera circles scene centre ──
      const orbitP = MathUtils.mapLinear(progress, GALLERY_START, BOOKING_START, 0, 1);
      const angle = orbitP * Math.PI * 0.4; // 72° arc

      _camTarget.set(
        GC.x + Math.sin(angle) * ORBIT_RADIUS,
        GC.y,
        GC.z - Math.cos(angle) * ORBIT_RADIUS,
      );
      _lookTarget.copy(GC);

      fovRef.current = MathUtils.lerp(fovRef.current, 60, delta * 3);

    } else {
      // ── Booking rise: camera lifts from campfire area for bird's-eye ──
      const riseP = MathUtils.mapLinear(progress, BOOKING_START, 1.0, 0, 1);
      const ease = 1 - Math.pow(1 - riseP, 3); // cubic ease-out

      _camTarget.set(
        MathUtils.lerp(2, 0, ease),
        MathUtils.lerp(3.5, 22, ease),
        MathUtils.lerp(-2, -7, ease),  // starts near campfire, rises back
      );
      _lookTarget.set(0, 0, -5);  // always look at camp centre

      const targetFov = MathUtils.lerp(60, 38, ease);
      fovRef.current = MathUtils.lerp(fovRef.current, targetFov, delta * 2.5);
    }

    // ── Pointer parallax (desktop only, reduced-motion safe) ──
    _pxTarget.set(
      (pointer.current?.x ?? 0) * 0.28,
      (pointer.current?.y ?? 0) * 0.18,
      0,
    );
    pxRef.current.lerp(_pxTarget, delta * 3.5);

    // ── Smooth camera toward computed targets ──
    posRef.current.lerp(_camTarget, delta * 2.2);
    lookRef.current.lerp(_lookTarget, delta * 2.8);

    camera.position.copy(posRef.current).add(pxRef.current);
    camera.lookAt(lookRef.current);

    if (Math.abs(camera.fov - fovRef.current) > 0.05) {
      camera.fov = fovRef.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
