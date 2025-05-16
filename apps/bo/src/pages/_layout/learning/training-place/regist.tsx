import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  //  return <TrainingPlaceDetail mode="add" />;
  return <TrainingPlaceDetail mode="view" placeUUID={'e8f2ccc0-4ffa-456e-8d77-22ad38d3efb1'} />;
}
