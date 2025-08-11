import { motion } from 'framer-motion'

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}


function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 382 382"
      fill="currentColor"
      role="img"
      aria-label="LinkedIn"
    >
      <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889  C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056  H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806  c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1  s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73  c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079  c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426  c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472  L341.91,330.654L341.91,330.654z" />
    </svg>
  )
}

const socials = [
  { name: 'Email', href: 'mailto:kenny.tonghokan@gmail.com', Icon: IconMail },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kenny-tong-698071326/', Icon: IconLinkedIn },
]

export default function Contact() {
  return (
    <section role="region" aria-label="Contact" id="contact" className="contact-banner relative h-[calc(100vh-4rem)] flex items-center px-6 md:px-12">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium text-white"
        >
          Contact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-6 text-white/70 md:text-lg max-w-3xl"
        >
          I’m open to opportunities and collaborations. Reach out via email or connect on social.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-6 text-white/70 md:text-lg max-w-3xl"
        >
          Thanks for visiting!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="btn-glass-neutral gap-2"
              aria-label={name}
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">{name}</span>
              <span className="sr-only">{name}</span>
            </a>
          ))}
        </motion.div>

        <footer className="mt-16 text-xs text-charcoal-800/70">
          © {new Date().getFullYear()} Kenny Tong. All rights reserved.
        </footer>
      </div>
    </section>
  )
}

