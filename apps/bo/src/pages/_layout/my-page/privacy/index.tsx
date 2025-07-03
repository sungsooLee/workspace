import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/my-page/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/my-page/"!</div>
}
