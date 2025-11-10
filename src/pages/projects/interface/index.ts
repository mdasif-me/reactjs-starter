export type TEngagementPoint = {
  day: string
  investors: number
  investments: number
}
export type EProjectStatus = 'ongoing' | 'completed' | 'waiting' | 'rejected' | 'cancelled'
export interface IProjects {
  property_id: string
  name: string
  location: string
  img: string
  type: string
  price: string
  investment: string
  views: string
  status: EProjectStatus
}
export interface IProjectsTableProps {
  data: IProjects[]
  onRowClick?: (project: IProjects) => void
  onDeleteRows?: (projects: IProjects[]) => void
  onAddProject?: () => void
  isLoading?: boolean
}
