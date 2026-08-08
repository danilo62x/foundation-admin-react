import { useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase'

const SECTIONS = [
  { id: 'introducao', label: 'Introdução', icon: 'info' },
  { id: 'instalacao', label: 'Instalação', icon: 'download' },
  { id: 'configuracao', label: 'Configuração', icon: 'settings' },
  { id: 'componentes', label: 'Componentes', icon: 'grid' },
  { id: 'api', label: 'API', icon: 'globe' },
  { id: 'faq', label: 'FAQ', icon: 'help' },
]

function CodeBlock({ children }: { children: string }) {
  const notifySuccess = useUiStore((s) => s.notifySuccess)
  return (
    <div className="group relative my-4 overflow-hidden rounded-xl bg-gray-900">
      <button
        type="button"
        onClick={() => notifySuccess('Código copiado!')}
        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-gray-300 opacity-0 transition hover:bg-white/20 group-hover:opacity-100"
      >
        <IconBase name="copy" size={13} /> Copiar
      </button>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b border-themed pb-2 text-xl font-bold text-heading">
      {children}
    </h2>
  )
}

export default function DocumentationPage() {
  usePageTitle('Documentação')
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('introducao')

  const filteredSections = useMemo(() => {
    if (!search.trim()) return SECTIONS
    return SECTIONS.filter((s) => s.label.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Documentação</h1>
        <p className="mt-1 text-sm text-muted">Guia completo de uso do template e da API.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar TOC */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-card rounded-2xl border p-4 shadow-theme-sm">
            <div className="relative mb-3">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="search" size={16} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar na documentação..."
                className="h-9 w-full rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">Nesta página</p>
            <nav className="space-y-1">
              {filteredSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active === s.id
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconBase name={s.icon} size={16} />
                  {s.label}
                </a>
              ))}
              {filteredSections.length === 0 && (
                <p className="px-3 py-2 text-sm text-muted">Nenhuma seção encontrada.</p>
              )}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <article className="surface-card rounded-2xl border p-6 shadow-theme-sm md:p-8">
          <div className="max-w-none space-y-10">
            {/* Introdução */}
            <section className="space-y-4">
              <H2 id="introducao">Introdução</H2>
              <p className="text-sm leading-relaxed text-body">
                Bem-vindo à documentação do <strong className="text-heading">Admin Template</strong>. Este guia
                cobre desde a instalação até o uso avançado dos componentes e da API. O template é construído com
                React 19, Vite 6, Tailwind CSS 4 e TypeScript, priorizando performance e suporte completo a modo
                escuro.
              </p>
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-600 dark:text-brand-400">
                    <IconBase name="info" size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-400">Dica</p>
                    <p className="mt-1 text-sm text-brand-700/90 dark:text-brand-300">
                      Recomendamos usar Node.js 20 ou superior para garantir compatibilidade total com o Vite 6.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Instalação */}
            <section className="space-y-4">
              <H2 id="instalacao">Instalação</H2>
              <p className="text-sm leading-relaxed text-body">
                Clone o repositório e instale as dependências usando seu gerenciador de pacotes preferido:
              </p>
              <CodeBlock>{`# Clonar o projeto
git clone https://github.com/acme/admin-template.git
cd admin-template

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev`}</CodeBlock>
              <p className="text-sm leading-relaxed text-body">
                A aplicação ficará disponível em{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-brand-600 dark:bg-gray-800 dark:text-brand-400">
                  http://localhost:5173
                </code>
                .
              </p>
            </section>

            {/* Configuração */}
            <section className="space-y-4">
              <H2 id="configuracao">Configuração</H2>
              <p className="text-sm leading-relaxed text-body">
                As variáveis de ambiente são definidas em um arquivo <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-brand-600 dark:bg-gray-800 dark:text-brand-400">.env</code> na raiz do projeto:
              </p>
              <CodeBlock>{`VITE_API_URL=https://api.acme.com.br
VITE_APP_NAME="Admin Template"
VITE_ENABLE_ANALYTICS=true`}</CodeBlock>
              <div className="rounded-xl border border-warning-200 bg-warning-50 p-4 dark:border-warning-500/30 dark:bg-warning-500/10">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-warning-600 dark:text-warning-500">
                    <IconBase name="info" size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-warning-700 dark:text-warning-500">Atenção</p>
                    <p className="mt-1 text-sm text-warning-700/90 dark:text-warning-300">
                      Nunca faça commit do arquivo <code className="font-mono">.env</code> em repositórios públicos.
                      Adicione-o ao <code className="font-mono">.gitignore</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Componentes */}
            <section className="space-y-4">
              <H2 id="componentes">Componentes</H2>
              <p className="text-sm leading-relaxed text-body">
                O template inclui um conjunto de componentes reutilizáveis. A tabela abaixo resume os principais:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
                    <tr>
                      <th className="py-3 pr-4 font-medium">Componente</th>
                      <th className="py-3 pr-4 font-medium">Descrição</th>
                      <th className="py-3 pr-4 font-medium">Props</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-themed">
                    <tr className="text-body">
                      <td className="py-3 pr-4 font-mono text-xs text-brand-600 dark:text-brand-400">CardComponent</td>
                      <td className="py-3 pr-4">Container de seção com cabeçalho e rodapé.</td>
                      <td className="py-3 pr-4 text-muted">title, icon, footer</td>
                    </tr>
                    <tr className="text-body">
                      <td className="py-3 pr-4 font-mono text-xs text-brand-600 dark:text-brand-400">StatsCard</td>
                      <td className="py-3 pr-4">Cartão de métrica com tendência.</td>
                      <td className="py-3 pr-4 text-muted">value, accent, trend</td>
                    </tr>
                    <tr className="text-body">
                      <td className="py-3 pr-4 font-mono text-xs text-brand-600 dark:text-brand-400">DataTable</td>
                      <td className="py-3 pr-4">Tabela com ordenação e paginação.</td>
                      <td className="py-3 pr-4 text-muted">columns, data</td>
                    </tr>
                    <tr className="text-body">
                      <td className="py-3 pr-4 font-mono text-xs text-brand-600 dark:text-brand-400">IconBase</td>
                      <td className="py-3 pr-4">Renderiza ícones SVG por nome.</td>
                      <td className="py-3 pr-4 text-muted">name, size</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-relaxed text-body">Exemplo de uso do <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-brand-600 dark:bg-gray-800 dark:text-brand-400">StatsCard</code>:</p>
              <CodeBlock>{`import StatsCard from '@/components/ui/StatsCard'

<StatsCard
  title="Receita"
  value="R$ 89.450"
  icon="dollar"
  accent="brand"
  trend="up"
  trendValue="11,01%"
/>`}</CodeBlock>
            </section>

            {/* API */}
            <section className="space-y-4">
              <H2 id="api">API</H2>
              <p className="text-sm leading-relaxed text-body">
                A API REST utiliza autenticação via token Bearer. Inclua o cabeçalho{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-brand-600 dark:bg-gray-800 dark:text-brand-400">
                  Authorization
                </code>{' '}
                em todas as requisições autenticadas:
              </p>
              <CodeBlock>{`curl https://api.acme.com.br/v1/users \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json"`}</CodeBlock>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-themed text-xs uppercase tracking-wide text-muted">
                    <tr>
                      <th className="py-3 pr-4 font-medium">Método</th>
                      <th className="py-3 pr-4 font-medium">Endpoint</th>
                      <th className="py-3 pr-4 font-medium">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-themed">
                    <tr className="text-body">
                      <td className="py-3 pr-4">
                        <span className="rounded bg-success-50 px-2 py-0.5 font-mono text-xs font-semibold text-success-700 dark:bg-success-500/15 dark:text-success-500">GET</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-body">/v1/users</td>
                      <td className="py-3 pr-4 text-muted">Lista todos os usuários.</td>
                    </tr>
                    <tr className="text-body">
                      <td className="py-3 pr-4">
                        <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">POST</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-body">/v1/users</td>
                      <td className="py-3 pr-4 text-muted">Cria um novo usuário.</td>
                    </tr>
                    <tr className="text-body">
                      <td className="py-3 pr-4">
                        <span className="rounded bg-error-50 px-2 py-0.5 font-mono text-xs font-semibold text-error-600 dark:bg-error-500/15 dark:text-error-500">DELETE</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-body">/v1/users/:id</td>
                      <td className="py-3 pr-4 text-muted">Remove um usuário.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
              <H2 id="faq">FAQ</H2>
              <div className="space-y-3">
                {[
                  { q: 'Posso usar o template em projetos comerciais?', a: 'Sim. A licença permite uso em projetos comerciais ilimitados após a compra.' },
                  { q: 'O template suporta modo escuro?', a: 'Sim, todo o template foi construído com suporte nativo a modo claro e escuro via classes dark:.' },
                  { q: 'Como reporto um bug?', a: 'Abra uma issue no repositório do GitHub com passos para reproduzir o problema.' },
                ].map((item) => (
                  <div key={item.q} className="rounded-xl border border-themed p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-heading">
                      <IconBase name="help" size={16} className="text-brand-500" />
                      {item.q}
                    </p>
                    <p className="mt-2 pl-6 text-sm text-body">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  )
}
