import React from 'react'

interface IGuestLayoutProps {
  children: React.ReactNode
}

export const GuestLayout: React.FC<IGuestLayoutProps> = ({ children }) => {
  return <div className="min-h-screen w-full">{children}</div>
}
