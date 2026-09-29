const wheelBg = `conic-gradient(
  #fff 0 12.5%, #93c5fd 0 25%, #fff 0 37.5%, #60a5fa 0 50%,
  #fff 0 62.5%, #93c5fd 0 75%, #fff 0 87.5%, #60a5fa 0
)`

export default function RaffleWheel({
  duration = 14,
  size = 'min(70vw, 38svh)',
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ '--wheel': size, width: 'var(--wheel)', height: 'var(--wheel)' }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 leading-none"
        style={{ top: 'calc(var(--wheel) * -0.05)', fontSize: 'calc(var(--wheel) * 0.1)' }}
      >
        🔻
      </div>

      <div
        className="absolute -inset-8 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%)',
        }}
      />

      <div className="absolute inset-0 rounded-full shadow-2xl shadow-black/40" />

      <div
        className="wheel-spin relative w-full h-full rounded-full border-[8px] border-white/30"
        style={{ background: wheelBg, '--spin': `${duration}s` }}
      />

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div
          className="rounded-full bg-navy-950 border-4 border-white/30 grid place-items-center"
          style={{ width: '36%', height: '36%' }}
        >
          <span
            className="wheel-pulse leading-none"
            style={{ fontSize: 'calc(var(--wheel) * 0.19)' }}
          >
            🎁
          </span>
        </div>
      </div>
    </div>
  )
}