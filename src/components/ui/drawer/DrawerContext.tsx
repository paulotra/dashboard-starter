'use client'

import { createContext, useContext } from 'react'

interface DrawerContextValue {
  onClose: () => void
  titleId: string
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error('Drawer subcomponents must be used within a DrawerWrapper')
  }
  return ctx
}
