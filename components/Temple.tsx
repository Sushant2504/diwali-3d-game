'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TempleProps {
  position: [number, number, number];
}

export default function Temple({ position }: TempleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[2.2, 1.5, 4]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff4400"
          emissiveIntensity={0.3}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 3.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.8, 1.51]}>
        <boxGeometry args={[1.2, 1.6, 0.1]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[side * 1.2, 1.5, 1.45]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.2]} />
          <meshStandardMaterial
            color="#4a4a4a"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}

      {[
        [-1.2, 0, -1.2],
        [1.2, 0, -1.2],
        [-1.2, 0, 1.2],
        [1.2, 0, 1.2],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffaa00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.8,
              0.3,
              Math.sin(angle) * 1.8,
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.1, 0.12, 0.4, 16]} />
            <meshStandardMaterial
              color="#ff8c00"
              emissive="#ff6b00"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}

      <pointLight
        ref={lightRef}
        position={[0, 4, 0]}
        intensity={2}
        distance={15}
        color="#ffd700"
        castShadow
      />
    </group>
  );
}
