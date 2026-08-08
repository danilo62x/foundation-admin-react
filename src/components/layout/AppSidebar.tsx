import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { menuSections, type MenuItem } from '@/stores/menu'
import IconBase from '@/components/ui/IconBase'

export default function AppSidebar() {
  const { sidebarCollapsed, sidebarMobileOpen, sidebarWidth, setSidebarWidth, toggleSidebar } = useUiStore()
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [dragging, setDragging] = useState(false)
  const rafId = useRef(0)
  const pendingWidth = useRef(0)

  const isActive = useCallback(
    (href: string) => location.pathname === href || location.pathname.startsWith(href + '/'),
    [location.pathname]
  )

  const isGroupActive = useCallback(
    (item: MenuItem) => !!item.children?.some((c) => c.href && isActive(c.href)),
    [isActive]
  )

  useEffect(() => {
    const next = new Set(openGroups)
    let changed = false
    for (const section of menuSections) {
      for (const item of section.items) {
        if (item.children && isGroupActive(item) && !next.has(item.label)) {
          next.add(item.label)
          changed = true
        }
      }
    }
    if (changed) setOpenGroups(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  // Drag-to-resize
  const onDrag = useCallback(
    (e: MouseEvent) => {
      pendingWidth.current = e.clientX
      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        setSidebarWidth(pendingWidth.current)
        rafId.current = 0
      })
    },
    [setSidebarWidth]
  )

  const stopDrag = useCallback(() => {
    setDragging(false)
    document.body.style.cursor = ''
    document.removeEventListener('mousemove', onDrag)
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = 0
    }
  }, [onDrag])

  const startDrag = (e: React.MouseEvent) => {
    if (sidebarCollapsed) return
    e.preventDefault()
    setDragging(true)
    document.body.style.cursor = 'ew-resize'
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag, { once: true })
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onDrag)
      document.body.style.cursor = ''
    }
  }, [onDrag])

  const widthStyle = sidebarCollapsed ? '90px' : `${sidebarWidth}px`

  const navLinkClass = (active: boolean, child = false) => {
    const base = `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      sidebarCollapsed && !child ? 'justify-center' : ''
    } ${child ? 'py-1.5' : ''}`
    return active ? `${base} is-sidebar-active` : `${base} is-sidebar-inactive`
  }

  return (
    <aside
      style={{ width: widthStyle }}
      className={`surface-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden border-r px-4 lg:static lg:translate-x-0 ${
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${dragging ? 'transition-none select-none' : 'transition-[transform,width] duration-300'}`}
    >
      {!sidebarCollapsed && (
        <div
          className={`absolute right-0 top-0 hidden h-full w-1.5 cursor-ew-resize lg:block ${
            dragging ? 'bg-brand-500/40' : ''
          } group/handle`}
          onMouseDown={startDrag}
          onDoubleClick={() => setSidebarWidth(290)}
          title="Arraste para redimensionar • Duplo clique para resetar"
        >
          <span
            className={`absolute right-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-l-full transition-all ${
              dragging ? 'bg-brand-500' : 'bg-transparent group-hover/handle:bg-brand-400'
            }`}
          />
        </div>
      )}

      <div className={`flex items-center pt-7 pb-6 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white shadow-theme-sm">
            <span className="font-bold">A</span>
          </span>
          {!sidebarCollapsed && (
            <span data-brand-text className="text-lg font-semibold">
              Admin
            </span>
          )}
        </NavLink>
        {!sidebarCollapsed && (
          <button
            type="button"
            className="is-sidebar-inactive hidden h-8 w-8 items-center justify-center rounded-lg border border-themed lg:flex"
            onClick={toggleSidebar}
            title="Recolher menu"
          >
            <IconBase name="chevron-right" size={14} className="rotate-180" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pb-4">
        {menuSections.map((section) => (
          <nav key={section.title}>
            {!sidebarCollapsed && (
              <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <NavLink
                      to={item.href}
                      className={({ isActive: a }) => navLinkClass(a)}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <IconBase name={item.icon} size={20} />
                      {!sidebarCollapsed && <span className="flex-1">{item.label}</span>}
                    </NavLink>
                  ) : item.children ? (
                    <>
                      <button
                        type="button"
                        className={navLinkClass(isGroupActive(item))}
                        onClick={() => toggleGroup(item.label)}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <IconBase name={item.icon} size={20} />
                        {!sidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            <IconBase
                              name="chevron-down"
                              size={14}
                              className={`transition-transform ${openGroups.has(item.label) ? 'rotate-180' : ''}`}
                            />
                          </>
                        )}
                      </button>
                      {openGroups.has(item.label) && !sidebarCollapsed && (
                        <ul className="mt-1 ml-3 flex flex-col gap-1 border-l border-themed pl-3">
                          {item.children.map((child) =>
                            child.href ? (
                              <li key={child.label}>
                                <NavLink to={child.href} className={({ isActive: a }) => navLinkClass(a, true)}>
                                  <span className="flex-1">{child.label}</span>
                                </NavLink>
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-auto border-t border-themed py-4">
        <button
          type="button"
          className={navLinkClass(false)}
          title={sidebarCollapsed ? 'Sair' : undefined}
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          <IconBase name="logout" size={20} />
          {!sidebarCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
