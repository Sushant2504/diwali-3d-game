'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Rangoli() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const colors = [
    '#ff0080', // Pink
    '#ff8c00', // Orange
    '#ffd700', // Gold
    '#00ff88', // Green
    '#0080ff', // Blue
    '#ff00ff', // Magenta
  ];

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Center circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Petals - outer ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`outer-${i}`} position={[x, 0, z]}>
            <mesh rotation={[-Math.PI / 2, 0, angle]}>
              <circleGeometry args={[0.6, 32]} />
              <meshStandardMaterial
                color={colors[i % colors.length]}
                emissive={colors[i % colors.length]}
                emissiveIntensity={0.3}
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
          </group>
        );
      })}

      {/* Petals - middle ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const radius = 1.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`middle-${i}`} position={[x, 0.05, z]}>
            <mesh rotation={[-Math.PI / 2, 0, angle]}>
              <circleGeometry args={[0.4, 32]} />
              <meshStandardMaterial
                color={colors[(i + 2) % colors.length]}
                emissive={colors[(i + 2) % colors.length]}
                emissiveIntensity={0.4}
                metalness={0.4}
                roughness={0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* Inner ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`inner-${i}`} position={[x, 0.1, z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.2, 32]} />
              <meshStandardMaterial
                color={colors[(i + 4) % colors.length]}
                emissive={colors[(i + 4) % colors.length]}
                emissiveIntensity={0.5}
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
          </group>
        );
      })}

      {/* Decorative stars */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 2.5 + Math.sin(i) * 0.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={`star-${i}`} position={[x, 0.15, z]} rotation={[-Math.PI / 2, 0, angle]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              emissive={colors[i % colors.length]}
              emissiveIntensity={0.6}
            />
          </mesh>
        );
      })}

      {/* Ambient glow underneath */}
      <pointLight position={[0, 0.5, 0]} intensity={1} distance={5} color="#ffd700" />
    </group>
  );
}
