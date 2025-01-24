import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/category/$categoryId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  return <div>Hello "/_layout/category/$categoryId"!</div>;
}
