import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import CardComponent from '@/components/ui/CardComponent'
import Tabs from '@/components/ui/Tabs'
import Accordion from '@/components/ui/Accordion'
import Tooltip from '@/components/ui/Tooltip'
import Steps from '@/components/ui/Steps'
import Rate from '@/components/ui/Rate'
import Badge from '@/components/ui/Badge'
import Avatar, { AvatarGroup } from '@/components/ui/Avatar'
import Breadcrumb from '@/components/ui/Breadcrumb'
import TagInput from '@/components/ui/TagInput'
import Skeleton from '@/components/ui/Skeleton'
import IconBase from '@/components/ui/IconBase'

export default function UiAdvancedPage() {
  usePageTitle('Componentes avançados')

  const [tab, setTab] = useState(0)
  const [rate, setRate] = useState(3)
  const [step, setStep] = useState(2)
  const [tags, setTags] = useState<string[]>(['React', 'Tailwind', 'TypeScript'])
  const [loading, setLoading] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-sm font-bold text-heading">Componentes avançados</h1>
        <p className="mt-1 text-sm text-muted">
          Abas, acordeão, tooltips, etapas, avaliação, badges, avatares e mais — versão Tailwind.
        </p>
      </div>

      {/* Breadcrumb */}
      <CardComponent title="Breadcrumb" subtitle="Trilha de navegação" icon="chevron-right">
        <Breadcrumb
          items={[
            { label: 'Início', href: '#', icon: 'dashboard' },
            { label: 'Componentes', href: '#' },
            { label: 'Avançados' },
          ]}
        />
      </CardComponent>

      {/* Tabs */}
      <CardComponent title="Abas" subtitle="Painéis com aba ativa sublinhada" icon="grid">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            {
              label: 'Visão geral',
              icon: 'dashboard',
              content: <p>Resumo geral do projeto, métricas e indicadores principais em um só lugar.</p>,
            },
            {
              label: 'Atividade',
              icon: 'bell',
              content: <p>Histórico de eventos recentes, notificações e ações realizadas pela equipe.</p>,
            },
            {
              label: 'Configurações',
              icon: 'settings',
              content: <p>Ajuste preferências, integrações e permissões da sua conta.</p>,
            },
          ]}
        />
      </CardComponent>

      {/* Accordion */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardComponent title="Acordeão" subtitle="Apenas um item aberto" icon="chevron-down">
          <Accordion
            defaultOpen={[0]}
            items={[
              { title: 'O que está incluído?', icon: 'package', content: 'Todos os componentes de UI, temas claro e escuro, e exemplos prontos.' },
              { title: 'Posso personalizar as cores?', icon: 'palette', content: 'Sim, todas as cores usam tokens de design configuráveis em tempo de execução.' },
              { title: 'Há suporte a TypeScript?', icon: 'type', content: 'Completo — todos os componentes possuem props tipadas.' },
            ]}
          />
        </CardComponent>

        <CardComponent title="Acordeão múltiplo" subtitle="Vários itens abertos ao mesmo tempo" icon="chevron-down">
          <Accordion
            multiple
            defaultOpen={[0, 1]}
            items={[
              { title: 'Entrega', content: 'Enviamos para todo o Brasil em até 5 dias úteis.' },
              { title: 'Trocas e devoluções', content: 'Você tem até 30 dias para solicitar a troca.' },
              { title: 'Garantia', content: 'Todos os produtos têm garantia de 12 meses.' },
            ]}
          />
        </CardComponent>
      </div>

      {/* Tooltip */}
      <CardComponent title="Tooltips" subtitle="Posicionamento em quatro direções" icon="info">
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip content="Dica no topo" placement="top">
            <button className="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
              Topo
            </button>
          </Tooltip>
          <Tooltip content="Dica embaixo" placement="bottom">
            <button className="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
              Abaixo
            </button>
          </Tooltip>
          <Tooltip content="Dica à esquerda" placement="left">
            <button className="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
              Esquerda
            </button>
          </Tooltip>
          <Tooltip content="Dica à direita" placement="right">
            <button className="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
              Direita
            </button>
          </Tooltip>
          <Tooltip content="Mais informações" placement="top">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-gray-50 dark:hover:bg-gray-800">
              <IconBase name="help" size={18} />
            </span>
          </Tooltip>
        </div>
      </CardComponent>

      {/* Steps */}
      <CardComponent title="Etapas" subtitle="Stepper horizontal com estados" icon="check">
        <Steps
          current={step}
          onChange={setStep}
          steps={[
            { label: 'Carrinho', description: 'Itens selecionados' },
            { label: 'Endereço', description: 'Entrega' },
            { label: 'Pagamento', description: 'Cartão ou Pix' },
            { label: 'Confirmação', description: 'Pedido feito' },
          ]}
        />
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex h-9 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 disabled:opacity-50 dark:hover:bg-gray-800"
            disabled={step === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            className="inline-flex h-9 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            disabled={step === 4}
          >
            Próximo
          </button>
        </div>
      </CardComponent>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Rate */}
        <CardComponent title="Avaliação" subtitle="Estrelas com prévia no hover" icon="star">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Rate value={rate} onChange={setRate} />
              <span className="text-sm text-muted">{rate} de 5</span>
            </div>
            <div className="flex items-center gap-3 border-t border-themed pt-4">
              <span className="text-sm text-body">Somente leitura:</span>
              <Rate value={4} readonly size={18} />
            </div>
          </div>
        </CardComponent>

        {/* TagInput */}
        <CardComponent title="Entrada de tags" subtitle="Digite e pressione Enter" icon="tag">
          <TagInput value={tags} onChange={setTags} placeholder="Adicionar tecnologia…" />
          <p className="mt-2 text-xs text-muted">{tags.length} tag(s) · use Backspace para remover a última</p>
        </CardComponent>
      </div>

      {/* Badges */}
      <CardComponent title="Badges" subtitle="Variantes soft e solid" icon="tag">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge color="brand">Primário</Badge>
            <Badge color="success">Sucesso</Badge>
            <Badge color="warning">Aviso</Badge>
            <Badge color="error">Erro</Badge>
            <Badge color="gray">Neutro</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge color="brand" variant="solid">Primário</Badge>
            <Badge color="success" variant="solid">Sucesso</Badge>
            <Badge color="warning" variant="solid">Aviso</Badge>
            <Badge color="error" variant="solid">Erro</Badge>
            <Badge color="gray" variant="solid">Neutro</Badge>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-themed pt-4">
            <Badge color="success" dot>Online</Badge>
            <Badge color="warning" dot>Pendente</Badge>
            <Badge color="gray" dot>Offline</Badge>
            <Badge color="brand" icon="star">Premium</Badge>
            <Badge color="success" icon="check">Verificado</Badge>
          </div>
        </div>
      </CardComponent>

      {/* Avatars */}
      <CardComponent title="Avatares" subtitle="Imagem, iniciais, status e grupo" icon="user">
        <div className="space-y-5">
          <div className="flex items-end gap-3">
            <Avatar name="Ana Silva" size="xs" />
            <Avatar name="Bruno Costa" size="sm" />
            <Avatar name="Carla Dias" size="md" />
            <Avatar name="Diego Luz" size="lg" />
            <Avatar name="Erica Melo" size="xl" />
          </div>
          <div className="flex items-center gap-6 border-t border-themed pt-5">
            <div className="flex items-center gap-3">
              <Avatar name="Marina Reis" status="online" />
              <div>
                <p className="text-sm font-medium text-heading">Marina Reis</p>
                <p className="text-xs text-muted">Online · Produto</p>
              </div>
            </div>
            <Avatar name="João Pedro" status="busy" />
            <Avatar name="Lia Souza" status="offline" />
          </div>
          <div className="border-t border-themed pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Grupo empilhado</p>
            <AvatarGroup extra={5}>
              <Avatar name="Marina Costa" />
              <Avatar name="Lucas Pinto" />
              <Avatar name="André Sá" />
              <Avatar name="Rafa Lima" />
            </AvatarGroup>
          </div>
        </div>
      </CardComponent>

      {/* Skeleton */}
      <CardComponent
        title="Skeleton"
        subtitle="Placeholders de carregamento"
        icon="grid"
        toolbar={
          <button
            onClick={() => setLoading((l) => !l)}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-themed px-3 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name="reset" size={15} />
            {loading ? 'Mostrar conteúdo' : 'Mostrar loading'}
          </button>
        }
      >
        {loading ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" width={48} height={48} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="line" width="40%" />
                <Skeleton variant="line" width="25%" />
              </div>
            </div>
            <Skeleton variant="rect" height={120} />
            <div className="space-y-2">
              <Skeleton variant="line" />
              <Skeleton variant="line" width="90%" />
              <Skeleton variant="line" width="75%" />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar name="Time Produto" size="lg" />
              <div>
                <p className="text-sm font-semibold text-heading">Equipe de Produto</p>
                <p className="text-xs text-muted">12 membros ativos</p>
              </div>
            </div>
            <div className="flex h-[120px] items-center justify-center rounded-xl bg-brand-50 text-sm font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              Conteúdo carregado
            </div>
            <p className="text-sm text-body">
              O conteúdo real substitui os placeholders assim que os dados terminam de carregar, evitando saltos de layout.
            </p>
          </div>
        )}
      </CardComponent>
    </div>
  )
}
