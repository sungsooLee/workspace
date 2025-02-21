import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '../../../assets/styles/modules/fileUpload.module.css';

export const Route = createFileRoute('/_guide/guide/fileUpload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const FileUploadContent = () => {
    return (
      <div className={styles.fileupload_wrap}>
        <strong className={styles.title}>{'파일 업로드 (Step2/2)'}</strong>
        <p className={styles.text}>
          <span className={cn(styles.status, styles.complete)}>
            {'완료'} <span className={styles.num}>4</span>
          </span>

          <span className={cn(styles.status, styles.error)}>
            {'실패'} <span className={styles.num}>16</span>
          </span>
        </p>
        <div className={styles.selected_text}>
          <p className={styles.text}>{'선택한 관리채널명채널명채널명'}</p>
        </div>
        <div className={styles.wrap}>
          <div className={styles.contents}></div>
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
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <FileUploadContent />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>파일 업로드 팝업 화면</div>;
}
