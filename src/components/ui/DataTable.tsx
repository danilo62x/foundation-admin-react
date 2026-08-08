import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import IconBase from './IconBase'

interface Props<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  pageSize?: number
  searchable?: boolean
}

/**
 * Generic data table built on TanStack Table v8 — sorting, global filter and
 * client-side pagination, styled with the template's theme tokens.
 */
export default function DataTable<T>({ columns, data, pageSize = 10, searchable = true }: Props<T>) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  return (
    <div className="surface-card overflow-hidden rounded-xl border">
      {searchable && (
        <div className="flex items-center gap-2 border-b border-themed p-4">
          <div className="relative w-full max-w-xs">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
              <IconBase name="search" size={16} />
            </span>
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={t('common.search')}
              className="focus-ring w-full rounded-lg border border-themed bg-transparent py-2 pr-3 pl-9 text-sm text-body"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-themed">
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3 font-medium text-muted">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className={`flex items-center gap-1 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-default'
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: <IconBase name="arrow-up" size={14} />, desc: <IconBase name="arrow-down" size={14} /> }[
                          header.column.getIsSorted() as string
                        ] ?? null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-muted">
                  {t('common.noResults')}
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-themed last:border-0 hover:bg-gray-50 dark:hover:bg-white/5">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-3 text-body">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-themed p-4 text-sm text-muted">
        <span>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          {'–'}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          / {table.getFilteredRowModel().rows.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="focus-ring rounded-lg border border-themed px-3 py-1.5 disabled:opacity-40"
          >
            {t('common.previous')}
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="focus-ring rounded-lg border border-themed px-3 py-1.5 disabled:opacity-40"
          >
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  )
}
