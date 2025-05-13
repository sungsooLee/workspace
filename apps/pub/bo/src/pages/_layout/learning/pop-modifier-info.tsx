import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, useModal, ModalContainer, ModalBody, ModalFooter, ModalTitle } from '@learnway/ui';

import styles from './info-list-box.module.css';

export const Route = createFileRoute('/_layout/learning/pop-modifier-info')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const InfoContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>수정자</ModalTitle>
        <ModalBody>
          <div className={cn(styles.start, styles.wrap)}>
            <ul className={styles.info_list}>
              <li>
                <span className={styles.title}>{'이름'}</span>
                <span className={styles.data}>{'김현대(1234567)'}</span>
              </li>
              <li>
                <span className={styles.title}>{'이메일 주소'}</span>
                <span className={styles.data}>{'abcd23445@ict-companion.com'}</span>
              </li>
              <li>
                <span className={styles.title}>{'연락처'}</span>
                <span className={styles.data}>{'+82 01012345678'}</span>
              </li>
            </ul>
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
        width: 'sm', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <InfoContent />,
      });
      hasRun.current = true;
    }
  }, []);
  return <div>제작프로그램/가이드 다운로드 팝업</div>;
}
