import { Loader2 } from 'lucide-react'

/**
 * a full-screen loading component with a loading animation and a message indicating that content is being loaded.
 *
 * @returns A full-screen loading component.
 */

const Loading = () => {
  return (
    <div className="bg-bg flex min-h-[90vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground text-sm">Please wait while we load your content</p>
        </div>
      </div>
    </div>
  )
}

export default Loading
