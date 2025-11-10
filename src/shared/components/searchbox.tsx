import * as React from 'react'
import { CircleFadingPlusIcon, FileInputIcon, FolderPlusIcon, SearchIcon } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export default function SearchBox() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <button
        className="border-border placeholder:text-muted-fg/70 focus-visible:border-ring focus-visible:ring-ring/50 text-muted inline-flex h-9 w-fit rounded-md border bg-white px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] lg:min-w-72"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon className="me-3 text-[#818898]" size={16} aria-hidden="true" />
          <span className="font-normal text-[#818898]">Quick search...</span>
        </span>
        <kbd className="flex items-center">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#ECEFF3] pt-0.5 font-[inherit] text-sm font-semibold text-[#818898]">
            ⌘
          </span>
          <span className="ms-1 flex h-5 w-5 items-center justify-center rounded bg-[#ECEFF3] font-[inherit] text-sm font-semibold text-[#818898]">
            K
          </span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="JUMP TO">
            <CommandItem>
              <FolderPlusIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>New folder</span>
            </CommandItem>
            <CommandItem>
              <FileInputIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Import document</span>
            </CommandItem>
            <CommandItem>
              <CircleFadingPlusIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Add block</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
