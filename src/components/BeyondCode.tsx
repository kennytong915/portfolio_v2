import { useEffect, useState } from 'react'

type Tile = {
  title: string
  image: string
  description: string
}

const tiles: Tile[] = [
    {
      title: 'Travel',
      image: '/travel.jpg',
      description:
        'Ever since my exchange in Japan, I have fallen in love with the country and its culture. You may often find me taking weekend trips to Tokyo.',
    },
    {
      title: 'Gaming',
      image: '/gaming3.jpg',
      description:
        'Video games are my favorite way to bond with friends. I enjoy co-op games and strategy games like auto chess and card games.'
    },
    {
      title: 'Ramen',
      image: '/ramen.jpg',
      description:
        'I am a ramen enthusiast who wants to try all the top 100 ramen shops in Japan. My favorite styles are shio and shoyu.',
    },
    {
      title: 'Music',
      image: '/electric_guitar.jpg',
      description:
        'I play the piano and violin. indigo la End is my favorite band, and they inspired me to pick up the electric guitar last year.'
    },
  ]

export default function BeyondCode() {
  const [active, setActive] = useState<number>(0)
  const [isMdUp, setIsMdUp] = useState<boolean>(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(min-width: 768px)').matches,
  )
  // Collapsed dimensions
  const collapsedWidthPx = 160
  const collapsedHeightPxMobile = 96

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => setIsMdUp(e.matches)
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange)
    else mq.addListener(onChange as any)
    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange as any)
    }
  }, [])

  return (
    <section
      role="region"
      aria-label="Beyond Code"
      id="beyond"
      className="relative h-[calc(100vh-4rem)] snap-start snap-always flex items-center px-6 md:px-12"
    >
      {/* Decorative animated background */}
      <div aria-hidden className="about-fireflies">
        {Array.from({ length: 15 }).map((_, idx) => (
          <span key={idx} className="about-firefly" />
        ))}
      </div>

      <div className="relative z-[1] max-w-6xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-medium text-white">Beyond Coding</h2>
        <p className="mt-3 md:mt-4 text-white/70 md:text-lg max-w-3xl">
          Some of my hobbies and interests outside of coding.
        </p>

        <div
          className="mt-8 flex gap-3 md:gap-4 w-full"
          style={{ height: isMdUp ? '26rem' : '26rem', flexDirection: isMdUp ? 'row' as const : 'column' as const }}
        >
          {tiles.map((tile, index) => {
            const isActive = active === index
            return (
              <button
                key={tile.title}
                aria-label={tile.title}
                aria-expanded={isActive}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className="group relative overflow-hidden rounded-2xl border focus:outline-none focus-visible:ring-4 focus-visible:ring-white/10"
                style={{
                  borderColor: isActive ? 'rgba(242,97,63,0.6)' : 'rgba(255,255,255,0.12)',
                  width: isMdUp ? (isActive ? '100%' : `${collapsedWidthPx}px`) : '100%',
                  height: isMdUp ? '100%' : isActive ? '400px' : `${collapsedHeightPxMobile}px`,
                  transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1), height 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  backgroundColor: 'rgb(12 12 12)',
                }}
              >
                <img
                  src={tile.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transition:
                      'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    filter: isActive ? 'saturate(1.05) contrast(1.03)' : 'brightness(0.9) saturate(0.9)',
                    opacity: isActive ? 1 : 0.95,
                    transform: `scale(${isActive ? 1.02 : 1})`,
                  }}
                  aria-hidden
                />

                {/* Inactive tint for theme consistency */}
                <div
                  className="absolute inset-0 mix-blend-multiply pointer-events-none"
                  style={{
                    background:
                      isActive
                        ? 'transparent'
                        : 'linear-gradient(135deg, rgba(242,97,63,0.55), rgba(155,57,34,0.5), rgba(72,30,20,0.4))',
                    transition: 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  aria-hidden
                />

                {/* Scrim for legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* Always-visible title aligned with the rest of the app (no chip) */}
                <div
                  className={[
                    'absolute left-4 bottom-4 text-lg md:text-xl font-medium tracking-tight transition-colors duration-300',
                    isActive ? 'text-coral' : 'text-white',
                  ].join(' ')}
                  role="heading"
                  aria-level={3}
                >
                  {tile.title}
                </div>

                {/* Description fades/slides in when expanded */}
                <div
                  className="absolute inset-x-4 bottom-16 text-left pointer-events-none"
                  aria-hidden={!isActive}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : 6}px)`,
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  <p className="text-white/90 text-sm md:text-base max-w-md">{tile.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        <p className="sr-only">Click or focus a tile to expand it.</p>
      </div>
    </section>
  )
}

