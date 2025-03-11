// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, CommonReactElementProps, Grid, ModalWrapper, useModal } from '@learnway/ui';

export default {
  title: 'Components/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

const Content = ({ setModalData }: CommonReactElementProps) => {
  const handleRowSelect = (row: any) => {
    console.log(row);
    setModalData?.(row);
  };
  return (
    <div>
      <h4>
        선택한 row 값 setModalData(row) 수행하면 footer 에서 onClose 시 부모창으로 row 값 전달
      </h4>
      <Grid
        title={'grid title'}
        data={[
          { id: 'id1', name: 'name1' },
          { id: 'id2', name: 'name2' },
          { id: 'id3', name: 'name3' },
        ]}
        columns={[{ accessorKey: 'id' }, { accessorKey: 'name' }]}
        onRowSelect={handleRowSelect}
      />
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
      title: '',
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
 * Multi Modal
 * @param args
 * @constructor
 */
export const TemplateMultiModal: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      title: 'first modal',
      content: (
        <div>
          <h1>second modal content</h1>
          <Button
            variant={'primary'}
            size={'md'}
            label={'open second modal'}
            onClick={handleOpenSecondModal}
          />{' '}
        </div>
      ),
    });
  };
  const handleOpenSecondModal = () => {
    openModal({
      title: 'second modal',
      content: <h1>second modal content</h1>,
    });
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
TemplateMultiModal.storyName = 'Multi Modal';
