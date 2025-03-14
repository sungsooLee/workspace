import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { IcoUploadCloud } from '@learnway/icons';
import styles from './popup-learningRegisteration.module.css';

export const Route = createFileRoute('/_layout/learning/popup-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
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
  const FileUploadContent = () => {
    return (
      <div className={styles.wrap}>
        <h2 className={styles.title}>{'파일 업로드'}</h2>
        <p className={styles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
        <div className={styles.upload_wrap}>
          <IcoUploadCloud width={40} height={40} stroke="#131c30" className={styles.icon} />
          <strong className={styles.tit_upload}>
            영역을 클릭하거나 파일을 마우스로 끌어놓으세요
          </strong>
          <p className={styles.guide}>
            MP4, WMV, TS, AVI, MKV, MTS, MOV, MXF, MPEG, MPG, WEBM, ASF, SKM, K3G{' '}
          </p>
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
        // footer: <CustomFooter />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>파일 업로드 팝업</div>;
}
