// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, ModalWrapper, useModal } from '@learnway/ui';

export default {
  title: 'Components/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

const Content = ({ setModalData }: any) => {
  const handleClick = () => {
    setModalData?.({ key: 'xxx' });
  };
  return (
    <div>
      <h3>Content</h3>
      <h3>Content</h3>
      <h3>Content</h3>
      <h3>Content</h3>
      <Button label={'setModalData'} onClick={handleClick} />
    </div>
  );
};

export const Template: any = (args: any) => {
  const { open: openModal } = useModal();
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
Template.storyName = 'Basic';

export const TemplateFooter: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    const a = openModal({
      title: 'modal title',
      content: <Content />,
      footer: true, // default footer 사용
      onClose: (data) => {
        console.log('onClose data', data);
      },
    });
    console.log(a);
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
TemplateFooter.storyName = 'Default Footer';

export const TemplateCustomFooter: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      title: 'modal title',
      content: <Content />,
      footer: (
        <>
          <Button label={'취소'} variant={'point'} size={'sm'} actionKey={'cancel'} />
          <Button label={'확인'} variant={'primary'} size={'sm'} actionKey={'confirm'} />
        </>
      ),
      onClose: (data) => {
        console.log('onClose data', data);
      },
    });
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
TemplateCustomFooter.storyName = 'Custom Footer';
