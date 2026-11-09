'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  life: number;
  maxLife: number;
}

export default function Fireworks() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 30
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          Math.random() * 3 - 1,
          (Math.random() - 0.5) * 2
        ),
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        life: Math.random() * 100,
        maxLife: 100,
      });
    }
    return temp;
  }, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      colors[i * 3] = particle.color.r;
      colors[i * 3 + 1] = particle.color.g;
      colors[i * 3 + 2] = particle.color.b;
    });

    return { positions, colors };
  }, [particles]);

  useFrame(() => {
    if (particlesRef.current) {
      const positionAttribute = particlesRef.current.geometry.attributes.position;
      const colorAttribute = particlesRef.current.geometry.attributes.color;

      particles.forEach((particle, i) => {
        particle.life -= 1;

        if (particle.life <= 0) {
          // Reset particle
          particle.position.set(
            (Math.random() - 0.5) * 30,
            Math.random() * 20 + 5,
            (Math.random() - 0.5) * 30
          );
          particle.velocity.set(
            (Math.random() - 0.5) * 2,
            Math.random() * 3 - 1,
            (Math.random() - 0.5) * 2
          );
          particle.color.setHSL(Math.random(), 1, 0.5);
          particle.life = particle.maxLife;
        }

        particle.position.add(particle.velocity);
        particle.velocity.y -= 0.02; // Gravity

        positionAttribute.setXYZ(i, particle.position.x, particle.position.y, particle.position.z);

        const alpha = particle.life / particle.maxLife;
        colorAttribute.setXYZ(i, particle.color.r * alpha, particle.color.g * alpha, particle.color.b * alpha);
      });

      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
