import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/pms/menu-channel-open-detail-management',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/pms/menu-channel-open-detail-management"!</div>
}
