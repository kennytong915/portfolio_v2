import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ImageTrack() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const asideRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.dataset.mouseDownAt = '0'
    track.dataset.prevPercentage = '0'
    track.dataset.percentage = '0'

    const handleOnDown = (clientX: number) => {
      track.dataset.mouseDownAt = String(clientX)
      // Hide indicator on first interaction
      if (indicatorRef.current) {
        indicatorRef.current.animate({ opacity: 0 }, { duration: 300, fill: 'forwards' })
      }
    }

    const handleOnUp = () => {
      track.dataset.mouseDownAt = '0'
      track.dataset.prevPercentage = track.dataset.percentage || '0'
    }

    const handleOnMove = (clientX: number) => {
      if (track.dataset.mouseDownAt === '0') return

      const mouseDelta = parseFloat(track.dataset.mouseDownAt || '0') - clientX
      const maxDelta = window.innerWidth / 2

      const percentage = (mouseDelta / maxDelta) * -100
      const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || '0') + percentage
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100)

      track.dataset.percentage = String(nextPercentage)

      track.animate(
        { transform: `translate(${nextPercentage}%, -50%)` },
        { duration: 1200, fill: 'forwards' },
      )

      const images = track.getElementsByClassName('image') as HTMLCollectionOf<HTMLElement>
      for (const image of Array.from(images)) {
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 1200, fill: 'forwards' },
        )
      }

      // Fade out the left aside as the user slides
      const fadeProgress = Math.min(Math.abs(nextPercentage) / 35, 1)
      const targetOpacity = 1 - fadeProgress
      if (asideRef.current) {
        asideRef.current.animate({ opacity: targetOpacity }, { duration: 400, fill: 'forwards' })
      }
    }

    const onMouseDown = (e: MouseEvent) => handleOnDown(e.clientX)
    const onMouseUp = () => handleOnUp()
    const onMouseMove = (e: MouseEvent) => handleOnMove(e.clientX)

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) handleOnDown(e.touches[0].clientX)
    }
    const onTouchEnd = () => handleOnUp()
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleOnMove(e.touches[0].clientX)
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <section
      role="region"
      aria-label="Image Track"
      id="gallery"
      className="relative h-[calc(100vh-4rem)] snap-start snap-always flex items-center justify-center px-6 md:px-12"
    >
      {/* Overlay content aligned to section container (matches Contact/About) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="max-w-5xl mx-auto w-full h-full flex items-start md:items-center pt-16 md:pt-0 px-6 md:px-12">
          <motion.div
            ref={asideRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="pointer-events-auto max-w-[18rem] sm:max-w-md md:max-w-lg"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Interests</h2>
              <p className="mt-4 md:mt-6 text-white/70 md:text-lg">
                Frontend craft, product design, street photography, travel stories, and motion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed track behind */}
      <div className="relative w-full h-full overflow-hidden -mx-6 md:-mx-12">
        <div id="image-track" ref={trackRef}>
          <img className="image" src="/img1.jpeg" draggable={false} alt="" />
          <img className="image" src="/img2.jpeg" draggable={false} alt="" />
          <img className="image" src="/img3.jpeg" draggable={false} alt="" />
          <img className="image" src="/img4.jpeg" draggable={false} alt="" />
          <img className="image" src="/img5.jpeg" draggable={false} alt="" />
          <img className="image" src="/img6.jpeg" draggable={false} alt="" />
          <img className="image" src="/img7.jpeg" draggable={false} alt="" />
        </div>

      </div>

      {/* Subtle slide indicator (anchored to section) */}
      <div ref={indicatorRef} className="slide-indicator" aria-hidden="true">
        <span className="chevrons" />
        <span className="chevrons right" />
      </div>
    </section>
  )
}


