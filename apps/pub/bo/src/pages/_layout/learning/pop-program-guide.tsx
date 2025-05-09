import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, useModal, ModalContainer, ModalBody, ModalFooter, ModalTitle } from '@learnway/ui';

export const Route = createFileRoute('/_layout/learning/pop-program-guide')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const GuideContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>프로그램/가이드 다운로드</ModalTitle>
        <ModalBody>
          <div></div>
        </ModalBody>
        <ModalFooter>
          <Button label={'닫기'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <GuideContent />,
      });
      hasRun.current = true;
    }
  }, []);
  return <div>제작프로그램/가이드 다운로드 팝업</div>;
}
