import { type ReactNode } from 'react'
import IconBase from './IconBase'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  toolbar?: ReactNode
  footer?: ReactNode
  bodyClass?: string
  className?: string
  children?: ReactNode
}

export default function CardComponent({
  title,
  subtitle,
  icon,
  toolbar,
  footer,
  bodyClass = 'p-5 md:p-6',
  className = '',
  children,
}: Props) {
  return (
    <section className={`surface-card rounded-2xl border shadow-theme-sm ${className}`}>
      {(title || toolbar) && (
        <header className="flex items-center justify-between gap-3 border-b border-themed px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/15">
                <IconBase name={icon} size={18} />
              </span>
            )}
            <div>
              {title && <h3 className="text-base font-semibold text-heading">{title}</h3>}
              {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
            </div>
          </div>
          {toolbar}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
      {footer && <footer className="border-t border-themed px-5 py-3 md:px-6">{footer}</footer>}
    </section>
  )
}
