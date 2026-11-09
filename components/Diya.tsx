'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DiyaProps {
  position: [number, number, number];
  lit: boolean;
  onClick: () => void;
}

export default function Diya({ position, lit, onClick }: DiyaProps) {
  const meshRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (flameRef.current && lit) {
      // Animate flame flickering
      const time = state.clock.getElapsedTime();
      flameRef.current.scale.y = 1 + Math.sin(time * 5) * 0.1;
      flameRef.current.position.y = 0.6 + Math.sin(time * 3) * 0.05;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = hovered ? Math.sin(state.clock.getElapsedTime() * 2) * 0.1 : 0;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Diya base - bowl shape */}
      <mesh
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.5, 0.3, 0.3, 32]} />
        <meshStandardMaterial
          color={lit ? '#ff8c00' : '#8b4513'}
          emissive={lit ? '#ff6b00' : '#000000'}
          emissiveIntensity={lit ? 0.5 : 0}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Diya rim */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[0.45, 0.05, 16, 32]} />
        <meshStandardMaterial color="#cd853f" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Flame */}
      {lit && (
        <>
          <mesh ref={flameRef} position={[0, 0.6, 0]}>
            <coneGeometry args={[0.15, 0.4, 8]} />
            <meshStandardMaterial
              color="#ffff00"
              emissive="#ff6600"
              emissiveIntensity={2}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Flame glow */}
          <pointLight
            position={[0, 0.7, 0]}
            intensity={lit ? 2 : 0}
            distance={3}
            color="#ff8c00"
            castShadow
          />

          {/* Inner flame */}
          <mesh position={[0, 0.6, 0]}>
            <coneGeometry args={[0.08, 0.25, 6]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffff99"
              emissiveIntensity={3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </>
      )}

      {/* Hover indicator */}
      {hovered && !lit && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
}
