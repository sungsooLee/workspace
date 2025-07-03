import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { UppyUpload } from '@learnway/ui';

export const Route = createFileRoute('/_layout/learning/file-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <UppyUpload />
    </div>
  );
}
