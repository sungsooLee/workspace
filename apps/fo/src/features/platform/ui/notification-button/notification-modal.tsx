import { memo, useState } from 'react';

import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';

import { Notification } from './notification';

const NotificationModalComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'알림'}</ModalTitle>
      <ModalBody>
        <Notification />
      </ModalBody>
    </ModalContainer>
  );
};

export const NotificationModal = memo(NotificationModalComponent);
