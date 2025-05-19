import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';

export const Route = createFileRoute('/_layout/learning/training-place/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const routerState = useRouterState();
  const placeUUID = routerState.location.state?.placeUUID;
  return <TrainingPlaceDetail mode="view" placeUUID={placeUUID} />;
}
