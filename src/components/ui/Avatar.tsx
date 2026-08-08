import { Children, type ReactNode } from 'react'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Status = 'online' | 'offline' | 'busy'

interface Props {
  src?: string
  name?: string
  size?: Size
  status?: Status
}

const SIZE_MAP: Record<Size, string> = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-16 w-16 text-lg',
}

const STATUS_SIZE: Record<Size, string> = {
  xs: 'h-2 w-2',
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-3.5 w-3.5',
  xl: 'h-4 w-4',
}

const STATUS_COLOR: Record<Status, string> = {
  online: 'bg-success-500',
  offline: 'bg-gray-400',
  busy: 'bg-error-500',
}

function initials(name?: string) {
  if (!name) return '?'
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export default function Avatar({ src, name, size = 'md', status }: Props) {
  return (
    <span className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={name ?? ''}
          className={`rounded-full object-cover ${SIZE_MAP[size]}`}
        />
      ) : (
        <span className={`flex items-center justify-center rounded-full bg-brand-500 font-bold text-white ${SIZE_MAP[size]}`}>
          {initials(name)}
        </span>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 ${STATUS_SIZE[size]} ${STATUS_COLOR[status]}`}
          style={{ borderColor: 'var(--tx-card-bg)' }}
        />
      )}
    </span>
  )
}

interface GroupProps {
  children: ReactNode
  /** number of extra avatars hidden, shown as +N */
  extra?: number
  size?: Size
}

export function AvatarGroup({ children, extra, size = 'md' }: GroupProps) {
  return (
    <div className="flex -space-x-2">
      {Children.map(children, (child, i) => (
        <span
          key={i}
          className="rounded-full ring-2"
          style={{ ['--tw-ring-color' as string]: 'var(--tx-card-bg)' }}
        >
          {child}
        </span>
      ))}
      {extra != null && extra > 0 && (
        <span
          className={`flex items-center justify-center rounded-full ring-2 bg-gray-200 font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200 ${SIZE_MAP[size]}`}
          style={{ ['--tw-ring-color' as string]: 'var(--tx-card-bg)' }}
        >
          +{extra}
        </span>
      )}
    </div>
  )
}
