import { createContext, useContext, useState } from 'react'

const ActiveSectionContext = createContext(['home', () => {}])

export function ActiveSectionProvider({ children }) {
  const state = useState('home')
  return (
    <ActiveSectionContext.Provider value={state}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  return useContext(ActiveSectionContext)
}