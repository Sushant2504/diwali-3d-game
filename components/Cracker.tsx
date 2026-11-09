'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrackerProps {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  type: 'rocket' | 'sparkle' | 'bomb';
  exploded: boolean;
  frozen: boolean;
  onClick: () => void;
}

export default function Cracker({
  position,
  velocity,
  type,
  exploded,
  frozen,
  onClick,
}: CrackerProps) {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const velocityRef = useRef(new THREE.Vector3(...velocity));
  const positionRef = useRef(new THREE.Vector3(...position));

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!frozen && !exploded) {
      velocityRef.current.y -= 0.005;
      positionRef.current.add(velocityRef.current.clone().multiplyScalar(delta * 30));
      meshRef.current.position.copy(positionRef.current);
      meshRef.current.rotation.z += delta * 10;
    }

    if (exploded && particlesRef.current) {
      const scale = meshRef.current.scale;
      scale.multiplyScalar(1.1);
      meshRef.current.rotation.y += delta * 5;

      const positions = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        positions.setXYZ(
          i,
          x * 1.05,
          y * 1.05 - delta * 2,
          z * 1.05
        );
      }
      positions.needsUpdate = true;
    }
  });

  const getColor = () => {
    switch (type) {
      case 'rocket':
        return '#ff0000';
      case 'sparkle':
        return '#ffd700';
      case 'bomb':
        return '#ff00ff';
      default:
        return '#ffffff';
    }
  };

  const getEmissive = () => {
    switch (type) {
      case 'rocket':
        return '#ff4500';
      case 'sparkle':
        return '#ffaa00';
      case 'bomb':
        return '#ff0088';
      default:
        return '#ffffff';
    }
  };

  const particleCount = 100;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 0.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group ref={meshRef} position={position}>
      {!exploded ? (
        <>
          {type === 'rocket' && (
            <mesh
              onClick={onClick}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              castShadow
              scale={hovered ? 1.3 : 1}
            >
              <coneGeometry args={[0.15, 0.6, 8]} />
              <meshStandardMaterial
                color={getColor()}
                emissive={getEmissive()}
                emissiveIntensity={2}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
          )}

          {type === 'sparkle' && (
            <mesh
              onClick={onClick}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              castShadow
              scale={hovered ? 1.3 : 1}
            >
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial
                color={getColor()}
                emissive={getEmissive()}
                emissiveIntensity={3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}

          {type === 'bomb' && (
            <mesh
              onClick={onClick}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              castShadow
              scale={hovered ? 1.3 : 1}
            >
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial
                color={getColor()}
                emissive={getEmissive()}
                emissiveIntensity={2}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
          )}

          <pointLight
            position={[0, 0, 0]}
            intensity={hovered ? 3 : 1.5}
            distance={hovered ? 3 : 2}
            color={getColor()}
          />

          {type === 'rocket' && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[0, -0.3 - i * 0.1, 0]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshStandardMaterial
                    color="#ff8800"
                    emissive="#ff4400"
                    emissiveIntensity={3}
                    transparent
                    opacity={1 - i * 0.2}
                  />
                </mesh>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particleCount}
                array={particlePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.15}
              color={getColor()}
              transparent
              opacity={0.8}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
            />
          </points>

          <pointLight
            position={[0, 0, 0]}
            intensity={10}
            distance={8}
            color={getColor()}
          />

          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={getColor()}
              emissive={getEmissive()}
              emissiveIntensity={5}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
        </>
      )}
    </group>
  );
}
