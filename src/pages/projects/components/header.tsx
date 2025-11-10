import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/components/ui/button'
import type { JSX } from 'react'

const Header = (): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col items-end justify-between gap-2 md:flex-row md:gap-6">
        <article className="w-full flex-1 sm:min-w-xs">
          <h5 className="text-xl leading-7 font-semibold">Projects</h5>
          <p className="text-muted-fg text-sm leading-5 font-normal">
            Track and manage your projects dashboard efficiently.
          </p>
        </article>
        <Button>
          <HugeiconsIcon
            icon={Add01Icon}
            size={20}
            strokeWidth={2}
            className="h-5 w-5 text-white"
          />
          Add New Project
        </Button>
      </div>
    </div>
  )
}

export default Header
