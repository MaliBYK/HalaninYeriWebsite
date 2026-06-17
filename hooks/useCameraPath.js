import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { CAMERA_PATH_POINTS } from '../lib/config';

export function useCameraPath() {
  return useMemo(() => {
    const pts = CAMERA_PATH_POINTS.map(([x, y, z]) => new Vector3(x, y, z));
    return new CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  }, []);
}
