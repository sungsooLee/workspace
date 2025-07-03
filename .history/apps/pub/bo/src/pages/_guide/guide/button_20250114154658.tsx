import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/button')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guide/guide/button"!</div>
}
