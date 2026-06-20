// Camera path: CatmullRomCurve3 control points [x, y, z]
// Story: enter through trees → campfire clearing → settle by fire
export const CAMERA_PATH_POINTS = [
  [0, 2.5, 14],     // Hero: enters through orange trees
  [1.5, 2.2, 9],    // Weaving through trunks
  [-0.8, 1.9, 5],   // Approaching clearing
  [0, 1.8, 1.5],    // By the campfire (warm centre)
  [-1.2, 2.1, -1],  // Slight drift past fire
  [1.0, 2.2, -3],   // Settling nearby
  [0, 2.3, -4],     // Resting point — stays near campfire
];

// Gallery orbit: slowly circles the campfire area
// Orbit start (angle=0): x=0+sin(0)*2.5=0, z=-1.5-cos(0)*2.5=-4 → matches curve end
export const GALLERY_CENTER = [0, 2.0, -1.5];
export const ORBIT_RADIUS = 2.5;

// Progress breakpoints (scroll 0→1 over 1400vh total scroll)
// Each 400vh section contributes 300vh of "sticky" scroll = 300/1400 ≈ 0.214
export const GALLERY_START = 0.467;  // progress where orbit begins
export const BOOKING_START = 0.733;  // progress where camera rises

export const SECTIONS = [
  { id: 'hero',    start: 0,     end: 0.214 },
  { id: 'about',   start: 0.214, end: 0.467 },
  { id: 'gallery', start: 0.467, end: 0.733 },
  { id: 'booking', start: 0.733, end: 1.0   },
];

// Quality tiers: determined by device capability at runtime
export const QUALITY_CONFIG = {
  low: {
    dpr: 1,
    treeCount: 40,
    fireParticles: 150,
    postProcessing: false,
    windShader: false,
    godRays: false,
    bloom: false,
    shadowMapSize: 512,
  },
  mid: {
    dpr: 1.5,
    treeCount: 120,
    fireParticles: 500,
    postProcessing: true,
    windShader: true,
    godRays: false,
    bloom: true,
    shadowMapSize: 1024,
  },
  high: {
    dpr: [1, 2],
    treeCount: 300,
    fireParticles: 1000,
    postProcessing: true,
    windShader: true,
    godRays: true,
    bloom: true,
    shadowMapSize: 2048,
  },
};

export const WHATSAPP_NUMBER = '905078508806';
export const INSTAGRAM_HANDLE = 'halaninyericamping';
export const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/joBR6gBSXR9sJAkC6';
export const GOOGLE_REVIEWS_URL =
  'https://g.page/r/halaninyeri/review';  // replace with real URL
