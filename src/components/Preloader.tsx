import { useEffect, useState } from 'react'
import { preloadImages } from '../utils/preloadImages'
import { imageManifest } from '../utils/imageManifest'

type PreloaderProps = {
  onDone: () => void
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    let isMounted = true
    preloadImages(imageManifest, (loaded, total) => {
      if (!isMounted) return
      setProgress(Math.round((loaded / total) * 100))
    }).then(() => {
      if (!isMounted) return
      // Trigger fade-out, then notify done
      setIsExiting(true)
      const t = setTimeout(() => onDone(), 350)
      return () => clearTimeout(t)
    })
    return () => {
      isMounted = false
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-ink text-white transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading assets"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Circular progress ring */}
        <div className="relative grid place-items-center" style={{ width: 112, height: 112 }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(var(--color-coral) ${progress * 3.6}deg, rgb(255 255 255 / 0.06) 0deg)`,
              filter: 'drop-shadow(0 0 24px rgba(242,97,63,0.35))',
            }}
            aria-hidden
          />
          <div className="absolute inset-[6px] rounded-full bg-ink" aria-hidden />
          <div className="relative z-10 text-2xl font-semibold tabular-nums">{progress}%</div>
        </div>

        {/* Label */}
        <div className="text-sm tracking-wide text-white/80">Loading assets</div>

        {/* Progress bar with shimmer */}
        <div
          className="w-72 h-2 rounded-full bg-white/10 overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        >
          <div
            className="relative h-full rounded-full bg-coral transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] animate-[loader-shimmer_1.2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  )
}

