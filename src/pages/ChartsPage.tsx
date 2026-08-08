import { useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'

function buildSpark(values: number[]) {
  const w = 64
  const h = 36
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = w / (values.length - 1)
  const pts = values.map((v, i) => ({ x: i * stepX, y: h - 4 - ((v - min) / range) * (h - 8) }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  return { linePath, areaPath }
}

const SPARK_STATS = [
  { key: 'rev', icon: 'dollar', label: 'Receita', value: 'R$ 128k', delta: '12,4%', up: true, color: '#465fff', ...buildSpark([18, 22, 19, 25, 28, 24, 30, 35, 32, 38, 36, 42]) },
  { key: 'ord', icon: 'shopping-bag', label: 'Pedidos', value: '2.481', delta: '8,1%', up: true, color: '#12b76a', ...buildSpark([12, 18, 15, 22, 20, 28, 26, 32, 28, 36, 34, 40]) },
  { key: 'cli', icon: 'users', label: 'Clientes', value: '948', delta: '3,2%', up: false, color: '#f79009', ...buildSpark([22, 25, 20, 28, 30, 26, 24, 28, 26, 24, 22, 20]) },
  { key: 'cvr', icon: 'trending-up', label: 'Conversão', value: '3,87%', delta: '15,8%', up: true, color: '#0ba5ec', ...buildSpark([8, 10, 12, 11, 14, 16, 15, 18, 20, 22, 24, 26]) },
]

const BAR_MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const BAR_VALUES = [42, 58, 35, 72, 88, 65, 80, 95, 70, 102, 85, 110]

const FUNNEL = [
  { label: 'Visitantes', value: 24800, pct: 100 },
  { label: 'Visualizações de produto', value: 18650, pct: 75 },
  { label: 'Carrinho', value: 8240, pct: 33 },
  { label: 'Checkout iniciado', value: 4120, pct: 17 },
  { label: 'Compra concluída', value: 2480, pct: 10 },
]

const PRODUCTS = [
  { name: 'Plano Pro Anual', revenue: '58.420', pct: 92, color: 'var(--color-brand-500)' },
  { name: 'Plano Start Mensal', revenue: '34.180', pct: 68, color: 'var(--color-success-500)' },
  { name: 'Add-on Storage', revenue: '21.350', pct: 48, color: 'var(--color-warning-500)' },
  { name: 'Plano Enterprise', revenue: '18.900', pct: 38, color: 'var(--color-blue-light-500)' },
  { name: 'Treinamentos', revenue: '9.640', pct: 22, color: 'var(--color-error-500)' },
]

const TABS = ['Novos', 'Recorrentes', 'Total'] as const

export default function ChartsPage() {
  usePageTitle('Gráficos & Analytics')
  const [barHover, setBarHover] = useState(-1)
  const [areaTab, setAreaTab] = useState<(typeof TABS)[number]>('Novos')

  const bar = useMemo(() => {
    const pl = 36, pr = 10, pt = 20, pb = 30, w = 700, h = 280
    const chartW = w - pl - pr
    const chartH = h - pt - pb
    const max = 120
    const slot = chartW / BAR_MONTHS.length
    const bw = slot * 0.6
    return {
      pl,
      grid: [0, 30, 60, 90, 120].map((v) => ({ y: pt + chartH - (v / max) * chartH, label: v + 'k' })),
      bars: BAR_VALUES.map((v, i) => ({
        x: pl + slot * i + (slot - bw) / 2,
        y: pt + chartH - (v / max) * chartH,
        w: bw,
        h: (v / max) * chartH,
        month: BAR_MONTHS[i],
        value: v,
      })),
    }
  }, [])

  const donut = useMemo(() => {
    const C = 2 * Math.PI * 65
    const data = [
      { label: 'Google', val: 42, color: '#465fff' },
      { label: 'Direto', val: 24, color: '#12b76a' },
      { label: 'Social', val: 18, color: '#f79009' },
      { label: 'Email', val: 10, color: '#ec4899' },
      { label: 'Outros', val: 6, color: '#0ba5ec' },
    ]
    const total = data.reduce((s, d) => s + d.val, 0)
    let acc = -90
    return {
      C,
      total: '24,8k',
      segments: data.map((d) => {
        const pct = Math.round((d.val / total) * 100)
        const seg = { ...d, pct, dash: (d.val / total) * C, rot: acc }
        acc += (d.val / total) * 360
        return seg
      }),
    }
  }, [])

  const area = useMemo(() => {
    const seed = areaTab === 'Novos' ? 1 : areaTab === 'Recorrentes' ? 2 : 3
    const values: number[] = []
    for (let i = 0; i < 24; i++) values.push(20 + Math.round(Math.sin(i / 2 + seed) * 15 + i * 1.6 + (i % 3) * 4))
    const w = 800, h = 240, pl = 40, pr = 10, pt = 20, pb = 30
    const chartW = w - pl - pr
    const chartH = h - pt - pb
    const max = Math.max(...values, 80)
    const stepX = chartW / (values.length - 1)
    const points = values.map((v, i) => ({ x: pl + i * stepX, y: pt + chartH - (v / max) * chartH }))
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${pt + chartH} L ${points[0].x} ${pt + chartH} Z`
    const grid = [0, 25, 50, 75, 100].map((v) => ({ y: pt + chartH - (v / 100) * chartH, label: v }))
    return { points, linePath, areaPath, grid }
  }, [areaTab])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-title-sm font-bold text-heading">Gráficos & Analytics</h1>
          <p className="mt-1 text-sm text-muted">Visualizações SVG puras, leves e sem dependências.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800">
          <IconBase name="download" size={14} /> Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SPARK_STATS.map((stat) => (
          <div key={stat.key} className="surface-card flex items-center gap-4 rounded-2xl border p-4 shadow-theme-sm">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: stat.color + '22', color: stat.color }}
            >
              <IconBase name={stat.icon} size={20} />
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-heading">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className={`mt-0.5 text-xs font-medium ${stat.up ? 'text-success-600' : 'text-error-500'}`}>
                {stat.up ? '▲' : '▼'} {stat.delta}
              </p>
            </div>
            <svg width="64" height="36" viewBox="0 0 64 36">
              <defs>
                <linearGradient id={`grad-${stat.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stat.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={stat.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={stat.areaPath} fill={`url(#grad-${stat.key})`} />
              <path d={stat.linePath} fill="none" stroke={stat.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <CardComponent title="Receita mensal 2026" subtitle="Comparativo trimestral" icon="chart" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <svg width="100%" viewBox="0 0 700 280" className="min-w-[500px]">
              {bar.grid.map((g, i) => (
                <g key={i}>
                  <line x1={bar.pl} y1={g.y} x2={690} y2={g.y} stroke="var(--tx-border)" strokeWidth="1" strokeDasharray="4 4" />
                  <text x={bar.pl - 8} y={g.y + 4} textAnchor="end" fontSize="10" fill="var(--tx-text-muted)">
                    {g.label}
                  </text>
                </g>
              ))}
              {bar.bars.map((b, i) => (
                <g key={i}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    fill="var(--color-brand-500)"
                    opacity={barHover === -1 || barHover === i ? 0.9 : 0.35}
                    rx="4"
                    onMouseEnter={() => setBarHover(i)}
                    onMouseLeave={() => setBarHover(-1)}
                    className="transition-opacity"
                  />
                  {barHover === i && (
                    <text x={b.x + b.w / 2} y={b.y - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-brand-600)">
                      {b.value}k
                    </text>
                  )}
                  <text x={b.x + b.w / 2} y="270" textAnchor="middle" fontSize="10" fill="var(--tx-text-muted)">
                    {b.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </CardComponent>

        <CardComponent title="Fontes de tráfego" subtitle="Top canais" icon="globe">
          <div className="flex flex-col items-center">
            <svg width="190" height="190" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="65" fill="none" stroke="var(--tx-border)" strokeWidth="22" />
              {donut.segments.map((seg) => (
                <circle
                  key={seg.label}
                  cx="90"
                  cy="90"
                  r="65"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="22"
                  strokeDasharray={`${seg.dash} ${donut.C - seg.dash}`}
                  transform={`rotate(${seg.rot} 90 90)`}
                  strokeLinecap="butt"
                />
              ))}
              <text x="90" y="86" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--tx-text-heading)">
                {donut.total}
              </text>
              <text x="90" y="104" textAnchor="middle" fontSize="10" fill="var(--tx-text-muted)">
                Visitantes
              </text>
            </svg>
            <ul className="mt-4 w-full space-y-2">
              {donut.segments.map((seg) => (
                <li key={seg.label} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: seg.color }} />
                  <span className="flex-1 text-body">{seg.label}</span>
                  <span className="font-semibold text-heading">{seg.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </CardComponent>
      </div>

      <CardComponent
        title="Usuários ativos — últimas 24 semanas"
        subtitle="Engajamento ao longo do tempo"
        icon="chart"
        toolbar={
          <div className="flex rounded-lg border border-themed p-0.5">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  areaTab === t ? 'bg-brand-500 text-white' : 'text-body hover:text-heading'
                }`}
                onClick={() => setAreaTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <svg width="100%" viewBox="0 0 800 240" className="min-w-[500px]">
            <defs>
              <linearGradient id="areagrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {area.grid.map((g, i) => (
              <g key={i}>
                <line x1="40" y1={g.y} x2="790" y2={g.y} stroke="var(--tx-border)" strokeWidth="1" strokeDasharray="4 4" />
                <text x="32" y={g.y + 4} textAnchor="end" fontSize="10" fill="var(--tx-text-muted)">
                  {g.label}
                </text>
              </g>
            ))}
            <path d={area.areaPath} fill="url(#areagrad)" />
            <path d={area.linePath} fill="none" stroke="var(--color-brand-500)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {area.points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--color-brand-500)" />
            ))}
          </svg>
        </div>
      </CardComponent>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardComponent title="Funil de conversão" subtitle="Jornada do usuário" icon="filter">
          <div className="space-y-3">
            {FUNNEL.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <span className="w-6 text-xs font-semibold text-muted">{i + 1}</span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-heading">{step.label}</span>
                    <span className="text-muted">
                      {step.value.toLocaleString('pt-BR')} · {step.pct}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: step.pct + '%', background: 'var(--color-brand-500)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardComponent>

        <CardComponent title="Performance por produto" subtitle="Top 5 vendas" icon="package">
          <div className="space-y-4">
            {PRODUCTS.map((row) => (
              <div key={row.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-heading">{row.name}</span>
                  <span className="text-muted">R$ {row.revenue}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full" style={{ width: row.pct + '%', background: row.color }} />
                </div>
              </div>
            ))}
          </div>
        </CardComponent>
      </div>
    </div>
  )
}
