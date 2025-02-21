// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, ModalWrapper, useModal } from '@learnway/ui';

export default {
  title: 'Components/Confirm',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  const { confirm: openConfirm } = useModal();
  const handleClickConfirm = () => {
    openConfirm({
      title: 'confirm title',
      description: 'confirm description',
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Button onClick={() => handleClickConfirm()}>Open Confirm</Button>
      </div>
      <ModalWrapper {...args} />
    </div>
  );
};
Template.storyName = 'Basic';
Template.args = {};
