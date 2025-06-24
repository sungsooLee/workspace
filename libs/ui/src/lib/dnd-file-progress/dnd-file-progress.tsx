import { FC, useCallback, useMemo } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import { Badge, Button, ProgressBar } from '@learnway/ui';
import {
  IcoComplete02,
  IcoFileExcel,
  IcoPause,
  IcoRefresh,
  IcoTrash03,
  IcoUploadCloud,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { UploadFile } from '@learnway/hooks';
import { useDropzone } from 'react-dropzone';
import { DndFileProgressProps } from './types';
import { t } from 'i18next';

const DndFileProgressComponent: FC<DndFileProgressProps> = ({
  files,
  addFiles,
  onRemove,
  onPause,
  onResume,
  onRetry,
  acceptFiles,
  maxFileCount,
  maxFileSize,
  wrapSize,
  guideText,
  errorMessage,
}) => {
  const acceptFileString = useMemo(() => {
    if (!acceptFiles) return '';
    if (typeof acceptFiles === 'string') return acceptFiles;
    return acceptFiles
      .map((acceptFile: any) => (acceptFile.startsWith('.') ? acceptFile : `.${acceptFile}`))
      .join(', ')
      .toUpperCase();
  }, [acceptFiles]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: maxFileSize || 999,
  });

  /**
   * 파일 업로드 상태에 따라 진행률 또는 상태 텍스트를 렌더링하는 함수
   * @param {UploadFile} file - 업로드 대상 파일 객체
   * @returns {JSX.Element} 상태에 맞는 JSX 엘리먼트 반환
   */
  const renderFileProgress = (file: UploadFile) => {
    /**
     * 주어진 상태 코드에 따라 렌더링할 텍스트를 반환하는 함수
     * @param {string} status - 파일의 상태 코드
     * @returns {string | null} 상태에 해당하는 텍스트 (없으면 null)
     */
    const renderStatusText = (status: string) => {
      const statusTexts: Record<string, string> = {
        validating: '유효성 검토중',
        'validating-error': '업로드 불가',
      };
      return statusTexts[status] || null;
    };
    // 현재 파일 상태에 따라 렌더링할 텍스트를 가져옴
    const statusText = renderStatusText(file.status);

    // 상태가 텍스트 렌더링과 관련된 경우
    if (statusText) {
      return <p className={styles.file_status_text}>{statusText}</p>;
    }

    // 텍스트 렌더링 상태가 아닐 경우 진행률 컴포넌트를 렌더링
    return (
      <ProgressBar
        className={styles.progress}
        progress={file.progress} // 진행률 수치 (숫자 값)
        label={file.status} // 진행률 레이블 (현재 상태 표시)
        isFailed={file.status === 'failed'} // 실패 상태 여부에 따라 실패 스타일 적용
      />
    );
  };

  /**
   * 파일의 상태에 따라 적절한 버튼 UI를 렌더링하는 함수
   * @param {UploadFile} file - 업로드 대상 파일 객체
   * @returns {JSX.Element} 상태에 맞는 JSX 엘리먼트 반환
   */
  const renderFileProcessButton = (file: UploadFile) => {
    /**
     * 제어 아이콘(버튼 또는 기타 요소)을 감싸는 래퍼를 렌더링하는 함수
     */
    const renderControl = (icon: JSX.Element, extraClass = '') => (
      <div className={`${styles.control_wrap} ${extraClass}`}>{icon}</div>
    );

    /**
     * 삭제 버튼을 렌더링하는 함수
     */
    const renderDeleteButton = (hasDelete = true) =>
      hasDelete && (
        <Button className={styles.btn_delete} onlyIcon onClick={() => onRemove(file.id)}>
          <IcoTrash03 width={20} height={20} stroke="#131C30" />
        </Button>
      );

    /**
     * 파일 상태와 대응하는 JSX 템플릿 맵
     */
    const statusMap: Record<string, JSX.Element> = {
      /**
       * 업로드 중 (uploading) 상태:
       * - 일시 중지(Pause) 버튼을 렌더링
       * - 삭제 버튼 영역 비어 있음
       */
      uploading: (
        <>
          {renderControl(
            <Button className={styles.btn_status} onlyIcon onClick={() => onPause(file.id)}>
              <IcoPause width={20} height={20} fill="#A9AFB8" />
            </Button>,
          )}
          <div className={styles.delele_btn_wrap}></div>
        </>
      ),
      /**
       * 대기 중 (idle) 상태:
       */
      idle: (
        <>
          {renderControl(
            <Button className={styles.btn_status} onlyIcon onClick={() => onPause(file.id)}>
              <IcoPause width={20} height={20} fill="#A9AFB8" />
            </Button>,
          )}
          <div className={styles.delele_btn_wrap}></div>
        </>
      ),
      /**
       * 완료 (completed) 상태:
       */
      completed: (
        <>
          {renderControl(
            <IcoComplete02 width={20} height={20} fill="#3EB838" className={styles.complete} />,
          )}
          {renderDeleteButton()}
        </>
      ),
      /**
       * 유효성 검사 중 (validating) 상태:
       */
      validating: (
        <>
          {renderControl(
            <Badge
              className={styles.file_status}
              option={{ label: '', value: '' }}
              variant="dot"
              status="ing"
            />,
          )}
          {renderDeleteButton()}
        </>
      ),
      /**
       * 첨부파일 유효성 에러 (validating-error) 상태:
       */
      'validating-error': (
        <>
          {renderControl(
            <Badge
              className={styles.file_status}
              option={{ label: '', value: '' }}
              variant="dot"
              status="error"
            />,
          )}
          {renderDeleteButton()}
        </>
      ),
      /**
       * 기본 상태 (default):
       */
      default: (
        <>
          {renderControl(
            <Button
              className={styles.btn_status}
              onlyIcon
              onClick={() => (file.status === 'paused' ? onResume(file.id) : onRetry(file.id))}
            >
              <IcoRefresh width={20} height={20} fill="#00AFD5" />
            </Button>,
          )}
          <div className={styles.delele_btn_wrap}>{renderDeleteButton(true)}</div>
        </>
      ),
    };

    // 파일 상태에 따른 컴포넌트 반환 (일치하지 않는 상태는 기본 상태로 처리)
    return statusMap[file.status] || statusMap.default;
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={cn(styles.file_wrap, errorMessage && styles.error)}>
        {files.length === 0 && (
          <div className={styles.attach_area} {...getRootProps()}>
            <Button className={styles.btn_file}>
              <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
              <strong className={styles.file_title}>
                {t('LABEL.message.upload.uploadDescription')}
              </strong>
              <span className={styles.file_guide}>{`${acceptFileString}`}</span>
              <input {...getInputProps()} accept={acceptFileString} />
            </Button>
          </div>
        )}

        {/* 파일 업로드 후 */}
        {files.length > 0 && (
          <div className={styles.upload_status}>
            {files.map((file) => (
              <div className={styles.file_item} key={file.id}>
                <div className={styles.file_name}>
                  <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
                  <em className={styles.name}>{file.fileName}</em>
                </div>
                <p className={styles.status_view}>
                  <em className={styles.file_size}>{file.displaySize}</em>
                </p>
                <div className={styles.progress_area}>{renderFileProgress(file)}</div>
                {renderFileProcessButton(file)}
              </div>
            ))}
          </div>
        )}
      </div>
      {(guideText || errorMessage) && (
        <p className={cn(styles.guide_text, errorMessage && styles.error)}>
          {errorMessage || guideText}
        </p>
      )}
    </div>
  );
};

export const DndFileProgress = DndFileProgressComponent;
