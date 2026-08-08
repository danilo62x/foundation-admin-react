import { useState } from 'react'
import IconBase from '@/components/ui/IconBase'

const FAQ = [
  {
    q: 'O que está incluído no template?',
    a: 'Você recebe o código-fonte completo em React 19 + Vite 6 + TypeScript, com dezenas de páginas e componentes prontos, dark mode, internacionalização, autenticação mockada e configuração de build otimizada.',
  },
  {
    q: 'Preciso saber TypeScript para usar?',
    a: 'Recomendamos conhecimento básico de React e TypeScript. O código é bem organizado e tipado, o que facilita a manutenção e reduz erros ao longo do desenvolvimento.',
  },
  {
    q: 'O template é responsivo e tem dark mode?',
    a: 'Sim. Todas as telas são mobile-first e totalmente responsivas, com suporte nativo a tema claro e escuro usando tokens de design consistentes.',
  },
  {
    q: 'Recebo atualizações futuras?',
    a: 'Sim. Todas as licenças incluem atualizações gratuitas com novos componentes, correções e melhorias de performance enquanto o produto estiver ativo.',
  },
  {
    q: 'Posso usar em projetos comerciais?',
    a: 'Com certeza. A licença permite uso em projetos comerciais e produtos para clientes. Consulte os termos completos para limites de revenda.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Oferecemos suporte por email para todos os planos e suporte prioritário para os planos Pro e Enterprise, com tempos de resposta reduzidos.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            FAQ
          </span>
          <h2 className="mt-2 text-title-sm font-bold text-heading md:text-title-md">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-base text-muted md:text-lg">
            Tudo o que você precisa saber antes de começar.
          </p>
        </div>

        <ul className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className="surface-card overflow-hidden rounded-xl border">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-heading md:text-base">{item.q}</span>
                  <IconBase
                    name="chevron-down"
                    size={20}
                    className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
