import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/progress-status')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/progress-status"!</div>
}
