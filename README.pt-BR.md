# Foundation Admin / React

[Read in English](./README.md)

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](./LICENSE) ![Grátis](https://img.shields.io/badge/pre%C3%A7o-gr%C3%A1tis-brightgreen)

Foundation Admin / React é a implementação em React do layout admin Foundation: 5 templates irmãos compartilham as mesmas 25 telas e a mesma identidade visual, um por stack. Este aqui é feito com React 19 e hooks, estilizado com Foundation Sites 6.8 (folha de estilo pré-compilada). Autenticação e dados são fictícios, então a aplicação inteira roda sem backend. Vem com tema claro e escuro, três idiomas e configuração de PWA.

Demonstração ao vivo: https://template.dev.br/preview/foundation-admin-react/

## Páginas incluídas

25 páginas de rota em `src/pages/`:

- Landing: página pública de marketing com hero, recursos e planos
- Login: formulário de acesso com validação e credenciais fictícias
- Register: formulário de criação de conta
- ForgotPassword: pedido de link de redefinição
- ResetPassword: formulário para definir a nova senha
- Dashboard: cartões de KPI com sparklines, gráficos e atividade recente
- Charts: página de analytics com gráficos de barra, área e rosca (ApexCharts)
- Forms: inputs, selects, date picker, upload de arquivos e validação inline
- Tables: tabela com ordenação, filtros, paginação e seleção de linhas
- Components: catálogo dos componentes de UI base
- UiAdvanced: modais, abas, toasts e outros widgets compostos
- Typography: escala tipográfica, títulos e utilitários de texto
- Integrations: cartões de serviços externos com liga/desliga
- Profile: página do usuário com dados pessoais e atividade
- Pricing: comparativo de planos
- Settings: preferências do app, tema e idioma
- Inbox: tela estilo webmail com pastas e lista de mensagens
- FileManager: listagem de arquivos com pastas e ações
- Gallery: grade de imagens
- Invoice: detalhe de fatura pronto para impressão
- Billing: formas de pagamento e histórico de faturas
- Documentation: página de referência do template dentro do app
- Maintenance: página isolada de manutenção
- ComingSoon: página isolada de pré-lançamento
- NotFound: página de erro 404

## Stack

- React 19 com react-dom 19 e TypeScript 5.7 (strict)
- Foundation Sites 6.8 (folha de estilo pré-compilada)
- Vite 6 com `vite-plugin-pwa` 1.3 (PWA instalável, cache offline)
- React Router 7.1 (react-router-dom)
- Zustand 5.0 para estado (stores auth, menu, ui)
- i18next 26 + react-i18next 17 + detector de idioma do navegador (en, es, pt-BR)
- ApexCharts 5 via react-apexcharts 2.1
- TanStack React Table 8.21
- Editor de texto rico Slate 0.124 (slate-react, slate-history)
- Validação de formulários com Formik 2.4 + Yup 1.7
- react-datepicker 9 e react-dropzone 15

## Requisitos

- Node.js 18 ou mais novo
- npm

## Como rodar

```bash
npm install
npm run dev
```

O Vite sobe um servidor de desenvolvimento com hot reload. A autenticação é simulada em na store de auth do Zustand, então nenhum backend é necessário. Credenciais de demonstração:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build de produção

```bash
npm run build
```

Roda a checagem de tipos do TypeScript e gera o bundle de produção em `dist/`. Para conferir localmente: `npm run preview`.

## Estrutura do projeto

```
src/
├── assets/styles/     app.scss, _compat.scss
├── components/
│   ├── landing/       seções da landing page pública
│   ├── layout/        header, sidebar e footer
│   └── ui/            componentes de UI compartilhados
├── hooks/             hooks React compartilhados
├── i18n/locales/      en.json, es.json, pt-BR.json
├── pages/             25 páginas de rota
└── stores/            auth.ts, menu.ts, ui.ts (Zustand)
```

## Tema e personalização

O Foundation entra pré-compilado (`foundation-sites/dist/css/foundation.min.css`), o que evita o atrito de resolução Sass da entrada original e é importado no `src/main.tsx` para carregar antes do tema. O `src/assets/styles/app.scss` aplica o tema por cima. Abaixo ficam os tokens de design em tempo de execução, declarados como custom properties: a rampa da marca (`--color-brand-25` até `--color-brand-950`, com o 500 como primária #465fff), as cores de estado e os tokens semânticos de superfície sob o prefixo `--tx-` (sidebar, header, card, borda, texto). O modo escuro troca os valores `--tx-` em tempo de execução, a partir de uma classe no elemento raiz. Para trocar a marca, altere a rampa e os valores `--tx-` juntos. O `_compat.scss` implementa o vocabulário de utilitários que o markup compartilha com o original em Tailwind e liga os tokens aos componentes do framework, para que cards, tabelas e campos de formulário sigam o tema.

## Internacionalização

Três idiomas acompanham o template: inglês, espanhol e português do Brasil. O idioma do navegador é detectado no primeiro acesso e o seletor no header persiste a escolha.

## O mesmo layout em outras stacks

Este repositório é uma de 5 implementações do mesmo layout admin Foundation. Todas têm as mesmas 25 telas e a mesma identidade visual, e todas são gratuitas:

- Vue 3: https://github.com/danilo62x/foundation-admin-vue3
- Angular 19: https://github.com/danilo62x/foundation-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/foundation-admin-laravel
- Static HTML: https://github.com/danilo62x/foundation-admin-html

O catálogo completo de templates gratuitos e pagos está em https://template.dev.br

## Apoie o projeto

Este template é gratuito e licenciado sob MIT. Se ele te poupar tempo, você pode apoiar o trabalho com uma doação em https://template.dev.br/doar?template=foundation-admin-react

## Licença

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
