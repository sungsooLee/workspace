import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/color')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guide/guide/color"!</div>
}
