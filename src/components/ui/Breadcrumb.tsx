import IconBase from './IconBase'

export interface Crumb {
  label: string
  href?: string
  icon?: string
}

interface Props {
  items: Crumb[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-muted transition hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {item.icon && <IconBase name={item.icon} size={15} />}
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 ${last ? 'font-medium text-heading' : 'text-muted'}`}
                >
                  {item.icon && <IconBase name={item.icon} size={15} />}
                  {item.label}
                </span>
              )}
              {!last && <IconBase name="chevron-right" size={14} className="text-gray-400" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
