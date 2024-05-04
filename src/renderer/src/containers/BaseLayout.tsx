import { type ReactNode } from 'react'
import DragWindowRegion from '../components/DragWindowRegion'

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DragWindowRegion />
      <main>{children}</main>
    </>
  )
}
