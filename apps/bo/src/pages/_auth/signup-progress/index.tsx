import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup-progress/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/signup-progress/"!</div>
}
