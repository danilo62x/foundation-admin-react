import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase'

const LINKS = [
  { id: 'features', label: 'Recursos' },
  { id: 'pricing', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contato' },
]

export default function LandingNav() {
  const darkMode = useUiStore((s) => s.darkMode)
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors ${
        scrolled
          ? 'surface-header border-b border-themed shadow-theme-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-dark/80'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 focus-ring rounded-lg"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-theme-md">
            A
          </span>
          <span className="text-lg font-bold text-heading">Admin Template</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Alternar tema"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name={darkMode ? 'sun' : 'moon'} size={18} />
          </button>

          <Link
            to="/login"
            className="hidden h-10 items-center rounded-lg px-4 text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800 sm:inline-flex"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="hidden h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring sm:inline-flex"
          >
            Começar agora
          </Link>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-body transition hover:bg-gray-50 dark:hover:bg-gray-800 md:hidden"
          >
            <IconBase name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="surface-card border-t border-themed md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-themed pt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-lg border border-themed text-sm font-medium text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
              >
                Começar agora
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
