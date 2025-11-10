import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ErrorPageProps {
  title?: string
  description?: string
  errorCode?: string
  errorDetails?: string
  actions?: ReactNode
}

export default function ErrorPage({
  title = 'Error',
  description = 'Something went wrong while loading the page. Please try again or contact support if the problem persists.',
  errorCode = '500',
  errorDetails,
  actions,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="mt-2 text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground text-sm">
            <article className="rounded bg-gray-100 p-2 font-mono text-xs break-all">
              <p className="text-xl font-extrabold">{errorCode}</p>
              {errorDetails && <p>{errorDetails}</p>}
            </article>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {actions ?? (
              <>
                <Button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </Button>
                <Button>
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
