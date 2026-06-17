'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import useStore from '../../store/useStore';
import { useCameraPath } from '../../hooks/useCameraPath';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { BOOKING_START } from '../../lib/config';

const _camTarget = new Vector3();
const _lookTarget = new Vector3();
const _pxTarget = new Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const curve = useCameraPath();
  const pointer = usePointerParallax();

  const posRef = useRef(new Vector3(0, 1.8, 20));
  const lookRef = useRef(new Vector3(0, 1.6, 14));
  const pxRef  = useRef(new Vector3());
  const fovRef = useRef(62);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const progress = useStore.getState().scrollProgress;

    if (progress < BOOKING_START) {
      // ── Path traversal: progress 0→BOOKING_START maps to curve t 0→1 ──
      const t = MathUtils.clamp(progress / BOOKING_START, 0, 1);
      curve.getPointAt(t, _camTarget);

      // Look slightly ahead on the curve
      const lookT = MathUtils.clamp(t + 0.06, 0, 1);
      curve.getPointAt(lookT, _lookTarget);
      _lookTarget.y -= 0.2;

      // FOV narrows as camera enters the tent (t > 0.60)
      const insideFactor = MathUtils.clamp(MathUtils.mapLinear(t, 0.58, 0.85, 0, 1), 0, 1);
      const targetFov = MathUtils.lerp(64, 50, insideFactor);
      fovRef.current = MathUtils.lerp(fovRef.current, targetFov, delta * 2.0);

    } else {
      // ── Aerial rise: camera lifts for bird's-eye view ──
      const riseP = MathUtils.mapLinear(progress, BOOKING_START, 1.0, 0, 1);
      const ease  = 1 - Math.pow(1 - riseP, 3); // cubic ease-out

      _camTarget.set(
        0,
        MathUtils.lerp(3.0, 26, ease),
        MathUtils.lerp(-7, -10, ease),  // drift back to centre over full camp
      );
      _lookTarget.set(0, 0, -13);  // look at camp centre (tent + platforms)

      const targetFov = MathUtils.lerp(50, 44, ease);
      fovRef.current = MathUtils.lerp(fovRef.current, targetFov, delta * 2.5);
    }

    // ── Pointer parallax (desktop only, reduced-motion safe) ──
    _pxTarget.set(
      (pointer.current?.x ?? 0) * 0.22,
      (pointer.current?.y ?? 0) * 0.14,
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
