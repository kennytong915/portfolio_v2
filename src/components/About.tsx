import { motion } from 'framer-motion'

const skills = [
  'JavaScript',
  'Java',
  'React',
  'Node.js',
  'Spring Boot',
  'MySQL',
  'AWS',
]

export default function About() {
  return (
    <section role="region" aria-label="About" id="about" className="relative h-[calc(100vh-4rem)] flex items-center py-80 px-6 md:px-12">
      {/* Decorative animated background */}
      <div aria-hidden className="about-fireflies">
        {Array.from({ length: 15 }).map((_, idx) => (
          <span key={idx} className="about-firefly" />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto w-full z-[1]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium text-white"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-6 text-white/70 md:text-lg max-w-3xl"
        >
          As a software developer, I focus on building thoughtful, practical software with a strong attention to detail and user experience. I possess a "can-do" attitude and a strong desire to learn and grow, and I am always looking for new challenges and opportunities to expand my knowledge and skills.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-6 text-white/70 md:text-lg max-w-3xl"
        >
          I am currently looking for a full-time software developer position to kickstart my career. Please reach out if you think I would be a good fit!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {skills.map((s) => (
            <div key={s} className="tag text-sm">
              {s}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

