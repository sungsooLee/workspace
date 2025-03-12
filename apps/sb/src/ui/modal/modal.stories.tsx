// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import {
  Button,
  Grid,
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalWrapper,
  useModal,
} from '@learnway/ui';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

const ModalContent = () => {
  const { close: closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState();
  const { t } = useTranslation();
  return (
    <ModalContainer>
      <ModalTitle>{t('Modal Title')}</ModalTitle>
      <ModalDescription>{t('Modal Description')}</ModalDescription>
      <ModalBody>
        <Grid
          title={'grid title'}
          data={[
            { id: 'id1', name: 'name1' },
            { id: 'id2', name: 'name2' },
            { id: 'id3', name: 'name3' },
          ]}
          columns={[{ accessorKey: 'id' }, { accessorKey: 'name' }]}
          onRowSelect={(row: any) => setSelectedRow(row)}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'point'} size={'sm'} onClick={() => closeModal()} />
        <Button
          label={'확인'}
          variant={'primary'}
          size={'sm'}
          onClick={() => closeModal(selectedRow)}
        />
      </ModalFooter>
    </ModalContainer>
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
      width: 'sm',
      content: <ModalContent />,
      onClose: (data) => console.log('onClose data', data),
    });
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
Template.storyName = 'Modal';

/**
 * Description
 * @param args
 * @constructor
 */
export const TemplateAsync: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = async () => {
    const result = await openModal({
      title: 'modal title',
      description: 'modal description',
      content: <ModalContent />,
    });
    console.log(result);
  };
  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Open Modal</Button>
      <ModalWrapper {...args} />
    </div>
  );
};
TemplateAsync.storyName = 'Modal - Async';

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
