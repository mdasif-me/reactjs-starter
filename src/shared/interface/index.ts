/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISidebarItem {
  title: string
  href: string
  icon: any
  solidIcon?: any
  badge?: string | number | null
  items?: ISidebarItem[]
}

export interface ISidebarGroup {
  title?: string
  items: ISidebarItem[]
}

export interface IDropdownItemProps {
  item: ISidebarItem
  onMobileClose?: () => void
}

export type ISidebarData = ISidebarGroup[] | ISidebarItem[]

export interface TableColumn<T> {
  id: string
  header: string
  accessorKey: keyof T
  cell?: (value: any, row: T) => React.ReactNode
  size?: number
  enableSorting?: boolean
  enableHiding?: boolean
  filterFn?: any
}

export interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  onRowClick?: (row: T) => void
  onDeleteRows?: (rows: T[]) => void
  onAddItem?: () => void
  isLoading?: boolean
}
