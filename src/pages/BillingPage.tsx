import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import StatsCard from '@/components/ui/StatsCard'
import IconBase from '@/components/ui/IconBase'

const HISTORY = [
  { id: '2026-0042', date: '28/05/2026', desc: 'Plano Pro — assinatura anual', amount: '1.752,90', status: 'Pendente' },
  { id: '2026-0031', date: '28/04/2026', desc: 'Usuários adicionais (5 assentos)', amount: '145,00', status: 'Pago' },
  { id: '2026-0024', date: '28/03/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2026-0018', date: '28/02/2026', desc: 'Armazenamento extra (250 GB)', amount: '98,00', status: 'Pago' },
  { id: '2026-0009', date: '28/01/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2025-0312', date: '28/12/2025', desc: 'Plano Start — mensalidade', amount: '79,00', status: 'Reembolsado' },
]

function statusClass(status: string) {
  if (status === 'Pago') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}

export default function BillingPage() {
  usePageTitle('Cobrança')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Cobrança</h1>
        <p className="mt-1 text-sm text-muted">Gerencie seu plano, forma de pagamento e histórico de faturas.</p>
      </div>

      {/* Plan + payment method */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardComponent title="Plano atual" subtitle="Detalhes da sua assinatura" icon="rocket" className="lg:col-span-2">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-heading">Plano Pro</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                  Ativo
                </span>
              </div>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-sm text-muted">R$</span>
                <span className="text-3xl font-bold text-heading">129</span>
                <span className="text-sm text-muted">/mês</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <IconBase name="info" size={16} className="text-brand-500" />
                Renova em <span className="font-medium text-body">28/06/2026</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <button
                type="button"
                onClick={() => notifySuccess('Upgrade de plano iniciado!')}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
              >
                <IconBase name="trending-up" size={16} /> Fazer upgrade
              </button>
              <button
                type="button"
                onClick={() => notifySuccess('Abrindo gerenciamento do plano...')}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <IconBase name="settings" size={16} /> Gerenciar
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-themed pt-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Usuários</p>
              <p className="mt-1 text-sm font-semibold text-heading">12 / 15</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Armazenamento</p>
              <p className="mt-1 text-sm font-semibold text-heading">68 / 100 GB</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Próx. cobrança</p>
              <p className="mt-1 text-sm font-semibold text-heading">R$ 129,00</p>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Forma de pagamento" subtitle="Cartão principal" icon="dollar">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-5 text-white shadow-theme-md">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/5" />
            <div className="relative flex items-center justify-between">
              <span className="text-sm font-medium opacity-90">Acme Tecnologia</span>
              <IconBase name="dollar" size={20} className="opacity-90" />
            </div>
            <div className="relative mt-8 flex h-7 w-11 items-center justify-center rounded-md bg-white/25">
              <div className="h-4 w-7 rounded-sm bg-white/40" />
            </div>
            <p className="relative mt-4 font-mono text-lg tracking-widest">•••• •••• •••• 4242</p>
            <div className="relative mt-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase opacity-70">Titular</p>
                <p className="text-sm font-medium">Marina Costa</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase opacity-70">Validade</p>
                <p className="text-sm font-medium">09/28</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => notifySuccess('Atualização da forma de pagamento iniciada!')}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-themed text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name="edit" size={16} /> Atualizar
          </button>
        </CardComponent>
      </div>

      {/* Usage stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Gasto este mês" value="R$ 1.752,90" icon="dollar" accent="brand" trend="up" trendValue="6,2%" />
        <StatsCard title="Faturas pagas" value="18" icon="check" accent="success" trend="up" trendValue="2" />
        <StatsCard title="Pendente" value="R$ 1.752,90" icon="tag" accent="warning" />
        <StatsCard title="Créditos" value="R$ 90,00" icon="trending-up" accent="info" trend="up" trendValue="100%" />
      </div>

      {/* Billing history */}
      <CardComponent title="Histórico de cobrança" subtitle="Faturas e pagamentos recentes" icon="tables">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3 pr-4 font-medium">Data</th>
                <th className="py-3 pr-4 font-medium">Descrição</th>
                <th className="py-3 pr-4 font-medium">Valor</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 text-right font-medium">Fatura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-themed">
              {HISTORY.map((row) => (
                <tr key={row.id} className="text-body">
                  <td className="py-3 pr-4 text-muted">{row.date}</td>
                  <td className="py-3 pr-4 font-medium text-heading">{row.desc}</td>
                  <td className="py-3 pr-4">R$ {row.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => notifySuccess(`Baixando fatura #${row.id}...`)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/15"
                      >
                        <IconBase name="download" size={14} /> #{row.id}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardComponent>
    </div>
  )
}
