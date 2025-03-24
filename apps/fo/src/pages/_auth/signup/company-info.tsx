import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup/company-info')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/signup/company-info"!</div>
}
