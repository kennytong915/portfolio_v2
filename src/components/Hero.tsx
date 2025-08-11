import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section role="region" aria-label="Hero" id="hero" className="relative h-[calc(100vh-4rem)] snap-start snap-always flex items-center justify-center px-6 md:px-12 overflow-hidden banner">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-picton_blue-300/20 blur-3xl h-64 w-64 rounded-full" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white"
        >
          Kenny Tong — Software Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-6 text-white/70 md:text-lg max-w-2xl mx-auto"
        >
          As a recent Computer Engineering graduate of HKUST, I am a dedicated software engineer with a strong foundation in computer science and a passion for technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-glass-primary">View Projects</a>
          <a href="#contact" className="btn-glass-neutral">Get in touch</a>
        </motion.div>
      </div>
    </section>
  )
}

