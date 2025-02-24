import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal, Progress, Button } from '@learnway/ui';
import { IcoTrash03, IcoPause, IcoFileMp4, IcoComplete02 } from '@learnway/icons';
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
          <div className={styles.contents}>
            {/* file_wrap */}
            <div className={styles.file_wrap}>
              {/* file_item */}
              <div className={styles.file_item}>
                <p className={styles.file_info}>
                  <IcoFileMp4 width={24} height={24} className={styles.icon_file} />
                  <span className={styles.name}>
                    {
                      '파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명'
                    }
                  </span>
                </p>
                <span className={styles.size}>100MB</span>
                <Progress className={styles.progress} value={100} label={'완료'} />
                <Button className={styles.btn_status} onlyIcon>
                  <IcoPause width={20} height={20} fill="#A9AFB8" className={styles.pause} />
                </Button>
                <Button className={styles.btn_delete} onlyIcon>
                  <IcoTrash03 width={20} height={20} stroke="#131C30" />
                </Button>
              </div>
              {/* file_item */}
              <div className={styles.file_item}>
                <p className={styles.file_info}>
                  <IcoFileMp4 width={24} height={24} className={styles.icon_file} />
                  <span className={styles.name}>{'파일명.mp4'}</span>
                </p>
                <span className={styles.size}>100MB</span>
                <Progress className={styles.progress} value={0} label={'대기중'} />
                <Button className={styles.btn_status} onlyIcon>
                  <IcoComplete02
                    width={20}
                    height={20}
                    fill="#3EB838"
                    className={styles.complete}
                  />
                </Button>
                <Button className={styles.btn_delete} onlyIcon>
                  <IcoTrash03 width={20} height={20} stroke="#131C30" />
                </Button>
              </div>
            </div>
          </div>
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
        footer: true,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>파일 업로드 팝업 화면</div>;
}
