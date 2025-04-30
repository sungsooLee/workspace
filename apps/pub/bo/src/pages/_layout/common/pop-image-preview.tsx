import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ModalBody, ModalContainer, useModal, Button } from '@learnway/ui';
import { IcoDownload } from '@learnway/icons';

export const Route = createFileRoute('/_layout/common/pop-image-preview')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const PreviewImageContent = () => {
    return (
      <ModalContainer>
        <ModalBody>
          <div></div>
        </ModalBody>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'full',
        height: 'full',
        content: <PreviewImageContent />,
        headerActionNode: (
          <Button onlyIcon>
            <IcoDownload width={40} height={40} stroke="#131C30" />
          </Button>
        ),
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>이미지 미리보기</div>;
}
