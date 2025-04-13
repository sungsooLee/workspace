import { memo, useState } from 'react';

import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';

import { Notification } from './notification';

import styles from './notification-modal.module.css';

const NotificationModalComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'알림'}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.alarm_wrap)}>
          <Notification />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const NotificationModal = memo(NotificationModalComponent);
