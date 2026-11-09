'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Sky } from '@react-three/drei';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Diya from './Diya';
import Fireworks from './Fireworks';
import Rangoli from './Rangoli';
import GameUI from './GameUI';
import FlyingDiya from './FlyingDiya';
import Cracker from './Cracker';
import PowerUp from './PowerUp';
import Temple from './Temple';
import Lantern from './Lantern';

interface DiyaType {
  id: number;
  position: [number, number, number];
  lit: boolean;
  type: 'static' | 'flying';
  speed?: number;
  path?: number;
}

interface CrackerType {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  exploded: boolean;
  type: 'rocket' | 'sparkle' | 'bomb';
}

interface PowerUpType {
  id: number;
  position: [number, number, number];
  type: 'time' | 'multiplier' | 'freeze' | 'magnet';
  collected: boolean;
}

export default function DiwaliGame() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [diyas, setDiyas] = useState<DiyaType[]>([]);
  const [crackers, setCrackers] = useState<CrackerType[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUpType[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [level, setLevel] = useState(1);
  const [showFireworks, setShowFireworks] = useState(false);
  const [energy, setEnergy] = useState(100);
  const [frozen, setFrozen] = useState(false);
  const [magnetActive, setMagnetActive] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !frozen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [gameStarted, timeLeft, frozen]);

  useEffect(() => {
    if (combo > 0) {
      const comboTimer = setTimeout(() => {
        setCombo(0);
        setMultiplier(1);
      }, 3000);
      return () => clearTimeout(comboTimer);
    }
  }, [combo]);

  useEffect(() => {
    if (gameStarted) {
      const crackerInterval = setInterval(() => {
        spawnCracker();
      }, 2000 - level * 100);
      return () => clearInterval(crackerInterval);
    }
  }, [gameStarted, level]);

  useEffect(() => {
    if (gameStarted) {
      const powerUpInterval = setInterval(() => {
        spawnPowerUp();
      }, 8000);
      return () => clearInterval(powerUpInterval);
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCombo(0);
    setMultiplier(1);
    setTimeLeft(90);
    setLevel(1);
    setShowFireworks(false);
    setEnergy(100);
    setFrozen(false);
    setMagnetActive(false);

    const staticDiyas = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 25,
        0.5,
        (Math.random() - 0.5) * 25,
      ] as [number, number, number],
      lit: false,
      type: 'static' as const,
    }));

    const flyingDiyas = Array.from({ length: 7 }, (_, i) => ({
      id: i + 8,
      position: [
        (Math.random() - 0.5) * 20,
        2 + Math.random() * 3,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      lit: false,
      type: 'flying' as const,
      speed: 0.5 + Math.random() * 1.5,
      path: Math.floor(Math.random() * 3),
    }));

    setDiyas([...staticDiyas, ...flyingDiyas]);
    setCrackers([]);
    setPowerUps([]);
  };

  const spawnCracker = () => {
    const types: ('rocket' | 'sparkle' | 'bomb')[] = ['rocket', 'sparkle', 'bomb'];
    const type = types[Math.floor(Math.random() * types.length)];

    const newCracker: CrackerType = {
      id: Date.now() + Math.random(),
      position: [
        (Math.random() - 0.5) * 30,
        0.5,
        (Math.random() - 0.5) * 30,
      ],
      velocity: [
        (Math.random() - 0.5) * 0.2,
        type === 'rocket' ? 0.3 + Math.random() * 0.2 : 0.1,
        (Math.random() - 0.5) * 0.2,
      ],
      exploded: false,
      type,
    };

    setCrackers((prev) => [...prev, newCracker]);
  };

  const spawnPowerUp = () => {
    const types: ('time' | 'multiplier' | 'freeze' | 'magnet')[] = ['time', 'multiplier', 'freeze', 'magnet'];
    const type = types[Math.floor(Math.random() * types.length)];

    const newPowerUp: PowerUpType = {
      id: Date.now() + Math.random(),
      position: [
        (Math.random() - 0.5) * 20,
        2,
        (Math.random() - 0.5) * 20,
      ],
      type,
      collected: false,
    };

    setPowerUps((prev) => [...prev, newPowerUp]);
  };

  const lightDiya = useCallback((id: number) => {
    setDiyas((prev) =>
      prev.map((diya) => {
        if (diya.id === id && !diya.lit) {
          const points = diya.type === 'flying' ? 20 : 10;
          const totalPoints = points * multiplier;
          setScore((s) => s + totalPoints);
          setCombo((c) => c + 1);
          setMultiplier((m) => Math.min(m + 0.5, 5));
          setEnergy((e) => Math.min(e + 5, 100));

          const litCount = prev.filter(d => d.lit).length + 1;
          if (litCount % 5 === 0 && litCount > 0) {
            setLevel((l) => l + 1);
            setTimeLeft((t) => t + 10);
          }

          return { ...diya, lit: true };
        }
        return diya;
      })
    );
  }, [multiplier]);

  const hitCracker = useCallback((id: number) => {
    setCrackers((prev) =>
      prev.map((cracker) => {
        if (cracker.id === id && !cracker.exploded) {
          const points = cracker.type === 'rocket' ? 50 : cracker.type === 'bomb' ? 30 : 20;
          setScore((s) => s + points * multiplier);
          setCombo((c) => c + 1);
          return { ...cracker, exploded: true };
        }
        return cracker;
      })
    );

    setTimeout(() => {
      setCrackers((prev) => prev.filter((c) => c.id !== id));
    }, 1000);
  }, [multiplier]);

  const collectPowerUp = useCallback((id: number, type: string) => {
    setPowerUps((prev) =>
      prev.map((pu) => (pu.id === id ? { ...pu, collected: true } : pu))
    );

    switch (type) {
      case 'time':
        setTimeLeft((t) => t + 15);
        break;
      case 'multiplier':
        setMultiplier((m) => Math.min(m + 2, 10));
        setTimeout(() => setMultiplier(1), 10000);
        break;
      case 'freeze':
        setFrozen(true);
        setTimeout(() => setFrozen(false), 5000);
        break;
      case 'magnet':
        setMagnetActive(true);
        setTimeout(() => setMagnetActive(false), 8000);
        break;
    }

    setTimeout(() => {
      setPowerUps((prev) => prev.filter((p) => p.id !== id));
    }, 500);
  }, []);

  const endGame = () => {
    setShowFireworks(true);
    setGameStarted(false);
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 15, 25], fov: 65 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#0a051a']} />

        <Suspense fallback={null}>
          <Sky sunPosition={[0, 0.4, 1]} />
          <Environment preset="night" />

          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffa500" />
          <spotLight position={[-15, 20, 15]} angle={0.3} intensity={1} color="#ff69b4" castShadow />
          <spotLight position={[15, 20, -15]} angle={0.3} intensity={1} color="#4169e1" castShadow />

          <Stars radius={150} depth={60} count={8000} factor={6} saturation={0} fade speed={2} />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[80, 80]} />
            <meshStandardMaterial
              color="#1a0f2e"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>

          <Rangoli />

          <Temple position={[-20, 0, -20]} />
          <Temple position={[20, 0, -20]} />

          <Lantern position={[-10, 0, 10]} color="#ff0080" />
          <Lantern position={[10, 0, 10]} color="#00ff88" />
          <Lantern position={[-10, 0, -10]} color="#ffd700" />
          <Lantern position={[10, 0, -10]} color="#0080ff" />

          {gameStarted && diyas.map((diya) => {
            if (diya.type === 'flying') {
              return (
                <FlyingDiya
                  key={diya.id}
                  id={diya.id}
                  position={diya.position}
                  lit={diya.lit}
                  speed={diya.speed || 1}
                  path={diya.path || 0}
                  frozen={frozen}
                  magnetPosition={magnetActive ? [0, 0, 0] : undefined}
                  onClick={() => lightDiya(diya.id)}
                />
              );
            }
            return (
              <Diya
                key={diya.id}
                position={diya.position}
                lit={diya.lit}
                onClick={() => lightDiya(diya.id)}
              />
            );
          })}

          {gameStarted && crackers.map((cracker) => (
            <Cracker
              key={cracker.id}
              id={cracker.id}
              position={cracker.position}
              velocity={cracker.velocity}
              type={cracker.type}
              exploded={cracker.exploded}
              frozen={frozen}
              onClick={() => hitCracker(cracker.id)}
            />
          ))}

          {gameStarted && powerUps.map((powerUp) => (
            <PowerUp
              key={powerUp.id}
              id={powerUp.id}
              position={powerUp.position}
              type={powerUp.type}
              collected={powerUp.collected}
              onClick={() => collectPowerUp(powerUp.id, powerUp.type)}
            />
          ))}

          {showFireworks && <Fireworks />}

          <EffectComposer>
            <Bloom
              intensity={2.0}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005]}
            />
            <Vignette darkness={0.5} offset={0.3} />
          </EffectComposer>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={15}
            maxDistance={50}
            autoRotate={!gameStarted}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      <GameUI
        score={score}
        combo={combo}
        multiplier={multiplier}
        timeLeft={timeLeft}
        level={level}
        energy={energy}
        gameStarted={gameStarted}
        onStart={startGame}
        frozen={frozen}
        magnetActive={magnetActive}
        litDiyas={diyas.filter(d => d.lit).length}
        totalDiyas={diyas.length}
      />
    </div>
  );
}
