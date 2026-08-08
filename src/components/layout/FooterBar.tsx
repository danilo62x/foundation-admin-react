export default function FooterBar() {
  const year = new Date().getFullYear()
  return (
    <footer className="surface-header border-t px-4 py-4 md:px-6 2xl:px-10">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-xs text-muted">
          © {year} Tailwind Admin Template. Construído com React 19 + TypeScript + Tailwind CSS.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <a href="#" className="hover:text-brand-500">Documentação</a>
          <a href="#" className="hover:text-brand-500">Suporte</a>
          <a href="#" className="hover:text-brand-500">Changelog</a>
        </div>
      </div>
    </footer>
  )
}
