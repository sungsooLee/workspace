import { createFileRoute } from '@tanstack/react-router';

import {
  EnContentType,
  LearningWindowLayout,
  useLearningWindow,
  ScormPlayerConfigProperties,
  LearningWindowBaseInfo,
} from '@learnway/ui';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LearningWindowLayout />;
}
