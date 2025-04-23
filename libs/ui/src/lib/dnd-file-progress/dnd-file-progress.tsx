import { cn } from '@learnway/shared';
import { Badge, Button, Progress } from '@learnway/ui';
import {
  IcoComplete02,
  IcoPause,
  IcoPpt,
  IcoRefresh,
  IcoTrash03,
  IcoUploadCloud,
} from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { FC, useCallback } from 'react';
import { DndFileProgressProps } from '@/libs/ui/src/lib/dnd-file-progress/types';
import { FileItemStatus } from '@learnway/hooks';
import { t } from 'i18next';
import { useDropzone } from 'react-dropzone';

/**
 * DndProgress
 * @param files
 * @param addFiles
 * @param onCancel
 * @param onRetry
 * @param onRemove
 * @constructor
 */
const DndFileProgressComponent: FC<DndFileProgressProps> = ({
  files,
  addFiles,
  onCancel,
  onRetry,
  onRemove,
  multiple = false,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: multiple ? 50 : 1 });

  const statusToLabel = (status: FileItemStatus) => {
    switch (status) {
      case 'complete':
        return t('완료');
      case 'uploading':
        return t('진행중');
      case 'cancel':
        return t('업로드 취소');
      case 'error':
        return t('실패');
    }
    return t('대기중');
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={cn(styles.file_wrap)}>
        {/* 파일 첨부 하기 전 */}
        {files.length === 0 && (
          <div className={styles.attach_area} {...getRootProps()}>
            <Button className={styles.btn_file}>
              <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
              <strong className={styles.file_title}>
                {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
              </strong>
              <span className={styles.file_guide}>
                {'PNG, JPG, GIF, PDF / Max file size : 50MB'}
              </span>
              <input {...getInputProps()} />
            </Button>
          </div>
        )}

        {/* 파일 업로드 */}
        <div className={styles.upload_status}>
          {files.map((file, index) => (
            <div key={index} className={styles.file_item}>
              <div className={styles.file_name}>
                <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                <em className={styles.name}>{file.filename}</em>
              </div>
              <p className={styles.status_view}>
                <em className={styles.file_size}>{file.dpSize}</em>
              </p>
              {file.status === 'uploading' && (
                <div className={styles.progress_area}>
                  <Progress
                    className={styles.progress}
                    value={file.progress || 0}
                    label={statusToLabel(file.status)}
                  />
                </div>
              )}
              {file.status === 'complete' && (
                <div className={styles.control_wrap}>
                  <IcoComplete02
                    width={20}
                    height={20}
                    fill="#3EB838"
                    className={styles.complete}
                  />
                </div>
              )}
              {file.status === 'waiting' && (
                <>
                  <div className={styles.progress_area}>
                    <p className={styles.file_status_text}>{'유효성 검토 중'}</p>
                  </div>
                  <div className={styles.control_wrap}>
                    <Badge
                      className={styles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="ing"
                    />
                  </div>
                </>
              )}
              {file.status === 'error' && (
                <>
                  <div className={styles.progress_area}>
                    <p className={styles.file_status_text}>{'업로드 불가'}</p>
                  </div>
                  <div className={styles.control_wrap}>
                    <Badge
                      className={styles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="error"
                    />
                  </div>
                </>
              )}
              {file.status === 'uploading' && (
                <div className={styles.control_wrap}>
                  <Button className={styles.btn_status} onlyIcon onClick={() => onCancel(file.id)}>
                    <IcoPause width={20} height={20} fill="#A9AFB8" />
                  </Button>
                </div>
              )}

              {file.status === 'cancel' && (
                <div className={styles.control_wrap}>
                  <Button className={styles.btn_status} onlyIcon onClick={() => onRetry(file.id)}>
                    <IcoRefresh width={20} height={20} fill="#00AFD5" />
                  </Button>
                </div>
              )}
              {(file.status === 'cancel' || file.status === 'complete') && (
                <Button className={styles.btn_delete} onlyIcon onClick={() => onRemove(file.id)}>
                  <IcoTrash03 width={20} height={20} stroke="#131C30" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DndFileProgress = DndFileProgressComponent;
