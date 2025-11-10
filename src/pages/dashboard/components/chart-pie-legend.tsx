'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { RefreshCcwIcon } from 'lucide-react'

const chartData = [
  { status: 'active', value: 275, fill: 'var(--color-chart-1)' },
  { status: 'pending', value: 200, fill: '#E4C56C' },
  { status: 'completed', value: 300, fill: 'var(--color-chart-2)' },
]

const chartConfig = {
  active: {
    label: 'Active',
    color: 'var(--chart-1)',
  },
  pending: {
    label: 'Pending',
    color: 'var(--chart-3)',
  },
  completed: {
    label: 'Completed',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ChartPieLegend() {
  return (
    <Card className="flex h-full min-h-[400px] flex-col rounded-2xl bg-white shadow-none md:min-h-[500px]">
      <CardHeader className="items-center pb-0">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base leading-6 font-semibold">Investment Volume</h1>
          <div className="flex items-center justify-between gap-2">
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
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-96 w-full">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="status" />
            <ChartLegend
              align="center"
              verticalAlign="top"
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
