import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Raffles from './pages/Raffles'
import Raffle from './pages/Raffle'
import { PageTransitionProvider } from './components/PageTransition'
import { ActiveSectionProvider } from './context/ActiveSectionContext'

function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <ActiveSectionProvider>
      <PageTransitionProvider>
        <div className="min-h-screen bg-linear-to-br from-navy-950 via-brand-700 to-brand-500">
          <ScrollManager />
          <Navbar />

          <main className="relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/raffles" element={<Raffles />} />
              <Route path="/raffle/:id" element={<Raffle />} />
              <Route path="/rules" element={<Navigate to="/#rules" replace />} />
              <Route path="/about" element={<Navigate to="/#about" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </PageTransitionProvider>
    </ActiveSectionProvider>
  )
}