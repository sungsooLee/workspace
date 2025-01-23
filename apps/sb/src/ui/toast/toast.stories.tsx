// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, ToastWrapper, useToast } from '@learnway/ui';

export default {
  title: 'Components/Toast',
  component: ToastWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  const { open: openToast } = useToast()
  const handleClickToast = () => {
    openToast({
      title: 'toast title',
      description: 'toast desc',
    })
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Button onClick={() => handleClickToast()}>Open Toast</Button>
      </div>
      <ToastWrapper />
    </div>
  )
}
Template.storyName = 'Basic';
Template.args = {

};
