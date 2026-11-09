'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Trail } from '@react-three/drei';

interface FlyingDiyaProps {
  id: number;
  position: [number, number, number];
  lit: boolean;
  speed: number;
  path: number;
  frozen: boolean;
  magnetPosition?: [number, number, number];
  onClick: () => void;
}

export default function FlyingDiya({
  position,
  lit,
  speed,
  path,
  frozen,
  magnetPosition,
  onClick,
}: FlyingDiyaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!frozen) {
      timeRef.current += delta * speed;
    }

    const t = timeRef.current;

    if (magnetPosition && !lit) {
      const current = groupRef.current.position;
      const target = new THREE.Vector3(...magnetPosition);
      current.lerp(target, 0.02);
    } else {
      switch (path) {
        case 0:
          groupRef.current.position.x = Math.sin(t) * 10;
          groupRef.current.position.z = Math.cos(t) * 10;
          groupRef.current.position.y = 3 + Math.sin(t * 2) * 1.5;
          break;
        case 1:
          groupRef.current.position.x = Math.sin(t * 0.7) * 15;
          groupRef.current.position.z = Math.sin(t * 1.3) * 8;
          groupRef.current.position.y = 2.5 + Math.abs(Math.sin(t)) * 2;
          break;
        case 2:
          groupRef.current.position.x = Math.cos(t * 1.2) * 12;
          groupRef.current.position.z = Math.sin(t * 0.8) * 12;
          groupRef.current.position.y = 4 + Math.cos(t * 1.5) * 1;
          break;
      }
    }

    groupRef.current.rotation.y += delta * 2;

    if (flameRef.current && lit) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 8) * 0.15;
      flameRef.current.position.y = 0.6 + Math.sin(state.clock.getElapsedTime() * 5) * 0.08;
    }
  });

  return (
    <Trail
      width={lit ? 2 : 0.5}
      length={8}
      color={lit ? '#ff6600' : '#888888'}
      attenuation={(width) => width * width}
    >
      <group ref={groupRef} position={position}>
        <mesh
          castShadow
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <cylinderGeometry args={[0.4, 0.25, 0.25, 32]} />
          <meshStandardMaterial
            color={lit ? '#ff8c00' : '#654321'}
            emissive={lit ? '#ff6b00' : '#000000'}
            emissiveIntensity={lit ? 0.8 : 0}
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>

        <mesh position={[0, 0.125, 0]} castShadow>
          <torusGeometry args={[0.38, 0.04, 16, 32]} />
          <meshStandardMaterial
            color={lit ? '#ffd700' : '#cd853f'}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {lit && (
          <>
            <mesh ref={flameRef} position={[0, 0.6, 0]}>
              <coneGeometry args={[0.12, 0.35, 8]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ff4500"
                emissiveIntensity={3}
                transparent
                opacity={0.9}
              />
            </mesh>

            <pointLight
              position={[0, 0.7, 0]}
              intensity={3}
              distance={5}
              color="#ff8c00"
              castShadow
            />

            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[0.06, 0.2, 6]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffff99"
                emissiveIntensity={4}
                transparent
                opacity={0.85}
              />
            </mesh>

            {Array.from({ length: 5 }).map((_, i) => {
              const angle = (i / 5) * Math.PI * 2;
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * 0.3,
                    0.8,
                    Math.sin(angle) * 0.3,
                  ]}
                >
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshStandardMaterial
                    color="#ffff00"
                    emissive="#ff6600"
                    emissiveIntensity={5}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              );
            })}
          </>
        )}

        {hovered && !lit && (
          <>
            <mesh position={[0, 1.2, 0]} scale={[1, 1, 1]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={3}
                transparent
                opacity={0.8}
              />
            </mesh>
            <pointLight position={[0, 1.2, 0]} intensity={2} distance={2} color="#ffff00" />
          </>
        )}
      </group>
    </Trail>
  );
}
