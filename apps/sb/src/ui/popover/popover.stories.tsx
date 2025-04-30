// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Primitive from '@radix-ui/react-popover';
import { Button, Popover } from '@learnway/ui';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Popover>;

// Popover
export const Template: any = (args: any) => {
  const Content = () => (
    <div className="w-80">
      <h3 className="bg-green-50">Content Header</h3>
      <h4 className="bg-gray-3 h-20">Content Body</h4>
    </div>
  );
  return (
    <Popover {...args} popoverContent={'Popover Content Text'}>
      <button>Open Popover</button>
    </Popover>
  );
};
Template.storyName = 'Popover';

// Button Close (Radix)
export const TemplateButtonCloseRadix: any = (args: any) => {
  const Content = () => (
    <div className="w-80">
      <h3 className="bg-green-50">Content Header</h3>
      <h4 className="bg-gray-3 h-20">Content Body</h4>
      <Primitive.Close asChild>
        <button className="mt-4 rounded bg-blue-500 p-2 text-white">닫기</button>
      </Primitive.Close>
    </div>
  );
  return (
    <Popover {...args} popoverContent={<Content />}>
      <button>Open Popover</button>
    </Popover>
  );
};
TemplateButtonCloseRadix.storyName = 'Button Close (Radix)';

// Button Close (State)
export const TemplateCustomNode: any = (args: any) => {
  const [open, setOpen] = useState(false);
  const Content = () => (
    <div className="w-80">
      <h3 className="bg-green-50">Content Header</h3>
      <h4 className="bg-gray-3 h-20">Content Body</h4>
      <Button variant="primary" size={'sm'} label={'닫기'} onClick={() => setOpen(false)} />
    </div>
  );
  return (
    <Popover {...args} popoverContent={<Content />} open={open} onOpenChange={setOpen}>
      <button>Open Popover</button>
    </Popover>
  );
};
TemplateCustomNode.storyName = 'Button Close (State)';
