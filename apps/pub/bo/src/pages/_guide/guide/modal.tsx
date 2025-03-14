import { createFileRoute } from '@tanstack/react-router';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';

const ContentModal = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'타이틀'}</ModalTitle>
      <ModalBody>
        <p>컨텐츠 영역</p>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const Route = createFileRoute('/_guide/guide/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <div className="content">
      <h2 className="guide_tit2">Modal Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/modal/modal.tsx (공통)</p>
      <p className="info">
        모달 size(가로 기준) : sm(600px), md(800px), lg(1024px), xl(1400px) width 속성 적용
      </p>

      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal  } from '@learnway/ui';

// 실행 함수
openModal({
  width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
  content: <ContentModal />,
})`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Modal</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal({
                  width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
                  content: <ContentModal />,
                })
              }>
              모달 팝업 열기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
