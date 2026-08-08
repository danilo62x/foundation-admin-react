import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import IconBase from '@/components/ui/IconBase'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const NOTIFICATIONS = [
  { id: 1, title: 'Novo pedido #00231 recebido', time: 'Há 5 min', read: false },
  { id: 2, title: 'Pagamento confirmado de Marina Costa', time: 'Há 32 min', read: false },
  { id: 3, title: 'Pedro Alves se cadastrou', time: 'Há 1 hora', read: false },
  { id: 4, title: 'Backup semanal concluído', time: 'Ontem', read: true },
]

export default function AppHeader() {
  const { darkMode, toggleDarkMode, openCookieBanner, toggleSidebar, toggleSidebarMobile } = useUiStore()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const notifRef = useRef<HTMLDivElement | null>(null)

  const initials = useMemo(() => {
    if (!user) return '?'
    return user.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('')
  }, [user])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const onToggleSidebar = () => {
    if (window.innerWidth < 1024) toggleSidebarMobile()
    else toggleSidebar()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    setDropdownOpen(false)
  }

  const openCookies = () => {
    setDropdownOpen(false)
    openCookieBanner()
  }

  return (
    <header className="surface-header sticky top-0 z-30 flex w-full border-b">
      <div className="flex flex-grow items-center justify-between gap-4 px-4 py-3 md:px-6 2xl:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <IconBase name="menu" size={20} />
          </button>

          <div className="hidden md:block">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IconBase name="search" size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Buscar ou digitar comando..."
                  className="h-10 w-[260px] rounded-lg border border-themed bg-gray-50 pl-10 pr-12 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900 xl:w-[400px]"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-themed bg-white px-1.5 py-0.5 text-xs text-muted dark:bg-gray-900">
                  ⌘ K
                </kbd>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <IconBase name={darkMode ? 'sun' : 'moon'} size={18} />
          </button>

          <div className="relative" ref={notifRef}>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Notifications"
              onClick={() => setNotifOpen((s) => !s)}
            >
              <IconBase name="bell" size={18} />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-error-500" />
              </span>
            </button>
            {notifOpen && (
              <div className="surface-card absolute right-0 mt-3 w-80 rounded-xl border shadow-theme-lg">
                <div className="flex items-center justify-between border-b border-themed px-4 py-3">
                  <p className="text-sm font-semibold text-heading">Notificações</p>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    3 novas
                  </span>
                </div>
                <ul className="max-h-72 overflow-y-auto divide-y divide-themed">
                  {NOTIFICATIONS.map((n) => (
                    <li key={n.id} className="flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className={`mt-1 flex h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-gray-300' : 'bg-brand-500'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-heading">{n.title}</p>
                        <p className="text-xs text-muted">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-themed px-4 py-2">
                  <button className="w-full text-center text-xs font-medium text-brand-500 hover:text-brand-600">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button type="button" className="ml-1 flex items-center gap-3" onClick={() => setDropdownOpen((s) => !s)}>
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-heading">{user?.name || 'Convidado'}</span>
                <span className="block text-xs text-muted">{user?.role || '—'}</span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
                {initials}
              </span>
              <IconBase name="chevron-down" size={16} className="text-muted" />
            </button>

            {dropdownOpen && (
              <div className="surface-card absolute right-0 mt-3 w-56 rounded-xl border shadow-theme-lg">
                <div className="border-b border-themed px-4 py-3">
                  <p className="text-sm font-medium text-heading">{user?.name || 'Convidado'}</p>
                  <p className="text-xs text-muted">{user?.email || ''}</p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <IconBase name="user" size={16} /> Meu perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <IconBase name="settings" size={16} /> Configurações
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={openCookies}
                    >
                      <IconBase name="cookie" size={16} /> Preferências de cookies
                    </button>
                  </li>
                </ul>
                <div className="border-t border-themed py-1">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10"
                    onClick={handleLogout}
                  >
                    <IconBase name="logout" size={16} /> Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
