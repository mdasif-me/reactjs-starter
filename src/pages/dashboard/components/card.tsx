import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  value: string | number
  icon: IconSvgElement
  trend?: {
    value: string
    type: 'positive' | 'negative' | 'neutral'
    label?: string
  }
  description?: string
  className?: string
  iconClassName?: string
  trendClassName?: string
  valueClassName?: string
  titleClassName?: string
}

const Card = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
  iconClassName,
  trendClassName,
  valueClassName,
  titleClassName,
}: CardProps) => {
  const trendColors = {
    positive: {
      bg: 'bg-success/10',
      text: 'text-success',
    },
    negative: {
      bg: 'bg-danger/10',
      text: 'text-danger',
    },
    neutral: {
      bg: 'bg-muted/10',
      text: 'text-muted-fg',
    },
  }

  const trendStyle = trend ? trendColors[trend.type] : null

  return (
    <div className={cn('w-full space-y-2 rounded-2xl border bg-white p-4', className)}>
      <article className="flex items-center justify-between">
        <p className={cn('text-muted-fg text-center leading-5 font-medium', titleClassName)}>
          {title}
        </p>
        <div className={cn('rounded-lg border p-2', iconClassName)}>
          <HugeiconsIcon className="text-primary" icon={icon} />
        </div>
      </article>
      <h3 className={cn('text-2xl leading-8 font-semibold', valueClassName)}>{value}</h3>
      {description && <p className="text-muted-fg text-sm leading-5 font-medium">{description}</p>}
      {trend && (
        <p className="text-muted-fg text-sm leading-5 font-medium">
          <span
            className={cn(
              'me-2 rounded-full px-1.5 py-1',
              trendStyle?.bg,
              trendStyle?.text,
              trendClassName,
            )}
          >
            {trend.value}
          </span>
          {trend.label || 'from last month'}
        </p>
      )}
    </div>
  )
}

export default Card
