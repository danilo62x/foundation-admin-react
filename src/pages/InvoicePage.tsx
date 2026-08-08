import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase'

const ITEMS = [
  { desc: 'Plano Pro — assinatura anual', detail: '01/06/2026 a 31/05/2027', qty: 1, unit: 1548.0 },
  { desc: 'Usuários adicionais', detail: '5 assentos extras', qty: 5, unit: 29.0 },
  { desc: 'Armazenamento extra', detail: 'Pacote de 250 GB', qty: 2, unit: 49.0 },
  { desc: 'Suporte prioritário 24/7', detail: 'Add-on mensal', qty: 1, unit: 199.0 },
]

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function InvoicePage() {
  usePageTitle('Fatura')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  const subtotal = ITEMS.reduce((sum, i) => sum + i.qty * i.unit, 0)
  const discount = 90.0
  const taxBase = subtotal - discount
  const tax = taxBase * 0.05
  const total = taxBase + tax
  const paid = false

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h1 className="text-title-sm font-bold text-heading">Fatura</h1>
          <p className="mt-1 text-sm text-muted">Detalhamento da cobrança e itens do pedido.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => notifySuccess('Download da fatura iniciado!')}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            <IconBase name="download" size={16} /> Baixar PDF
          </button>
          <button
            type="button"
            onClick={() => notifySuccess('Enviando para a impressora...')}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name="copy" size={16} /> Imprimir
          </button>
          <button
            type="button"
            onClick={() => notifySuccess('Fatura enviada por email!')}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name="mail" size={16} /> Enviar
          </button>
        </div>
      </div>

      <div className="surface-card mx-auto max-w-4xl rounded-2xl border shadow-theme-sm">
        <div className="space-y-8 p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-col gap-6 border-b border-themed pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                <IconBase name="zap" size={24} />
              </div>
              <div>
                <p className="text-lg font-bold text-heading">Acme Tecnologia Ltda.</p>
                <p className="text-xs text-muted">contato@acme.com.br</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <h2 className="text-title-xs font-bold text-heading">FATURA #2026-0042</h2>
              <p className="mt-1 text-sm text-muted">Emissão: 28/05/2026</p>
              <p className="text-sm text-muted">Vencimento: 12/06/2026</p>
              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  paid
                    ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                    : 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
                }`}
              >
                {paid ? 'Pago' : 'Pendente'}
              </span>
            </div>
          </div>

          {/* Bill from / to */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">De</p>
              <p className="mt-2 text-sm font-semibold text-heading">Acme Tecnologia Ltda.</p>
              <p className="mt-1 text-sm text-body">CNPJ: 12.345.678/0001-90</p>
              <p className="text-sm text-body">Av. Paulista, 1000 — Sala 142</p>
              <p className="text-sm text-body">São Paulo, SP — 01310-100</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Para</p>
              <p className="mt-2 text-sm font-semibold text-heading">Marina Costa — Studio MC</p>
              <p className="mt-1 text-sm text-body">CNPJ: 98.765.432/0001-21</p>
              <p className="text-sm text-body">Rua das Flores, 250 — Conj. 8</p>
              <p className="text-sm text-body">Belo Horizonte, MG — 30140-071</p>
            </div>
          </div>

          {/* Line items */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-themed text-xs uppercase tracking-wide text-muted">
                  <th className="py-3 pr-4 font-medium">Descrição</th>
                  <th className="py-3 px-4 text-center font-medium">Qtd.</th>
                  <th className="py-3 px-4 text-right font-medium">Preço unit.</th>
                  <th className="py-3 pl-4 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themed">
                {ITEMS.map((item) => (
                  <tr key={item.desc} className="text-body">
                    <td className="py-4 pr-4">
                      <p className="font-medium text-heading">{item.desc}</p>
                      <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
                    </td>
                    <td className="py-4 px-4 text-center">{item.qty}</td>
                    <td className="py-4 px-4 text-right">{BRL.format(item.unit)}</td>
                    <td className="py-4 pl-4 text-right font-medium text-heading">
                      {BRL.format(item.qty * item.unit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-heading">{BRL.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Desconto</span>
                <span className="font-medium text-success-600 dark:text-success-500">
                  − {BRL.format(discount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Impostos (5%)</span>
                <span className="font-medium text-heading">{BRL.format(tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-themed pt-3">
                <span className="text-sm font-semibold text-heading">Total</span>
                <span className="text-title-xs font-bold text-brand-500">{BRL.format(total)}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="rounded-xl border border-themed bg-gray-50/60 p-4 dark:bg-gray-800/40">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-brand-500">
                <IconBase name="info" size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-heading">Observações</p>
                <p className="mt-1 text-sm text-body">
                  Pagamento via PIX, boleto ou cartão de crédito. Em caso de atraso, será aplicada multa
                  de 2% acrescida de juros de 1% ao mês. Obrigado pela preferência!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
