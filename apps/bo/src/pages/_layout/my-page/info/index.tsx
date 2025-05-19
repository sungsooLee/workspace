import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/my-page/info/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/my-page/info/"!</div>
}
