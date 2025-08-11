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
      {/* Optional: keep Nav import but omit render; using SectionRail instead */}
      <main className="noise-overlay h-screen overflow-y-auto snap-y snap-proximity scroll-pt-16 scroll-smooth overscroll-y-contain">
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
