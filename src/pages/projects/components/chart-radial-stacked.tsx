'use client'

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { RefreshCcwIcon } from 'lucide-react'
import { useMediaQuery } from '../../../hooks/use-media-query'

export const description = 'A radial chart with stacked sections'

const chartData = [{ key: 'january', available: 1260, investments: 570, investors: 300 }]

const chartConfig = {
  available: {
    label: 'Available Projects',
    color: '#E4C56C',
  },
  investments: {
    label: 'Investments',
    color: 'var(--chart-2)',
  },
  investors: {
    label: 'Total Investors',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const isMiddle = useMediaQuery('(min-width: 1024px) and (max-width: 1280px)')

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
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={isMobile ? 140 : isMiddle ? 150 : 200}
            outerRadius={isMobile ? 90 : isMiddle ? 98 : 100}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 50}
                          className="fill-foreground text-2xl leading-8 font-semibold"
                        >
                          25%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 20}
                          className="fill-muted-fg text-xs leading-6 sm:text-sm"
                        >
                          of your projects has raised funds
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>

            <RadialBar
              dataKey="available"
              stackId="a"
              cornerRadius={5}
              fill="#005523"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="investments"
              fill="#E4C56C"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="investors"
              fill="#0CA655"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="-mt-24 space-y-3 font-medium sm:-mt-32 sm:space-y-5">
          <div>
            {chartData && (
              <div className="flex items-center justify-between">
                <article className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartConfig.available.color }}
                  ></span>
                  <span>{chartConfig.available.label}</span>
                </article>
                <span className={'text-muted-fg'}>{chartData[0].available}</span>
              </div>
            )}
          </div>
          <div>
            {chartData && (
              <div className="flex items-center justify-between">
                <article className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartConfig.investments.color }}
                  ></span>
                  <span>{chartConfig.investments.label}</span>
                </article>
                <span className={'text-muted-fg'}>{chartData[0].investments}</span>
              </div>
            )}
          </div>
          <div>
            {chartData && (
              <div className="flex items-center justify-between">
                <article className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartConfig.investors.color }}
                  ></span>
                  <span>{chartConfig.investors.label}</span>
                </article>
                <span className={'text-muted-fg'}>{chartData[0].investors}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
