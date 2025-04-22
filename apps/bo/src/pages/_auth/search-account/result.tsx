import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/search-account/result"!</div>
}
