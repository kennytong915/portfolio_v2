export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur supports-[backdrop-filter]:bg-ink/60 border-b border-white/10">
      <a href="#hero" className="text-sm font-medium text-coral">KT</a>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
        <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
      </div>
    </nav>
  )
}

