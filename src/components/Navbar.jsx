import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { usePageTransition } from './PageTransition'
import { useActiveSection } from '../context/ActiveSectionContext'

const links = [
  { to: '/', label: 'خانه', section: 'home' },
  { to: '/#rules', label: 'قوانین', section: 'rules' },
  { to: '/#about', label: 'درباره ما', section: 'about' },
]

export default function Navbar() {
  const go = usePageTransition()
  const location = useLocation()
  const [activeSection] = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

  const isLinkActive = (link) => {
    if (link.section) {
      return location.pathname === '/' && activeSection === link.section
    }
    return location.pathname === link.to
  }

  const handleNav = (to) => (e) => {
    e.preventDefault()
    setOpen(false)
    const [path, hash] = to.split('#')
    const targetPath = path || '/'

    if (targetPath === location.pathname) {
      const id = hash || 'home'
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      go(to, e)
    }
  }

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: scrolled ? 760 : 1100,
          backgroundColor: scrolled
            ? 'rgba(11, 26, 74, 0.85)'
            : 'rgba(255, 255, 255, 0.16)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="relative w-full h-16 rounded-full border border-white/20 shadow-xl shadow-black/20 px-3 flex items-center justify-between"
      >
        <Link
          to="/"
          onClick={handleNav('/')}
          className="flex items-center gap-2 pr-2"
        >
          <motion.span
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-full bg-white grid place-items-center text-lg"
          >
            🎁
          </motion.span>
          <span className="text-lg font-extrabold">برد شانسی</span>
        </Link>

        <ul
          onMouseLeave={() => setHovered(null)}
          className="hidden md:flex items-center gap-1"
        >
          {links.map((l) => {
            const active = isLinkActive(l)
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={handleNav(l.to)}
                  onMouseEnter={() => setHovered(l.to)}
                  className={`relative block px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-ice'
                  }`}
                >
                  {hovered === l.to && (
                    <motion.span
                      layoutId="hover-pill"
                      className="absolute inset-0 rounded-full bg-white/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                  {active && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 text-xs text-ice px-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </span>
            قرعه‌کشی زنده
          </div>

          <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-5 py-2.5 rounded-full bg-white text-brand-700 text-sm font-extrabold"
          >
            <span className="relative z-10">ورود</span>
            <motion.span
              variants={{ hover: { x: ['-150%', '150%'] } }}
              transition={{ duration: 0.7 }}
              className="absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-brand-500/30 to-transparent"
            />
          </motion.button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="منو"
            className="md:hidden w-10 h-10 grid place-content-center gap-1.5"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white rounded"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-5 h-0.5 bg-white rounded"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white rounded"
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="md:hidden absolute top-full inset-x-0 mt-3 p-3 rounded-3xl bg-navy-950/95 border border-white/15 shadow-2xl"
            >
              {links.map((l) => {
                const active = isLinkActive(l)
                return (
                  <motion.li
                    key={l.to}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <Link
                      to={l.to}
                      onClick={handleNav(l.to)}
                      className={`block px-4 py-3 rounded-2xl text-sm font-medium ${
                        active ? 'bg-white/15 text-white' : 'text-ice'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}