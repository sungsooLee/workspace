import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/components/Layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guide/guide/components/layout"!</div>
}
