import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/navigate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/navigate"!</div>
}
