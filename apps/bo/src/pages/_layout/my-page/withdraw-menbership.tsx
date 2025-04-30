import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/my-page/withdraw-menbership')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/my-page/withdraw-menbership"!</div>
}
