import { useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'

const ROWS = [
  { id: '1', customer: 'Marina Costa', amount: '299,00', status: 'Pago', date: '25/05/2026' },
  { id: '2', customer: 'Lucas Pereira', amount: '79,00', status: 'Pendente', date: '24/05/2026' },
  { id: '3', customer: 'Aline Souza', amount: '299,00', status: 'Pago', date: '24/05/2026' },
  { id: '4', customer: 'Rafael Lima', amount: '1.290,00', status: 'Cancelado', date: '23/05/2026' },
  { id: '5', customer: 'Bianca Rocha', amount: '79,00', status: 'Pago', date: '22/05/2026' },
  { id: '6', customer: 'Pedro Alves', amount: '129,00', status: 'Pendente', date: '21/05/2026' },
  { id: '7', customer: 'Carla Mendes', amount: '299,00', status: 'Pago', date: '20/05/2026' },
]

function statusClass(status: string) {
  if (status === 'Pago') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}

export default function TablesPage() {
  usePageTitle('Tabelas')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(
    () =>
      ROWS.filter((r) => {
        if (search && !r.customer.toLowerCase().includes(search.toLowerCase())) return false
        if (statusFilter && r.status !== statusFilter) return false
        return true
      }),
    [search, statusFilter]
  )

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.includes(r.id))

  function toggleAll() {
    if (allSelected) setSelected([])
    else setSelected(filtered.map((r) => r.id))
  }

  function toggleRow(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Tabelas</h1>
        <p className="mt-1 text-sm text-muted">Listagens com filtros, paginação e seleção múltipla.</p>
      </div>

      <CardComponent
        title="Pedidos"
        subtitle="Filtre por status e pesquise por cliente"
        icon="tables"
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="search" size={16} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="h-9 w-44 rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="surface-card h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring"
            >
              <option value="">Todos</option>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        }
        footer={
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              Mostrando {filtered.length} de {ROWS.length} pedidos
            </span>
            <div className="flex items-center gap-1">
              <button className="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                Anterior
              </button>
              <button className="rounded-md bg-brand-500 px-2.5 py-1 text-white">1</button>
              <button className="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
              <button className="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
              <button className="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                Próximo
              </button>
            </div>
          </div>
        }
      >
        {selected.length > 0 && (
          <div className="mb-3 flex items-center justify-between rounded-lg bg-brand-50 px-4 py-2 text-sm dark:bg-brand-500/10">
            <span className="font-medium text-brand-700 dark:text-brand-400">
              {selected.length} {selected.length === 1 ? 'pedido' : 'pedidos'} selecionado{selected.length === 1 ? '' : 's'}
            </span>
            <div className="flex gap-2">
              <button className="rounded-md border border-brand-300 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-500/40 dark:text-brand-400 dark:hover:bg-brand-500/20">
                Exportar
              </button>
              <button className="rounded-md border border-error-300 bg-white px-2.5 py-1 text-xs font-medium text-error-700 hover:bg-error-50 dark:border-error-500/40 dark:bg-transparent dark:text-error-400 dark:hover:bg-error-500/10">
                Excluir
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="w-12 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                </th>
                <th className="py-3 pr-4 font-medium">Pedido</th>
                <th className="py-3 pr-4 font-medium">Cliente</th>
                <th className="py-3 pr-4 font-medium">Valor</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Data</th>
                <th className="py-3 pr-4 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-themed">
              {filtered.map((row) => (
                <tr key={row.id} className="text-body">
                  <td className="py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted">#{row.id.padStart(5, '0')}</td>
                  <td className="py-3 pr-4 font-medium text-heading">{row.customer}</td>
                  <td className="py-3 pr-4">R$ {row.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted">{row.date}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                        <IconBase name="eye" size={16} />
                      </button>
                      <button className="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                        <IconBase name="edit" size={16} />
                      </button>
                      <button className="rounded-md p-1.5 text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/15">
                        <IconBase name="trash" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-muted">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardComponent>
    </div>
  )
}
