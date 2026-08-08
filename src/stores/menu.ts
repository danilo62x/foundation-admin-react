export interface MenuItem {
  label: string
  icon: string
  href?: string
  children?: MenuItem[]
  badge?: string
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export const menuSections: MenuSection[] = [
  {
    title: 'Menu',
    items: [
      { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
      { label: 'Analytics', icon: 'chart', href: '/charts' },
    ],
  },
  {
    title: 'Dados',
    items: [
      { label: 'Formulários', icon: 'forms', href: '/forms' },
      { label: 'Tabelas', icon: 'tables', href: '/tables' },
    ],
  },
  {
    title: 'Aplicações',
    items: [
      { label: 'Caixa de entrada', icon: 'mail', href: '/inbox', badge: '3' },
      { label: 'Arquivos', icon: 'package', href: '/files' },
      { label: 'Galeria', icon: 'grid', href: '/gallery' },
      {
        label: 'Financeiro',
        icon: 'dollar',
        children: [
          { label: 'Faturas', icon: 'dollar', href: '/invoice' },
          { label: 'Cobrança', icon: 'tag', href: '/billing' },
        ],
      },
      { label: 'Documentação', icon: 'help', href: '/docs' },
    ],
  },
  {
    title: 'UI',
    items: [
      {
        label: 'Componentes',
        icon: 'grid',
        children: [
          { label: 'Componentes UI', icon: 'grid', href: '/components' },
          { label: 'Componentes avançados', icon: 'zap', href: '/ui-advanced' },
          { label: 'Tipografia', icon: 'type', href: '/typography' },
        ],
      },
      { label: 'Integrações & Libs', icon: 'package', href: '/integrations', badge: 'novo' },
      { label: 'Planos & Preços', icon: 'tag', href: '/pricing' },
    ],
  },
  {
    title: 'Páginas',
    items: [
      {
        label: 'Utilitárias',
        icon: 'info',
        children: [
          { label: 'Em breve', icon: 'rocket', href: '/coming-soon' },
          { label: 'Manutenção', icon: 'settings', href: '/maintenance' },
          { label: 'Erro 404', icon: 'x', href: '/404' },
        ],
      },
    ],
  },
  {
    title: 'Conta',
    items: [
      { label: 'Perfil', icon: 'user', href: '/profile' },
      { label: 'Configurações', icon: 'settings', href: '/settings' },
    ],
  },
]
