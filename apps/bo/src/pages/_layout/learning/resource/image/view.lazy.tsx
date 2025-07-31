import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/learning/resource/image/view')({
  component: RouteComponent })

function RouteComponent() {
  return <div>Hello "/_layout/learning/resource/image/view"!</div>
}
