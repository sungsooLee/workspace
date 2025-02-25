import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal, Button, RadioCard } from '@learnway/ui';
import styles from './popup-learningRegisteration.module.css';
// import { IcoTrash03, IcoPause, IcoFileMp4, IcoComplete02, IcoRefresh } from '@learnway/icons';
// import { cn } from '@learnway/shared';

export const Route = createFileRoute('/_layout/learning/popup-learningRegisteration')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const CustomFooter = () => {
    const { close: closeModal } = useModal();
    return (
      <Button variant="gray" size="lg" onClick={() => closeModal()}>
        {'취소'}
      </Button>
    );
  };
  const TypeSelectContent = () => {
    return (
      <div className={styles.wrap}>
        <h2 className={styles.title}>{'등록할 학습자원의 유형을 선택하세요.'}</h2>
        <div className={styles.select_wrap}></div>
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
