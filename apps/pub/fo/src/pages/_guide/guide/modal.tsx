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
      <p className="loc react">/src/features/auth/popup (외부 모달(팝업) 저장소)</p>
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
    title: '타이틀',
    width: 'sm', // sm(600px), md(800px), lg(1024px), xl(1400px)
    footer: true,
  })
}>
모달 팝업 열기
</Button>`}</code>
          </pre>
        </div>
        <h3 className="guide_tit3">Modal(footer custom) 케이스</h3>
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
        <div className="code_example">
          <pre className="code_block">
            <code>{`const CustomFooter = () => {
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

// 예시
<Button
  onClick={() =>
    openModal({
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <BasicModalContent />,
    })
  }>
  모달 팝업 열기
</Button>
`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Modal (외부)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`
// 팝업띄울 페이지에 아래코드
import { MpassPopup } from '../../features/auth'; // 팝업 불러오기


// 모달(팝업) 코드 샘플  (mpass-popup.jsx)
import { memo } from 'react';
import styles from './mpass-popup.module.css';
import imgGuide1 from '@learnway/styles/fo/assets/images/popup/img_mpass_guide1.png';
import imgGuide2 from '@learnway/styles/fo/assets/images/popup/img_mpass_guide2.png';

const MpassPopupCompoment = () => {
  return (
    <div className={styles.mpass_popup}>
      <div className={styles.title_box}>
        <h3 className={styles.tit}>현재 본인 확인이 진행 중입니다.</h3>
        <p className={styles.txt}>모바일 MPASS 앱에서 인증을 진행해 주세요</p>
      </div>

      <div className={styles.guide_info}>
        <div className={styles.info_box}>
          <div className={styles.time}>
            남은 시간 <strong>30</strong>초
          </div>
          <p className={styles.info}>
            남은 시간 내에 모바일 MPASS 앱에서 본인 확인을 진행해 주세요. <br />
            현재 창을 닫으면 본인 확인이 종료됩니다.
          </p>
        </div>

        <div className={styles.guide_box}>
          <div className={styles.item}>
            <figure className={styles.img}>
              <img src={imgGuide1} alt="" />
            </figure>
            <p className={styles.desc}>
              1. 모바일에서 MPASS 앱을 실행하거나
              <br /> PUSH 메시지를 터치해 주세요.
            </p>
          </div>

          <div className={styles.item}>
            <figure className={styles.img}>
              <img src={imgGuide2} alt="" />
            </figure>
            <p className={styles.desc}>
              2. MPASS 앱에서 FIDO 인증을 완료하면
              <br /> 로그인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.inquiry}>지원 문의 계정인증 개발팀 : +82-2-6296-6409</div>
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
      </div>
    </div>
  );
}
