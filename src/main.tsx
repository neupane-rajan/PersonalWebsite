import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/jetbrains-mono'
// Order matters: Bootstrap first, Tailwind utilities on top, then hand-written Hyprland CSS
import './styles/bootstrap.scss'
import './index.css'
import './styles/hyprland.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
