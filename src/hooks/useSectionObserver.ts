import { useEffect, useMemo, useState } from 'react'

export function useSectionObserver(sectionIds: string[]) {
  const [currentId, setCurrentId] = useState<string>(sectionIds[0] ?? '')

  // Precompute dependency string for stability; don't need section elements themselves here
  const deps = useMemo(() => sectionIds.join('|'), [sectionIds.join('|')])

  useEffect(() => {
    const root = document.querySelector('main') as HTMLElement | null
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible entry
        const entry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
        if (entry?.target?.id) setCurrentId(entry.target.id)
      },
      {
        root,
        threshold: [0.4, 0.6, 0.8],
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [deps])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goNext = () => {
    const idx = sectionIds.indexOf(currentId)
    const next = sectionIds[Math.min(idx + 1, sectionIds.length - 1)]
    if (next) scrollTo(next)
  }

  const goPrev = () => {
    const idx = sectionIds.indexOf(currentId)
    const prev = sectionIds[Math.max(idx - 1, 0)]
    if (prev) scrollTo(prev)
  }

  return { currentId, scrollTo, goNext, goPrev }
}


