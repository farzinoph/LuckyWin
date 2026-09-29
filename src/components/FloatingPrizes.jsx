const prizes = [
  { e: '🎁', x: 6,  size: 60, d: 28, delay: -4,  o: 0.5,  sway: 18, sd: 8,  r0: -12, r1: 14 },
  { e: '🎧', x: 20, size: 48, d: 34, delay: -20, o: 0.35, sway: 14, sd: 10, r0: 10,  r1: -16 },
  { e: '🎮', x: 34, size: 58, d: 30, delay: -11, o: 0.5,  sway: 20, sd: 8,  r0: -8,  r1: 18 },
  { e: '📱', x: 48, size: 40, d: 38, delay: -30, o: 0.28, sway: 12, sd: 11, r0: 14,  r1: -10 },
  { e: '💎', x: 62, size: 56, d: 29, delay: -16, o: 0.5,  sway: 16, sd: 8,  r0: -14, r1: 12 },
  { e: '📷', x: 76, size: 44, d: 36, delay: -8,  o: 0.32, sway: 14, sd: 10, r0: 8,   r1: -14 },
  { e: '⌚', x: 90, size: 54, d: 31, delay: -24, o: 0.45, sway: 15, sd: 9,  r0: -10, r1: 16 },
  { e: '💻', x: 13, size: 38, d: 40, delay: -33, o: 0.25, sway: 10, sd: 12, r0: -6,  r1: 10 },
  { e: '🏆', x: 68, size: 36, d: 42, delay: -2,  o: 0.25, sway: 10, sd: 12, r0: 10,  r1: -8 },
]

export default function FloatingPrizes() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {prizes.map((p, i) => (
        <div
          key={i}
          className="prize-rise"
          style={{
            left: `${p.x}%`,
            '--d': `${p.d}s`,
            '--delay': `${p.delay}s`,
            '--o': p.o,
            '--r0': `${p.r0}deg`,
            '--r1': `${p.r1}deg`,
          }}
        >
          <span
            className="prize-sway"
            style={{
              '--sway': `${p.sway}px`,
              '--sd': `${p.sd}s`,
              fontSize: p.size,
              lineHeight: 1,
            }}
          >
            {p.e}
          </span>
        </div>
      ))}
    </div>
  )
}