const wheelBg = `conic-gradient(
  #fff 0 12.5%, #93c5fd 0 25%, #fff 0 37.5%, #60a5fa 0 50%,
  #fff 0 62.5%, #93c5fd 0 75%, #fff 0 87.5%, #60a5fa 0
)`

export default function RaffleWheel({ duration = 14 }) {
  return (
    <div className="relative mx-auto my-10 w-72 h-72 md:w-96 md:h-96">
      {/* نشانگر */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-3xl md:text-4xl">
        🔻
      </div>

      {/* هاله‌ی نور (گرادیان ساده، بدون blur) */}
      <div
        className="absolute -inset-8 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%)',
        }}
      />

      {/* سایه‌ی ثابت (نمی‌چرخه) */}
      <div className="absolute inset-0 rounded-full shadow-2xl shadow-black/40" />

      {/* خود چرخ */}
      <div
        className="wheel-spin relative w-full h-full rounded-full border-[10px] border-white/30"
        style={{ background: wheelBg, '--spin': `${duration}s` }}
      />

      {/* دایره‌ی وسط: بیرون از چرخ، پس دیگه لازم نیست خلاف جهت بچرخه */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-navy-950 border-4 border-white/30 grid place-items-center">
          <span className="wheel-pulse text-5xl md:text-7xl">🎁</span>
        </div>
      </div>
    </div>
  )
}