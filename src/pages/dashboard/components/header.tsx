import { Calendar01Icon, File01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/components/ui/button'
import { RefreshCcwIcon } from 'lucide-react'
import type { IUser } from '../interface'
import type { JSX } from 'react'
import { useState, useEffect } from 'react'

interface HeaderProps {
  user: IUser
}

/**
 * A header component for the dashboard that displays a welcome message and some buttons.
 * @param {HeaderProps} props - The component props containing the user object.
 * @returns {JSX.Element} - The header component.
 */

// TODO: Replace with real dashboard/table data when available

const Header = ({ user }: HeaderProps): JSX.Element => {
  // TODO: Replace with real data check
  const exportAvailable = false
  const [exporting, setExporting] = useState(false)
  // Last updated state (null means unknown)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Example: update lastUpdated after data fetch
  useEffect(() => {
    // TODO: Replace with real data fetch logic
    // Simulate data fetch
    const timer = setTimeout(() => {
      setLastUpdated(new Date())
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  const exportCsv = async () => {
    try {
      // Example: Replace with real data source
      const data = null // e.g., getDashboardData() or from props/context
      if (!data) {
        // Not implemented yet
        throw new Error('Export not implemented yet')
      }
      // Example CSV logic:
      // const headers = Object.keys(data[0])
      // const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? "")).join(","))
      // const csv = [headers.join(","), ...rows].join("\r\n")
      // const blob = new Blob([csv], { type: 'text/csv' })
      // const url = URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.href = url
      // a.download = `dashboard-export-${new Date().toISOString().slice(0,10)}.csv`
      // document.body.appendChild(a)
      // a.click()
      // document.body.removeChild(a)
      // URL.revokeObjectURL(url)
    } catch (err) {
      // You can show a toast or log error
      // toast.error(err instanceof Error ? err.message : 'Export failed')
      // For now, just log
      console.error(err)
    }
  }
  const handleExport = async () => {
    setExporting(true)
    try {
      await exportCsv()
    } finally {
      setExporting(false)
    }
  }
  return (
    <div className="flex flex-wrap items-end justify-between gap-2 md:gap-6">
      <article className="w-full flex-1 sm:min-w-xs">
        <h5 className="text-xl leading-7 font-semibold">Welcome back, {user.name}!</h5>
        <p className="text-muted-fg text-sm leading-5 font-normal">
          Track and manage your property dashboard efficiently.
        </p>
      </article>
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <article className="border-border flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 lg:w-96">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <HugeiconsIcon
              icon={Calendar01Icon}
              size={20}
              color="currentColor"
              strokeWidth={2}
              className="text-muted-fg/70 h-5 w-5"
            />
            <p className="text-muted-fg text-xs leading-5 font-semibold md:text-sm">
              Last updated:{' '}
              {lastUpdated ? (
                lastUpdated.toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })
              ) : (
                <span className="text-muted-fg/70 italic">unknown</span>
              )}
            </p>
          </div>
          <button className="cursor-pointer" onClick={() => window.location.reload()}>
            <RefreshCcwIcon className="text-primary h-4 w-4" />
          </button>
        </article>{' '}
        <div
          {...(!exportAvailable ? { title: 'Export not implemented yet' } : {})}
          className="inline-block w-full md:w-fit"
        >
          <Button
            className="w-full px-4 py-2 text-sm whitespace-nowrap sm:w-fit md:text-base"
            size="md"
            aria-label="Export dashboard data as CSV"
            onClick={handleExport}
            isDisabled={!exportAvailable || exporting}
          >
            <HugeiconsIcon
              icon={File01Icon}
              size={20}
              color="currentColor"
              strokeWidth={2}
              className="size-4 text-white md:size-5"
            />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
