import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/respond')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guide/guide/respond"!</div>
}
