'use client'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { RefreshCcwIcon } from 'lucide-react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUp02Icon } from '@hugeicons-pro/core-stroke-rounded'

const chartData = {
  weekly: [
    { key: 'Monday', projects: 50, investments: 30 },
    { key: 'Tuesday', projects: 60, investments: 40 },
    { key: 'Wednesday', projects: 55, investments: 35 },
    { key: 'Thursday', projects: 70, investments: 50 },
    { key: 'Friday', projects: 65, investments: 45 },
    { key: 'Saturday', projects: 80, investments: 60 },
    { key: 'Sunday', projects: 75, investments: 55 },
  ],
  monthly: [
    { key: '1-5', projects: 200, investments: 120 },
    { key: '6-10', projects: 250, investments: 150 },
    { key: '11-15', projects: 220, investments: 130 },
    { key: '16-20', projects: 300, investments: 180 },
    { key: '21-25', projects: 280, investments: 160 },
    { key: '26-30', projects: 260, investments: 140 },
  ],
  quarterly: [
    { key: 'Q1', projects: 600, investments: 400 },
    { key: 'Q2', projects: 500, investments: 460 },
    { key: 'Q3', projects: 700, investments: 450 },
    { key: 'Q4', projects: 900, investments: 600 },
    { key: 'Q5', projects: 800, investments: 500 },
  ],
  yearly: [
    { key: 'January', projects: 200, investments: 120 },
    { key: 'February', projects: 250, investments: 150 },
    { key: 'March', projects: 220, investments: 130 },
    { key: 'April', projects: 300, investments: 180 },
    { key: 'May', projects: 280, investments: 160 },
    { key: 'June', projects: 260, investments: 140 },
    { key: 'July', projects: 320, investments: 200 },
    { key: 'August', projects: 310, investments: 190 },
    { key: 'September', projects: 290, investments: 170 },
    { key: 'October', projects: 330, investments: 210 },
    { key: 'November', projects: 340, investments: 220 },
    { key: 'December', projects: 360, investments: 240 },
  ],
}

const chartConfig = {
  projects: {
    label: 'Projects',
    color: 'var(--chart-1)',
  },
  investments: {
    label: 'Investments',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  const [selectedData, setSelectedData] = useState(chartData.weekly)

  const handleSelectChange = (value: string) => {
    switch (value) {
      case '1':
        setSelectedData(chartData.weekly)
        break
      case '2':
        setSelectedData(chartData.monthly)
        break
      case '3':
        setSelectedData(chartData.quarterly)
        break
      case '4':
        setSelectedData(chartData.yearly)
        break
      default:
        setSelectedData(chartData.weekly)
    }
  }

  return (
    <Card className="flex h-full min-h-[400px] flex-col rounded-2xl bg-white shadow-none md:min-h-[500px]">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base leading-6 font-semibold">Investment Volume</h1>
          <div className="flex items-center justify-between gap-2">
            <Select defaultValue="1" onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                <SelectItem value="1">Weekly</SelectItem>
                <SelectItem value="2">Monthly</SelectItem>
                <SelectItem value="3">Quarterly</SelectItem>
                <SelectItem value="4">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <button
              className="border-border cursor-pointer rounded-lg border p-[7px]"
              onClick={() => window.location.reload()}
            >
              <RefreshCcwIcon className="text-muted-fg h-5 w-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <hr className="-mt-3" />
      <CardContent className="p-0">
        <div className="-mt-3 mb-3 flex flex-col gap-2 px-3 text-sm md:flex-row md:items-center">
          <h1 className="text-2xl leading-8 font-semibold">834</h1>
          <div className="text-primary flex items-center font-semibold">
            <HugeiconsIcon icon={ArrowUp02Icon} /> <p>10,5%</p>
          </div>
          <p className="text-muted-fg">Last updated: July 08, 2025</p>
        </div>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <BarChart
            accessibilityLayer
            data={selectedData}
            margin={{
              left: -10,
            }}
          >
            <ChartLegend
              content={<ChartLegendContent />}
              layout="centric"
              align="right"
              verticalAlign="top"
              className="-mt-8.5 mr-3"
            />
            <CartesianGrid vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey={'key'}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (selectedData === chartData.monthly) {
                  return value.slice(0, 5)
                }
                return value.slice(0, 3)
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="projects" fill="var(--color-chart-1)" radius={8} />
            <Bar dataKey="investments" fill="var(--color-chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
