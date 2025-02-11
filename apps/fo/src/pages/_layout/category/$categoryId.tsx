import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/category/$categoryId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  return (
    <div>
      {/* <div className={styles.breadcrums}>
        <div className={styles.inner}>
          <Breadcrumbs />
        </div>
      </div> */}
      Hello "/_layout/category/$categoryId"!
    </div>
  );
}
