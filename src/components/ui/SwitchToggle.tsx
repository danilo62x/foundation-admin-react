interface Props {
  checked: boolean
  onChange: (val: boolean) => void
  size?: 'sm' | 'md'
  disabled?: boolean
}

export default function SwitchToggle({ checked, onChange, size = 'md', disabled = false }: Props) {
  const sizeClass = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11'
  const thumbSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const activeTranslate = size === 'sm' ? 'translate-x-4' : 'translate-x-5'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex shrink-0 items-center rounded-full transition ${sizeClass} ${
        checked ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        className={`inline-block transform rounded-full bg-white shadow-theme-xs transition ${thumbSize} ${
          checked ? activeTranslate : 'translate-x-1'
        }`}
      />
    </button>
  )
}
