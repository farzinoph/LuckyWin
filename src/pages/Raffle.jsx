import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRaffle } from '../data/raffles'
import { usePageTransition } from '../components/PageTransition'

const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

const btnClass =
  'mt-6 block w-full py-3 rounded-xl bg-white text-brand-700 font-extrabold shadow-xl shadow-black/20 transition-transform duration-150 hover:scale-105 active:scale-95'

function Slots({ total, filled }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
            delay: 0.3 + i * 0.05,
          }}
          className={`w-9 h-9 rounded-full grid place-items-center text-sm font-bold transition-colors duration-300 ${
            i < filled
              ? 'bg-white text-brand-700'
              : 'border-2 border-dashed border-white/40 text-white/40'
          }`}
        >
          {i < filled ? '✓' : toFa(i + 1)}
        </motion.div>
      ))}
    </div>
  )
}

function StatusPanel({ raffle }) {
  const left = raffle.capacity - raffle.joined

  if (raffle.status === 'open') {
    return (
      <>
        <Slots total={raffle.capacity} filled={raffle.joined} />
        <p className="text-ice text-sm mt-4">
          {toFa(raffle.joined)} از {toFa(raffle.capacity)} نفر ثبت‌نام کردن، فقط{' '}
          {toFa(left)} جای خالی مونده
        </p>
        <button className={btnClass}>
          ثبت‌نام و خرید بلیط ({raffle.price})
        </button>
        <p className="text-ice/70 text-xs mt-3">
          هر نفر یک بلیط. قرعه‌کشی بعد از تکمیل ظرفیت شروع می‌شه.
        </p>
      </>
    )
  }

  if (raffle.status === 'full') {
    return (
      <>
        <Slots total={raffle.capacity} filled={raffle.capacity} />
        <p className="font-extrabold text-xl mt-5">ظرفیت تکمیل شد 🎉</p>
        <p className="text-ice text-sm mt-2">قرعه‌کشی زنده: {raffle.liveAt}</p>
        <p className="text-ice/70 text-xs mt-3">
          لینک لایو همون موقع همین‌جا فعال می‌شه.
        </p>
      </>
    )
  }

  if (raffle.status === 'live') {
    return (
      <>
        <div className="flex items-center justify-center gap-2 font-extrabold text-xl">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500" />
          </span>
          قرعه‌کشی همین الان لایوه
        </div>
        <a href={raffle.liveUrl} target="_blank" rel="noreferrer" className={btnClass}>
          تماشای لایو
        </a>
      </>
    )
  }

  return (
    <>
      <p className="text-ice text-sm">برنده‌ی این دوره</p>
      <p className="text-3xl font-extrabold mt-2">🏆 {raffle.winner}</p>
      <p className="text-ice/70 text-xs mt-4">دوره‌ی بعدی به‌زودی اعلام می‌شه.</p>
    </>
  )
}

export default function Raffle() {
  const { id } = useParams()
  const raffle = getRaffle(id)
  const go = usePageTransition()

  if (!raffle) {
    return (
      <section className="relative z-10 max-w-lg mx-auto px-4 pt-40 text-center">
        <p className="text-2xl font-extrabold">این قرعه‌کشی پیدا نشد 🤔</p>
        <button
          onClick={(e) => go('/raffles', e)}
          className="mt-6 px-6 py-3 rounded-xl bg-white text-brand-700 font-extrabold"
        >
          مشاهده‌ی همه‌ی قرعه‌کشی‌ها
        </button>
      </section>
    )
  }

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-24">
      <Link
        to="/raffles"
        onClick={(e) => {
          e.preventDefault()
          go('/raffles', e)
        }}
        className="inline-block text-ice text-sm mb-6 hover:text-white transition-colors"
      >
        ← همه‌ی قرعه‌کشی‌ها
      </Link>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          {...fade(0)}
          className="aspect-square rounded-3xl bg-white/10 border border-white/20 grid place-items-center relative"
        >
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-brand-700 text-xs font-bold">
            جایزه‌ی اصلی
          </span>
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[9rem] md:text-[11rem] leading-none"
          >
            {raffle.emoji}
          </motion.span>
        </motion.div>

        <div className="text-center md:text-right">
          <motion.p {...fade(0.1)} className="text-ice font-bold text-sm">
            قرعه‌کشی فعال
          </motion.p>
          <motion.h1 {...fade(0.15)} className="text-4xl font-extrabold mt-2">
            {raffle.title}
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-ice leading-8 mt-3">
            {raffle.desc}
          </motion.p>

          <motion.div
            {...fade(0.25)}
            className="mt-8 p-6 rounded-3xl bg-white/10 border border-white/20 text-center"
          >
            <StatusPanel raffle={raffle} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}