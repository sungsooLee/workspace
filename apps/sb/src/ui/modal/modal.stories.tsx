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
      <h4>Content</h4>
      <h4>Content</h4>
      <Button label={'setModalData'} variant={'primary'} size={'sm'} onClick={handleClick} />
    </div>
  );
};

/**
 * Basic
 * @param args
 * @constructor
 */
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

/**
 * Description
 * @param args
 * @constructor
 */
export const TemplateDescription: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      title: 'modal title',
      description: 'modal description',
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
TemplateDescription.storyName = 'Description';

/**
 * Default Footer
 * @param args
 * @constructor
 */
export const TemplateFooter: any = (args: any) => {
  const { open: openModal, openAsync } = useModal();
  const handleOpenModal = async () => {
    openModal({
      title: 'modal title',
      content: <Content />,
      footer: true, // default footer 사용
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
TemplateFooter.storyName = 'Default Footer';

/**
 * Custom Footer
 * @param args
 * @constructor
 */
export const TemplateCustomFooter: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      title: 'modal title',
      content: <Content />,
      footer: (
        <>
          <Button label={'취소2'} variant={'point'} size={'sm'} actionKey={'cancel'} />
          <Button label={'확인2'} variant={'primary'} size={'sm'} actionKey={'confirm'} />
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
