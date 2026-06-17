'use client';
/**
 * GLB model swap utility — M10
 *
 * Usage:
 *   import { useModel } from './GLBLoader';
 *   const { nodes, materials } = useModel('tent');   // auto-fallback if GLB missing
 *
 * Drop .glb files into /public/models/ and DRACO decoder into /public/draco/
 * (copy from node_modules/three/examples/jsm/libs/draco/)
 */

import { useGLTF } from '@react-three/drei';

const MODEL_REGISTRY = {
  trees:    '/models/trees.glb',
  campfire: '/models/campfire.glb',
  tent:     '/models/tent.glb',
  platform: '/models/platform.glb',
  kitchen:  '/models/kitchen.glb',
};

/**
 * Preload all registered models.
 * Call once at app startup (e.g. in ClientExperience) once GLBs are available.
 */
export function preloadModels() {
  Object.values(MODEL_REGISTRY).forEach((path) => {
    useGLTF.preload(path, '/draco/');
  });
}

/**
 * Hook to load a named model with DRACO decoding.
 * Returns null if the GLB file is not present — callers should render
 * a primitive fallback in that case.
 *
 * @param {keyof MODEL_REGISTRY} name
 */
export function useModel(name) {
  const path = MODEL_REGISTRY[name];
  if (!path) throw new Error(`Unknown model: ${name}`);

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGLTF(path, '/draco/');
  } catch {
    return null;
  }
}
