import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField } from '@/components/ui/FormikField'
import IconBase from '@/components/ui/IconBase'
import { useUiStore } from '@/stores/ui'

interface ResetValues {
  password: string
  confirmPassword: string
}

const initialValues: ResetValues = { password: '', confirmPassword: '' }

function passwordScore(pw: string): number {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const STRENGTH = [
  { label: 'Muito fraca', color: 'bg-error-500', text: 'text-error-500' },
  { label: 'Fraca', color: 'bg-error-500', text: 'text-error-500' },
  { label: 'Razoável', color: 'bg-warning-500', text: 'text-warning-500' },
  { label: 'Boa', color: 'bg-success-500', text: 'text-success-500' },
  { label: 'Forte', color: 'bg-success-500', text: 'text-success-500' },
]

function StrengthHint() {
  const { values } = useFormikContext<ResetValues>()
  const pw = values.password
  if (!pw) return null
  const score = passwordScore(pw)
  const info = STRENGTH[score]
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < score ? info.color : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${info.text}`}>Força da senha: {info.label}</p>
    </div>
  )
}

export default function ResetPasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const notifySuccess = useUiStore((s) => s.notifySuccess)
  const [submitting, setSubmitting] = useState(false)

  const schema = Yup.object({
    password: Yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não conferem')
      .required('Confirme sua senha'),
  })

  async function handleSubmit(values: ResetValues) {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setSubmitting(false)
    // token would be sent to the backend together with the new password
    void token
    void values
    notifySuccess('Senha redefinida com sucesso! Faça login com a nova senha.')
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
            <IconBase name="lock" size={26} />
          </span>
          <h1 className="mt-5 text-title-sm font-bold text-heading">{t('auth.resetPassword')}</h1>
          <p className="mt-2 text-center text-sm text-muted">Defina uma nova senha para sua conta.</p>
        </div>

        <div className="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
          {!token && (
            <div className="mb-5 rounded-lg bg-warning-50 px-4 py-2 text-center text-sm text-warning-500 dark:bg-warning-500/15">
              Link inválido ou expirado. Solicite um novo link de redefinição.
            </div>
          )}
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <TextField
                name="password"
                label="Nova senha"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                hint="Use 8+ caracteres, com letras, números e símbolos"
              />
              <StrengthHint />
              <TextField
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Salvando...
                  </span>
                ) : (
                  t('auth.resetPassword')
                )}
              </button>
            </Form>
          </Formik>
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
