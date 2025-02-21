import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModalControl } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '../../../assets/styles/modules/fileUpload.module.css';

export const Route = createFileRoute('/_guide/guide/fileUpload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModalControl();
  const BasicModalContent = () => {
    return (
      <div className={styles.fileupload_wrap}>
        <strong className={styles.title}>{'파일 업로드 (Step2/2)'}</strong>
        <p className={styles.text}>
          {'완료'}
          <span className={cn(styles.count, styles.complete)}>4</span>
          {'실패'}
          <span className={cn(styles.count, styles.error)}>16</span>
        </p>
      </div>
    );
  };
  useEffect(() => {
    openModal(<BasicModalContent />, {
      title: '타이틀',
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
    });
  }, [openModal]);
  return <div>파일 업로드 팝업 화면</div>;
}
