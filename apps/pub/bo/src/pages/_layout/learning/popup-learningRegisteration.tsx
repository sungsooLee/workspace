/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal, Button } from '@learnway/ui';
import styles from './popup-learningRegisteration.module.css';
import {
  IcoMybook,
  IcoBlog,
  IcoEntrust,
  IcoInfoCircle,
  IcoImage01,
  IcoVideo01,
  IcoVideo02,
  IcoHtml,
  IcoEtc,
} from '@learnway/icons';

export const Route = createFileRoute('/_layout/learning/popup-learningRegisteration')({
  component: RouteComponent,
});

interface value {
  icon: React.ReactNode; // 아이콘 컴포넌트
  title: string;
  text: string;
  onClick?: () => void;
}

function RouteComponent() {
  const { open: openModal, alert: openAlert } = useModal();
  const CustomFooter = () => {
    const { close: closeModal } = useModal();
    return (
      <Button
        variant="gray"
        size="lg"
        onClick={() => {
          closeModal();
        }}>
        {'취소'}
      </Button>
    );
  };

  const options: value[] = [
    {
      title: '동영상',
      text: '1개 동영상 업로드',
      icon: <IcoVideo01 className={styles.icon} />,
    },
    {
      title: '멀티 동영상',
      text: '설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄',
      icon: <IcoVideo02 className={styles.icon} />,
    },
    { title: 'HTML 동영상', text: '설명문구2줄설명', icon: <IcoHtml className={styles.icon} /> },
    { title: '이미지', text: '설명문구2줄설명', icon: <IcoImage01 className={styles.icon} /> },
    { title: '기타', text: '설명문구2줄설명', icon: <IcoEtc className={styles.icon} /> },
    {
      title: '외부 링크',
      text: '설명문구2줄설명',
      icon: <IcoInfoCircle className={styles.icon} />,
    },
    { title: '외부 위탁', text: '설명문구2줄설명', icon: <IcoEntrust className={styles.icon} /> },
    { title: '블로그', text: '설명문구2줄설명', icon: <IcoBlog className={styles.icon} /> },
    {
      title: '이북',
      text: '설명문구2줄설명',
      icon: <IcoMybook className={styles.icon} />,
      onClick: () => {
        openAlert({
          title: (
            <>
              이북 등록은 <br />
              TOAST 프로그램에서 진행합니다
            </>
          ),
          description: (
            <>
              TOAST 프로그램을 미설치 시<br /> 설치파일을 다운로드 후 설치하세요.
              <div className={styles.btn_box}>
                <Button variant="gray" size="sm">
                  {'TOAST 프로그램 설치 파일'}
                </Button>
                <Button variant="gray" size="sm">
                  {'TOAST 이북 제작 가이드'}
                </Button>
              </div>
            </>
          ),
        });
      },
    },
    { title: '스콤', text: '설명문구2줄설명', icon: <IcoMybook className={styles.icon} /> },
    { title: '멀티 스콤', text: '설명문구2줄설명', icon: <IcoMybook className={styles.icon} /> },
    { title: '설문지', text: '설명문구2줄설명', icon: <IcoMybook className={styles.icon} /> },
    { title: '시험지', text: '설명문구2줄설명', icon: <IcoMybook className={styles.icon} /> },
    { title: '과제', text: '설명문구2줄설명', icon: <IcoMybook className={styles.icon} /> },
  ];

  const TypeSelectContent = () => {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const handleClick = (idx: number, onClick: () => void) => {
      setActiveIdx(idx);
      if (onClick) {
        onClick?.();
      }
    };
    return (
      <div className={styles.wrap}>
        <h2 className={styles.title}>{'등록할 학습자원의 유형을 선택하세요.'}</h2>
        <div className={styles.select_wrap}>
          {options.map((item, idx) => (
            <Button
              key={idx}
              className={`${styles.select_item} ${activeIdx === idx ? styles.active : ''}`}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onClick={() => handleClick(idx, item.onClick!)}>
              {item.icon}
              <strong className={styles.select_title}>{item.title}</strong>
              <p className={styles.select_text}>{item.text}</p>
            </Button>
          ))}
        </div>
      </div>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        title: '',
        width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <TypeSelectContent />,
        footer: <CustomFooter />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>학습자원 조회 유형 선택 팝업</div>;
}
