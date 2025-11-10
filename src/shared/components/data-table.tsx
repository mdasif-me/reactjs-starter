import { useId, useMemo, useRef, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  SearchIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { DataTableProps } from '@/shared/interface/index'

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  searchColumnId = '',
  filterColumnIds = [],
  title = '',
  loadingText = 'Loading data...',
  rowActions = [],
}: DataTableProps<T> & {
  searchColumnId?: string
  filterColumnIds?: string[]
  title?: string
  loadingText?: string
  rowActions?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (row: T) => void
    variant?: 'default' | 'danger'
  }>
}) {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const inputRef = useRef<HTMLInputElement>(null!) // non-null assertion to match expected type

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: searchColumnId || columns[0]?.id || 'id',
      desc: false,
    },
  ])

  const tableColumns: ColumnDef<T>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
      },
      ...columns.map((col) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filterFn: any = col.filterFn

        if (!filterFn) {
          if (filterColumnIds.includes(col.id)) {
            filterFn = 'arrIncludesSome'
          } else if (col.id === searchColumnId) {
            filterFn = ((row: Row<T>, columnId: string, filterValue: string | null | undefined) => {
              if (!filterValue) return true
              const value = row.getValue(columnId)
              return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
            }) as unknown
          }
        }

        return {
          id: col.id,
          header: col.header,
          accessorKey: col.accessorKey,
          cell: ({ row }: { row: Row<T> }) => {
            const value = row.getValue(col.accessorKey as string)
            return col.cell ? col.cell(value, row.original) : value
          },
          size: col.size,
          enableSorting: col.enableSorting ?? true,
          enableHiding: col.enableHiding ?? true,
          filterFn,
        }
      }),
      {
        id: 'actions',
        header: () => <span>Actions</span>,
        cell: ({ row }) => <RowActions row={row} rowActions={rowActions} />,
        size: 60,
        enableHiding: false,
      },
    ],
    [columns, filterColumnIds, searchColumnId, rowActions],
  )

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Get unique values for each filter column
  const filterColumnData = useMemo(() => {
    return filterColumnIds.reduce(
      (acc, columnId) => {
        const column = table.getColumn(columnId)
        if (column) {
          const uniqueValues = Array.from(column.getFacetedUniqueValues().keys())
            .filter((v): v is string | number => typeof v === 'string' || typeof v === 'number')
            .sort()
          const counts = column.getFacetedUniqueValues()
          acc[columnId] = { uniqueValues, counts }
        }
        return acc
      },
      {} as Record<
        string,
        { uniqueValues: (string | number)[]; counts: Map<string | number, number> }
      >,
    )
  }, [filterColumnIds, table])

  const selectedFilters = useMemo(() => {
    return filterColumnIds.reduce(
      (acc, columnId) => {
        const filterValue = table.getColumn(columnId)?.getFilterValue() as
          | (string | number)[]
          | undefined
        acc[columnId] = filterValue ?? []
        return acc
      },
      {} as Record<string, (string | number)[]>,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterColumnIds, columnFilters])

  const handleFilterChange = (
    columnId: string,
    checked: boolean | string,
    value: string | number,
  ) => {
    const filterValue = table.getColumn(columnId)?.getFilterValue() as
      | (string | number)[]
      | undefined
    const newFilterValue = filterValue ? [...filterValue] : []

    // Convert indeterminate to false
    const isChecked = checked === true

    if (isChecked) {
      if (!newFilterValue.includes(value)) {
        newFilterValue.push(value)
      }
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    // Set filter value - use array for filtering
    const filterToSet = newFilterValue.length ? newFilterValue : undefined
    table.getColumn(columnId)?.setFilterValue(filterToSet)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex h-64 items-center justify-center">
          <div className="text-muted-foreground">{loadingText}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-2xl border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 pb-0">
        <h3 className="text-base leading-7 font-semibold">{title}</h3>

        <div className="flex flex-wrap items-center gap-3">
          <div className="focus:border-primary flex items-center rounded-md border">
            <SearchIcon className="ms-2 opacity-60" size={16} aria-hidden="true" />
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                'focus:ring-primary border-none bg-transparent! outline-none focus:ring-0 focus:ring-offset-0',
              )}
              value={
                searchColumnId
                  ? ((table.getColumn(searchColumnId)?.getFilterValue() ?? '') as string)
                  : ''
              }
              onChange={(e) => {
                if (searchColumnId) {
                  const value = e.target.value
                  table.getColumn(searchColumnId)?.setFilterValue(value || undefined)
                }
              }}
              placeholder="Search"
              type="text"
              aria-label="Search"
              disabled={!searchColumnId}
            />
          </div>

          {filterColumnIds.map((columnId) => (
            <Popover key={columnId}>
              <PopoverTrigger asChild>
                <Button intent="outline" className={'text-muted-fg hover:bg-transparent'}>
                  <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                  {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                  {selectedFilters[columnId]?.length > 0 && (
                    <span className="text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border bg-white px-1 font-[inherit] text-[0.625rem] font-medium">
                      {selectedFilters[columnId]?.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto min-w-36 bg-white p-3" align="start">
                <div className="space-y-3">
                  <div className="text-muted-foreground text-xs font-medium capitalize">
                    {columnId} Filters
                  </div>
                  <div className="space-y-3">
                    {filterColumnData[columnId]?.uniqueValues.map((value, i) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`${id}-${columnId}-${i}`}
                          checked={selectedFilters[columnId]?.includes(value) || false}
                          onCheckedChange={(checked) =>
                            handleFilterChange(columnId, checked, value)
                          }
                        />
                        <Label
                          htmlFor={`${id}-${columnId}-${i}`}
                          className="flex grow justify-between gap-2 font-normal"
                        >
                          {value}
                          <span className="text-muted-foreground ms-2 text-xs">
                            {filterColumnData[columnId]?.counts.get(value)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button intent="outline" className={'text-muted-fg hover:bg-transparent'}>
                <Columns3Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden border-y bg-white">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="h-11"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          'flex h-full cursor-pointer items-center justify-between gap-2 select-none',
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if ((e.key === 'Enter' || e.key === ' ') && header.column.getCanSort()) {
                            e.preventDefault()
                            header.column.getToggleSortingHandler()?.(e)
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} />,
                          desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(onRowClick && 'hover:bg-muted/50 cursor-pointer')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap-reverse items-center justify-center gap-8 p-4 pt-0 md:justify-between">
        {/* Page info */}
        <div className="text-muted-foreground flex grow justify-center text-sm whitespace-nowrap md:justify-start">
          <p className="text-sm font-semibold whitespace-nowrap" aria-live="polite">
            Showing{' '}
            <span className="text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getRowCount(),
              )}
            </span>
            , of <span className="text-foreground">{table.getRowCount()}</span> results
          </p>
        </div>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="sq-sm"
                  intent="outline"
                  isDisabled={!table.getCanPreviousPage()}
                  onClick={() => table.firstPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="sq-sm"
                  intent="outline"
                  isDisabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} />
                </Button>
              </PaginationItem>

              {/* Page numbers */}
              {(() => {
                const pageCount = table.getPageCount()
                const currentPageIndex = table.getState().pagination.pageIndex
                const pages: (number | string)[] = []
                const maxVisiblePages = 5
                const halfVisible = Math.floor(maxVisiblePages / 2)

                if (pageCount <= maxVisiblePages) {
                  for (let i = 0; i < pageCount; i++) {
                    pages.push(i)
                  }
                } else {
                  pages.push(0)

                  const startPage = Math.max(1, currentPageIndex - halfVisible)
                  const endPage = Math.min(pageCount - 2, currentPageIndex + halfVisible)

                  if (startPage > 1) {
                    pages.push('...')
                  }
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(i)
                  }

                  if (endPage < pageCount - 2) {
                    pages.push('...')
                  }

                  pages.push(pageCount - 1)
                }

                return pages.map((page, index) => (
                  <PaginationItem key={index}>
                    {page === '...' ? (
                      <span className="px-2">...</span>
                    ) : (
                      <Button
                        size="sq-sm"
                        intent={currentPageIndex === page ? 'primary' : 'outline'}
                        onClick={() => table.setPageIndex(page as number)}
                        aria-label={`Go to page ${(page as number) + 1}`}
                      >
                        {(page as number) + 1}
                      </Button>
                    )}
                  </PaginationItem>
                ))
              })()}

              <PaginationItem>
                <Button
                  size="sq-sm"
                  intent="outline"
                  isDisabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="sq-sm"
                  intent="outline"
                  isDisabled={!table.getCanNextPage()}
                  onClick={() => table.lastPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

function RowActions<T>({
  row,
  rowActions,
}: {
  row: Row<T>
  rowActions: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (row: T) => void
    variant?: 'default' | 'danger'
  }>
}) {
  if (!rowActions || rowActions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open actions menu"
          className="hover:bg-primary/20 active:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:cursor-pointer"
        >
          <EllipsisIcon size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {rowActions.length > 0 && (
          <DropdownMenuGroup>
            {rowActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => action.onClick(row.original)}
                className={
                  action.variant === 'danger' ? 'text-destructive focus:text-destructive' : ''
                }
              >
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
