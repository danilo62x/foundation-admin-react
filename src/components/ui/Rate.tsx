import { useState } from 'react'
import IconBase from './IconBase'

interface Props {
  value: number
  onChange?: (v: number) => void
  max?: number
  size?: number
  readonly?: boolean
}

export default function Rate({ value, onChange, max = 5, size = 24, readonly = false }: Props) {
  const [hover, setHover] = useState(0)
  const display = hover || value

  return (
    <div className="inline-flex items-center gap-0.5" role="radiogroup">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const filled = n <= display
        return (
          <button
            key={n}
            type="button"
            disabled={readonly}
            aria-label={`${n} de ${max}`}
            onClick={() => !readonly && onChange?.(n)}
            onMouseEnter={() => !readonly && setHover(n)}
            onMouseLeave={() => !readonly && setHover(0)}
            className={`transition ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          >
            <IconBase
              name="star"
              size={size}
              className={filled ? 'fill-warning-400 text-warning-400' : 'fill-transparent text-gray-300 dark:text-gray-600'}
            />
          </button>
        )
      })}
    </div>
  )
}
