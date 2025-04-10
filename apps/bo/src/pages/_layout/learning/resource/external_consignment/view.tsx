import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/learning/resource/external_consignment/view',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/learning/resource/consignment/view"!</div>
}
