import { useState, type ReactNode } from 'react'
import IconBase from './IconBase'

export interface AccordionItem {
  title: string
  icon?: string
  content: ReactNode
}

interface Props {
  items: AccordionItem[]
  multiple?: boolean
  /** Indexes initially open */
  defaultOpen?: number[]
}

export default function Accordion({ items, multiple = false, defaultOpen = [] }: Props) {
  const [open, setOpen] = useState<number[]>(defaultOpen)

  const toggle = (idx: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(idx)
      if (multiple) {
        return isOpen ? prev.filter((i) => i !== idx) : [...prev, idx]
      }
      return isOpen ? [] : [idx]
    })
  }

  return (
    <div className="divide-y divide-[var(--tx-border)] overflow-hidden rounded-xl border border-themed surface-card">
      {items.map((item, i) => {
        const isOpen = open.includes(i)
        return (
          <div key={item.title}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-heading transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2.5">
                {item.icon && <IconBase name={item.icon} size={18} className="text-muted" />}
                {item.title}
              </span>
              <IconBase
                name="chevron-down"
                size={18}
                className={`text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-sm text-body">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
