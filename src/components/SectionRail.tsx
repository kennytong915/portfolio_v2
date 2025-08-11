import { } from 'react'
import { useSectionObserver } from '../hooks/useSectionObserver'

type Props = {
  ids: string[]
}

export default function SectionRail({ ids }: Props) {
  const { currentId, scrollTo } = useSectionObserver(ids)

  // Removed keyboard and wheel-based snapping to disable scroll snapping behavior

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


