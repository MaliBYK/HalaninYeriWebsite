'use client';

export default function Lights() {
  return (
    <>
      {/* Cool sky-bounce ambient */}
      <ambientLight intensity={0.10} color="#C0CCE8" />

      {/* Golden-hour key — low south-west angle */}
      <directionalLight
        position={[18, 11, 10]}
        intensity={1.9}
        color="#FF9830"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
      />

      {/* Cool blue fill (sky opposite) */}
      <directionalLight
        position={[-14, 9, -20]}
        intensity={0.25}
        color="#4060A8"
      />

      {/* Hemisphere — warm ground / cool sky */}
      <hemisphereLight args={['#FF7820', '#162010', 0.22]} />
    </>
  );
}
