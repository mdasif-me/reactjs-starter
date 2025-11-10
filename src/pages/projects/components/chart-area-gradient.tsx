'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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

const chartData = {
  weekly: [
    { key: 'Monday', investors: 50, investments: 30 },
    { key: 'Tuesday', investors: 60, investments: 40 },
    { key: 'Wednesday', investors: 55, investments: 35 },
    { key: 'Thursday', investors: 70, investments: 50 },
    { key: 'Friday', investors: 65, investments: 45 },
    { key: 'Saturday', investors: 80, investments: 60 },
    { key: 'Sunday', investors: 75, investments: 55 },
  ],
  monthly: [
    { key: '1-5', investors: 200, investments: 120 },
    { key: '6-10', investors: 250, investments: 150 },
    { key: '11-15', investors: 220, investments: 130 },
    { key: '16-20', investors: 300, investments: 180 },
    { key: '21-25', investors: 280, investments: 160 },
    { key: '26-30', investors: 260, investments: 140 },
  ],
  quarterly: [
    { key: 'Q1', investors: 600, investments: 400 },
    { key: 'Q2', investors: 500, investments: 460 },
    { key: 'Q3', investors: 700, investments: 450 },
    { key: 'Q4', investors: 900, investments: 600 },
    { key: 'Q5', investors: 800, investments: 500 },
  ],
  yearly: [
    { key: 'January', investors: 200, investments: 120 },
    { key: 'February', investors: 250, investments: 150 },
    { key: 'March', investors: 220, investments: 130 },
    { key: 'April', investors: 300, investments: 180 },
    { key: 'May', investors: 280, investments: 160 },
    { key: 'June', investors: 260, investments: 140 },
    { key: 'July', investors: 320, investments: 200 },
    { key: 'August', investors: 310, investments: 190 },
    { key: 'September', investors: 290, investments: 170 },
    { key: 'October', investors: 330, investments: 210 },
    { key: 'November', investors: 340, investments: 220 },
    { key: 'December', investors: 360, investments: 240 },
  ],
}

const chartConfig = {
  investors: {
    label: 'Investors',
    color: 'var(--chart-1)',
  },
  investments: {
    label: 'Investments',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ChartAreaGradient() {
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
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <AreaChart
            accessibilityLayer
            data={selectedData}
            margin={{
              top: 10,
              right: 25,
              left: 0,
              bottom: 0,
            }}
          >
            <ChartLegend
              content={<ChartLegendContent />}
              layout="radial"
              align="left"
              verticalAlign="top"
              className="-mt-10 ml-6.5"
            />
            <CartesianGrid vertical={true} horizontal={false} strokeDasharray="4 4" />
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
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FAA43F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FAA43F00" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FAA43F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FAA43F00" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="investors"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-chart-2)"
              stackId="a"
            />
            <Area
              dataKey="investments"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-chart-1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
