import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Pagination } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/pagination')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <Pagination count={100} page={page} onChange={handlePageChange} />
    </div>
  );
}
