import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/learning/resource/assignment/view',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/learning/resource/assignment/view"!</div>
}
