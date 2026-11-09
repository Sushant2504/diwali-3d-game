'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternProps {
  position: [number, number, number];
  color: string;
}

export default function Lantern({ position, color }: LanternProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      groupRef.current.position.y = position[1] + 4 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(state.clock.getElapsedTime() * 3) * 1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial
          color="#4a4a4a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 4.2, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 4.3, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.2, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 3.3, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.2, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.45;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              3.8,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, Math.PI / 6]}
            castShadow
          >
            <boxGeometry args={[0.02, 0.7, 0.02]} />
            <meshStandardMaterial
              color="#8b4513"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      <mesh position={[0, 3.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 3.8, 0]}
        intensity={3}
        distance={6}
        color={color}
        castShadow
      />

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.6 + Math.sin(i) * 0.1;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              3.8 + Math.sin(angle * 3) * 0.2,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}
