import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-navy-950 via-brand-700 to-brand-500">
      <Navbar />

      <main className="relative">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/winner"
            element={<div className="p-10 pt-32 text-center">به‌زودی...</div>}
          />
        </Routes>
      </main>
    </div>
  )
}