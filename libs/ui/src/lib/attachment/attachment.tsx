import { useCallback, useMemo, useState } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import {
  IcoComplete02,
  IcoFileExcel,
  IcoPause,
  IcoRefresh,
  IcoTrash03,
  IcoUploadCloud,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { UploadFile, useFileManager } from '@learnway/hooks';
import { useDropzone } from 'react-dropzone';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { ProgressBar } from '../progress/progress-bar/progress-bar';
import { Info, Paperclip } from 'lucide-react';
import { Checkbox } from '../checkbox/checkbox';
import { useModal } from '../modal/modal.hook';
import { t } from 'i18next';
import { AttachmentProps } from './types';

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formatted} ${sizes[i]}`;
}

const AttachmentComponent = ({
  files,
  addFiles,
  onRemove,
  onPause,
  onResume,
  onRetry,
  acceptFiles,
  maxFileCount,
  maxFileSize,
  isDownloadCase = false,
}: AttachmentProps) => {
  const acceptFileString = useMemo(() => {
    if (!acceptFiles || typeof acceptFiles === 'string') return '';
    return acceptFiles
      .map((acceptFile) => (acceptFile.startsWith('.') ? acceptFile : `.${acceptFile}`))
      .join(', ')
      .toUpperCase();
  }, [acceptFiles]);

  const isOverMaxFileCount = files.length >= maxFileCount;

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (isOverMaxFileCount) return;
      addFiles(acceptedFiles);
    },
    [files],
  );

  const { getRootProps, getInputProps, inputRef, open } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: maxFileCount,
    maxSize: maxFileSize,
    noClick: true,
    noKeyboard: true,
  });

  // 파일 다이얼로그 열기 + input 초기화
  const handleOpen = () => {
    open();
  };

  const { fileDownload, filesDownload } = useFileManager();

  const { alert: openAlert } = useModal();

  const removeFile = async () => {
    if (checkedValues.length === 0) {
      await openAlert({
        title: t('LABEL.confirm.fileSelectForDelete.title'),
        content: t('LABEL.confirm.fileSelectForDelete.message'),
      });
    } else {
      await openAlert({
        isConfirm: true,
        title: t('LABEL.confirm.fileDelete.title'),
        content: t('LABEL.confirm.fileDelete.message'),
        onClose: (isConfirm) => {
          if (isConfirm) {
            checkedValues.forEach((id) => {
              onRemove(id);
            });
          }
        },
      });
    }
  };

  const downloadFile = async () => {
    if (checkedValues.length === 0) {
      await openAlert({
        title: t('LABEL.confirm.fileSelectForDownload.title'),
        content: t('LABEL.confirm.fileSelectForDownload.message'),
      });
    } else if (checkedValues.length === 1) {
      await fileDownload(checkedValues[0]);
    } else {
      await filesDownload(checkedValues);
    }
  };

  const handleCheckChange = (checked: boolean, checkedValue: string) => {
    const checkOptions = [...checkedValues, checkedValue];
    const unCheckOptions = checkedValues?.filter((d: string) => d !== checkedValue);
    setCheckedValues(checked ? checkOptions : unCheckOptions);
  };

  /**
   * 파일 업로드 상태에 따라 진행률 또는 상태 텍스트를 렌더링하는 함수
   * @param {UploadFile} file - 업로드 대상 파일 객체
   * @returns {JSX.Element} 상태에 맞는 JSX 엘리먼트 반환
   */
  const renderFileProgress = (file: UploadFile) => {
    if (isDownloadCase) return;
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
      <div className="flex items-center justify-between rounded bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-lg text-gray-700">
          <span>파일올리기</span>
          <Paperclip className="h-5 w-5 text-gray-500" />
          <span className="text-[#00bcd4]">{`${files.length}/${maxFileCount}`}개</span>
          <span className="text-[#00bcd4]">
            {formatBytes(files.reduce((acc, cur) => acc + cur.size, 0))}
          </span>
        </div>
        <div className="flex items-center gap-3 text-lg text-gray-400">
          <div className="flex items-center gap-1">
            <Info className="h-5 w-5" />
            <span>{`최대 ${maxFileCount}개, 최대 파일 사이즈 ${formatBytes(maxFileSize)}`}</span>
          </div>
          <Button
            label="추가"
            type="button"
            variant="primary"
            size="ts"
            onClick={handleOpen}
            disabled={isOverMaxFileCount}
          />
          {isDownloadCase && (
            <Button label="저장" type="button" variant="primary" size="ts" onClick={downloadFile} />
          )}
          <Button label="삭제" type="button" variant="primary" size="ts" onClick={removeFile} />
        </div>
      </div>
      <div className={cn(styles.file_wrap, styles.type_excel)} {...getRootProps()}>
        {files.length === 0 ? (
          <div className={styles.attach_area}>
            <Button className={styles.btn_file}>
              <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
              <strong className={styles.file_title}>
                {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
              </strong>
              <span className={styles.file_guide}>{`모든 파일 확장자`}</span>
              <input ref={inputRef} {...getInputProps()} accept={acceptFileString} />
            </Button>
          </div>
        ) : (
          <div className={styles.upload_status}>
            {files.map((file: UploadFile) => (
              <div className={styles.file_item}>
                <div className="mr-3">
                  <Checkbox
                    onCheckedChange={(checked: boolean) => handleCheckChange(checked, file.id)}
                    checked={checkedValues.indexOf(file.id) >= 0}
                  />
                </div>
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
    </div>
  );
};

export const Attachment = AttachmentComponent;
