import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

type Project = {
  title: string
  description: string
  tech: string[]
  images?: string[]
  github?: string
  live?: string
}

const placeholderProjects: Project[] = [
  {
    title: 'Japan Ramen Database',
    description: 'Born from a love for ramen and a desire to sharpen my full-stack skills, I created a database to rank and explore Japanese ramen shops.',
    tech: ['React', 'Spring Boot', 'MySQL', 'AWS S3', 'Bucket4j', 'Google reCAPTCHA', 'JWT', 'Docker'],
    images: ['/ramen1.png', '/ramen2.png', '/ramen3.png', '/ramen4.png'],
    github: 'https://github.com/kennytong915/Japan-Ramen-Database'
  },
  {
    title: 'KanaGuesser',
    description: 'A Japanese word‑guessing game I built to learn vocabulary and explore AWS services.',
    tech: ['React', 'AWS Lambda', 'AWS API Gateway', 'AWS DynamoDB'],
    images: ['/kana.png', 'kana1.png', 'kana3.png', 'kana2.png'],
    live: 'https://kanaguesser.netlify.app/',
    github: 'https://github.com/kennytong915/kana-guesser'
  },
  {
    title: 'Gulugulu',
    description: 'A web crawling and search system that allows users to fetch webpages into their local system and perform efficient searches across stored content. Built as a course project exploring information retrieval concepts.',
    tech: ['Java', 'JSP', 'JDBM'],
    images: ['/gulugulu1.png', '/gulugulu2.png', '/gulugulu4.png', '/gulugulu3.png'],
    github: 'https://github.com/kennytong915/web-based-search-engine',
  },
]

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-3.162 19.49c.5.092.686-.216.686-.482 0-.237-.009-.866-.014-1.7-2.79.607-3.379-1.345-3.379-1.345-.455-1.156-1.11-1.464-1.11-1.464-.907-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.338-2.23-.255-4.574-1.115-4.574-4.962 0-1.096.39-1.993 1.029-2.695-.103-.254-.446-1.277.098-2.66 0 0 .84-.269 2.75 1.028A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.91-1.297 2.748-1.028 2.748-1.028.546 1.383.203 2.406.1 2.66.64.702 1.028 1.599 1.028 2.695 0 3.857-2.347 4.704-4.583 4.954.359.309.678.918.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.184.58.69.481A10.001 10.001 0 0012 2z" />
    </svg>
  )
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v6a1 1 0 01-1 1h-14a1 1 0 01-1-1v-14a1 1 0 011-1h6" />
    </svg>
  )
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelected(null)
      }
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
  }, [selected])

  return (
    <section role="region" aria-label="Projects" id="projects" className="relative h-[calc(100vh-4rem)] snap-start snap-always flex items-center px-6 md:px-12 bg-umber/20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium text-white"
        >
          Things I've Built
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Swiper
            modules={[Navigation, A11y]}
            navigation
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.6 },
              1024: { slidesPerView: 2.2 },
            }}
            style={{ paddingBottom: '3rem' }}
          >
            {placeholderProjects.map((p) => (
              <SwiperSlide key={p.title}>
                <article
                  className="group h-full select-none cursor-pointer"
                  onClick={() => setSelected(p)}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-ink via-umber to-ink shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
                    <div className="h-full w-full grid grid-cols-3 gap-1 p-1">
                      {(() => {
                        const imgs = p.images && p.images.length > 0 ? p.images : []
                        const slotSrc = (i: number) => (imgs.length ? imgs[i % imgs.length] : null)
                        return (
                          <>
                            <div className="col-span-2 rounded-xl overflow-hidden bg-black/30">
                              {slotSrc(0) && (
                                <img
                                  src={slotSrc(0) as string}
                                  alt=""
                                  className="h-full w-full object-cover brightness-90 contrast-105 group-hover:brightness-100 transition-[filter] duration-500 ease-out"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                            </div>
                            <div className="rounded-xl overflow-hidden bg-black/20">
                              {slotSrc(1) && (
                                <img
                                  src={slotSrc(1) as string}
                                  alt=""
                                  className="h-full w-full object-cover brightness-90 contrast-105 group-hover:brightness-100 transition-[filter] duration-500 ease-out"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                            </div>
                            <div className="rounded-xl overflow-hidden bg-black/20">
                              {slotSrc(2) && (
                                <img
                                  src={slotSrc(2) as string}
                                  alt=""
                                  className="h-full w-full object-cover brightness-90 contrast-105 group-hover:brightness-100 transition-[filter] duration-500 ease-out"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                            </div>
                            <div className="col-span-2 rounded-xl overflow-hidden bg-black/30">
                              {slotSrc(3) && (
                                <img
                                  src={slotSrc(3) as string}
                                  alt=""
                                  className="h-full w-full object-cover brightness-90 contrast-105 group-hover:brightness-100 transition-[filter] duration-500 ease-out"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                    {/* Themed coral/rust tint overlay (subtle on hover) */}
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-multiply bg-gradient-to-tr from-coral/60 via-rust/50 to-umber/40 opacity-60 group-hover:opacity-25 transition-opacity duration-500 ease-out"
                      aria-hidden
                    />
                  </div>
                  <div className="px-2 md:px-1">
                    <div className="mt-5 flex items-center gap-3">
                      <div className="text-lg font-medium text-white group-hover:text-coral transition-colors" role="heading" aria-level={3}>
                        {p.title}
                      </div>
                      {(p.github || p.live) && (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/50 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
                              aria-label="View live"
                            >
                              <IconExternal className="h-4 w-4" />
                            </a>
                          )}
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/50 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
                              aria-label="View code on GitHub"
                            >
                              <IconGitHub className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white/70">{p.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Modal Card View */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex min-h-full items-center justify-center p-4 md:p-6" aria-hidden={false}>
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl flex flex-col max-h-[92vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute right-3 top-3 z-10 inline-flex items-center justify-center size-9 rounded-full border border-white/15 bg-black/30 text-white/80 hover:text-white hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    aria-label="Close"
                  >
                    <IconClose className="h-4.5 w-4.5" />
                  </button>

                  {/* Gallery */}
                  <div className="w-full shrink-0">
                    {selected.images && selected.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, A11y]}
                        navigation
                        spaceBetween={12}
                        slidesPerView={1}
                        style={{ height: 'min(60vh, 520px)', background: 'black', position: 'relative' }}
                      >
                        {selected.images.map((src, i) => (
                          <SwiperSlide key={src + i}>
                            <div className="h-full w-full bg-black flex items-center justify-center relative">
                              <img
                                src={src}
                                alt=""
                                className="max-h-full max-w-full object-contain mix-blend-normal"
                                loading="lazy"
                                decoding="async"
                              />
                              {/* Themed tint overlay consistent with BeyondCode */}
                              <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-gradient-to-tr from-coral/60 via-rust/50 to-umber/40 opacity-50" aria-hidden />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="aspect-[16/10] w-full bg-black" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 md:p-6 grow overflow-y-auto">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-medium text-white" role="heading" aria-level={3}>{selected.title}</div>
                      {(selected.github || selected.live) && (
                        <div className="flex items-center gap-2">
                          {selected.live && (
                            <a
                              href={selected.live}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/70 hover:text-coral transition-colors"
                              aria-label="View live"
                            >
                              <IconExternal className="h-5 w-5" />
                            </a>
                          )}
                          {selected.github && (
                            <a
                              href={selected.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/70 hover:text-coral transition-colors"
                              aria-label="View code on GitHub"
                            >
                              <IconGitHub className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-white/70">{selected.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

