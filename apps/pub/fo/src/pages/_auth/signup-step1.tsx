import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup-step1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/signup-step1"!</div>
}
