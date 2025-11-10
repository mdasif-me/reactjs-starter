import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { TableColumn } from '@/shared/interface'
import { DataTable } from '@/shared/components/data-table'
import type { EProjectStatus, IProjects, IProjectsTableProps } from '../interface'

export function ProjectTable({
  data,
  onRowClick,
  onDeleteRows,
  onAddProject,
  isLoading,
}: IProjectsTableProps) {
  const projectRowActions = useMemo(() => {
    const actions = []
    if (onRowClick) {
      actions.push({
        label: 'View Details',
        onClick: (row: IProjects) => onRowClick(row),
        icon: 'eye',
      })
    }
    if (onDeleteRows) {
      actions.push({
        label: 'Delete',
        onClick: (row: IProjects) => onDeleteRows([row]),
        variant: 'danger' as const,
        icon: 'trash',
      })
    }
    return actions
  }, [onRowClick, onDeleteRows])

  const columns: TableColumn<IProjects>[] = useMemo(
    () => [
      {
        id: 'property_id',
        header: 'Property ID',
        accessorKey: 'property_id',
        size: 120,
        enableSorting: true,
      },
      {
        id: 'name',
        header: 'Property Info',
        accessorKey: 'name',
        size: 220,
        enableSorting: true,
        enableHiding: false,
        cell: (project: IProjects) => {
          console.log('project', project)
          return (
            <div className="flex items-center gap-3">
              {project?.img && (
                <img
                  src={project.img}
                  alt={project?.name}
                  className="h-12 w-12 rounded object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{project?.name || 'N/A'}</span>
                <span className="text-muted-fg text-xs">{project?.location || 'N/A'}</span>
              </div>
            </div>
          )
        },
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
        id: 'price',
        header: 'Price',
        accessorKey: 'price',
        size: 120,
        enableSorting: true,
        cell: (value: string) => {
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format(Number(value))
          return <div className="font-medium">{formatted}</div>
        },
      },
      {
        id: 'investment',
        header: 'Investment',
        accessorKey: 'investment',
        size: 120,
        enableSorting: true,
      },
      {
        id: 'views',
        header: 'Views',
        accessorKey: 'views',
        size: 100,
        enableSorting: true,
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        size: 120,
        enableSorting: true,
        cell: (value: EProjectStatus) => {
          const statusConfig: Record<EProjectStatus, { variant: 'outline'; className: string }> = {
            ongoing: {
              variant: 'outline' as const,
              className: 'border-[#6B39F4] bg-[#6B39F4]/10 text-[#6B39F4]',
            },
            completed: {
              variant: 'outline' as const,
              className: 'border-success bg-success/10 text-success',
            },
            waiting: {
              variant: 'outline' as const,
              className: 'border-muted bg-muted/10 text-muted-foreground',
            },
            rejected: {
              variant: 'outline' as const,
              className: 'border-destructive bg-destructive/10 text-destructive',
            },
            cancelled: {
              variant: 'outline' as const,
              className: 'border-destructive bg-destructive/10 text-destructive',
            },
          }

          const config = statusConfig[value as keyof typeof statusConfig] || statusConfig['ongoing']

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
      title="Project Listing"
      data={data}
      columns={columns}
      onRowClick={onRowClick}
      onDeleteRows={onDeleteRows}
      onAddItem={onAddProject}
      isLoading={isLoading}
      searchColumnId="name"
      filterColumnIds={['status', 'type']}
      rowActions={projectRowActions}
    />
  )
}
