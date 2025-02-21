// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, ModalWrapper, useModal } from '@learnway/ui';

export default {
  title: 'Components/Alert',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  const { alert: openAlert } = useModal();
  const handleClickAlert = () => {
    openAlert({
      title: 'alert title',
      description: 'alert description',
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Button onClick={() => handleClickAlert()}>Open Alert</Button>
      </div>
      <ModalWrapper {...args} />
    </div>
  );
};
Template.storyName = 'Basic';
Template.args = {};
