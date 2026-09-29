import { useEffect } from 'react'
import { motion } from 'framer-motion'
import RaffleWheel from '../components/RaffleWheel'
import StatChip from '../components/StatChip'
import FloatingPrizes from '../components/FloatingPrizes'
import { usePageTransition } from '../components/PageTransition'
import { useActiveSection } from '../context/ActiveSectionContext'

const stats = [
  { label: 'بلیط‌ها', value: '۲۵۳,۴۸۲' },
  { label: 'قرعه‌کشی بعدی', value: '۲ روز دیگر' },
  { label: 'ارزش جایزه', value: '۱۵۰ میلیون' },
]

const rules = [
  'هر نفر می‌تونه یک یا چند بلیط بخره؛ هر بلیط یک شانس جداست.',
  'قرعه‌کشی وقتی شروع می‌شه که ظرفیت تکمیل بشه.',
  'قرعه‌کشی به‌صورت دستی و با کاغذ، توی لایو انجام می‌شه.',
  'لیست بلیط‌های ثبت‌شده قبل از قرعه‌کشی به‌صورت عمومی نمایش داده می‌شه.',
  'برنده حداکثر تا ۴۸ ساعت بعد از قرعه‌کشی برای هماهنگی ارسال جایزه تماس گرفته می‌شه.',
]

const faqs = [
  {
    q: 'قرعه‌کشی چطور برگزار می‌شه؟',
    a: 'برای هر بلیط یک برگه‌ی کاغذی با شماره‌ی مشخص چاپ می‌شه. همه‌ی برگه‌ها داخل یک ظرف ریخته می‌شن و توی لایو یک نفر به‌صورت تصادفی انتخاب می‌شه.',
  },
  {
    q: 'از کجا مطمئن باشم قرعه‌کشی واقعیه؟',
    a: 'کل فرآیند به‌صورت زنده پخش می‌شه و لیست شماره‌بلیط‌ها هم از قبل توی سایت عمومیه، پس هر کسی می‌تونه راستی‌آزمایی کنه.',
  },
  {
    q: 'اگه برنده شدم چیکار کنم؟',
    a: 'بعد از اعلام نتیجه با شماره‌ای که موقع ثبت‌نام دادی باهات تماس گرفته می‌شه تا جایزه ارسال بشه.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const sectionIds = ['home', 'rules', 'about', 'faq', 'contact']

function useSectionObserver() {
  const [, setActive] = useActiveSection()

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.55] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [setActive])
}

export default function Home() {
  const go = usePageTransition()
  useSectionObserver()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const targetId = sectionIds.includes(hash) ? hash : 'home'
    const el = document.getElementById(targetId)
    el?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])

  return (
    <div className="h-svh overflow-y-auto snap-y snap-mandatory">
      <section
        id="home"
        className="relative snap-start min-h-svh max-w-3xl mx-auto px-4 pt-24 pb-5 flex flex-col items-center justify-between text-center"
      >
        <FloatingPrizes />

        <div className="relative z-10">
          <motion.p {...fadeUp(0)} className="text-ice font-bold text-sm">
            قرعه‌کشی زنده
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-extrabold leading-snug mt-2 text-[clamp(1.6rem,5.2svh,3rem)]"
          >
            یک جایزه، یک برنده.
            <br />
            شاید این بار تو!
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-ice leading-7 mt-2 max-w-md mx-auto text-sm md:text-base"
          >
            ثبت‌نام کن، بلیط بگیر و لحظه‌ی قرعه‌کشی رو زنده ببین.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 py-3"
        >
          <RaffleWheel />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div {...fadeUp(0.5)}>
            <button
              onClick={(e) => go('/raffles', e)}
              className="px-8 py-3 rounded-xl bg-white text-brand-700 font-extrabold shadow-xl shadow-black/20 transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              همین الان شرکت کن
            </button>
          </motion.div>

          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-wrap justify-center gap-2"
          >
            {stats.map((s) => (
              <StatChip key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

      </section>

      <section
        id="rules"
        className="snap-start min-h-svh flex flex-col justify-center max-w-3xl mx-auto px-4 py-16"
      >
        <motion.h2 {...fadeIn(0)} className="text-3xl font-extrabold mb-8 text-center">
          قوانین
        </motion.h2>
        <div className="space-y-3">
          {rules.map((r, i) => (
            <motion.div
              key={i}
              {...fadeIn(0.05 * i)}
              className="flex gap-3 bg-white/10 border border-white/20 rounded-2xl p-4"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-white text-brand-700 grid place-items-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-ice leading-7">{r}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="snap-start min-h-svh flex flex-col justify-center max-w-3xl mx-auto px-4 py-16"
      >
        <motion.h2 {...fadeIn(0)} className="text-3xl font-extrabold mb-8 text-center">
          درباره‌ی ما
        </motion.h2>
        <motion.p {...fadeIn(0.1)} className="text-ice leading-8 text-center">
          شانس‌بازی یه سایت قرعه‌کشیه که هر دوره یک کالای واقعی رو بین
          شرکت‌کننده‌ها به‌صورت تصادفی و شفاف قرعه‌کشی می‌کنه. هدف ما اینه که
          خرید بلیط ساده، ارزان و کاملاً منصفانه باشه؛ برای همین قرعه‌کشی رو
          به‌صورت دستی و زنده برگزار می‌کنیم تا همه بتونن نتیجه رو با چشم خودشون
          ببینن.
        </motion.p>
      </section>

      <section
        id="faq"
        className="snap-start min-h-svh flex flex-col justify-center max-w-3xl mx-auto px-4 py-16"
      >
        <motion.h2 {...fadeIn(0)} className="text-3xl font-extrabold mb-8 text-center">
          سوالات متداول
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              {...fadeIn(0.05 * i)}
              className="bg-white/10 border border-white/20 rounded-2xl p-5"
            >
              <p className="font-bold mb-2">{f.q}</p>
              <p className="text-ice text-sm leading-7">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="snap-start min-h-svh flex flex-col justify-center max-w-3xl mx-auto px-4 py-16"
      >
        <motion.h2 {...fadeIn(0)} className="text-3xl font-extrabold mb-8 text-center">
          ارتباط با ما
        </motion.h2>
        <motion.div
          {...fadeIn(0.1)}
          className="text-center bg-white/10 border border-white/20 rounded-2xl p-8"
        >
          <p className="text-ice leading-8">
            برای هر سوالی می‌تونی از طریق اینستاگرام یا تلگرام باهامون در
            تماس باشی.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-sm"
            <a>
              اینستاگرام
            </a>
            
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-sm"
            <a>
              تلگرام
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}