import { usePageTitle } from '@/hooks/usePageTitle'
import StatsCard from '@/components/ui/StatsCard'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'

const REVENUE = [
  { label: 'Jan', value: 60, amount: '24.580' },
  { label: 'Fev', value: 75, amount: '32.910' },
  { label: 'Mar', value: 45, amount: '18.430' },
  { label: 'Abr', value: 88, amount: '41.220' },
  { label: 'Mai', value: 92, amount: '47.890' },
  { label: 'Jun', value: 70, amount: '29.110' },
]

const TRAFFIC = [
  { label: 'Google', visitors: '12.450', delta: '+8,4%', bg: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400' },
  { label: 'Direto', visitors: '8.210', delta: '+3,1%', bg: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500' },
  { label: 'Instagram', visitors: '4.870', delta: '+15,2%', bg: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500' },
  { label: 'YouTube', visitors: '2.150', delta: '-1,8%', bg: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' },
  { label: 'Email', visitors: '1.320', delta: '+0,9%', bg: 'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-500' },
]

const ACTIVITY = [
  { id: 1, name: 'Marina Costa', initials: 'MC', product: 'Plano Pro', amount: '299,00', status: 'Pago', date: 'Hoje, 09:42' },
  { id: 2, name: 'Lucas Pereira', initials: 'LP', product: 'Plano Start', amount: '79,00', status: 'Pendente', date: 'Ontem, 18:11' },
  { id: 3, name: 'Aline Souza', initials: 'AS', product: 'Plano Pro', amount: '299,00', status: 'Pago', date: 'Ontem, 14:25' },
  { id: 4, name: 'Rafael Lima', initials: 'RL', product: 'Plano Enterprise', amount: '1.290,00', status: 'Recusado', date: '23 mai' },
  { id: 5, name: 'Bianca Rocha', initials: 'BR', product: 'Plano Start', amount: '79,00', status: 'Pago', date: '22 mai' },
]

function statusClass(status: string) {
  if (status === 'Pago') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}

export default function DashboardPage() {
  usePageTitle('Dashboard')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-title-sm font-bold text-heading">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Visão geral do desempenho dos últimos 30 dias.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="surface-card h-10 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring">
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Este mês</option>
            <option>Este ano</option>
          </select>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
            <IconBase name="plus" size={16} /> Novo relatório
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Clientes" value="3.782" icon="users" accent="brand" trend="up" trendValue="11,01%" />
        <StatsCard title="Pedidos" value="5.359" icon="shopping-bag" accent="success" trend="up" trendValue="9,05%" />
        <StatsCard title="Receita" value="R$ 89.450" icon="dollar" accent="warning" trend="down" trendValue="2,3%" />
        <StatsCard title="Produtos" value="1.245" icon="package" accent="info" trend="up" trendValue="4,8%" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <CardComponent title="Receita mensal" subtitle="Comparativo do trimestre" icon="chart" className="xl:col-span-2">
          <div className="space-y-4">
            {REVENUE.map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <span className="w-12 text-xs font-medium text-muted">{row.label}</span>
                <div className="flex h-3 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="bg-brand-500 transition-all" style={{ width: `${row.value}%` }} />
                </div>
                <span className="w-20 text-right text-sm font-medium text-heading">R$ {row.amount}</span>
              </div>
            ))}
          </div>
        </CardComponent>

        <CardComponent title="Origens de tráfego" subtitle="Top 5 canais" icon="globe">
          <ul className="space-y-4">
            {TRAFFIC.map((src) => (
              <li key={src.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${src.bg}`}>
                    {src.label.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-heading">{src.label}</p>
                    <p className="text-xs text-muted">{src.visitors} visitantes</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${src.delta.startsWith('-') ? 'text-error-500' : 'text-success-600'}`}>
                  {src.delta}
                </span>
              </li>
            ))}
          </ul>
        </CardComponent>
      </div>

      <CardComponent title="Atividade recente" subtitle="Últimas transações registradas" icon="dollar">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3 pr-4 font-medium">Cliente</th>
                <th className="py-3 pr-4 font-medium">Produto</th>
                <th className="py-3 pr-4 font-medium">Valor</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-themed">
              {ACTIVITY.map((row) => (
                <tr key={row.id} className="text-body">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                        {row.initials}
                      </span>
                      <span className="text-heading">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">{row.product}</td>
                  <td className="py-3 pr-4 font-medium text-heading">R$ {row.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardComponent>
    </div>
  )
}
