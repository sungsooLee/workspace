import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';

import { Button, ModalBody, ModalContainer, ModalFooter, useModal, ModalTitle } from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/pop-channel-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const TabContents = () => {
    return (
      <ModalContainer>
        <ModalTitle>{'위젯 미리보기'}</ModalTitle>
        <ModalBody>
          <div></div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
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
  return <div>채널 접수 조회</div>;
}
