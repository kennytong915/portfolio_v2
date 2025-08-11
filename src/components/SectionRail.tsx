import { useEffect } from 'react'
import { useSectionObserver } from '../hooks/useSectionObserver'

type Props = {
  ids: string[]
}

export default function SectionRail({ ids }: Props) {
  const { currentId, scrollTo, goNext, goPrev } = useSectionObserver(ids)

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // Smoother snapping for mouse scroll wheels while preserving trackpad behavior
  useEffect(() => {
    const root = document.querySelector('main') as HTMLElement | null
    if (!root) return

    let lastSnapTime = 0

    const onWheel = (e: WheelEvent) => {
      // Ignore when a modal/overlay is locking scroll
      if (document.body.style.overflow === 'hidden') return

      // Only handle events originating within the scroll container
      const isInsideRoot = e.target instanceof Node && root.contains(e.target)
      if (!isInsideRoot) return

      const absY = Math.abs(e.deltaY)
      const absX = Math.abs(e.deltaX)

      // Heuristics to detect discrete mouse wheel vs. trackpad
      // - Large deltaY with minimal deltaX typically indicates a wheel tick
      // - Trackpads usually produce smaller, more continuous deltas and often some deltaX
      const looksLikeMouseWheel = absY >= 50 && absX < 10 && !e.ctrlKey

      if (!looksLikeMouseWheel) return

      const now = performance.now()
      const withinCooldown = now - lastSnapTime < 700

      if (withinCooldown) {
        // Prevent native scroll jitter during cooldown
        e.preventDefault()
        return
      }

      // Consume this wheel gesture and snap programmatically
      e.preventDefault()
      if (e.deltaY > 0) {
        goNext()
      } else if (e.deltaY < 0) {
        goPrev()
      }
      lastSnapTime = now
    }

    // Non-passive to allow preventDefault when we decide to intercept
    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel as EventListener)
  }, [goNext, goPrev])

  return (
    <aside className="pointer-events-none fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-3 items-center">
        {ids.map((id) => {
          const active = id === currentId
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="pointer-events-auto group relative"
              aria-label={`Go to ${id}`}
            >
              <span
                className={[
                  'block size-2.5 rounded-full transition-all duration-300',
                  active ? 'bg-coral ring-4 ring-coral/20 scale-125' : 'bg-white/30 hover:bg-white/60',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>
    </aside>
  )
}


