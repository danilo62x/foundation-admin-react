import { useMemo, useState, type FormEvent } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'
import SwitchToggle from '@/components/ui/SwitchToggle'

interface Palette {
  name: string
  vars: Record<string, string>
}

// Every palette MUST define ALL sidebar tokens so switching palettes resets
// state from the previously selected palette.
const PALETTES: Palette[] = [
  {
    name: 'Indigo (padrão)',
    vars: {
      '--color-brand-500': '#465fff',
      '--color-brand-600': '#3641f5',
      '--tx-sidebar-bg': '#ffffff',
      '--tx-sidebar-active-bg': '#ecf3ff',
      '--tx-sidebar-text': '#475467',
      '--tx-sidebar-text-active': '#465fff',
    },
  },
  {
    name: 'Esmeralda',
    vars: {
      '--color-brand-500': '#10b981',
      '--color-brand-600': '#059669',
      '--tx-sidebar-bg': '#0f3a2e',
      '--tx-sidebar-active-bg': 'rgba(16,185,129,0.18)',
      '--tx-sidebar-text': '#a7f3d0',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Violeta',
    vars: {
      '--color-brand-500': '#8b5cf6',
      '--color-brand-600': '#7c3aed',
      '--tx-sidebar-bg': '#1e1b4b',
      '--tx-sidebar-active-bg': 'rgba(139,92,246,0.2)',
      '--tx-sidebar-text': '#c4b5fd',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Tangerina',
    vars: {
      '--color-brand-500': '#f97316',
      '--color-brand-600': '#ea580c',
      '--tx-sidebar-bg': '#1c1917',
      '--tx-sidebar-active-bg': 'rgba(249,115,22,0.18)',
      '--tx-sidebar-text': '#fdba74',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Rosa',
    vars: {
      '--color-brand-500': '#ec4899',
      '--color-brand-600': '#db2777',
      '--tx-sidebar-bg': '#2d1b35',
      '--tx-sidebar-active-bg': 'rgba(236,72,153,0.2)',
      '--tx-sidebar-text': '#f9a8d4',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Ciano',
    vars: {
      '--color-brand-500': '#06b6d4',
      '--color-brand-600': '#0891b2',
      '--tx-sidebar-bg': '#083344',
      '--tx-sidebar-active-bg': 'rgba(6,182,212,0.2)',
      '--tx-sidebar-text': '#a5f3fc',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
]

const THEME_GROUPS = [
  {
    title: 'Cores principais',
    vars: [
      { key: '--color-brand-500', label: 'Primária' },
      { key: '--color-success-500', label: 'Sucesso' },
      { key: '--color-warning-500', label: 'Aviso' },
      { key: '--color-error-500', label: 'Perigo' },
      { key: '--color-blue-light-500', label: 'Info' },
    ],
  },
  {
    title: 'Menu lateral',
    vars: [
      { key: '--tx-sidebar-bg', label: 'Fundo' },
      { key: '--tx-sidebar-text', label: 'Texto' },
      { key: '--tx-sidebar-active-bg', label: 'Fundo ativo' },
    ],
  },
  {
    title: 'Layout',
    vars: [
      { key: '--tx-body-bg', label: 'Fundo da página' },
      { key: '--tx-card-bg', label: 'Cards' },
      { key: '--tx-header-bg', label: 'Header' },
      { key: '--tx-border', label: 'Bordas' },
    ],
  },
  {
    title: 'Tipografia',
    vars: [
      { key: '--tx-text-heading', label: 'Títulos' },
      { key: '--tx-text', label: 'Texto principal' },
      { key: '--tx-text-muted', label: 'Texto secundário' },
    ],
  },
]

const FONT_SIZES = [
  { value: 'sm' as const, label: 'Pequena' },
  { value: 'base' as const, label: 'Normal' },
  { value: 'lg' as const, label: 'Grande' },
  { value: 'xl' as const, label: 'Extra' },
]

export default function SettingsPage() {
  usePageTitle('Configurações')
  const ui = useUiStore()
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore.setState

  const [activePalette, setActivePalette] = useState(-1)
  const [saving, setSaving] = useState(false)
  const [account, setAccount] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    newPassword: '',
    confirmPassword: '',
  })

  const fontSizeLabel = useMemo(() => FONT_SIZES.find((f) => f.value === ui.fontSize)?.label ?? 'Normal', [ui.fontSize])

  function applyPalette(idx: number) {
    setActivePalette(idx)
    for (const [k, v] of Object.entries(PALETTES[idx].vars)) ui.setThemeVar(k, v)
    ui.notifySuccess(`Paleta "${PALETTES[idx].name}" aplicada`)
  }

  function onColorChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    setActivePalette(-1)
    ui.setThemeVar(key, e.target.value)
  }

  function resetTheme() {
    ui.resetThemeVars()
    setActivePalette(-1)
    ui.notify('Tema restaurado para os padrões', 'info')
  }

  async function saveAccount(e: FormEvent) {
    e.preventDefault()
    if (account.newPassword && account.newPassword !== account.confirmPassword) {
      ui.notifyError('As senhas não coincidem')
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    if (user) {
      updateUser((s) => ({ ...s, user: { ...user, name: account.name, email: account.email } }))
    }
    setSaving(false)
    setAccount((a) => ({ ...a, newPassword: '', confirmPassword: '' }))
    ui.notifySuccess('Configurações salvas com sucesso')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Configurações</h1>
        <p className="mt-1 text-sm text-muted">Personalize a aparência, layout e preferências da conta.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <CardComponent title="Aparência" subtitle="Tema, idioma e tamanho de fonte" icon="palette">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">Tema</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
                      !ui.darkMode
                        ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                        : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => ui.setDarkMode(false)}
                  >
                    <IconBase name="sun" size={16} /> Claro
                  </button>
                  <button
                    type="button"
                    className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
                      ui.darkMode
                        ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                        : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => ui.setDarkMode(true)}
                  >
                    <IconBase name="moon" size={16} /> Escuro
                  </button>
                </div>
              </div>

              <div className="border-t border-themed pt-5">
                <label className="mb-2 block text-sm font-medium text-heading">Tamanho da fonte</label>
                <div className="flex flex-wrap gap-2">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
                        ui.fontSize === size.value
                          ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                          : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => ui.setFontSize(size.value)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardComponent>

          <CardComponent title="Paletas de cores" subtitle="Aplique um conjunto pré-definido" icon="palette">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PALETTES.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  className={`group overflow-hidden rounded-xl border-2 text-left transition ${
                    activePalette === idx ? 'border-brand-500 shadow-theme-md' : 'border-themed hover:border-brand-300 hover:shadow-theme-sm'
                  }`}
                  onClick={() => applyPalette(idx)}
                >
                  <div className="flex h-16">
                    <div className="flex flex-1 items-center justify-center" style={{ background: p.vars['--color-brand-500'] }}>
                      {activePalette === idx && <IconBase name="check" size={20} className="text-white" strokeWidth={2.5} />}
                    </div>
                    <div className="flex w-6 flex-col justify-center gap-1 px-1.5" style={{ background: p.vars['--tx-sidebar-bg'] || '#1a2231' }}>
                      <span className="block h-[3px] rounded-sm bg-white/30" />
                      <span className="block h-[3px] rounded-sm bg-white/30" />
                      <span className="block h-[3px] rounded-sm bg-white/30" />
                    </div>
                  </div>
                  <div className="px-2 py-1.5 text-center text-xs font-medium text-heading" style={{ background: 'var(--tx-card-bg)' }}>
                    {p.name}
                  </div>
                </button>
              ))}
            </div>
          </CardComponent>

          <CardComponent title="Personalização avançada" subtitle="Ajuste cada cor individualmente" icon="settings">
            <div className="space-y-5">
              {THEME_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{group.title}</p>
                  <div className="space-y-2">
                    {group.vars.map((def) => (
                      <div key={def.key} className="flex items-center gap-3 rounded-lg border border-themed px-3 py-2">
                        <span className="flex-1 text-sm text-heading">{def.label}</span>
                        <span
                          className="h-5 w-5 shrink-0 rounded-md border border-themed"
                          style={{ background: ui.getThemeVar(def.key) }}
                        />
                        <input
                          type="color"
                          value={ui.getThemeVar(def.key)}
                          className="h-8 w-10"
                          onChange={(e) => onColorChange(def.key, e)}
                        />
                        <code className="hidden text-xs text-muted sm:inline">{ui.getThemeVar(def.key)}</code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 border-t border-themed pt-4">
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-xs font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={resetTheme}
                >
                  <IconBase name="reset" size={14} /> Restaurar padrões
                </button>
                <span className="text-xs text-muted">
                  Remove todas as customizações e restaura as cores originais
                </span>
              </div>
            </div>
          </CardComponent>

          <CardComponent title="Layout" subtitle="Ajustes do menu lateral" icon="grid">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-heading">Largura do menu</label>
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    {ui.sidebarWidth}px
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={360}
                  step={5}
                  value={ui.sidebarWidth}
                  className="w-full"
                  onChange={(e) => ui.setSidebarWidth(Number(e.target.value))}
                />
                <div className="mt-1 flex justify-between text-xs text-muted">
                  <span>200px</span>
                  <span>360px</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-themed p-4">
                <div>
                  <p className="text-sm font-medium text-heading">Menu compacto</p>
                  <p className="text-xs text-muted">Mostra apenas ícones</p>
                </div>
                <SwitchToggle checked={ui.sidebarCollapsed} onChange={() => ui.toggleSidebar()} />
              </div>
            </div>
          </CardComponent>

          <CardComponent title="Conta" subtitle="Informações pessoais" icon="user">
            <form onSubmit={saveAccount} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-heading">Nome</label>
                  <input
                    value={account.name}
                    onChange={(e) => setAccount({ ...account, name: e.target.value })}
                    className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-heading">Email</label>
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) => setAccount({ ...account, email: e.target.value })}
                    className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-heading">Nova senha</label>
                  <input
                    type="password"
                    value={account.newPassword}
                    onChange={(e) => setAccount({ ...account, newPassword: e.target.value })}
                    placeholder="Deixe em branco para manter"
                    className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-heading">Confirmar senha</label>
                  <input
                    type="password"
                    value={account.confirmPassword}
                    onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                    placeholder="Confirme a nova senha"
                    className="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-themed pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-60"
                >
                  {!saving && <IconBase name="check" size={16} />}
                  {saving && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </CardComponent>
        </div>

        <div className="space-y-6">
          <CardComponent title="Preview do tema" icon="eye">
            <div className="overflow-hidden rounded-xl border border-themed">
              <div className="flex h-32">
                <div className="flex w-12 flex-col gap-1.5 p-2" style={{ background: ui.getThemeVar('--tx-sidebar-bg') }}>
                  <span className="block h-2 rounded-sm" style={{ background: ui.getThemeVar('--color-brand-500') }} />
                  <span className="block h-2 rounded-sm bg-white/20" />
                  <span className="block h-2 rounded-sm bg-white/20" />
                  <span className="block h-2 rounded-sm bg-white/20" />
                </div>
                <div className="flex-1" style={{ background: ui.getThemeVar('--tx-body-bg') }}>
                  <div className="h-6 border-b" style={{ background: ui.getThemeVar('--tx-header-bg'), borderColor: ui.getThemeVar('--tx-border') }} />
                  <div className="flex gap-1.5 p-2">
                    <div className="flex-1 rounded-md p-1" style={{ background: ui.getThemeVar('--tx-card-bg') }}>
                      <span className="block h-1 rounded-sm" style={{ background: ui.getThemeVar('--color-brand-500') }} />
                      <span className="mt-1 block h-1 w-2/3 rounded-sm" style={{ background: ui.getThemeVar('--tx-text-muted') }} />
                    </div>
                    <div className="flex-1 rounded-md p-1" style={{ background: ui.getThemeVar('--tx-card-bg') }}>
                      <span className="block h-1 rounded-sm" style={{ background: ui.getThemeVar('--color-success-500') }} />
                      <span className="mt-1 block h-1 w-2/3 rounded-sm" style={{ background: ui.getThemeVar('--tx-text-muted') }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted">Largura do menu</dt>
                <dd className="font-semibold text-heading">{ui.sidebarWidth}px</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Estado</dt>
                <dd className="font-semibold text-heading">{ui.sidebarCollapsed ? 'Compacto' : 'Expandido'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tema</dt>
                <dd className="font-semibold text-heading">{ui.darkMode ? 'Escuro' : 'Claro'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Fonte base</dt>
                <dd className="font-semibold text-heading">{fontSizeLabel}</dd>
              </div>
            </dl>
          </CardComponent>

          <CardComponent title="Cookies" icon="cookie">
            <div className="text-sm text-body">
              <p className="mb-3">
                Status:{' '}
                <span className={ui.cookiesAccepted ? 'text-success-600 font-semibold' : 'text-warning-600 font-semibold'}>
                  {ui.cookiesAccepted ? 'Aceitos' : 'Não aceitos'}
                </span>
              </p>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-xs font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => ui.openCookieBanner()}
              >
                Reabrir banner
              </button>
            </div>
          </CardComponent>

          <CardComponent title="Sobre o template" icon="info">
            <ul className="space-y-2 text-sm text-body">
              <li>
                <strong className="text-heading">React 19</strong> + Hooks
              </li>
              <li>
                <strong className="text-heading">Tailwind CSS v4</strong> com <code className="text-xs">@theme</code>
              </li>
              <li>
                <strong className="text-heading">Zustand</strong> + React Router 7
              </li>
              <li>
                <strong className="text-heading">Vite 6</strong> + TypeScript 5
              </li>
            </ul>
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
