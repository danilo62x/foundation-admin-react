import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

// Route-level code splitting — each page ships as its own chunk so the
// initial bundle stays small and heavy libs (charts, editor, tables) load on demand.
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ChartsPage = lazy(() => import('@/pages/ChartsPage'))
const FormsPage = lazy(() => import('@/pages/FormsPage'))
const TablesPage = lazy(() => import('@/pages/TablesPage'))
const ComponentsPage = lazy(() => import('@/pages/ComponentsPage'))
const TypographyPage = lazy(() => import('@/pages/TypographyPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const InboxPage = lazy(() => import('@/pages/InboxPage'))
const FileManagerPage = lazy(() => import('@/pages/FileManagerPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const InvoicePage = lazy(() => import('@/pages/InvoicePage'))
const BillingPage = lazy(() => import('@/pages/BillingPage'))
const DocumentationPage = lazy(() => import('@/pages/DocumentationPage'))
const UiAdvancedPage = lazy(() => import('@/pages/UiAdvancedPage'))
const IntegrationsPage = lazy(() => import('@/pages/IntegrationsPage'))

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'))
const MaintenancePage = lazy(() => import('@/pages/MaintenancePage'))
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuth = useAuthStore((s) => s.isAuthenticated())
  const location = useLocation()
  if (!isAuth) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  return <>{children}</>
}

function PageLoader() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
    </div>
  )
}

export default function App() {
  const applyTheme = useUiStore((s) => s.applyTheme)

  useEffect(() => {
    applyTheme()
    document.title = 'Foundation Admin Template'
  }, [applyTheme])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public / standalone */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />

        {/* Authenticated admin */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/files" element={<FileManagerPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/ui-advanced" element={<UiAdvancedPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
