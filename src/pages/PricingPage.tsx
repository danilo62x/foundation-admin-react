import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'

const PLANS = [
  {
    key: 'start',
    name: 'Start',
    desc: 'Ideal para começar com o pé direito',
    icon: 'zap',
    color: '#0ba5ec',
    priceMonthly: 49,
    priceAnnual: 39,
    cta: 'Começar grátis',
    featured: false,
    features: [
      { text: 'Até 3 usuários', included: true },
      { text: '5 GB de armazenamento', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Relatórios básicos', included: true },
      { text: 'API access', included: false },
      { text: 'Branding customizado', included: false },
      { text: 'SLA 99,9%', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    desc: 'Para times em crescimento',
    icon: 'rocket',
    color: '#465fff',
    priceMonthly: 129,
    priceAnnual: 103,
    cta: 'Assinar Pro',
    featured: true,
    features: [
      { text: 'Até 15 usuários', included: true },
      { text: '100 GB de armazenamento', included: true },
      { text: 'Suporte prioritário 24/5', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'API access completo', included: true },
      { text: 'Branding customizado', included: true },
      { text: 'SLA 99,9%', included: false },
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    desc: 'Para grandes organizações',
    icon: 'shield',
    color: '#7c3aed',
    priceMonthly: 399,
    priceAnnual: 319,
    cta: 'Falar com vendas',
    featured: false,
    features: [
      { text: 'Usuários ilimitados', included: true },
      { text: 'Armazenamento ilimitado', included: true },
      { text: 'Suporte dedicado 24/7', included: true },
      { text: 'Relatórios customizados', included: true },
      { text: 'API access completo', included: true },
      { text: 'Branding customizado', included: true },
      { text: 'SLA 99,99%', included: true },
    ],
  },
]

const COMPARE: Array<{ section: string; rows: Array<{ label: string; values: Array<boolean | string> }> }> = [
  {
    section: 'Plataforma',
    rows: [
      { label: 'Usuários', values: ['3', '15', 'Ilimitado'] },
      { label: 'Armazenamento', values: ['5 GB', '100 GB', 'Ilimitado'] },
      { label: 'Projetos ativos', values: ['5', '50', 'Ilimitado'] },
    ],
  },
  {
    section: 'Recursos',
    rows: [
      { label: 'Relatórios avançados', values: [false, true, true] },
      { label: 'API access', values: [false, true, true] },
      { label: 'Branding customizado', values: [false, true, true] },
      { label: 'Single Sign-On (SSO)', values: [false, false, true] },
      { label: 'Audit logs', values: [false, false, true] },
    ],
  },
  {
    section: 'Suporte',
    rows: [
      { label: 'Email', values: [true, true, true] },
      { label: 'Chat ao vivo', values: [false, true, true] },
      { label: 'Telefone', values: [false, false, true] },
      { label: 'Account manager', values: [false, false, true] },
      { label: 'SLA garantido', values: ['—', '99,9%', '99,99%'] },
    ],
  },
]

const FAQ = [
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim. Você pode cancelar sua assinatura a qualquer momento, sem multa. O acesso continua até o fim do período pago.' },
  { q: 'Vocês oferecem trial gratuito?', a: 'Sim! Todos os planos pagos vêm com 14 dias de trial gratuito. Não pedimos cartão de crédito no cadastro.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos cartão de crédito (Visa, Mastercard, Amex), boleto, PIX e transferência bancária para planos Enterprise.' },
  { q: 'Posso fazer upgrade ou downgrade depois?', a: 'Claro. Você pode mudar de plano a qualquer momento. O valor é ajustado proporcionalmente.' },
  { q: 'Há desconto para ONGs ou estudantes?', a: 'Sim. Oferecemos descontos especiais para organizações sem fins lucrativos e instituições educacionais. Entre em contato.' },
]

export default function PricingPage() {
  usePageTitle('Planos & Preços')
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-title-md font-bold text-heading">Planos & Preços</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted md:text-base">
          Escolha o plano ideal para sua empresa. Sem taxas ocultas. Cancele quando quiser.
        </p>

        <div className="surface-card mt-6 inline-flex items-center gap-3 rounded-full border border-themed bg-card-bg p-1.5">
          <button
            type="button"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              !annual ? 'bg-brand-500 text-white shadow-theme-xs' : 'text-body'
            }`}
            onClick={() => setAnnual(false)}
          >
            Mensal
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              annual ? 'bg-brand-500 text-white shadow-theme-xs' : 'text-body'
            }`}
            onClick={() => setAnnual(true)}
          >
            Anual
            <span className="rounded-full bg-success-100 px-1.5 text-[10px] font-bold text-success-700 dark:bg-success-500/20 dark:text-success-400">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`surface-card relative flex flex-col rounded-2xl border p-6 transition ${
              plan.featured
                ? 'border-brand-500 shadow-theme-lg ring-1 ring-brand-500/30'
                : 'border-themed shadow-theme-sm'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Mais popular
              </div>
            )}

            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: plan.color + '22', color: plan.color }}
            >
              <IconBase name={plan.icon} size={22} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-heading">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted">{plan.desc}</p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-sm text-muted">R$</span>
              <span className="text-4xl font-bold text-heading">{annual ? plan.priceAnnual : plan.priceMonthly}</span>
              <span className="text-sm text-muted">/mês</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              {annual ? `Cobrado anualmente (R$ ${plan.priceAnnual * 12}/ano)` : 'Pagamento mensal'}
            </p>

            <button
              type="button"
              className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition ${
                plan.featured
                  ? 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600'
                  : 'border border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => notifySuccess(`Plano ${plan.name} selecionado!`)}
            >
              {plan.cta}
            </button>

            <ul className="mt-6 space-y-3 border-t border-themed pt-5">
              {plan.features.map((feat) => (
                <li key={feat.text} className="flex items-start gap-3 text-sm">
                  <IconBase
                    name={feat.included ? 'check' : 'x'}
                    size={16}
                    strokeWidth={2.5}
                    className={feat.included ? 'shrink-0 text-success-500' : 'shrink-0 text-gray-300'}
                  />
                  <span className={feat.included ? 'text-body' : 'text-muted line-through'}>{feat.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CardComponent title="Comparação completa de recursos" subtitle="Veja o que está incluído em cada plano" icon="grid">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-themed">
                <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">Recurso</th>
                {PLANS.map((p) => (
                  <th
                    key={p.key}
                    className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider"
                    style={{ color: p.color }}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((section) => (
                <>
                  <tr key={section.section} className="border-b border-themed bg-gray-50/40 dark:bg-gray-800/40">
                    <td colSpan={4} className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">
                      {section.section}
                    </td>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.label} className="border-b border-themed">
                      <td className="py-3 pr-4 text-body">{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {val === true ? (
                            <IconBase name="check" size={16} strokeWidth={2.5} className="mx-auto text-success-500" />
                          ) : val === false ? (
                            <IconBase name="x" size={16} strokeWidth={2.5} className="mx-auto text-gray-300 dark:text-gray-600" />
                          ) : (
                            <span className="font-medium text-heading">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </CardComponent>

      <CardComponent title="Perguntas frequentes" icon="help">
        <ul className="space-y-3">
          {FAQ.map((q, i) => (
            <li key={q.q} className="rounded-lg border border-themed">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-heading"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                {q.q}
                <IconBase
                  name="chevron-down"
                  size={18}
                  className={`shrink-0 text-muted transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && <div className="border-t border-themed px-4 py-3 text-sm text-body">{q.a}</div>}
            </li>
          ))}
        </ul>
      </CardComponent>
    </div>
  )
}
