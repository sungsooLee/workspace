/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, ModalBody, ModalContainer, ModalFooter, OptionCard, useModal } from '@learnway/ui';
import { getRandomId } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css'; // 퍼블수정 20240318 : libs로 경로 수정
import eBookstyles from '@learnway/styles/bo/assets/styles/modules/e-book.module.css'; // 퍼블수정 20240318 : libs로 경로 수정
import {
  IcoBlog,
  IcoEntrust,
  IcoEtc,
  IcoHtml,
  IcoImage01,
  IcoInfoCircle,
  IcoMybook,
  IcoVideo01,
  IcoVideo02,
  IcoSurvey,
  IcoMultiScorm,
  IcoHomework,
  IcoFolder,
  IcoExam,
} from '@learnway/icons';

export const Route = createFileRoute('/_layout/learning/popup-learningRegisteration')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();

  // 퍼블수정 20240319 : 아이콘 수정 S
  const data = [
    {
      label: '동영상',
      value: getRandomId(),
      icon: <IcoVideo01 />,
      description: '1개 동영상 업로드',
    },
    {
      label: '멀티 동영상',
      value: getRandomId(),
      icon: <IcoVideo02 />,
      description:
        '설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄',
    },
    {
      label: 'HTML 동영상',
      value: getRandomId(),
      icon: <IcoHtml />,
      description: '설명 문구는 최대 2줄까지 노출됩니다. ',
    },
    {
      label: '이미지',
      value: getRandomId(),
      icon: <IcoImage01 />,
      description: '설명 문구는 최대 2줄까지 노출됩니다. ',
    },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    {
      label: '외부 링크',
      value: getRandomId(),
      icon: <IcoInfoCircle />,
      description: '설명문구2줄설명',
    },
    {
      label: '외부 위탁',
      value: getRandomId(),
      icon: <IcoEntrust />,
      description: '설명문구2줄설명',
    },
    { label: '블로그', value: getRandomId(), icon: <IcoBlog />, description: '설명문구2줄설명' },
    {
      label: '이북',
      value: getRandomId(),
      icon: <IcoMybook />,
      description: '설명문구2줄설명',
    },
    { label: '스콤', value: getRandomId(), icon: <IcoFolder />, description: '설명문구2줄설명' },
    {
      label: '멀티 스콤',
      value: getRandomId(),
      icon: <IcoMultiScorm />,
      description: '설명문구2줄설명',
    },
    { label: '설문지', value: getRandomId(), icon: <IcoSurvey />, description: '설명문구2줄설명' },
    { label: '시험지', value: getRandomId(), icon: <IcoExam />, description: '설명문구2줄설명' },
    { label: '과제', value: getRandomId(), icon: <IcoHomework />, description: '설명문구2줄설명' },
  ];
  // 퍼블수정 20240319 : 아이콘 수정 E

  // 퍼블수정 20240317 : Modal 수정 S
  const EbookContent = () => {
    return (
      <ModalContainer>
        <ModalBody>
          <h2 className={eBookstyles.title}>
            이북 등록은
            <br />
            TOAST 프로그램에서 진행합니다.
          </h2>
          <div className={eBookstyles.contents}>
            <p className={eBookstyles.text}>
              TOAST 프로그램을 미설치 시<br /> 설치파일을 다운로드 후 설치하세요.
            </p>
          </div>
          <div className={eBookstyles.btn_box}>
            <Button variant="gray" size="sm">
              {'TOAST 프로그램 설치 파일'}
            </Button>
            <Button variant="gray" size="sm">
              {'TOAST 이북 제작 가이드'}
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  const TypeSelectContent = () => {
    return (
      <ModalContainer>
        <ModalBody>
          <div className={styles.wrap}>
            <div className={styles.title_wrap}>
              <h2 className={styles.title}>{'등록할 학습자원의 유형을 선택하세요.'}</h2>
            </div>
            <OptionCard
              cols={5}
              size="lg"
              className={styles.select_wrap}
              options={data}
              onOptionSelect={(option) => {
                console.log('selected', option);
                option?.label === '이북' &&
                  openModal({
                    // title: '',
                    hideCloseButton: true,
                    width: 'auto',
                    content: <EbookContent />,
                  });
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 퍼블수정 20240317 : Modal 수정 E
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <TypeSelectContent />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>학습자원 조회 유형 선택 팝업</div>;
}
