import { useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import IconBase from '@/components/ui/IconBase'
import ModalBase from '@/components/ui/ModalBase'
import { useUiStore } from '@/stores/ui'

type FolderId = 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash'

interface Folder {
  id: FolderId
  label: string
  icon: string
  count: number
}

interface Email {
  id: string
  folder: FolderId
  sender: string
  initials: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  starred: boolean
  accent: string
}

const FOLDERS: Folder[] = [
  { id: 'inbox', label: 'Caixa de entrada', icon: 'mail', count: 5 },
  { id: 'sent', label: 'Enviados', icon: 'chevron-right', count: 2 },
  { id: 'drafts', label: 'Rascunhos', icon: 'edit', count: 1 },
  { id: 'starred', label: 'Com estrela', icon: 'star', count: 2 },
  { id: 'trash', label: 'Lixeira', icon: 'trash', count: 0 },
]

const ACCENTS = [
  'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400',
  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500',
  'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
  'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-500',
]

const INITIAL_EMAILS: Email[] = [
  {
    id: '1',
    folder: 'inbox',
    sender: 'Marina Costa',
    initials: 'MC',
    email: 'marina.costa@empresa.com',
    subject: 'Proposta comercial atualizada',
    preview: 'Olá! Segue em anexo a versão revisada da proposta com os novos valores...',
    body: 'Olá!\n\nSegue em anexo a versão revisada da proposta comercial com os novos valores discutidos na reunião de ontem. Ajustei as condições de pagamento e incluí o desconto para contrato anual.\n\nPode revisar e me dizer se podemos seguir? Fico no aguardo.\n\nAbraços,\nMarina',
    time: '09:42',
    unread: true,
    starred: true,
    accent: ACCENTS[0],
  },
  {
    id: '2',
    folder: 'inbox',
    sender: 'Equipe Financeiro',
    initials: 'EF',
    email: 'financeiro@empresa.com',
    subject: 'Fatura de maio disponível',
    preview: 'Sua fatura referente ao mês de maio já está disponível para download...',
    body: 'Prezado cliente,\n\nSua fatura referente ao mês de maio já está disponível para download no portal. O vencimento é dia 10/06/2026.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe Financeiro',
    time: '08:15',
    unread: true,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '3',
    folder: 'inbox',
    sender: 'Lucas Pereira',
    initials: 'LP',
    email: 'lucas.p@parceiro.io',
    subject: 'Re: Integração da API',
    preview: 'Perfeito, consegui rodar os testes aqui e tudo passou. Vamos para produção?',
    body: 'Fala!\n\nPerfeito, consegui rodar os testes aqui no ambiente de homologação e tudo passou sem erros. As credenciais novas funcionaram normalmente.\n\nPodemos agendar o deploy para produção ainda esta semana?\n\nValeu,\nLucas',
    time: 'Ontem',
    unread: true,
    starred: false,
    accent: ACCENTS[2],
  },
  {
    id: '4',
    folder: 'inbox',
    sender: 'Aline Souza',
    initials: 'AS',
    email: 'aline.souza@design.co',
    subject: 'Mockups da nova landing page',
    preview: 'Terminei os mockups da home e da página de preços. Dá uma olhada...',
    body: 'Oi!\n\nTerminei os mockups da home e da página de preços. Tentei seguir o novo guia de marca com as cores atualizadas.\n\nDeixei os arquivos no Figma, o link está no canal do projeto. Aguardo seu feedback!\n\nAbraços,\nAline',
    time: 'Ontem',
    unread: false,
    starred: true,
    accent: ACCENTS[3],
  },
  {
    id: '5',
    folder: 'inbox',
    sender: 'Rafael Lima',
    initials: 'RL',
    email: 'rafael@enterprise.com',
    subject: 'Reunião de alinhamento - quinta',
    preview: 'Pessoal, vamos confirmar a reunião de alinhamento para quinta às 14h?',
    body: 'Pessoal,\n\nVamos confirmar a reunião de alinhamento para quinta-feira às 14h? Pauta:\n\n- Roadmap do trimestre\n- Métricas de retenção\n- Próximos contratos\n\nMandem confirmação de presença.\n\nObrigado,\nRafael',
    time: '23 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[4],
  },
  {
    id: '6',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Re: Proposta comercial atualizada',
    preview: 'Recebido, Marina! Vou revisar hoje à tarde e te retorno até amanhã.',
    body: 'Recebido, Marina!\n\nVou revisar hoje à tarde e te retorno até amanhã com qualquer ajuste necessário. À primeira vista parece ótimo.\n\nObrigado,',
    time: '10:05',
    unread: false,
    starred: false,
    accent: ACCENTS[0],
  },
  {
    id: '7',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Relatório semanal',
    preview: 'Segue o relatório semanal com os principais indicadores da equipe.',
    body: 'Time,\n\nSegue o relatório semanal com os principais indicadores. Crescemos 8% em conversões e reduzimos o tempo de resposta do suporte.\n\nDetalhes no anexo.',
    time: '22 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '8',
    folder: 'drafts',
    sender: 'Rascunho',
    initials: 'RA',
    email: 'voce@empresa.com',
    subject: 'Ideias para o próximo evento',
    preview: 'Algumas ideias iniciais para o evento de lançamento do produto...',
    body: 'Algumas ideias iniciais para o evento de lançamento do produto:\n\n- Local: auditório principal\n- Formato híbrido (presencial + online)\n- Convidar parceiros estratégicos\n\n(rascunho não finalizado)',
    time: '20 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[2],
  },
]

function ComposeForm({ onSent }: { onSent: () => void }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSent()
      }}
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Para</label>
        <input
          type="email"
          required
          placeholder="destinatario@email.com"
          className="h-10 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Assunto</label>
        <input
          required
          placeholder="Assunto da mensagem"
          className="h-10 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Mensagem</label>
        <textarea
          rows={6}
          placeholder="Escreva sua mensagem..."
          className="w-full rounded-lg border border-themed bg-gray-50 px-3 py-2 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          <IconBase name="mail" size={16} /> Enviar
        </button>
      </div>
    </form>
  )
}

export default function InboxPage() {
  usePageTitle('Caixa de entrada')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS)
  const [activeFolder, setActiveFolder] = useState<FolderId>('inbox')
  const [selectedId, setSelectedId] = useState<string | null>('1')
  const [search, setSearch] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)

  const folderCounts = useMemo(() => {
    const counts: Record<FolderId, number> = { inbox: 0, sent: 0, drafts: 0, starred: 0, trash: 0 }
    for (const e of emails) {
      if (e.folder === 'inbox' && e.unread) counts.inbox++
      if (e.folder === 'sent') counts.sent++
      if (e.folder === 'drafts') counts.drafts++
      if (e.starred) counts.starred++
      if (e.folder === 'trash') counts.trash++
    }
    return counts
  }, [emails])

  const list = useMemo(() => {
    return emails.filter((e) => {
      const inFolder = activeFolder === 'starred' ? e.starred : e.folder === activeFolder
      if (!inFolder) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          e.sender.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [emails, activeFolder, search])

  const selected = emails.find((e) => e.id === selectedId) ?? null

  function openEmail(id: string) {
    setSelectedId(id)
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)))
  }

  function toggleStar(id: string) {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))
  }

  function changeFolder(id: FolderId) {
    setActiveFolder(id)
    setSelectedId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-title-sm font-bold text-heading">Caixa de entrada</h1>
          <p className="mt-1 text-sm text-muted">Gerencie suas mensagens em um só lugar.</p>
        </div>
        <button
          onClick={() => setComposeOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          <IconBase name="plus" size={16} /> Escrever
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Folders */}
        <aside className="surface-card rounded-2xl border p-3 shadow-theme-sm lg:col-span-3 xl:col-span-2">
          <nav className="space-y-1">
            {FOLDERS.map((f) => {
              const isActive = activeFolder === f.id
              const count = folderCounts[f.id]
              return (
                <button
                  key={f.id}
                  onClick={() => changeFolder(f.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'text-body hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <IconBase name={f.icon} size={18} />
                    {f.label}
                  </span>
                  {count > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive ? 'bg-brand-500 text-white' : 'bg-gray-100 text-muted dark:bg-gray-800'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* List */}
        <section
          className={`surface-card rounded-2xl border shadow-theme-sm lg:col-span-4 xl:col-span-4 ${
            selected ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="border-b border-themed p-3">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="search" size={16} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar e-mails..."
                className="h-9 w-full rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>
          </div>
          <ul className="max-h-[640px] divide-y divide-themed overflow-y-auto">
            {list.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => openEmail(e.id)}
                  className={`flex w-full gap-3 px-4 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
                    selectedId === e.id ? 'bg-brand-25 dark:bg-brand-500/10' : ''
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${e.accent}`}
                  >
                    {e.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`truncate text-sm ${e.unread ? 'font-semibold text-heading' : 'text-body'}`}>
                        {e.sender}
                      </span>
                      <span className="shrink-0 text-xs text-muted">{e.time}</span>
                    </div>
                    <p className={`truncate text-sm ${e.unread ? 'font-medium text-heading' : 'text-muted'}`}>
                      {e.subject}
                    </p>
                    <p className="truncate text-xs text-muted">{e.preview}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    {e.unread && <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        toggleStar(e.id)
                      }}
                      className={`mt-auto ${e.starred ? 'text-warning-500' : 'text-gray-300 hover:text-warning-500 dark:text-gray-600'}`}
                    >
                      <IconBase name="star" size={16} className={e.starred ? 'fill-current' : ''} />
                    </span>
                  </div>
                </button>
              </li>
            ))}
            {list.length === 0 && (
              <li className="px-4 py-12 text-center text-sm text-muted">Nenhuma mensagem nesta pasta.</li>
            )}
          </ul>
        </section>

        {/* Reading pane */}
        <section
          className={`surface-card rounded-2xl border shadow-theme-sm lg:col-span-5 xl:col-span-6 ${
            selected ? 'block' : 'hidden lg:block'
          }`}
        >
          {selected ? (
            <div className="flex h-full flex-col">
              <header className="flex items-start justify-between gap-3 border-b border-themed p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="rounded-md p-1.5 text-muted hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
                    aria-label="Voltar"
                  >
                    <IconBase name="chevron-right" size={18} className="rotate-180" />
                  </button>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${selected.accent}`}
                  >
                    {selected.initials}
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-heading">{selected.subject}</h2>
                    <p className="mt-0.5 text-sm text-body">{selected.sender}</p>
                    <p className="text-xs text-muted">{selected.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStar(selected.id)}
                    className={`rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selected.starred ? 'text-warning-500' : 'text-muted'
                    }`}
                    aria-label="Favoritar"
                  >
                    <IconBase name="star" size={18} className={selected.starred ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => notifySuccess('Mensagem arquivada')}
                    className="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Baixar"
                  >
                    <IconBase name="download" size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEmails((prev) => prev.map((e) => (e.id === selected.id ? { ...e, folder: 'trash' } : e)))
                      setSelectedId(null)
                      notifySuccess('Mensagem movida para a lixeira')
                    }}
                    className="rounded-md p-1.5 text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/15"
                    aria-label="Excluir"
                  >
                    <IconBase name="trash" size={18} />
                  </button>
                </div>
              </header>
              <div className="flex-1 whitespace-pre-line p-5 text-sm leading-relaxed text-body md:p-6">
                {selected.body}
              </div>
              <footer className="border-t border-themed p-5 md:p-6">
                <button
                  onClick={() => setComposeOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <IconBase name="mail" size={16} /> Responder
                </button>
              </footer>
            </div>
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-3 p-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
                <IconBase name="mail" size={26} />
              </span>
              <p className="text-sm font-medium text-heading">Selecione uma mensagem</p>
              <p className="text-xs text-muted">Escolha um e-mail na lista para visualizar o conteúdo.</p>
            </div>
          )}
        </section>
      </div>

      <ModalBase
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="Nova mensagem"
        subtitle="Escreva e envie um e-mail"
        size="lg"
      >
        <ComposeForm
          onSent={() => {
            setComposeOpen(false)
            notifySuccess('Mensagem enviada com sucesso')
          }}
        />
      </ModalBase>
    </div>
  )
}
