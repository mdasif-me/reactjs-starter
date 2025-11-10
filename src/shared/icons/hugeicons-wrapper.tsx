import React from 'react'
import type { SVGProps } from 'react'

export interface HugeIconsProps extends SVGProps<SVGSVGElement> {
  size?: string | number
}

/**
 * Wrapper component for using HugeIcons with custom props
 * HugeIcons are already React components, this just provides a consistent interface
 */
export const withHugeIconsProps = (
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { ref?: React.Ref<SVGSVGElement> }>,
  displayName?: string,
) => {
  const Wrapped = React.forwardRef<SVGSVGElement, HugeIconsProps>((props, ref) => (
    <Icon ref={ref} {...props} />
  ))

  if (displayName) {
    Wrapped.displayName = displayName
  }

  return Wrapped
}

/**
 * Usage example:
 * import { Home01Icon } from 'hugeicons-react'
 *
 * <Home01Icon size={24} className="text-primary" />
 *
 * const HomeIcon = withHugeIconsProps(Home01Icon, 'HomeIcon')
 * <HomeIcon size={24} className="text-primary" />
 */
