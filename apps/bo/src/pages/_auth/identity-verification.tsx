import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/identity-verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/identity-verification"!</div>
}
