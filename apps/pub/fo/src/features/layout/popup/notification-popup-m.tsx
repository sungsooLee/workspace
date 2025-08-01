import { IcoSetting01 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { memo } from 'react';
import { NotificationContents } from '../../layout';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { Popover } from '@learnway/ui/popover';
import styles from './notification-popup-m.module.css';

const NotificationPopupMComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>
        <div className={styles.alarm_header}>
          {'알림'}
          <Popover
            className={styles.btn_setting}
            popoverContent={<PopoverAlarmState />}
            side="bottom"
            align="center"
            sideOffset={5}
          >
            <IcoSetting01 width={24} height={24} stroke="#131c30" fill="none"></IcoSetting01>
          </Popover>
        </div>
      </ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.alarm_wrap)}>
          {/* contents */}
          <NotificationContents />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

// popover
const PopoverAlarmState = () => {
  return (
    <div className={styles.alarm_state}>
      <Button>전체읽음</Button>
      <Button>전체삭제</Button>
    </div>
  );
};

export const NotificationPopupM = memo(NotificationPopupMComponent);
