import { useCallback, useState } from 'react'
import { useDropzone, type Accept } from 'react-dropzone'
import IconBase from './IconBase'

interface Props {
  accept?: Accept
  maxFiles?: number
  maxSize?: number
  onFiles?: (files: File[]) => void
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * Drag-and-drop file upload built on react-dropzone, themed to the template
 * and with an inline list + remove for selected files.
 */
export default function FileDropzone({ accept, maxFiles = 5, maxSize, onFiles }: Props) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = [...files, ...accepted].slice(0, maxFiles)
      setFiles(next)
      onFiles?.(next)
    },
    [files, maxFiles, onFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxFiles, maxSize })

  const remove = (idx: number) => {
    const next = files.filter((_, i) => i !== idx)
    setFiles(next)
    onFiles?.(next)
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition ${
          isDragActive ? 'border-brand-500 bg-brand-25 dark:bg-brand-500/10' : 'border-themed hover:border-brand-300'
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-brand-500">
          <IconBase name="download" size={28} strokeWidth={1.6} />
        </span>
        <p className="text-sm font-medium text-heading">
          {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para enviar'}
        </p>
        <p className="text-xs text-muted">Até {maxFiles} arquivos{maxSize ? ` · máx ${formatSize(maxSize)}` : ''}</p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="surface-card flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-muted">
                  <IconBase name="package" size={16} />
                </span>
                <span className="truncate text-sm text-body">{file.name}</span>
                <span className="shrink-0 text-xs text-muted">{formatSize(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-muted hover:text-error-500"
                aria-label="Remover"
              >
                <IconBase name="x" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
