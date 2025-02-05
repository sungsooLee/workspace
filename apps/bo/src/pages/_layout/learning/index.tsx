import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/menu/"!22</div>
}
