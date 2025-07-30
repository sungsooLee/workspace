import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/course/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <div>Hello "/_layout/course/"!</div>
      <br />
      <br />
      <div>
        <Link to="/course/detail" state={{ courseId: 7 }}>
          과정 샘플 데이터 7
        </Link>
      </div>
    </div>
  );
}
