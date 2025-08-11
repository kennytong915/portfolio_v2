import { useEffect, useState } from 'react'
import { preloadImages } from '../utils/preloadImages'
import { imageManifest } from '../utils/imageManifest'

type PreloaderProps = {
  onDone: () => void
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let isMounted = true
    preloadImages(imageManifest, (loaded, total) => {
      if (!isMounted) return
      setProgress(Math.round((loaded / total) * 100))
    }).then(() => {
      if (!isMounted) return
      // Small delay for smoother transition
      const t = setTimeout(() => onDone(), 120)
      return () => clearTimeout(t)
    })
    return () => {
      isMounted = false
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink text-white"
      role="status"
      aria-live="polite"
      aria-label="Loading assets"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl tracking-tight">Loading… {progress}%</div>
        <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-coral transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

