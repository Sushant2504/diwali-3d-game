'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface PowerUpProps {
  id: number;
  position: [number, number, number];
  type: 'time' | 'multiplier' | 'freeze' | 'magnet';
  collected: boolean;
  onClick: () => void;
}

export default function PowerUp({ position, type, collected, onClick }: PowerUpProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!collected) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 2;
    } else {
      groupRef.current.scale.multiplyScalar(0.95);
      groupRef.current.position.y += 0.1;
    }

    if (ringRef.current && !collected) {
      ringRef.current.rotation.x = state.clock.getElapsedTime();
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  const getConfig = () => {
    switch (type) {
      case 'time':
        return {
          color: '#00ffff',
          emissive: '#0088ff',
          icon: '⏰',
          geometry: <octahedronGeometry args={[0.4, 0]} />,
        };
      case 'multiplier':
        return {
          color: '#ffff00',
          emissive: '#ff8800',
          icon: '×2',
          geometry: <dodecahedronGeometry args={[0.4, 0]} />,
        };
      case 'freeze':
        return {
          color: '#88ffff',
          emissive: '#0044ff',
          icon: '❄️',
          geometry: <icosahedronGeometry args={[0.4, 0]} />,
        };
      case 'magnet':
        return {
          color: '#ff00ff',
          emissive: '#ff0088',
          icon: '🧲',
          geometry: <torusGeometry args={[0.3, 0.15, 16, 32]} />,
        };
    }
  };

  const config = getConfig();

  return (
    <group ref={groupRef} position={position}>
      <mesh onClick={onClick} castShadow>
        {config.geometry}
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={collected ? 0.2 : 0.9}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={1.5}
          transparent
          opacity={collected ? 0.1 : 0.6}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[0.8, 0.03, 16, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={1}
          transparent
          opacity={collected ? 0.05 : 0.4}
        />
      </mesh>

      {!collected && (
        <>
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.3}
            color={config.color}
            anchorX="center"
            anchorY="middle"
          >
            {config.icon}
          </Text>

          <pointLight
            position={[0, 0, 0]}
            intensity={3}
            distance={4}
            color={config.color}
          />

          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  0,
                  Math.sin(angle) * radius,
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial
                  color={config.color}
                  emissive={config.emissive}
                  emissiveIntensity={3}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
}
