'use client';

interface GameUIProps {
  score: number;
  combo: number;
  multiplier: number;
  timeLeft: number;
  level: number;
  energy: number;
  gameStarted: boolean;
  frozen: boolean;
  magnetActive: boolean;
  onStart: () => void;
  litDiyas: number;
  totalDiyas: number;
}

export default function GameUI({
  score,
  combo,
  multiplier,
  timeLeft,
  level,
  energy,
  gameStarted,
  frozen,
  magnetActive,
  onStart,
  litDiyas,
  totalDiyas,
}: GameUIProps) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 text-center p-4 pointer-events-none z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 drop-shadow-2xl animate-pulse">
          🪔 Diwali Ultimate 3D 🪔
        </h1>
        <p className="text-lg md:text-xl text-yellow-300 mt-1 drop-shadow-lg font-semibold">
          दीपावली की शुभकामनाएं
        </p>
      </div>

      {gameStarted && (
        <>
          <div className="absolute top-20 left-4 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-4 border-2 border-yellow-500/60 shadow-2xl">
            <div className="space-y-3">
              <div className="text-center bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-3">
                <div className="text-yellow-100 text-xs font-bold uppercase tracking-wider">
                  Score
                </div>
                <div className="text-3xl font-black text-white drop-shadow-lg">{score}</div>
              </div>

              {combo > 0 && (
                <div className="text-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-2 animate-pulse">
                  <div className="text-pink-100 text-xs font-bold uppercase">Combo</div>
                  <div className="text-2xl font-black text-white">{combo}x 🔥</div>
                </div>
              )}

              <div className="text-center bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-2">
                <div className="text-orange-100 text-xs font-bold uppercase">Multiplier</div>
                <div className="text-xl font-black text-white">×{multiplier.toFixed(1)}</div>
              </div>

              <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-2">
                <div className="text-blue-100 text-xs font-bold uppercase">Level</div>
                <div className="text-2xl font-black text-white">Level {level}</div>
              </div>

              <div className="text-center border-t-2 border-yellow-500/30 pt-3">
                <div className={`text-xs font-bold uppercase tracking-wider ${timeLeft <= 10 ? 'text-red-400' : 'text-orange-400'}`}>
                  Time
                </div>
                <div className={`text-2xl font-bold mt-1 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  {timeLeft}s
                </div>
              </div>

              <div className="text-center border-t-2 border-yellow-500/30 pt-3">
                <div className="text-green-400 text-xs font-bold uppercase">Energy</div>
                <div className="w-full bg-gray-800 rounded-full h-3 mt-1 border border-green-500/50">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-600 h-full rounded-full transition-all duration-300 shadow-lg shadow-green-500/50"
                    style={{ width: `${energy}%` }}
                  />
                </div>
                <div className="text-white text-sm font-bold mt-1">{energy}%</div>
              </div>

              <div className="text-center border-t-2 border-yellow-500/30 pt-3">
                <div className="text-pink-400 text-xs font-bold uppercase">Diyas</div>
                <div className="text-lg font-bold text-white mt-1">
                  {litDiyas} / {totalDiyas}
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mt-2 border border-pink-500/50">
                  <div
                    className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 h-full rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50"
                    style={{ width: `${(litDiyas / totalDiyas) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-20 right-4 space-y-3">
            <div className="bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-purple-500/60 max-w-xs shadow-2xl">
              <h3 className="text-base font-bold text-purple-300 mb-2 flex items-center gap-2">
                <span>🎮</span> Controls
              </h3>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>🪔 <strong>Click Diyas</strong> - Light them up!</li>
                <li>🎆 <strong>Click Crackers</strong> - Explode for points!</li>
                <li>⭐ <strong>Collect Power-ups</strong> - Special abilities!</li>
                <li>🖱️ <strong>Drag</strong> - Rotate camera</li>
                <li>🔍 <strong>Scroll</strong> - Zoom in/out</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-cyan-500/60 max-w-xs shadow-2xl">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>⚡</span> Power-ups
              </h3>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>⏰ <strong className="text-cyan-400">Time</strong> - +15 seconds</li>
                <li>×2 <strong className="text-yellow-400">Multiplier</strong> - Double points</li>
                <li>❄️ <strong className="text-blue-400">Freeze</strong> - Stop movement</li>
                <li>🧲 <strong className="text-pink-400">Magnet</strong> - Attract diyas</li>
              </ul>
            </div>

            {(frozen || magnetActive) && (
              <div className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-3 border-2 border-green-500/60 shadow-2xl animate-pulse">
                <h3 className="text-sm font-bold text-green-300 mb-1">Active Effects</h3>
                <div className="space-y-1 text-xs">
                  {frozen && <div className="text-blue-400">❄️ <strong>FROZEN</strong></div>}
                  {magnetActive && <div className="text-pink-400">🧲 <strong>MAGNET</strong></div>}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-gradient-to-br from-purple-900/90 via-black/90 to-orange-900/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border-4 border-yellow-500/70 pointer-events-auto max-w-3xl shadow-2xl">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">🪔✨🎆🎇🔥</div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 mb-4 drop-shadow-2xl">
              Diwali Ultimate Quest
            </h2>
            <p className="text-xl md:text-2xl text-yellow-300 mb-6 font-bold">
              दीपावली महा साहसिक खेल
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-orange-800/50 to-red-900/50 rounded-2xl p-4 border-2 border-orange-500/50">
                <h3 className="text-lg font-bold text-orange-300 mb-2">🎯 Objectives</h3>
                <ul className="text-sm text-gray-200 space-y-1 text-left">
                  <li>✨ Light static & flying diyas</li>
                  <li>🎆 Explode crackers & rockets</li>
                  <li>⭐ Collect power-ups</li>
                  <li>🏆 Reach high scores & levels</li>
                  <li>⏰ Beat the clock!</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-800/50 to-pink-900/50 rounded-2xl p-4 border-2 border-purple-500/50">
                <h3 className="text-lg font-bold text-purple-300 mb-2">🎮 Features</h3>
                <ul className="text-sm text-gray-200 space-y-1 text-left">
                  <li>🔥 Combo & multiplier system</li>
                  <li>📈 Progressive difficulty</li>
                  <li>💫 Stunning visual effects</li>
                  <li>🏯 Beautiful 3D temples</li>
                  <li>🌟 Dynamic lighting</li>
                </ul>
              </div>
            </div>

            <button
              onClick={onStart}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 text-white font-black text-xl md:text-2xl px-10 md:px-16 py-4 md:py-6 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 border-4 border-yellow-300/50 animate-pulse"
            >
              🎮 START EPIC GAME 🎮
            </button>

            <div className="mt-6 text-xs md:text-sm text-gray-400 space-y-1">
              <p>💡 Pro Tip: Build combos for massive multipliers!</p>
              <p>🎯 Flying diyas are worth double points!</p>
              <p>⚡ Collect power-ups for game-changing abilities!</p>
            </div>
          </div>
        </div>
      )}

      {!gameStarted && timeLeft === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50">
          <div className="text-center bg-gradient-to-br from-purple-900/95 via-black/95 to-orange-900/95 backdrop-blur-2xl rounded-3xl p-12 border-4 border-yellow-500 pointer-events-auto shadow-2xl">
            <div className="text-8xl mb-6 animate-spin-slow">🎆🎉🪔🎇</div>
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
              GAME COMPLETE!
            </h2>

            <div className="space-y-4 mb-8">
              <div className="text-4xl text-white">
                Final Score: <span className="text-yellow-400 font-black">{score}</span>
              </div>
              <div className="text-2xl text-orange-300">
                Level Reached: <span className="font-bold">{level}</span>
              </div>
              <div className="text-2xl text-pink-300">
                Diyas Lit: <span className="font-bold">{litDiyas} / {totalDiyas}</span>
              </div>
              <div className="text-xl text-purple-300">
                Max Combo: <span className="font-bold">{combo}x</span>
              </div>

              {litDiyas === totalDiyas ? (
                <div className="text-4xl font-black text-green-400 animate-pulse mt-6">
                  🎊 PERFECT GAME! 🎊
                  <br />
                  <span className="text-2xl">सभी दीये जलाए!</span>
                </div>
              ) : (
                <div className="text-2xl text-yellow-300 mt-6">
                  Amazing effort! Beat your high score! 💪
                </div>
              )}
            </div>

            <button
              onClick={onStart}
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white font-black text-2xl px-12 py-5 rounded-full hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/30"
            >
              🔄 PLAY AGAIN 🔄
            </button>
          </div>
        </div>
      )}
    </>
  );
}
