'use client';
import { Html } from '@react-three/drei';
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

      {/* Selected halo ring */}
      {isSelected && (
        <mesh position={[0, 0.09, 0]}>
          <ringGeometry args={[1.4, 1.65, 32]} />
          <meshBasicMaterial color="#50CC30" transparent opacity={0.6} />
        </mesh>
      )}

      {/* HTML label (drei) */}
      {isSelected && (
        <Html
          position={[0, 0.75, 0]}
          center
          style={{ pointerEvents: 'none' }}
          distanceFactor={8}
        >
          <div
            style={{
              background: '#D4870A',
              color: '#fff',
              fontSize: '11px',
              fontFamily: 'var(--font-body, sans-serif)',
              padding: '4px 10px',
              borderRadius: '99px',
              whiteSpace: 'nowrap',
            }}
          >
            {spot.label} ✓
          </div>
        </Html>
      )}
    </group>
  );
}

// Label dots for unselected platforms
function DotLabel({ spot }) {
  const selectedId = useStore((s) => s.selectedPlatformId);
  if (selectedId === spot.id) return null;
  return (
    <Html
      position={[spot.position[0], spot.position[1] + 0.6, spot.position[2]]}
      center
      style={{ pointerEvents: 'none' }}
      distanceFactor={12}
    >
      <div
        style={{
          background: 'rgba(20,10,4,0.75)',
          color: '#F5ECD7',
          fontSize: '10px',
          fontFamily: 'var(--font-body, sans-serif)',
          padding: '3px 8px',
          borderRadius: '99px',
          border: '1px solid rgba(212,135,10,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        {spot.label}
      </div>
    </Html>
  );
}

export default function BookingScene() {
  return (
    <group>
      {PLATFORM_SPOTS.map((spot) => (
        <PlatformSpot key={spot.id} spot={spot} />
      ))}
      {PLATFORM_SPOTS.map((spot) => (
        <DotLabel key={spot.id + '-label'} spot={spot} />
      ))}
    </group>
  );
}
