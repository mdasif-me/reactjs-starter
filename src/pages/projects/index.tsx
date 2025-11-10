import { useState } from 'react'
import { ChartAreaGradient } from './components/chart-area-gradient'
import { ChartRadialStacked } from './components/chart-radial-stacked'
import Header from './components/header'
import { ProjectTable } from './components/project-table'
import type { IProjects } from './interface'

export const Projects = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projects, setProjects] = useState<IProjects[]>([])

  const mockProjects: IProjects[] = [
    {
      property_id: 'P12345',
      name: 'Pine View Apartments',
      location: '123 Maple St, Springfield, USA',
      img: '/images/projects/project-1.jpg',
      type: 'Residential',
      price: '$250,000',
      investment: '$1,500,000',
      views: '3,200',
      status: 'completed',
    },
    {
      property_id: 'P12346',
      name: 'Cedar Park',
      location: '456 Oak St, Springfield, USA',
      img: '/images/projects/project-2.jpg',
      type: 'Commercial',
      price: '$500,000',
      investment: '$2,000,000',
      views: '4,500',
      status: 'ongoing',
    },
  ]

  const handleRowClick = (projects: IProjects) => {
    console.log('Row clicked:', projects)
    // Navigate to projects details or open modal
  }

  const handleDeleteRows = (selectedProjects: IProjects[]) => {
    setProjects((current) =>
      current.filter(
        (project) =>
          !selectedProjects.some((selected) => selected.property_id === project.property_id),
      ),
    )
  }

  const handleAddProject = () => {
    console.log('Add Project clicked')
    // Open add Project form/modal
  }

  return (
    <div className="space-y-6">
      <Header />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <ChartAreaGradient />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <ChartRadialStacked />
        </div>
      </div>
      <ProjectTable
        data={mockProjects}
        onRowClick={handleRowClick}
        onDeleteRows={handleDeleteRows}
        onAddProject={handleAddProject}
        isLoading={false}
      />
    </div>
  )
}
