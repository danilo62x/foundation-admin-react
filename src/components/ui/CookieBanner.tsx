import { useEffect } from 'react'
import { useUiStore } from '@/stores/ui'
import IconBase from './IconBase'

export default function CookieBanner() {
  const show = useUiStore((s) => s.showCookieBanner)
  const accepted = useUiStore((s) => s.cookiesAccepted)
  const accept = useUiStore((s) => s.acceptCookies)
  const decline = useUiStore((s) => s.declineCookies)
  const close = useUiStore((s) => s.closeCookieBanner)
  const open = useUiStore((s) => s.openCookieBanner)
  const notify = useUiStore((s) => s.notify)

  useEffect(() => {
    if (!accepted) open()
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning-50 text-warning-500 dark:bg-warning-500/15">
        <IconBase name="cookie" size={26} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-heading">Usamos cookies</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego.
          Ao continuar navegando, você concorda com a nossa{' '}
          <a
            href="#"
            className="font-medium text-brand-500 hover:text-brand-600"
            onClick={(e) => {
              e.preventDefault()
              notify('Abrindo política de privacidade...', 'info')
            }}
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-lg border border-themed px-3 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={decline}
        >
          Recusar
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          onClick={accept}
        >
          <IconBase name="check" size={14} strokeWidth={2.5} /> Aceitar
        </button>
        <button
          type="button"
          aria-label="Fechar"
          className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          onClick={close}
        >
          <IconBase name="x" size={18} />
        </button>
      </div>
    </div>
  )
}
