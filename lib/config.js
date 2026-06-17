// Camera path: 7 control points [x, y, z]
// Story: dense orange forest → trees part → campfire clearing → tent → inside tent → aerial
export const CAMERA_PATH_POINTS = [
  [0, 1.8, 20],    // 0: Deep in orange forest, trees all around
  [0, 1.8, 14],    // 1: Moving forward, trees start to part
  [0, 1.8, 7],     // 2: Clearing visible ahead, tent at distance
  [0, 1.6, 1],     // 3: Campfire clearing (about section starts)
  [0, 1.4, -2.5],  // 4: Approaching tent entrance
  [0, 1.2, -5.5],  // 5: Inside tent (gallery section)
  [0, 1.3, -7.0],  // 6: Deeper inside tent
];

// Progress where the aerial rise begins (booking section)
export const BOOKING_START = 0.75;

// Four equal sections — 25% each
export const SECTIONS = [
  { id: 'hero',    start: 0,    end: 0.25 },
  { id: 'about',   start: 0.25, end: 0.50 },
  { id: 'gallery', start: 0.50, end: 0.75 },
  { id: 'booking', start: 0.75, end: 1.0  },
];

// Quality tiers
export const QUALITY_CONFIG = {
  low: {
    dpr: 1,
    treeCount: 55,
    fireParticles: 150,
    postProcessing: false,
    windShader: false,
    bloom: false,
    shadowMapSize: 512,
  },
  mid: {
    dpr: 1.5,
    treeCount: 150,
    fireParticles: 500,
    postProcessing: true,
    windShader: true,
    bloom: true,
    shadowMapSize: 1024,
  },
  high: {
    dpr: [1, 2],
    treeCount: 340,
    fireParticles: 1000,
    postProcessing: true,
    windShader: true,
    bloom: true,
    shadowMapSize: 2048,
  },
};

export const WHATSAPP_NUMBER = '905078508806';
export const INSTAGRAM_HANDLE = 'halaninyericampingg';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/halaninyeri';
export const GOOGLE_REVIEWS_URL = 'https://g.page/r/halaninyeri/review';
