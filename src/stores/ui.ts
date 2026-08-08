import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}

let toastId = 0

export const THEME_DEFAULTS: Record<string, string> = {
  '--color-brand-500': '#465fff',
  '--color-brand-600': '#3641f5',
  '--color-brand-700': '#2a31d8',
  '--color-success-500': '#12b76a',
  '--color-warning-500': '#f79009',
  '--color-error-500': '#f04438',
  '--color-blue-light-500': '#0ba5ec',
  '--tx-sidebar-bg': '#ffffff',
  '--tx-sidebar-text': '#475467',
  '--tx-sidebar-text-active': '#465fff',
  '--tx-sidebar-active-bg': '#ecf3ff',
  '--tx-body-bg': '#f9fafb',
  '--tx-card-bg': '#ffffff',
  '--tx-header-bg': '#ffffff',
  '--tx-border': '#e4e7ec',
  '--tx-text': '#344054',
  '--tx-text-heading': '#101828',
  '--tx-text-muted': '#667085',
}

interface UiState {
  darkMode: boolean
  sidebarCollapsed: boolean
  sidebarMobileOpen: boolean
  sidebarWidth: number
  pageTitle: string
  toasts: Toast[]
  fontSize: 'sm' | 'base' | 'lg' | 'xl'
  customTheme: Record<string, string>
  cookiesAccepted: boolean
  showCookieBanner: boolean

  toggleDarkMode: () => void
  setDarkMode: (val: boolean) => void
  applyTheme: () => void
  setThemeVar: (key: string, val: string) => void
  resetThemeVars: () => void
  getThemeVar: (key: string) => string
  setFontSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void
  applyFontSize: () => void
  toggleSidebar: () => void
  setSidebarWidth: (w: number) => void
  toggleSidebarMobile: (val?: boolean) => void
  setPageTitle: (title: string) => void
  notify: (message: string, type?: ToastType, duration?: number) => void
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  notifyWarning: (message: string) => void
  dismissToast: (id: number) => void
  acceptCookies: () => void
  declineCookies: () => void
  openCookieBanner: () => void
  closeCookieBanner: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      sidebarCollapsed: false,
      sidebarMobileOpen: false,
      sidebarWidth: 290,
      pageTitle: 'Dashboard',
      toasts: [],
      fontSize: 'base',
      customTheme: {},
      cookiesAccepted: false,
      showCookieBanner: false,

      toggleDarkMode() {
        set({ darkMode: !get().darkMode })
        get().applyTheme()
      },
      setDarkMode(val) {
        set({ darkMode: val })
        get().applyTheme()
      },
      applyTheme() {
        const root = document.documentElement
        if (get().darkMode) root.classList.add('dark')
        else root.classList.remove('dark')
        for (const [k, v] of Object.entries(get().customTheme)) {
          root.style.setProperty(k, v)
        }
        get().applyFontSize()
      },
      setThemeVar(key, val) {
        set({ customTheme: { ...get().customTheme, [key]: val } })
        document.documentElement.style.setProperty(key, val)
      },
      resetThemeVars() {
        for (const k of Object.keys(get().customTheme)) {
          document.documentElement.style.removeProperty(k)
        }
        set({ customTheme: {} })
      },
      getThemeVar(key) {
        return get().customTheme[key] ?? THEME_DEFAULTS[key] ?? '#000000'
      },
      setFontSize(size) {
        set({ fontSize: size })
        get().applyFontSize()
      },
      applyFontSize() {
        const sizes: Record<string, string> = { sm: '13px', base: '14px', lg: '15px', xl: '16px' }
        document.documentElement.style.fontSize = sizes[get().fontSize] ?? '14px'
      },
      toggleSidebar() {
        set({ sidebarCollapsed: !get().sidebarCollapsed })
      },
      setSidebarWidth(w) {
        set({ sidebarWidth: Math.min(360, Math.max(200, w)) })
      },
      toggleSidebarMobile(val) {
        set({ sidebarMobileOpen: val !== undefined ? val : !get().sidebarMobileOpen })
      },
      setPageTitle(title) {
        set({ pageTitle: title })
        document.title = title ? `${title} — Admin Template` : 'Admin Template'
      },
      notify(message, type = 'info', duration = 4000) {
        const id = ++toastId
        set({ toasts: [...get().toasts, { id, message, type, duration }] })
        setTimeout(() => get().dismissToast(id), duration)
      },
      notifySuccess(message) {
        get().notify(message, 'success')
      },
      notifyError(message) {
        get().notify(message, 'error')
      },
      notifyWarning(message) {
        get().notify(message, 'warning')
      },
      dismissToast(id) {
        set({ toasts: get().toasts.filter((t) => t.id !== id) })
      },
      acceptCookies() {
        set({ cookiesAccepted: true, showCookieBanner: false })
      },
      declineCookies() {
        set({ cookiesAccepted: false, showCookieBanner: false })
      },
      openCookieBanner() {
        set({ showCookieBanner: true })
      },
      closeCookieBanner() {
        set({ showCookieBanner: false })
      },
    }),
    {
      name: 'ui',
      partialize: (s) => ({
        darkMode: s.darkMode,
        sidebarCollapsed: s.sidebarCollapsed,
        sidebarWidth: s.sidebarWidth,
        customTheme: s.customTheme,
        cookiesAccepted: s.cookiesAccepted,
        fontSize: s.fontSize,
      }),
    }
  )
)
