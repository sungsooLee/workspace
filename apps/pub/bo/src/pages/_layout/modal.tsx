import { createFileRoute } from '@tanstack/react-router';
import { Button, ModalWrapper, useModalControl } from '@learnway/ui';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModalControl();
  const handleClickAlert = () => {
    openAlert({
      title: 'alert title',
      description:
        'alert description alert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert description',
      isConfirm: true,
    });
  };
  return (
    <div className="content">
      <Button onClick={() => handleClickAlert()}>Open Alert</Button>
      <ModalWrapper />
    </div>
  );
}
