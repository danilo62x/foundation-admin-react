import { useState, type KeyboardEvent } from 'react'
import IconBase from './IconBase'

interface Props {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  /** max number of tags allowed */
  max?: number
}

export default function TagInput({ value, onChange, placeholder = 'Adicionar…', max }: Props) {
  const [text, setText] = useState('')

  const addTag = (raw: string) => {
    const t = raw.trim()
    if (!t || value.includes(t)) return
    if (max != null && value.length >= max) return
    onChange([...value, t])
    setText('')
  }

  const removeTag = (t: string) => onChange(value.filter((v) => v !== t))

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(text)
    } else if (e.key === 'Backspace' && text === '' && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-themed bg-white px-2 py-1.5 transition focus-within:border-brand-300 focus-within:shadow-[0_0_0_4px_rgba(70,95,255,0.12)] dark:bg-gray-900">
      {value.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-md bg-brand-50 py-1 pl-2 pr-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400"
        >
          {t}
          <button
            type="button"
            aria-label={`Remover ${t}`}
            onClick={() => removeTag(t)}
            className="rounded p-0.5 text-brand-500 transition hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-500/25"
          >
            <IconBase name="x" size={12} strokeWidth={2.5} />
          </button>
        </span>
      ))}
      <input
        value={text}
        placeholder={value.length === 0 ? placeholder : ''}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => addTag(text)}
        className="h-7 min-w-[6rem] flex-1 bg-transparent px-1 text-sm text-body outline-none placeholder:text-muted"
      />
    </div>
  )
}
