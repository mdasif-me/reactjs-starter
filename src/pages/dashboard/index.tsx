import { useAuth } from '@/context/auth-context'
import Header from './components/header'
import Loading from '@/shared/components/loading'
import Card from './components/card'
import {
  Building02Icon,
  DollarCircleIcon,
  SaveMoneyDollarIcon,
} from '@hugeicons-pro/core-stroke-rounded'
import { InvestorsTable } from './components/investors-table'
import type { Investor } from './interface'
import { useState } from 'react'
import { ChartBarMultiple } from './components/chart-bar-multiple'
import { ChartPieLegend } from './components/chart-pie-legend'

const mockInvestors: Investor[] = [
  {
    investorId: '32484',
    investorName: 'James Smith',
    investedProjects: 'Pine View Apartments',
    projectAddress: '123 Maple St, Springfield, USA',
    type: 'Property',
    amount: 1800.0,
    fundMature: new Date('2025-07-15'),
    status: 'On going',
  },
  {
    investorId: '32485',
    investorName: 'Linda Johnson',
    investedProjects: 'Cedar Park',
    projectAddress: '456 Oak Ave, Springfield, USA',
    type: 'Government',
    amount: 950.0,
    fundMature: new Date('2025-08-05'),
    status: 'Completed',
  },
]
export const Dashboard = () => {
  const { user } = useAuth()
  const [investors, setInvestors] = useState<Investor[]>(mockInvestors)
  const [isLoading] = useState(false)

  if (!user) {
    return <Loading />
  }

  const handleRowClick = (investor: Investor) => {
    console.log('Row clicked:', investor)
    // Navigate to investor details or open modal
  }

  const handleDeleteRows = (selectedInvestors: Investor[]) => {
    setInvestors((current) =>
      current.filter(
        (investor) =>
          !selectedInvestors.some((selected) => selected.investorId === investor.investorId),
      ),
    )
  }

  const handleAddInvestor = () => {
    console.log('Add investor clicked')
    // Open add investor form/modal
  }
  return (
    <div className="space-y-6">
      <Header user={user} />
      <div className="grid w-full grid-cols-1 items-center justify-between gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Growth Rate"
          value="904"
          icon={Building02Icon}
          trend={{ value: '+5.2%', type: 'negative' }}
        />
        <Card
          title="Total Investors"
          value="573"
          icon={SaveMoneyDollarIcon}
          trend={{ value: '+8.2%', type: 'positive' }}
        />
        <Card
          title="Funds Raised"
          value="23,569.00"
          icon={DollarCircleIcon}
          trend={{ value: '+12.2%', type: 'positive' }}
        />
        <Card
          title="Total Returns"
          value="23,569.00"
          icon={DollarCircleIcon}
          trend={{ value: '+12.2%', type: 'positive' }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <ChartBarMultiple />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <ChartPieLegend />
        </div>
      </div>

      <InvestorsTable
        data={investors}
        onRowClick={handleRowClick}
        onDeleteRows={handleDeleteRows}
        onAddInvestor={handleAddInvestor}
        isLoading={isLoading}
      />
    </div>
  )
}
