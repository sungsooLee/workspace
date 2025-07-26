import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/course/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  return <div>
    <div>Hello "/_layout/course/"!</div>
    <br />
    <br />
    <Link to="/course/detail" state={{ courseId: 0 }}>
      과정 샘플 데이터
    </Link>
  </div>
}
