import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/menu/type2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/menu/type2"!</div>
}
