import { motion } from 'framer-motion'
import RaffleWheel from './RaffleWheel'
import StatChip from './StatChip'
import FloatingPrizes from './FloatingPrizes'

const stats = [
  { label: 'بلیط‌ها', value: '۲۵۳,۴۸۲' },
  { label: 'قرعه‌کشی بعدی', value: '۲ روز دیگر' },
  { label: 'ارزش جایزه', value: '۱۵۰ میلیون' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function Hero() {
  return (
    <>
      <FloatingPrizes />

      <section className="relative z-10 max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
        <motion.p {...fadeUp(0)} className="text-ice font-bold text-sm">
          قرعه‌کشی زنده هر هفته
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl font-extrabold leading-snug mt-3"
        >
          یک جایزه، یک برنده.
          <br />
          شاید این بار تو!
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-ice leading-8 mt-4 max-w-md mx-auto"
        >
          ثبت‌نام کن، بلیط بگیر و لحظه‌ی چرخش چرخ شانس رو زنده ببین.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <RaffleWheel />
        </motion.div>

        <motion.button
          {...fadeUp(0.5)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-3 rounded-xl bg-white text-brand-700 font-extrabold shadow-xl shadow-black/20"
        >
          همین الان شرکت کن
        </motion.button>

        <motion.div
          {...fadeUp(0.6)}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {stats.map((s) => (
            <StatChip key={s.label} {...s} />
          ))}
        </motion.div>
      </section>
    </>
  )
}