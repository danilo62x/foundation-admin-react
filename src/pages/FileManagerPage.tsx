import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import IconBase from '@/components/ui/IconBase'
import ModalBase from '@/components/ui/ModalBase'
import FileDropzone from '@/components/ui/FileDropzone'
import { useUiStore } from '@/stores/ui'

interface FolderItem {
  id: string
  name: string
  items: number
  modified: string
}

interface FileItem {
  id: string
  name: string
  kind: 'document' | 'image' | 'archive' | 'sheet'
  size: string
  modified: string
}

const FOLDERS: FolderItem[] = [
  { id: 'f1', name: 'Documentos', items: 24, modified: '24/05/2026' },
  { id: 'f2', name: 'Imagens', items: 132, modified: '22/05/2026' },
  { id: 'f3', name: 'Projetos', items: 9, modified: '20/05/2026' },
  { id: 'f4', name: 'Backups', items: 5, modified: '12/05/2026' },
]

const FILES: FileItem[] = [
  { id: 'a1', name: 'Proposta-comercial.pdf', kind: 'document', size: '2,4 MB', modified: 'Hoje, 09:42' },
  { id: 'a2', name: 'Relatorio-maio.xlsx', kind: 'sheet', size: '845 KB', modified: 'Ontem, 18:11' },
  { id: 'a3', name: 'Banner-home.png', kind: 'image', size: '1,1 MB', modified: 'Ontem, 14:25' },
  { id: 'a4', name: 'Apresentacao.pdf', kind: 'document', size: '5,8 MB', modified: '23/05/2026' },
  { id: 'a5', name: 'Logo-vetor.svg', kind: 'image', size: '64 KB', modified: '22/05/2026' },
  { id: 'a6', name: 'Codigo-fonte.zip', kind: 'archive', size: '18,2 MB', modified: '20/05/2026' },
]

const KIND_STYLE: Record<FileItem['kind'], { icon: string; cls: string }> = {
  document: { icon: 'forms', cls: 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' },
  image: { icon: 'eye', cls: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
  archive: { icon: 'package', cls: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500' },
  sheet: { icon: 'tables', cls: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500' },
}

function ItemMenu({ onClose }: { onClose: () => void }) {
  const notifySuccess = useUiStore((s) => s.notifySuccess)
  const actions = [
    { label: 'Abrir', icon: 'eye' },
    { label: 'Renomear', icon: 'edit' },
    { label: 'Baixar', icon: 'download' },
    { label: 'Excluir', icon: 'trash', danger: true },
  ]
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="surface-card absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border py-1 shadow-theme-lg">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => {
              onClose()
              notifySuccess(`${a.label} executado`)
            }}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${
              a.danger ? 'text-error-600 dark:text-error-500' : 'text-body'
            }`}
          >
            <IconBase name={a.icon} size={15} /> {a.label}
          </button>
        ))}
      </div>
    </>
  )
}

export default function FileManagerPage() {
  usePageTitle('Arquivos')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const usedGb = 64.5
  const totalGb = 100
  const usedPct = Math.round((usedGb / totalGb) * 100)

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1.5 text-sm">
          <button className="font-medium text-body hover:text-brand-500">Início</button>
          <IconBase name="chevron-right" size={14} className="text-muted" />
          <span className="font-semibold text-heading">Meus arquivos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-themed p-0.5">
            <button
              onClick={() => setView('grid')}
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                view === 'grid' ? 'bg-brand-500 text-white' : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              aria-label="Visualização em grade"
            >
              <IconBase name="grid" size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                view === 'list' ? 'bg-brand-500 text-white' : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              aria-label="Visualização em lista"
            >
              <IconBase name="tables" size={16} />
            </button>
          </div>
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            <IconBase name="plus" size={16} /> Enviar arquivo
          </button>
        </div>
      </div>

      {/* Storage usage */}
      <div className="surface-card rounded-2xl border p-5 shadow-theme-sm md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
              <IconBase name="package" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-heading">Armazenamento</p>
              <p className="text-xs text-muted">
                {usedGb} GB de {totalGb} GB utilizados
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-heading">{usedPct}%</span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full rounded-full ${usedPct > 80 ? 'bg-error-500' : 'bg-brand-500'} transition-all`}
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </div>

      {/* Folders */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-heading">Pastas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FOLDERS.map((f) => (
            <div
              key={f.id}
              className="surface-card group relative flex items-center gap-3 rounded-2xl border p-4 shadow-theme-sm transition hover:border-brand-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500">
                <IconBase name="grid" size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-heading">{f.name}</p>
                <p className="text-xs text-muted">
                  {f.items} itens · {f.modified}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === f.id ? null : f.id)}
                  className="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Opções"
                >
                  <IconBase name="dots-vertical" size={16} />
                </button>
                {openMenu === f.id && <ItemMenu onClose={() => setOpenMenu(null)} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-heading">Arquivos</h2>
        {view === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FILES.map((file) => {
              const style = KIND_STYLE[file.kind]
              return (
                <div
                  key={file.id}
                  className="surface-card relative flex flex-col gap-3 rounded-2xl border p-4 shadow-theme-sm transition hover:border-brand-300"
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.cls}`}>
                      <IconBase name={style.icon} size={22} />
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === file.id ? null : file.id)}
                        className="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Opções"
                      >
                        <IconBase name="dots-vertical" size={16} />
                      </button>
                      {openMenu === file.id && <ItemMenu onClose={() => setOpenMenu(null)} />}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-heading">{file.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {file.size} · {file.modified}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="surface-card overflow-hidden rounded-2xl border shadow-theme-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Tamanho</th>
                  <th className="px-5 py-3 font-medium">Modificado</th>
                  <th className="px-5 py-3 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themed">
                {FILES.map((file) => {
                  const style = KIND_STYLE[file.kind]
                  return (
                    <tr key={file.id} className="text-body">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.cls}`}>
                            <IconBase name={style.icon} size={18} />
                          </span>
                          <span className="font-medium text-heading">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted">{file.size}</td>
                      <td className="px-5 py-3 text-muted">{file.modified}</td>
                      <td className="px-5 py-3">
                        <div className="relative flex justify-end">
                          <button
                            onClick={() => setOpenMenu(openMenu === file.id ? null : file.id)}
                            className="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Opções"
                          >
                            <IconBase name="dots-vertical" size={16} />
                          </button>
                          {openMenu === file.id && <ItemMenu onClose={() => setOpenMenu(null)} />}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalBase
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Enviar arquivos"
        subtitle="Arraste e solte ou selecione do seu dispositivo"
        size="lg"
        footer={(close) => (
          <>
            <button
              onClick={close}
              className="h-10 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                close()
                notifySuccess('Arquivos enviados com sucesso')
              }}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
            >
              <IconBase name="download" size={16} /> Concluir
            </button>
          </>
        )}
      >
        <FileDropzone maxFiles={8} onFiles={() => {}} />
      </ModalBase>
    </div>
  )
}
