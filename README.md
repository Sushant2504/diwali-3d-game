# 🪔 Diwali Ultimate 3D Game - दीपावली महा साहसिक खेल

An **ADVANCED** interactive 3D Diwali celebration game with complex mechanics, multiple game modes, power-ups, and stunning visual effects built with Next.js and Three.js!

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🚀 Advanced Features

### 🎮 Complex Gameplay Mechanics

#### **Multiple Diya Types**
- **Static Diyas (10 pts)** - Traditional stationary oil lamps scattered across the field
- **Flying Diyas (20 pts)** - Dynamic diyas that follow 3 different flight paths with particle trails
  - Circular orbit patterns
  - Figure-8 patterns  
  - Sinusoidal wave patterns

#### **Interactive Crackers System**
- **🚀 Rockets (50 pts)** - Shoot upward with trailing flames
- **✨ Sparkles (20 pts)** - Rotating prismatic explosions
- **💣 Bombs (30 pts)** - Large spherical explosions with particle effects
- Click crackers before they explode for bonus points!
- Realistic physics with gravity and velocity

#### **Power-Up System**
- **⏰ Time Boost** - Adds +15 seconds to timer (Cyan octahedron)
- **×2 Multiplier** - Doubles your score for 10 seconds (Yellow dodecahedron)
- **❄️ Freeze** - Freezes all moving objects for 5 seconds (Ice blue icosahedron)
- **🧲 Magnet** - Attracts flying diyas toward center for 8 seconds (Pink torus)

### 📊 Advanced Scoring System

- **Combo System** - Chain lights within 3 seconds to build combos
- **Multiplier System** - Each combo increases multiplier up to 5x
- **Progressive Difficulty** - Every 5 diyas lit increases level
- **Level Bonuses** - Each level-up grants +10 seconds
- **Energy System** - Gain +5 energy per diya, manage your vitality

### 🌟 Stunning Visual Effects

#### **Post-Processing**
- **Bloom Effects** - Realistic glow from flames and lights
- **Chromatic Aberration** - Subtle color fringing for depth
- **Vignette** - Professional cinematic darkened edges
- **Mipmapped Blur** - Optimized performance with quality

#### **Dynamic Lighting**
- Multiple colored spotlights (pink, blue)
- Point lights from each flame
- Directional shadows from main light
- Ambient temple glow effects
- Animated lantern intensities

#### **Particle Systems**
- 1000+ particle fireworks with physics
- Flying diya particle trails
- Cracker explosion particles
- Power-up glow rings and sparkles

### 🏗️ 3D Environment

#### **Decorative Structures**
- **🏯 Temples** - Detailed 3D temples in each corner
  - Multi-tiered architecture
  - Golden domes and pillars
  - Animated glowing lights
  - Cast dynamic shadows

- **🏮 Lanterns** - Hanging decorative lanterns
  - 4 color varieties (pink, green, gold, blue)
  - Swinging animation
  - Pulsing light effects
  - Ornate geometric designs

- **✨ Rangoli** - Central decorative mandala
  - 3-tier concentric design
  - 6 vibrant colors
  - Smooth rotation animation
  - 24 decorative stars

### 🎯 Game Objectives

1. **Light All Diyas** - Both static and flying varieties
2. **Explode Crackers** - Click rockets, sparkles, and bombs
3. **Collect Power-Ups** - Strategic timing for maximum advantage
4. **Build Combos** - Chain actions for massive multiplier bonuses
5. **Level Up** - Progress through increasing difficulty
6. **Beat the Clock** - 90-second time limit with extensions

## 🛠️ Tech Stack

```json
{
  "framework": "Next.js 16.4",
  "language": "TypeScript",
  "3d-engine": "Three.js",
  "react-renderer": "React Three Fiber",
  "3d-helpers": "@react-three/drei",
  "post-processing": "@react-three/postprocessing",
  "styling": "Tailwind CSS",
  "optimization": "Turbopack"
}
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play!

## 🎮 Controls

### Camera
- **Left-Click + Drag** - Rotate camera view
- **Scroll Wheel** - Zoom in/out
- **Right-Click + Drag** - Pan camera
- **Auto-Rotate** - Enabled on menu screen

### Gameplay
- **Click Diyas** - Light them for points
- **Click Crackers** - Explode for bonus points
- **Click Power-Ups** - Collect special abilities
- **Build Combos** - Quick successive clicks

## 📂 Advanced Project Structure

```
diwali-3d-game/
├── app/
│   ├── page.tsx              # Main entry with dynamic imports
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles + canvas config
├── components/
│   ├── DiwaliGame.tsx        # Main game logic & state
│   ├── Diya.tsx              # Static diya 3D model
│   ├── FlyingDiya.tsx        # Animated flying diya with trails
│   ├── Cracker.tsx           # Rocket/bomb physics system
│   ├── PowerUp.tsx           # Power-up collectibles
│   ├── Fireworks.tsx         # Particle celebration system
│   ├── Rangoli.tsx           # Central decorative mandala
│   ├── Temple.tsx            # Detailed temple structures
│   ├── Lantern.tsx           # Hanging decorative lanterns
│   └── GameUI.tsx            # HUD & overlay system
├── public/                   # Static assets
└── package.json              # Dependencies
```

## 🎨 Game States

### 1. **Menu State**
- Auto-rotating camera
- Feature showcase
- Epic start button
- Pro tips display

### 2. **Playing State**
- Live score & stats
- Combo counter
- Multiplier display
- Energy bar
- Progress tracking
- Active effects indicator

### 3. **Game Over State**
- Final statistics
- Achievement display
- Perfect game detection
- Replay option

## 🎯 Advanced Mechanics Explained

### Combo System
- Chain actions within 3-second window
- Each combo increases multiplier by 0.5x
- Maximum multiplier: 10x (with power-ups)
- Combo breaks if idle for 3 seconds

### Flight Paths (Flying Diyas)
```typescript
Path 0: Circular orbit
  x = sin(t) * 10
  z = cos(t) * 10
  y = 3 + sin(t*2) * 1.5

Path 1: Figure-8
  x = sin(t*0.7) * 15
  z = sin(t*1.3) * 8
  y = 2.5 + abs(sin(t)) * 2

Path 2: Wave pattern
  x = cos(t*1.2) * 12
  z = sin(t*0.8) * 12
  y = 4 + cos(t*1.5) * 1
```

### Magnet Physics
- Lerp position toward magnet center
- Interpolation factor: 0.02 (smooth attraction)
- Overrides normal flight paths
- Visual feedback with trail effects

## 🌟 Visual Effects Breakdown

### Bloom Configuration
- Intensity: 2.0
- Luminance Threshold: 0.15
- Mipmap Blur: Enabled
- Targets: Flames, power-ups, explosions

### Lighting Setup
- Ambient: 0.4 intensity (base illumination)
- Directional: 0.8 intensity (main shadows)
- 2x Spotlights: 1.0 intensity (accent colors)
- Multiple point lights: Dynamic per object

### Shadow System
- Directional shadow casting
- Per-diya flame shadows
- Temple structure shadows
- Optimized shadow maps

## 🔮 Performance Optimizations

- **Dynamic Imports** - Client-side only rendering
- **Suspense Boundaries** - Smooth loading states
- **Memoization** - Particle position caching
- **Instancing** - Efficient geometry reuse
- **LOD** - Distance-based detail levels
- **Turbopack** - Fast development builds

## 🎊 Difficulty Progression

| Level | Diyas | Crackers/sec | Power-Up Rate | Time Bonus |
|-------|-------|--------------|---------------|------------|
| 1     | 15    | 0.5/sec      | 12.5%         | +10s       |
| 2     | 15    | 0.67/sec     | 12.5%         | +10s       |
| 3     | 15    | 1.0/sec      | 12.5%         | +10s       |
| 4+    | 15    | 1.33/sec     | 12.5%         | +10s       |

## 🏆 Scoring Guide

| Action              | Base Points | With 2x Multiplier | Max (5x) |
|---------------------|-------------|---------------------|----------|
| Static Diya         | 10          | 20                  | 50       |
| Flying Diya         | 20          | 40                  | 100      |
| Sparkle Cracker     | 20          | 40                  | 100      |
| Bomb Cracker        | 30          | 60                  | 150      |
| Rocket Cracker      | 50          | 100                 | 250      |

## 🐛 Known Issues

None currently! Game is fully optimized. 🎉

## 🔮 Future Enhancements

- [ ] Sound effects and background music
- [ ] Multiplayer mode with leaderboards
- [ ] More power-up types (shield, slow-mo, double-tap)
- [ ] Mobile touch controls
- [ ] VR support
- [ ] Custom diya skins
- [ ] Achievement system with badges
- [ ] Daily challenges
- [ ] Replay system
- [ ] Screen shake effects
- [ ] Weather effects (sparkles, petals)

## 📝 License

Open source for educational and personal use.

## 🙏 Credits

Built with ❤️ for Diwali 2024!

**Technologies:**
- Next.js 16.4 with App Router
- Three.js for 3D graphics
- React Three Fiber ecosystem
- Tailwind CSS for UI

**Festival:** Diwali (Festival of Lights)
**Inspiration:** Traditional Indian Diwali celebrations

## 🎊 Happy Diwali! शुभ दीपावली!

May your life be filled with light, prosperity, and joy!

---

**Built with Next.js 16.4, Three.js, and lots of festive spirit! 🪔✨**
