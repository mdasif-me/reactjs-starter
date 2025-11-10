import React from 'react'
import { ErrorPage } from '@/shared'

interface RouteErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  RouteErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    })
    console.error('loading error:', error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="Loading Error"
          description="Something went wrong while loading this page. Please try again or contact support if the problem persists."
          errorCode={this.state.error?.name || 'Unknown Error'}
          errorDetails={
            this.state.error?.message ||
            this.state.errorInfo?.componentStack ||
            'No additional error details available.'
          }
        />
      )
    }

    return this.props.children
  }
}
