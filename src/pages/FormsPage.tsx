import { useState, type FormEvent } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'
import SwitchToggle from '@/components/ui/SwitchToggle'

export default function FormsPage() {
  usePageTitle('Formulários')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: 'BR',
    message: '',
    terms: false,
    notifications: true,
  })
  const [radio, setRadio] = useState('pro')
  const [slider, setSlider] = useState(45)

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    notifySuccess('Formulário salvo com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Formulários</h1>
        <p className="mt-1 text-sm text-muted">Inputs, selects, checkboxes e validação inline.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardComponent title="Dados pessoais" subtitle="Preencha as informações do cliente" icon="forms">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Nome <span className="text-error-500">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="João da Silva"
                  className="surface-card h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="email@exemplo.com"
                  className="surface-card h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">País</label>
              <div className="relative">
                <select
                  value={form.country}
                  onChange={(e) => update('country', e.target.value)}
                  className="surface-card h-11 w-full appearance-none rounded-lg border border-themed bg-card-bg px-3 pr-10 text-sm text-body outline-none focus:border-brand-300 focus-ring"
                >
                  <option value="BR">Brasil</option>
                  <option value="PT">Portugal</option>
                  <option value="US">Estados Unidos</option>
                  <option value="UK">Reino Unido</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  <IconBase name="chevron-down" size={18} />
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Mensagem</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Escreva aqui..."
                className="surface-card w-full rounded-lg border border-themed bg-card-bg px-3 py-2.5 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-body">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => update('terms', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                />
                Aceito os termos
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-body">Notificações</span>
                <SwitchToggle checked={form.notifications} onChange={(v) => update('notifications', v)} />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-themed pt-4">
              <button type="button" className="h-10 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
                Cancelar
              </button>
              <button type="submit" className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
                <IconBase name="check" size={16} /> Salvar
              </button>
            </div>
          </form>
        </CardComponent>

        <CardComponent title="Variações de input" subtitle="Estados e tamanhos" icon="forms">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Padrão</label>
              <input
                placeholder="Texto..."
                className="surface-card h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm outline-none focus:border-brand-300 focus-ring"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Com sucesso</label>
              <input
                defaultValue="João da Silva"
                className="h-11 w-full rounded-lg border border-success-500 bg-success-50/40 px-3 text-sm text-success-800 outline-none focus-ring dark:border-success-500/40 dark:bg-success-500/10 dark:text-success-300"
              />
              <p className="mt-1 text-xs text-success-600">Tudo certo!</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Com erro</label>
              <input
                defaultValue="invalid@"
                className="h-11 w-full rounded-lg border border-error-500 bg-error-50/40 px-3 text-sm text-error-800 outline-none focus-ring dark:border-error-500/40 dark:bg-error-500/10 dark:text-error-300"
              />
              <p className="mt-1 text-xs text-error-600">Email inválido</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Desabilitado</label>
              <input
                defaultValue="Bloqueado"
                disabled
                className="h-11 w-full cursor-not-allowed rounded-lg border border-themed bg-gray-50 px-3 text-sm text-gray-400 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Radio</label>
              <div className="flex items-center gap-4">
                {['start', 'pro', 'enterprise'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-body capitalize">
                    <input
                      type="radio"
                      name="plan"
                      value={opt}
                      checked={radio === opt}
                      onChange={(e) => setRadio(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Slider</label>
              <input type="range" min="0" max="100" value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="w-full" />
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>0%</span>
                <span className="font-semibold text-heading">{slider}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardComponent>
      </div>

      <CardComponent title="Upload de arquivos" subtitle="Drag & drop ou clique para selecionar" icon="package">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-themed bg-gray-50/40 px-6 py-10 text-center transition hover:border-brand-300 hover:bg-brand-50/40 dark:bg-gray-900/40 dark:hover:bg-brand-500/5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15">
            <IconBase name="download" size={24} />
          </span>
          <p className="mt-3 text-sm font-medium text-heading">Arraste arquivos aqui</p>
          <p className="text-xs text-muted">ou clique para selecionar (PNG, JPG, PDF até 10 MB)</p>
          <input type="file" className="hidden" multiple />
        </label>
      </CardComponent>
    </div>
  )
}
