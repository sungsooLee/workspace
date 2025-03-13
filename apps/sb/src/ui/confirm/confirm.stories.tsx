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
      onClose: (value: boolean) => console.log(value),
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
Template.storyName = 'Confirm';

export const TemplateAsync: any = (args: any) => {
  const { confirm: openConfirm } = useModal();
  const handleClickConfirm = async () => {
    const result = await openConfirm('confirm title');
    console.log(result);
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
TemplateAsync.storyName = 'Async Confirm';
