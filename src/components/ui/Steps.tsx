import IconBase from './IconBase'

export interface Step {
  label: string
  description?: string
}

interface Props {
  steps: Step[]
  /** 1-based index of the current step */
  current: number
  onChange?: (idx: number) => void
}

export default function Steps({ steps, current, onChange }: Props) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((s, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        const last = i === steps.length - 1
        const clickable = !!onChange

        return (
          <li key={s.label} className={`flex items-start ${last ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onChange?.(n)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                  clickable ? 'cursor-pointer' : 'cursor-default'
                } ${
                  done
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : active
                      ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'border-themed bg-card-bg text-muted surface-card'
                }`}
              >
                {done ? <IconBase name="check" size={18} strokeWidth={2.5} /> : n}
              </button>
              <div className="mt-2 max-w-[8rem] text-center">
                <p className={`text-xs font-medium ${active || done ? 'text-heading' : 'text-muted'}`}>{s.label}</p>
                {s.description && <p className="mt-0.5 text-[11px] text-muted">{s.description}</p>}
              </div>
            </div>
            {!last && (
              <div className={`mt-5 h-0.5 flex-1 rounded-full transition ${done ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
