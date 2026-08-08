import { useMemo, useState } from 'react'
import { Formik, Form, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import type { ApexOptions } from 'apexcharts'
import { type ColumnDef } from '@tanstack/react-table'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import IconBase from '@/components/ui/IconBase'
import ApexChart from '@/components/ui/ApexChart'
import DataTable from '@/components/ui/DataTable'
import RichTextEditor from '@/components/ui/RichTextEditor'
import DatePickerInput from '@/components/ui/DatePickerInput'
import FileDropzone from '@/components/ui/FileDropzone'
import { TextField, SelectField, CheckboxField } from '@/components/ui/FormikField'

/* ------------------------------------------------------------------ */
/* a) ApexCharts — mock data                                          */
/* ------------------------------------------------------------------ */

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const areaSeries: ApexOptions['series'] = [
  { name: 'Receita', data: [31, 40, 28, 51, 42, 62, 58, 70, 65, 82, 78, 95] },
  { name: 'Despesas', data: [22, 28, 25, 33, 30, 38, 36, 44, 41, 50, 47, 55] },
]

const areaOptions: ApexOptions = {
  chart: { type: 'area' },
  xaxis: { categories: MONTHS },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
  legend: { show: true, position: 'top' },
}

const barSeries: ApexOptions['series'] = [{ name: 'Vendas', data: [44, 55, 41, 67, 22, 43, 36, 52] }]

const barOptions: ApexOptions = {
  chart: { type: 'bar' },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
  xaxis: { categories: ['Pro', 'Start', 'Storage', 'Ent.', 'Treino', 'API', 'SMS', 'Extra'] },
}

const donutSeries: ApexOptions['series'] = [42, 24, 18, 10, 6]

const donutOptions: ApexOptions = {
  chart: { type: 'donut' },
  labels: ['Google', 'Direto', 'Social', 'Email', 'Outros'],
  legend: { show: true, position: 'bottom' },
  plotOptions: { pie: { donut: { size: '65%' } } },
}

/* ------------------------------------------------------------------ */
/* b) DataTable — mock users                                          */
/* ------------------------------------------------------------------ */

interface UserRow {
  id: number
  nome: string
  email: string
  funcao: string
  status: 'Ativo' | 'Pendente' | 'Inativo'
  valor: number
}

const USERS: UserRow[] = [
  { id: 1, nome: 'Marina Costa', email: 'marina@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 1299.9 },
  { id: 2, nome: 'Lucas Pereira', email: 'lucas@empresa.com', funcao: 'Editor', status: 'Pendente', valor: 349.5 },
  { id: 3, nome: 'Aline Souza', email: 'aline@empresa.com', funcao: 'Visualizador', status: 'Ativo', valor: 89.0 },
  { id: 4, nome: 'Rafael Lima', email: 'rafael@empresa.com', funcao: 'Editor', status: 'Inativo', valor: 0 },
  { id: 5, nome: 'Bianca Rocha', email: 'bianca@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 2499.0 },
  { id: 6, nome: 'Diego Martins', email: 'diego@empresa.com', funcao: 'Visualizador', status: 'Pendente', valor: 159.9 },
]

function statusBadgeClass(status: UserRow['status']) {
  if (status === 'Ativo') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}

const currencyFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const userColumns: ColumnDef<UserRow, any>[] = [
  { accessorKey: 'nome', header: 'Nome', cell: (info) => <span className="font-medium text-heading">{info.getValue() as string}</span> },
  { accessorKey: 'email', header: 'E-mail' },
  { accessorKey: 'funcao', header: 'Função' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as UserRow['status']
      return (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(status)}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: (info) => <span className="font-medium text-heading">{currencyFmt.format(info.getValue() as number)}</span>,
  },
]

/* ------------------------------------------------------------------ */
/* c) Formik + Yup                                                    */
/* ------------------------------------------------------------------ */

interface ContactForm {
  nome: string
  email: string
  plano: string
  termos: boolean
}

const initialFormValues: ContactForm = { nome: '', email: '', plano: '', termos: false }

const contactSchema: Yup.ObjectSchema<ContactForm> = Yup.object({
  nome: Yup.string().min(3, 'Mínimo de 3 caracteres').required('Informe o nome'),
  email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
  plano: Yup.string().required('Selecione um plano'),
  termos: Yup.boolean().oneOf([true], 'É preciso aceitar os termos').required(),
})

/* ------------------------------------------------------------------ */
/* Section header helper                                              */
/* ------------------------------------------------------------------ */

function LibTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
      <IconBase name="zap" size={12} />
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  usePageTitle('Integrações & Bibliotecas')
  const notifySuccess = useUiStore((s) => s.notifySuccess)

  const [date, setDate] = useState<Date | null>(new Date())
  const [dateTime, setDateTime] = useState<Date | null>(new Date())

  // memoize options so ApexChart's useMemo dependency stays stable
  const areaOpts = useMemo(() => areaOptions, [])
  const barOpts = useMemo(() => barOptions, [])
  const donutOpts = useMemo(() => donutOptions, [])

  function handleSubmit(values: ContactForm, helpers: FormikHelpers<ContactForm>) {
    notifySuccess(`Formulário enviado com sucesso para ${values.nome}!`)
    helpers.resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-title-sm font-bold text-heading">Integrações &amp; Bibliotecas</h1>
          <p className="mt-1 text-sm text-muted">
            Demonstração das bibliotecas integradas ao template — gráficos, tabelas, formulários e mais.
          </p>
        </div>
      </div>

      {/* a) ApexCharts ------------------------------------------------ */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-base font-semibold text-heading">Gráficos</h2>
          <LibTag label="ApexCharts" />
          <p className="text-sm text-muted">Gráficos interativos e responsivos com tema claro/escuro automático.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <CardComponent title="Receita x Despesas" subtitle="Área · 12 meses" icon="chart" className="xl:col-span-2">
            <ApexChart type="area" series={areaSeries} options={areaOpts} height={320} />
          </CardComponent>

          <CardComponent title="Vendas por produto" subtitle="Barras" icon="package">
            <ApexChart type="bar" series={barSeries} options={barOpts} height={300} />
          </CardComponent>

          <CardComponent title="Fontes de tráfego" subtitle="Rosca" icon="globe">
            <ApexChart type="donut" series={donutSeries} options={donutOpts} height={300} />
          </CardComponent>
        </div>
      </section>

      {/* b) DataTable ------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-base font-semibold text-heading">Tabela de dados</h2>
          <LibTag label="TanStack Table" />
          <p className="text-sm text-muted">Ordenação, busca global e paginação no cliente.</p>
        </div>
        <DataTable columns={userColumns} data={USERS} pageSize={5} />
      </section>

      {/* c) Formik + Yup  /  d) SlateJS ------------------------------- */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-heading">Formulário validado</h2>
            <LibTag label="Formik + Yup" />
          </div>
          <CardComponent title="Cadastro" subtitle="Validação inline com Yup" icon="forms">
            <Formik
              initialValues={initialFormValues}
              validationSchema={contactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <TextField name="nome" label="Nome completo" placeholder="Seu nome" />
                  <TextField name="email" label="E-mail" type="email" placeholder="voce@empresa.com" />
                  <SelectField name="plano" label="Plano">
                    <option value="">Selecione…</option>
                    <option value="start">Start</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </SelectField>
                  <CheckboxField name="termos" label="Aceito os termos de uso" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
                  >
                    <IconBase name="check" size={16} /> Enviar
                  </button>
                </Form>
              )}
            </Formik>
          </CardComponent>
        </section>

        {/* d) SlateJS */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-heading">Editor de texto rico</h2>
            <LibTag label="Slate.js" />
          </div>
          <CardComponent title="Conteúdo" subtitle="Negrito, listas, títulos e citações" icon="type">
            <RichTextEditor placeholder="Comece a escrever o seu conteúdo aqui…" />
          </CardComponent>
        </section>
      </div>

      {/* e) Date picker  /  f) Upload --------------------------------- */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-heading">Seletor de data</h2>
            <LibTag label="react-datepicker" />
          </div>
          <CardComponent title="Datas" subtitle="Apenas data e data + hora" icon="dashboard">
            <div className="space-y-4">
              <DatePickerInput label="Data" selected={date} onChange={setDate} placeholder="Selecione a data" />
              <DatePickerInput
                label="Data e hora"
                selected={dateTime}
                onChange={setDateTime}
                showTime
                placeholder="Selecione data e hora"
              />
            </div>
          </CardComponent>
        </section>

        {/* f) Upload */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-heading">Upload de arquivos</h2>
            <LibTag label="react-dropzone" />
          </div>
          <CardComponent title="Enviar arquivos" subtitle="Arraste e solte ou clique" icon="download">
            <FileDropzone
              maxFiles={4}
              maxSize={5 * 1024 * 1024}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'], 'application/pdf': ['.pdf'] }}
            />
          </CardComponent>
        </section>
      </div>
    </div>
  )
}
