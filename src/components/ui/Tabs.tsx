import { type ReactNode } from 'react'
import IconBase from './IconBase'

export interface TabItem {
  label: string
  icon?: string
  content: ReactNode
}

interface Props {
  tabs: TabItem[]
  value: number
  onChange: (idx: number) => void
}

export default function Tabs({ tabs, value, onChange }: Props) {
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-themed no-scrollbar" role="tablist">
        {tabs.map((t, i) => {
          const active = value === i
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(i)}
              className={`-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-muted hover:border-gray-300 hover:text-body dark:hover:border-gray-700'
              }`}
            >
              {t.icon && <IconBase name={t.icon} size={16} />}
              {t.label}
            </button>
          )
        })}
      </div>
      <div className="pt-5 text-sm text-body" role="tabpanel">
        {tabs[value]?.content}
      </div>
    </div>
  )
}
