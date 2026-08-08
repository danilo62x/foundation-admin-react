import { useState, type FormEvent } from 'react'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase'

const INFO = [
  { icon: 'mail', label: 'Email', value: 'contato@template.com' },
  { icon: 'bell', label: 'Telefone', value: '+55 (11) 4002-8922' },
  { icon: 'globe', label: 'Endereço', value: 'Av. Paulista, 1000 — São Paulo, SP' },
]

export default function ContactSection() {
  const notifySuccess = useUiStore((s) => s.notifySuccess)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    notifySuccess('Mensagem enviada!')
    setNome('')
    setEmail('')
    setMensagem('')
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-gray-50 py-20 dark:bg-gray-900/40 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Contato
          </span>
          <h2 className="mt-2 text-title-sm font-bold text-heading md:text-title-md">
            Fale com a gente
          </h2>
          <p className="mt-4 text-base text-muted md:text-lg">
            Tem dúvidas? Envie uma mensagem e nossa equipe responde rapidinho.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <IconBase name={item.icon} size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-heading">{item.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="surface-card mt-2 rounded-2xl border p-5">
              <div className="flex items-center gap-2 text-success-600">
                <IconBase name="check" size={18} strokeWidth={2.5} />
                <p className="text-sm font-semibold text-heading">Resposta em até 24h</p>
              </div>
              <p className="mt-2 text-sm text-muted">
                Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília).
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface-card rounded-2xl border p-6 shadow-theme-sm md:p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-heading" htmlFor="contact-nome">
                  Nome
                </label>
                <input
                  id="contact-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="h-11 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-heading" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-11 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-heading" htmlFor="contact-mensagem">
                  Mensagem
                </label>
                <textarea
                  id="contact-mensagem"
                  required
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Como podemos ajudar?"
                  className="w-full resize-none rounded-lg border border-themed bg-gray-50 px-3 py-2.5 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring"
              >
                <IconBase name="mail" size={18} />
                Enviar mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
