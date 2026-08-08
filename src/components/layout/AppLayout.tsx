import { Outlet } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import FooterBar from './FooterBar'
import ToastStack from '@/components/ui/ToastStack'
import CookieBanner from '@/components/ui/CookieBanner'

export default function AppLayout() {
  const { sidebarMobileOpen, toggleSidebarMobile } = useUiStore()

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--tx-body-bg)' }}>
      <AppSidebar />

      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => toggleSidebarMobile(false)}
        />
      )}

      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <AppHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
        <FooterBar />
      </div>

      <ToastStack />
      <CookieBanner />
    </div>
  )
}
