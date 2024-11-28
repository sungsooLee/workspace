import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import TestForm from '../../../../src/widgets/test/ui/test-form';
import TestModal from '../../../../src/widgets/test/ui/test-modal';

export const Route = createFileRoute('/_layout/menu6/menu7')({
  component: RouteComponent,
});

function RouteComponent() {
  // return 'Hello /_layout/menu6/menu7!';
  return (
    <div className="p-10">
      <TestModal />
    </div>
  );
}
