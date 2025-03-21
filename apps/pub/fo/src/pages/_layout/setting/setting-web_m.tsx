import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/setting/setting-web_m')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/setting/setting-web_m"!</div>
}
