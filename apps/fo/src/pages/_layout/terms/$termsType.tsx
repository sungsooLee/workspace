import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/terms/$termsType')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/terms/$termsType"!</div>
}
