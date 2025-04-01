/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  Tabs,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

/* tab contents */
import { PcContents } from './-tabcontents/pc-contents'; // PC
import { MobileContents } from './-tabcontents/mobile-contents'; // Mobile

export const Route = createFileRoute('/_layout/pms/popup-widget-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const items = [
    {
      title: 'PC',
      key: 'a',
      content: <PcContents />,
    },
    {
      title: 'Mobile',
      key: 'b',
      content: <MobileContents />,
    },
  ];
  const TabContents = () => {
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
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <TabContents />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>위젯 미리보기</div>;
}
