import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TrainingPlaceDetail mode="add" />;
}
