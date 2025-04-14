import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/platform/widget/view')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/platform/widget/view"!</div>
}
