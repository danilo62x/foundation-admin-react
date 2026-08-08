import { useState } from 'react'
import { Link } from 'react-router-dom'
import IconBase from '@/components/ui/IconBase'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    desc: 'Ideal para começar com o pé direito',
    icon: 'zap',
    color: '#0ba5ec',
    priceMonthly: 49,
    priceAnnual: 39,
    cta: 'Começar grátis',
    featured: false,
    features: ['Até 3 usuários', '5 GB de armazenamento', 'Suporte por email', 'Relatórios básicos'],
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
      'Até 15 usuários',
      '100 GB de armazenamento',
      'Suporte prioritário 24/5',
      'Relatórios avançados',
      'API access completo',
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
      'Usuários ilimitados',
      'Armazenamento ilimitado',
      'Suporte dedicado 24/7',
      'SSO e audit logs',
      'SLA 99,99%',
    ],
  },
]

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="scroll-mt-20 bg-gray-50 py-20 dark:bg-gray-900/40 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Preços
          </span>
          <h2 className="mt-2 text-title-sm font-bold text-heading md:text-title-md">
            Planos para cada estágio
          </h2>
          <p className="mt-4 text-base text-muted md:text-lg">
            Sem taxas ocultas. Cancele quando quiser.
          </p>

          <div className="surface-card mt-8 inline-flex items-center gap-3 rounded-full border p-1.5">
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`surface-card relative flex flex-col rounded-2xl border p-6 transition ${
                plan.featured
                  ? 'border-brand-500 shadow-theme-lg ring-1 ring-brand-500/30 xl:-translate-y-2'
                  : 'border-themed shadow-theme-sm'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
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
                <span className="text-4xl font-bold text-heading">
                  {annual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className="text-sm text-muted">/mês</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                {annual ? `Cobrado anualmente (R$ ${plan.priceAnnual * 12}/ano)` : 'Pagamento mensal'}
              </p>

              <Link
                to="/register"
                className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition ${
                  plan.featured
                    ? 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600'
                    : 'border border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-3 border-t border-themed pt-5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <IconBase
                      name="check"
                      size={16}
                      strokeWidth={2.5}
                      className="shrink-0 text-success-500"
                    />
                    <span className="text-body">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
