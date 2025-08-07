import { NotFound } from '@features/layout';
import { LEARNING_TYPE } from '@learnway/config';
import { useCurrentRoute } from '@learnway/hooks';
import { createFileRoute } from '@tanstack/react-router';
import {
  AssignmentView,
  BlogView,
  ExamPoolView,
  ExamView,
} from '@widgets/learning/learning-resource';

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
    case LEARNING_TYPE.EXAM:
      return <ExamView />;
    case LEARNING_TYPE.EXAM_POOL:
      return <ExamPoolView />;
    case LEARNING_TYPE.ASSIGNMENT:
      return <AssignmentView />;
  }

  return <NotFound />;
}
