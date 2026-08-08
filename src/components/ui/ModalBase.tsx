import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import IconBase from './IconBase'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  children?: ReactNode
  footer?: ReactNode | ((close: () => void) => ReactNode)
}

const SIZE_MAP = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const

export default function ModalBase({
  open,
  onClose,
  title,
  subtitle,
  size = 'md',
  closable = true,
  children,
  footer,
}: Props) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`surface-card relative w-full overflow-hidden rounded-2xl border shadow-theme-xl ${SIZE_MAP[size]}`}>
        {(title || subtitle || closable) && (
          <header className="flex items-center justify-between border-b border-themed px-5 py-4">
            <div>
              {title && <h3 className="text-base font-semibold text-heading">{title}</h3>}
              {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
            </div>
            {closable && (
              <button type="button" aria-label="Fechar" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <IconBase name="x" size={20} />
              </button>
            )}
          </header>
        )}
        <div className="px-5 py-5">{children}</div>
        {footer && (
          <footer className="flex items-center justify-end gap-2 border-t border-themed px-5 py-3">
            {typeof footer === 'function' ? footer(onClose) : footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  )
}
