import { memo } from 'react';

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  Tabs,
} from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

const WidgetPreviewModalComponent = ({ widgetCode }: { widgetCode: string }) => {
  const { close: closeModal } = useModal();
  const items = [
    {
      title: 'PC',
      key: 'a',
      content: <></>,
    },
    {
      title: 'Mobile',
      key: 'b',
      content: <></>,
    },
  ];
  return (
    <ModalContainer>
      <ModalTitle>{'위젯 미리보기'}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.wrap)}>
          <div className={styles.tab_wrap}>
            <Tabs items={items} type="segment" size="md" />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const WidgetPreviewModal = memo(WidgetPreviewModalComponent);
