// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, ModalWrapper, useModalControl } from '@learnway/ui';

export default {
  title: 'Components/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

const Content = () => {
  return (
    <div>
      <h3>Content</h3>
      <h3>Content</h3>
      <h3>Content</h3>
      <h3>Content</h3>
      <h3>Content</h3>
    </div>
  );
};

export const Template: any = (args: any) => {
  const { open: openModal } = useModalControl();
  const handleOpenModal = () => {
    openModal({
      title: 'modal title',
      content: <Content />,
      hideFooter: true,
    });
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
Template.storyName = 'Basic';

export const TemplateFooter: any = (args: any) => {
  const { open: openModal } = useModalControl();
  const handleOpenModal = () => {
    openModal({
      title: 'modal title',
      content: <Content />,
    });
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
TemplateFooter.storyName = 'Default Footer';
