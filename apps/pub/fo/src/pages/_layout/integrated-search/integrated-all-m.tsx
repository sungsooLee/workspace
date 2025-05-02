import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/integrated-search/integrated-all-m',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/integrated-search/integrated-all-m"!</div>
}
