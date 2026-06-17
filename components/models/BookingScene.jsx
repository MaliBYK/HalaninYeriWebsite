'use client';
import useStore from '../../store/useStore';
import { PLATFORM_SPOTS } from '../../lib/content';

const LEG = [[-0.9, -0.9], [-0.9, 0.9], [0.9, -0.9], [0.9, 0.9]];

function PlatformSpot({ spot }) {
  const selectedId = useStore((s) => s.selectedPlatformId);
  const setSelectedPlatform = useStore((s) => s.setSelectedPlatform);
  const isSelected = selectedId === spot.id;

  return (
    <group position={spot.position}>
      {/* Deck (clickable) */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPlatform(isSelected ? null : spot.id);
        }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[2.6, 0.14, 2.6]} />
        <meshLambertMaterial color={isSelected ? '#3FA828' : '#7A5228'} />
      </mesh>

      {/* Platform legs */}
      {LEG.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.28, z]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.44, 4]} />
          <meshLambertMaterial color="#5A3818" />
        </mesh>
      ))}

      {/* Selected: glowing halo ring only — no HTML labels */}
      {isSelected && (
        <mesh position={[0, 0.09, 0]}>
          <ringGeometry args={[1.4, 1.65, 32]} />
          <meshBasicMaterial color="#50CC30" transparent opacity={0.65} />
        </mesh>
      )}
    </group>
  );
}

export default function BookingScene() {
  return (
    <group>
      {PLATFORM_SPOTS.map((spot) => (
        <PlatformSpot key={spot.id} spot={spot} />
      ))}
    </group>
  );
}
