import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Investor, InvestorsTableProps } from '../interface'
import type { TableColumn } from '@/shared/interface'
import { DataTable } from '@/shared/components/data-table'

export function InvestorsTable({
  data,
  onRowClick,
  onDeleteRows,
  onAddInvestor,
  isLoading,
}: InvestorsTableProps) {
  const investorRowActions = useMemo(() => {
    const actions = []
    if (onRowClick) {
      actions.push({
        label: 'View Details',
        onClick: (row: Investor) => onRowClick(row),
      })
    }
    if (onDeleteRows) {
      actions.push({
        label: 'Delete',
        onClick: (row: Investor) => onDeleteRows([row]),
        variant: 'danger' as const,
      })
    }
    return actions
  }, [onRowClick, onDeleteRows])

  const columns: TableColumn<Investor>[] = useMemo(
    () => [
      {
        id: 'investorId',
        header: 'Investor ID',
        accessorKey: 'investorId',
        size: 120,
        enableSorting: true,
      },
      {
        id: 'investorName',
        header: 'Investor Name',
        accessorKey: 'investorName',
        size: 180,
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: 'investedProjects',
        header: 'Invested Projects',
        accessorKey: 'investedProjects',
        size: 200,
        enableSorting: true,
      },
      {
        id: 'projectAddress',
        header: 'Address',
        accessorKey: 'projectAddress',
        size: 220,
        enableSorting: true,
      },
      {
        id: 'type',
        header: 'Type',
        accessorKey: 'type',
        size: 120,
        enableSorting: true,
        cell: (value: string) => (
          <Badge variant="outline" className="capitalize">
            {value}
          </Badge>
        ),
      },
      {
        id: 'amount',
        header: 'Amount',
        accessorKey: 'amount',
        size: 120,
        enableSorting: true,
        cell: (value: number) => {
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format(value)
          return <div className="font-medium">{formatted}</div>
        },
      },
      {
        id: 'fundMature',
        header: 'Fund Mature',
        accessorKey: 'fundMature',
        size: 140,
        enableSorting: true,
        cell: (value: Date) => {
          return new Date(value).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        },
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        size: 120,
        enableSorting: true,
        cell: (value: string) => {
          const statusConfig = {
            'On going': {
              variant: 'outline' as const,
              className: 'border-[#6B39F4] bg-[#6B39F4]/10 text-[#6B39F4]',
            },
            Completed: {
              variant: 'outline' as const,
              className: 'border-success bg-success/10 text-success',
            },
            Paused: {
              variant: 'outline' as const,
              className: 'border-warning bg-warning/10 text-warning',
            },
            Cancelled: {
              variant: 'outline' as const,
              className: 'border-danger bg-danger/10 text-danger',
            },
          }

          const config =
            statusConfig[value as keyof typeof statusConfig] || statusConfig['On going']

          return (
            <Badge variant={config.variant} className={cn('capitalize', config.className)}>
              {value}
            </Badge>
          )
        },
      },
    ],
    [],
  )

  return (
    <DataTable
      title="Recent investments"
      data={data}
      columns={columns}
      onRowClick={onRowClick}
      onDeleteRows={onDeleteRows}
      onAddItem={onAddInvestor}
      isLoading={isLoading}
      searchColumnId="investorName"
      filterColumnIds={['status', 'type']}
      rowActions={investorRowActions}
    />
  )
}
