import { useEffect, useRef, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'
import ModalBase from '@/components/ui/ModalBase'

const PROGRESS_BARS = [
  { label: 'Vendas mensais', value: 72, color: 'var(--color-brand-500)' },
  { label: 'Meta de novos clientes', value: 45, color: 'var(--color-success-500)' },
  { label: 'Engajamento', value: 88, color: 'var(--color-warning-500)' },
  { label: 'Devoluções', value: 12, color: 'var(--color-error-500)' },
]

export default function ComponentsPage() {
  usePageTitle('Componentes')
  const ui = useUiStore()

  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [modalInput, setModalInput] = useState('João da Silva')

  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Componentes</h1>
        <p className="mt-1 text-sm text-muted">Biblioteca completa de UI: botões, badges, alertas, modais e mais.</p>
      </div>

      <CardComponent title="Botões" subtitle="Variações de cor, tamanho e estado" icon="grid">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">Primário</button>
          <button className="surface-card inline-flex h-10 items-center gap-2 rounded-lg border border-themed bg-card-bg px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">Secundário</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-success-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-success-600">Sucesso</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-warning-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-warning-600">Aviso</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-error-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600">Perigo</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg text-sm font-medium text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/15">Ghost</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 text-sm font-medium text-muted hover:border-brand-300 hover:text-brand-500 dark:border-gray-700">
            <IconBase name="plus" size={16} /> Tracejado
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white opacity-60" disabled>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Carregando
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-themed pt-5">
          <button className="inline-flex h-7 items-center rounded-md bg-brand-500 px-2.5 text-xs font-medium text-white">XS</button>
          <button className="inline-flex h-9 items-center rounded-lg bg-brand-500 px-3 text-sm font-medium text-white">SM</button>
          <button className="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white">MD</button>
          <button className="inline-flex h-12 items-center rounded-lg bg-brand-500 px-5 text-base font-medium text-white">LG</button>
          <button className="inline-flex h-14 items-center rounded-lg bg-brand-500 px-6 text-lg font-medium text-white">XL</button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-themed pt-5">
          <div className="surface-card inline-flex rounded-lg border border-themed bg-card-bg p-0.5">
            <button className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white">Tab 1</button>
            <button className="rounded-md px-3 py-1.5 text-xs font-medium text-body hover:bg-gray-100 dark:hover:bg-gray-800">Tab 2</button>
            <button className="rounded-md px-3 py-1.5 text-xs font-medium text-body hover:bg-gray-100 dark:hover:bg-gray-800">Tab 3</button>
          </div>
          <span className="text-xs text-muted">Button group / tabs</span>
        </div>
      </CardComponent>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardComponent title="Badges & Tags" icon="tag">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">Primário</span>
              <span className="inline-flex rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500">Sucesso</span>
              <span className="inline-flex rounded-full bg-warning-50 px-3 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500">Aviso</span>
              <span className="inline-flex rounded-full bg-error-50 px-3 py-1 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">Perigo</span>
              <span className="inline-flex rounded-full bg-blue-light-50 px-3 py-1 text-xs font-medium text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500">Info</span>
              <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">Neutro</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" /> Online
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15">
                <span className="h-1.5 w-1.5 rounded-full bg-warning-500" /> Pendente
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Offline
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-2 text-xs font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10">
                <IconBase name="star" size={12} />
                Premium
              </span>
              <span className="surface-card inline-flex h-7 items-center rounded-md border border-themed bg-card-bg px-2 text-xs font-medium text-body">v2.0.0</span>
              <span className="inline-flex h-7 items-center gap-1 rounded-md bg-brand-500 px-2 text-xs font-medium text-white">
                <IconBase name="check" size={12} strokeWidth={2.5} /> Verificado
              </span>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Avatares" icon="user">
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">XS</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">SM</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">MD</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white">LG</span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white">XL</span>
            </div>

            <div className="flex -space-x-2">
              <span className="surface-card flex h-10 w-10 items-center justify-center rounded-full border-2 bg-brand-500 text-xs font-bold text-white" style={{ borderColor: 'var(--tx-card-bg)' }}>MC</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-success-500 text-xs font-bold text-white" style={{ borderColor: 'var(--tx-card-bg)' }}>LP</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-warning-500 text-xs font-bold text-white" style={{ borderColor: 'var(--tx-card-bg)' }}>AS</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-error-500 text-xs font-bold text-white" style={{ borderColor: 'var(--tx-card-bg)' }}>RL</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-gray-200 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200" style={{ borderColor: 'var(--tx-card-bg)' }}>+5</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 font-bold text-white">DC</span>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-success-500" style={{ borderColor: 'var(--tx-card-bg)' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-heading">Daniela Costa</p>
                <p className="text-xs text-muted">Online · Produto</p>
              </div>
            </div>
          </div>
        </CardComponent>
      </div>

      <CardComponent title="Barras de progresso" icon="chart">
        <div className="space-y-4">
          {PROGRESS_BARS.map((p) => (
            <div key={p.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-heading">{p.label}</span>
                <span className="text-muted">{p.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full rounded-full transition-all" style={{ width: p.value + '%', background: p.color }} />
              </div>
            </div>
          ))}
          <div className="border-t border-themed pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Variações circulares</p>
            <div className="flex gap-6">
              {[25, 60, 88].map((c) => (
                <div key={c} className="flex flex-col items-center">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="var(--tx-border)" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="var(--color-brand-500)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(c / 100) * 201} 201`}
                      transform="rotate(-90 40 40)"
                    />
                    <text x="40" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--tx-text-heading)">
                      {c}%
                    </text>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardComponent>

      <CardComponent title="Alertas" icon="info">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-500/30 dark:bg-success-500/10">
            <IconBase name="check" size={20} className="shrink-0 text-success-600" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-success-800 dark:text-success-300">Operação concluída</p>
              <p className="text-sm text-success-700 dark:text-success-400">As alterações foram salvas com sucesso.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-500/30 dark:bg-warning-500/10">
            <IconBase name="bell" size={20} className="shrink-0 text-warning-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-warning-800 dark:text-warning-300">Atenção necessária</p>
              <p className="text-sm text-warning-700 dark:text-warning-400">Revise os dados antes de continuar.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-500/30 dark:bg-error-500/10">
            <IconBase name="x" size={20} className="shrink-0 text-error-600" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-error-800 dark:text-error-300">Erro ao processar</p>
              <p className="text-sm text-error-700 dark:text-error-400">Tente novamente em alguns instantes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-blue-light-200 bg-blue-light-50 p-4 dark:border-blue-light-500/30 dark:bg-blue-light-500/10">
            <IconBase name="info" size={20} className="shrink-0 text-blue-light-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-light-700 dark:text-blue-light-400">Informação</p>
              <p className="text-sm text-blue-light-600 dark:text-blue-light-500">Esta é uma nota informativa.</p>
            </div>
          </div>
        </div>
      </CardComponent>

      <CardComponent title="Modais" subtitle="Diálogos sobrepostos com Portal" icon="grid">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600" onClick={() => setShowModal(true)}>
            Abrir modal
          </button>
          <button className="inline-flex h-10 items-center rounded-lg bg-warning-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-warning-600" onClick={() => setShowConfirm(true)}>
            Confirmar ação
          </button>
          <button className="inline-flex h-10 items-center rounded-lg bg-error-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600" onClick={() => setShowDelete(true)}>
            Confirmação destrutiva
          </button>
        </div>
      </CardComponent>

      <CardComponent title="Toasts & Notificações" icon="bell">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-success-500 px-4 py-2 text-sm font-medium text-white hover:bg-success-600" onClick={() => ui.notifySuccess('Tudo certo!')}>
            Sucesso
          </button>
          <button className="rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600" onClick={() => ui.notifyError('Algo deu errado.')}>
            Erro
          </button>
          <button className="rounded-lg bg-warning-500 px-4 py-2 text-sm font-medium text-white hover:bg-warning-600" onClick={() => ui.notifyWarning('Verifique os dados.')}>
            Aviso
          </button>
          <button className="rounded-lg bg-blue-light-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-light-600" onClick={() => ui.notify('Nova mensagem recebida.', 'info')}>
            Info
          </button>
        </div>
      </CardComponent>

      <CardComponent title="Dropdowns" icon="grid">
        <div className="flex flex-wrap gap-4">
          <div className="relative" ref={ddRef}>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setDdOpen((s) => !s)}
            >
              Ações
              <IconBase name="chevron-down" size={14} />
            </button>
            {ddOpen && (
              <div className="surface-card absolute left-0 mt-2 w-48 rounded-xl border shadow-theme-lg">
                <ul className="py-1 text-sm">
                  <li>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800">
                      <IconBase name="edit" size={14} /> Editar
                    </button>
                  </li>
                  <li>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800">
                      <IconBase name="copy" size={14} /> Duplicar
                    </button>
                  </li>
                  <li>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800">
                      <IconBase name="download" size={14} /> Exportar
                    </button>
                  </li>
                  <li className="border-t border-themed">
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10">
                      <IconBase name="trash" size={14} /> Excluir
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="group relative">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800">
              <IconBase name="info" size={16} />
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              Tooltip — passe o mouse aqui
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
            </div>
          </div>

          <div className="surface-card flex items-center gap-2 rounded-lg border border-themed bg-card-bg px-3 py-1.5 text-sm text-body">
            <span>Filtros</span>
            <span className="rounded-full bg-brand-500 px-1.5 text-xs text-white">3</span>
            <IconBase name="filter" size={14} />
          </div>
        </div>
      </CardComponent>

      <ModalBase
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Editar perfil"
        subtitle="Atualize suas informações"
        size="md"
        footer={(close) => (
          <>
            <button className="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" onClick={close}>
              Cancelar
            </button>
            <button
              className="h-9 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white hover:bg-brand-600"
              onClick={() => {
                close()
                ui.notifySuccess('Perfil atualizado!')
              }}
            >
              Salvar
            </button>
          </>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-heading">Nome</label>
            <input
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-heading">Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
            />
          </div>
        </div>
      </ModalBase>

      <ModalBase
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar ação"
        size="sm"
        footer={(close) => (
          <>
            <button className="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" onClick={close}>
              Cancelar
            </button>
            <button className="h-9 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white hover:bg-brand-600" onClick={close}>
              Confirmar
            </button>
          </>
        )}
      >
        <p className="text-sm text-body">Deseja realmente prosseguir? Esta ação enviará uma notificação ao time.</p>
      </ModalBase>

      <ModalBase
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title="Excluir item"
        subtitle="Esta ação não pode ser desfeita"
        size="sm"
        footer={(close) => (
          <>
            <button className="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" onClick={close}>
              Cancelar
            </button>
            <button
              className="h-9 rounded-lg bg-error-500 px-3 text-sm font-medium text-white hover:bg-error-600"
              onClick={() => {
                close()
                ui.notifyError('Item excluído com sucesso.')
              }}
            >
              Excluir definitivamente
            </button>
          </>
        )}
      >
        <p className="text-sm text-body">
          Você está prestes a remover este item permanentemente. Todos os dados associados serão perdidos.
        </p>
      </ModalBase>
    </div>
  )
}
