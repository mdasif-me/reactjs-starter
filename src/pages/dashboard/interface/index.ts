export interface IUser {
  id: string
  name: string
  email: string
  role?: 'admin' | 'user' | 'guest'
  createdAt?: string
  updatedAt?: string
}

export type InvestmentStatus = 'On going' | 'Completed' | 'Paused' | 'Cancelled'
export type InvestmentType = 'Property' | 'Government' | 'Apartment' | 'Building' | 'Park'

export interface Investor {
  investorId: string
  investorName: string
  investedProjects: string
  projectAddress: string
  type: InvestmentType
  amount: number
  fundMature: Date
  status: InvestmentStatus
}

export interface InvestorsTableProps {
  data: Investor[]
  onRowClick?: (investor: Investor) => void
  onDeleteRows?: (investors: Investor[]) => void
  onAddInvestor?: () => void
  isLoading?: boolean
}
