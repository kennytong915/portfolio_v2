import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Projects from './components/Projects.tsx'
import Contact from './components/Contact.tsx'
// import Nav from './components/Nav.tsx'
import SectionRail from './components/SectionRail'
import BeyondCode from './components/BeyondCode'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Mobile landscape lock overlay */}
      <div className="landscape-lock" role="dialog" aria-modal="true" aria-live="polite">
        <div>
          <p className="text-lg md:text-xl font-medium">Please rotate your device</p>
          <p className="mt-2 text-white/80">For the best experience, view this site in portrait.</p>
        </div>
      </div>
      {/* Optional: keep Nav import but omit render; using SectionRail instead */}
      <main className="landscape-hide noise-overlay h-screen overflow-y-auto snap-y snap-proximity scroll-pt-16 scroll-smooth overscroll-y-contain">
        <SectionRail ids={["hero", "about", "projects", "beyond", "contact"]} />
        <Hero />
        <About />
        <Projects />
        <BeyondCode />
        <Contact />
      </main>
    </MotionConfig>
  )
}

export default App
