import { motion } from 'framer-motion'
import { raffles } from '../data/raffles'
import { usePageTransition } from '../components/PageTransition'

const statusMeta = {
  open: { label: 'در حال ثبت‌نام', className: 'bg-emerald-400/20 text-emerald-300' },
  full: { label: 'ظرفیت پر', className: 'bg-amber-400/20 text-amber-300' },
  live: { label: 'لایو', className: 'bg-red-400/20 text-red-300' },
  done: { label: 'پایان یافته', className: 'bg-white/10 text-ice' },
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function RaffleCard({ raffle, index }) {
  const go = usePageTransition()
  const meta = statusMeta[raffle.status]
  const pct = Math.round((raffle.joined / raffle.capacity) * 100)

  return (
    <motion.button
      {...fade(0.08 * index)}
      onClick={(e) => go(`/raffle/${raffle.id}`, e)}
      className="text-right bg-white/10 border border-white/20 rounded-3xl p-5 hover:bg-white/15 transition-colors"
    >
      <div className="flex items-start justify-between">
        <span className="text-5xl">{raffle.emoji}</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${meta.className}`}>
          {meta.label}
        </span>
      </div>

      <h3 className="text-xl font-extrabold mt-4">{raffle.title}</h3>
      <p className="text-ice text-sm mt-1 leading-6">{raffle.desc}</p>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-ice/70 mt-2">
          {raffle.joined} از {raffle.capacity} نفر · قیمت بلیط {raffle.price}
        </p>
      </div>
    </motion.button>
  )
}

export default function Raffles() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-24">
      <motion.div {...fade(0)} className="text-center mb-10">
        <p className="text-ice font-bold text-sm">همه‌ی قرعه‌کشی‌ها</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
          کدوم جایزه رو می‌خوای؟
        </h1>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {raffles.map((r, i) => (
          <RaffleCard key={r.id} raffle={r} index={i} />
        ))}
      </div>
    </section>
  )
}