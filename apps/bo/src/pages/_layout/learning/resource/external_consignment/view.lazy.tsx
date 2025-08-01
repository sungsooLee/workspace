import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_layout/learning/resource/external_consignment/view',
)({
  component: RouteComponent })

function RouteComponent() {
  return <div>Hello "/_layout/learning/resource/consignment/view"!</div>
}
