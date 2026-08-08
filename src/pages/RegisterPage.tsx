import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField, CheckboxField } from '@/components/ui/FormikField'
import { useUiStore } from '@/stores/ui'

interface RegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
}

function TermsError() {
  const { touched, errors } = useFormikContext<RegisterValues>()
  if (!touched.acceptTerms || !errors.acceptTerms) return null
  return <p className="text-xs text-error-500">{errors.acceptTerms}</p>
}

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const notifySuccess = useUiStore((s) => s.notifySuccess)
  const [submitting, setSubmitting] = useState(false)

  const schema = Yup.object({
    name: Yup.string().trim().required('Informe seu nome'),
    email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
    password: Yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não conferem')
      .required('Confirme sua senha'),
    acceptTerms: Yup.boolean().oneOf([true], 'Você precisa aceitar os termos'),
  })

  async function handleSubmit(values: RegisterValues) {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setSubmitting(false)
    notifySuccess('Conta criada com sucesso! Faça login para continuar.')
    void values
    navigate('/login')
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
            <span className="text-2xl font-bold">A</span>
          </span>
          <h1 className="mt-5 text-title-sm font-bold text-heading">{t('auth.register')}</h1>
          <p className="mt-2 text-sm text-muted">Preencha os dados para começar</p>
        </div>

        <div className="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <TextField
                name="name"
                label={t('auth.name')}
                type="text"
                placeholder="Seu nome completo"
                autoComplete="name"
              />
              <TextField
                name="email"
                label={t('auth.email')}
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
              />
              <TextField
                name="password"
                label={t('auth.password')}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                hint="Mínimo de 8 caracteres"
              />
              <TextField
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />

              <div className="space-y-1.5">
                <CheckboxField name="acceptTerms" label="Li e aceito os termos de uso e a política de privacidade" />
                <TermsError />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Criando conta...
                  </span>
                ) : (
                  t('auth.register')
                )}
              </button>
            </Form>
          </Formik>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to="/login" className="font-medium text-brand-500 hover:text-brand-600">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
