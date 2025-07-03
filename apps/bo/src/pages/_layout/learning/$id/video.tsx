import { z } from 'zod';

import { createFileRoute } from '@tanstack/react-router';

/*
type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';
type ProductSearch = {
  page: number;
  filter: string;
  sort: ProductSearchSortOptions;
};
*/
const productSearchSchema = z.object({
  page: z.number().default(1),
  filter: z.string().default(''),
  sort: z.enum(['newest', 'oldest', 'price']).default('newest'),
});

export const Route = createFileRoute('/_layout/learning/$id/video')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { page, filter, sort } = Route.useSearch();

  console.log('RouteComponent', page, filter, sort);
  return <div>Hello "/_layout/learning/$id/video"!</div>;
}
