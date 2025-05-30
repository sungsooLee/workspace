import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/platform/company/organization/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_layout/platform/company/organization/"!</div>
}
