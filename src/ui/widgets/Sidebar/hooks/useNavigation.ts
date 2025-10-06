'use client'

import { useEffect, useState } from 'react'
import type { NavItem } from '../types'
import { computeInitialOpenSections } from '../utils/navigation'

export function useNavigation(navigation: NavItem[]) {
  const [openSections, setOpenSections] = useState<Set<string>>(() => computeInitialOpenSections(navigation))

  // Recompute open sections when navigation changes
  useEffect(() => {
    setOpenSections(computeInitialOpenSections(navigation))
  }, [navigation])

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const isSectionOpen = (sectionId: string) => openSections.has(sectionId)

  return {
    isSectionOpen,
    toggleSection,
  }
}
