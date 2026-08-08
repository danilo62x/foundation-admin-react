import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './i18n'
// Foundation CSS only — no jQuery / Foundation JS. The template's own
// React code handles all interactivity (dropdowns, modals, tabs, toggles).
// Imported before app.scss so our tokens + compat layer win the cascade.
import 'foundation-sites/dist/css/foundation.min.css'
import './assets/styles/app.scss'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
