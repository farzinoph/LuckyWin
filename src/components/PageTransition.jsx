import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Ctx = createContext(() => {})
export const usePageTransition = () => useContext(Ctx)

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [t, setT] = useState(null) 
  const busy = useRef(false)

  const go = useCallback(
    (to, e) => {
      if (busy.current || to === pathname) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(to)
        window.scrollTo(0, 0)
        return
      }

      let x = e?.clientX
      let y = e?.clientY
      if (!x && !y) {
        const r = e?.currentTarget?.getBoundingClientRect?.()
        x = r ? r.left + r.width / 2 : window.innerWidth / 2
        y = r ? r.top + r.height / 2 : window.innerHeight / 2
      }

      const size =
        Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        ) * 2

      busy.current = true
      setT({ phase: 'cover', x, y, size, to })
    },
    [navigate, pathname],
  )

  const onDone = () => {
    if (!t) return
    if (t.phase === 'cover') {
      navigate(t.to)
      window.scrollTo(0, 0)
      setT({ ...t, phase: 'reveal' })
    } else {
      busy.current = false
      setT(null)
    }
  }

  const covering = t?.phase === 'cover'

  return (
    <Ctx.Provider value={go}>
      {children}

      {t && (
        <div className="fixed inset-0 z-100 overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: covering ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={onDone}
            style={{
              position: 'absolute',
              left: t.x - t.size / 2,
              top: t.y - t.size / 2,
              width: t.size,
              height: t.size,
              borderRadius: '50%',
              background: '#2563eb',
              boxShadow: '0 0 0 14px rgba(255,255,255,0.25)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: covering ? 1 : 0, scale: covering ? 1 : 1.4 }}
            transition={{ duration: 0.35, delay: covering ? 0.2 : 0 }}
            className="absolute inset-0 grid place-items-center text-7xl"
          >
            🎁
          </motion.div>
        </div>
      )}
    </Ctx.Provider>
  )
}