import { StrictMode, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Preloader from './components/Preloader.tsx'

function Root() {
  const [ready, setReady] = useState(false)
  const handleDone = useCallback(() => setReady(true), [])
  return ready ? <App /> : <Preloader onDone={handleDone} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
