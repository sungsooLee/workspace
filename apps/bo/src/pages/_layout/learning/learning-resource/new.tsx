import { NotFound } from '@features/layout';
import { LEARNING_TYPE } from '@learnway/config';
import { useCurrentRoute } from '@learnway/hooks';
import { createFileRoute } from '@tanstack/react-router';
import { BlogView } from '@widgets/learning/learning-resource';

export const Route = createFileRoute('/_layout/learning/learning-resource/new')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    state: { contentType },
  } = useCurrentRoute();

  switch (contentType) {
    case LEARNING_TYPE.BLOG:
      return <BlogView />;
  }

  return <NotFound />;
}
