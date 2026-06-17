'use client';

export default function Lights() {
  return (
    <>
      {/* Soft ambient — night-side fill */}
      <ambientLight intensity={0.12} color="#C8D8FF" />

      {/* Golden-hour key light from low south-west angle */}
      <directionalLight
        position={[18, 12, 10]}
        intensity={2.0}
        color="#FF9830"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />

      {/* Cool blue-purple fill from opposite side (sky bounce) */}
      <directionalLight
        position={[-14, 10, -20]}
        intensity={0.28}
        color="#4560A8"
      />

      {/* Campfire point light — warm orange glow at scene origin */}
      <pointLight
        position={[0, 1.1, 0]}
        intensity={4}
        color="#FF6418"
        distance={18}
        decay={2}
      />

      {/* Ground bounce — very subtle warm reflection */}
      <hemisphereLight
        args={['#FF8020', '#1A3010', 0.25]}
      />
    </>
  );
}
