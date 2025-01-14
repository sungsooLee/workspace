import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/typography')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guide/guide/typography"!</div>
}
