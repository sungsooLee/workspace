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

/**
 *
 * Modal
 *
 */

const ContentModal = () => {
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
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={'확인'}
          variant={'primary'}
          size={'lg'}
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
  const handleOpenModal = async () => {
    const data = await openModal({
      content: <ContentModal />,
    });
    console.log(data);
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
 * Multi Modal
 * @param args
 * @constructor
 */
export const TemplateMultiModal: any = (args: any) => {
  const { open: openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
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

/**
 *
 * Alert
 *
 */
export const TemplateAlert: any = (args: any) => {
  const { alert: openAlert } = useModal();
  const handleClickAlert = () => {
    // parameter string 버전
    openAlert('title');

    // parameter AlertComponentProps 버전
    // openAlert({
    //   title: 'alert title',
    //   description: 'alert description',
    // });
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
TemplateAlert.storyName = 'Alert';

/**
 *
 * Confirm
 *
 */
export const TemplateConfirm: any = (args: any) => {
  const { confirm: openConfirm } = useModal();
  const handleClickConfirm = () => {
    openConfirm({
      title: 'confirm title',
      content: 'confirm content',
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
TemplateConfirm.storyName = 'Confirm';
