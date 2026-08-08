import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField } from '@/components/ui/FormikField'
import IconBase from '@/components/ui/IconBase'

interface ForgotValues {
  email: string
}

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const schema = Yup.object({
    email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  })

  async function handleSubmit(values: ForgotValues) {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setSubmitting(false)
    setSentTo(values.email)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 py-10 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-theme-md">
            <IconBase name="lock" size={26} />
          </span>
          <h1 className="mt-5 text-title-sm font-bold text-heading">{t('auth.forgotPassword')}</h1>
          <p className="mt-2 text-center text-sm text-muted">
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <div className="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
          {sentTo ? (
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-500 dark:bg-success-500/15">
                <IconBase name="check" size={28} />
              </span>
              <h2 className="mt-4 text-base font-semibold text-heading">Link enviado para seu e-mail</h2>
              <p className="mt-2 text-sm text-muted">
                Enviamos um link de redefinição para{' '}
                <span className="font-medium text-body">{sentTo}</span>. Verifique sua caixa de entrada e o spam.
              </p>
              <div className="mt-4 w-full rounded-lg border border-dashed border-themed bg-gray-50/60 p-3 text-xs text-muted dark:bg-gray-900/40">
                Não recebeu?{' '}
                <button
                  type="button"
                  onClick={() => setSentTo(null)}
                  className="font-medium text-brand-500 hover:text-brand-600"
                >
                  Tentar outro e-mail
                </button>
              </div>
            </div>
          ) : (
            <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
              <Form className="space-y-5">
                <TextField
                  name="email"
                  label={t('auth.email')}
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </span>
                  ) : (
                    t('auth.sendResetLink')
                  )}
                </button>
              </Form>
            </Formik>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/login" className="font-medium text-brand-500 hover:text-brand-600">
            {t('common.back')} — {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
