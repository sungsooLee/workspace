import { createFileRoute } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';

const ContentModal = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'타이틀'}</ModalTitle>
      <ModalBody>
        <p>
          컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역
        </p>
        <p>
          컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역
        </p>
        <p>
          컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역
        </p>
        <p>
          컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역
        </p>
        <p>
          컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠
          영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역컨텐츠 영역
        </p>
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
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, ModalDescription, useModal  } from '@learnway/ui';
// Modal open, close
const { open: openModal,  close: closeModal } = useModal();

<ModalContainer>
  <ModalTitle>{'타이틀'}</ModalTitle>
  <ModalDescription>{'텍스트'}</ModalDescription>
  <ModalBody>
    <p>컨텐츠 영역</p>
  </ModalBody>
  <ModalFooter>
    <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
    <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
  </ModalFooter>
</ModalContainer>

// 실행 함수
openModal({
  width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
  // width: isMobile ? 'm_full' : 'sm', // 반응형일때
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
              }
            >
              모달 팝업 열기
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`
import { Button, useModal } from '@learnway/ui';
const CustomFooter = () => {
    const { close: closeModal } = useModal();
    return (
      <>
        <Button variant="gray" size="lg" onClick={() => closeModal()}>
          취소버튼입니다
        </Button>
        <Button variant="primary" size="lg" onClick={() => closeModal()}>
          확인
        </Button>
      </>
    );
  };          
<Button
onClick={() =>
  openModal(<BasicModalContent />, {
    width: 'sm', // sm(600px), md(800px), lg(1024px), xl(1400px)
    footer: true,
  })
}>
모달 팝업 열기
</Button>`}</code>
          </pre>
        </div>
        <h3 className="guide_tit3">Modal(반응형) 띄울때</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'sm',
                  content: <ContentModal />,
                })
              }
            >
              모달 팝업 열기
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`const CustomFooter = () => {
  const { close: closeModal } = useModal();
  return (
    <>   
    // 예시
    <Button
      onClick={() =>
        openModal({
          width: isMobile ? 'm_full' : 'sm',
          content: <BasicModalContent />,
        })
      }>
      모달 팝업 열기
    </Button>
    </>
`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Modal (외부페이지)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`
// 팝업띄울 페이지에 아래코드
import { MpassPopup } from '../../features/auth'; // 팝업 불러오기

// 모달(팝업) 코드 샘플  (mpass-popup.jsx)
import { memo } from 'react';
import styles from './mpass-popup.module.css'; // 외부페이지 모달css

const MpassPopupCompoment = () => {
  return (
    <div className={styles.start}>
      외부페이지 예시
    </div>
  );
};

export const MpassPopup = memo(MpassPopupCompoment);
`}</code>
          </pre>
        </div>
        <div className="info">
          팝업 파일(.tsx)는 따로 만들어주며 위에 예시코드(샘플)을 참고한다.
          <br />
          모달은 popup 이름으로 생성한다. ex)mpass-popup.tsx
          <br />각 팝업마다 모듈css를 생성한다.
        </div>

        <h3 className="guide_tit3">Modal (두개일경우 닫고+열기)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import
import { Button, useModal } from '@learnway/ui';

// 호출
const { open: openModal } = useModal();
const { close: closeModal } = useModal();

<Button
  onClick={() => {
    closeModal(); // 모달 닫기 함수 호출
    setTimeout(() => {
      openModal({
        width: 'sm',
        content: <GoogleCert2Popup />,
      });
    });
  }}>
  스캔할 수 없나요?
</Button>`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Modal (자동으로 띄우기)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import
import { useEffect } from 'react';
import { Button, useModal } from '@learnway/ui';

// 호출
const { open: openModal, close: closeModal } = useModal();

// 자동모달 띄우기
useEffect(() => {
 openModal({
    width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
    content: <NoticeDetailPopup />, // 페이지 팝업 콤포넌트 or 팝업 내용
  });
}, [openModal]);`}</code>
          </pre>
        </div>

        <div className="info">페이지 접근시 모달팝업 자동실행(퍼블확인용)</div>
      </div>

      <h3 className="guide_tit3">Modal(바텀시트) 띄울때 : 모바일 모드로 확인</h3>
      <div className="flex_box">
        <div className="desc">
          <Button
            onClick={() =>
              openModal({
                width: isMobile ? 'm_bottom_sheet' : 'sm',
                content: <ContentModal />,
              })
            }
          >
            바텀시트 팝업 열기
          </Button>
        </div>
      </div>
      <div className="code_example">
        <pre className="code_block">
          <code>{`const CustomFooter = () => {
  const { close: closeModal } = useModal();
  return (
    <>   
    // 예시
    <Button
      onClick={() =>
        openModal({
          width: isMobile ? 'm_bottom_sheet' : 'sm',
          content: <BasicModalContent />,
        })
      }>
      모달 팝업 열기
    </Button>
    </>
`}</code>
        </pre>
      </div>
    </div>
  );
}
