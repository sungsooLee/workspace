// IA011 / NLP_BO_PMS_1100_4
import { useCallback, useMemo, useState, useEffect } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import {
  Badge,
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ProgressBar,
  useModal,
} from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { acceptFilesToAccept, cn, httpService } from '@learnway/shared';
import {
  IcoComplete02,
  IcoDownload,
  IcoFileExcel,
  IcoTrash03,
  IcoUploadCloud,
} from '@learnway/icons';
import { NoticeBox } from '@shared/ui';
import { formatFileSize, UploadStatus } from '@learnway/hooks';
import { PMSApiPrefix } from '@learnway/config';
import { compact } from 'lodash';
import { useDropzone } from 'react-dropzone';
import { t } from 'i18next';

interface ExcelUploadModalProps {
  validateUrl: string;
  templateUrls?: {
    xlsx?: string;
    csv?: string;
  };
}
interface ValidationResult {
  success: boolean;
  totalRows?: number;
  successRows?: Record<string, any>[];
  failedRows?: number[];
  errorMessage?: string;
}

enum Status {
  UPLOADING = 'Uploading',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

export interface UploadFile {
  file: File; // 파일
  extension: string; // 확장자
  name: string; // 실제 원본 파일명
  size: number; // 파일 사이즈
  displaySize: string; // 포맷팅된 사이즈
  progress: number; // 업로드 Progress
  status: Status; // 파일 상태
  message?: string;
}

function toUploadFile(file: File): UploadFile {
  return {
    file,
    extension: file.name.split('.').pop() || '',
    name: file.name,
    size: file.size,
    displaySize: formatFileSize(file.size),
    progress: 0,
    status: Status.UPLOADING,
  };
}

const ExcelUploadModalComponent = ({ validateUrl, templateUrls }: ExcelUploadModalProps) => {
  const acceptFiles = ['xlsx', 'xls'];
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;

  const acceptFileString = useMemo(() => acceptFilesToAccept(acceptFiles), [acceptFiles]);

  const { close: closeModal } = useModal();

  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setDots((prev) => {
          if (prev === '...') return '.';
          if (prev === '..') return '...';
          if (prev === '.') return '..';
          return '.';
        });
      }, 1000);
    } else {
      setDots('.');
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // 파일 선택 시 자동 유효성 검사 실행
  const handleFileSelect = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0];
      setStatus(Status.UPLOADING);
      setFiles(compact([file]).map(toUploadFile));
      setIsLoading(true);
      setProgressMessage('파일을 업로드하고 있습니다...');

      try {
        // FormData로 파일 전송
        const formData = new FormData();
        formData.append('file', file);

        setProgressMessage('파일 검증 중입니다. 잠시만 기다려주세요');

        // const response = await fetch(`${, {
        //   method: 'POST',
        //   body: formData,
        // });
        const response: {
          result: boolean;
          dataList?: Record<string, any>[];
          faultRows?: number[];
          totalRows?: number;
        } = await httpService.post(`${PMSApiPrefix()}` + validateUrl, formData, {
          timeout: 1000 * 120,
        });
        const {
          result: success,
          dataList: successRows,
          faultRows: failedRows,
          totalRows,
        } = response;

        setValidationResult({
          success,
          totalRows,
          successRows,
          failedRows,
        });
        if (success) {
          setStatus(Status.COMPLETED);
          setFiles((prev) => prev.map((_) => ({ ..._, status: Status.COMPLETED, progress: 100 })));
          setProgressMessage('업로드가 완료되었습니다.');
        } else {
          setStatus(Status.FAILED);
          setFiles((prev) => prev.map((_) => ({ ..._, status: Status.FAILED, progress: 100 })));
          setProgressMessage('업로드 중 오류가 발생했습니다.');
        }
      } catch (error: any) {
        console.error('Validation error:', error);
        setStatus(Status.FAILED);
        setValidationResult({
          success: false,
          totalRows: 0,
          errorMessage: error.message,
        });
        if (!error.status) {
          setFiles((prev) => prev.map((_) => ({ ..._, status: Status.FAILED })));
        }
        setFiles((prev) => prev.map((_) => ({ ..._, status: Status.FAILED, progress: 100 })));
        setProgressMessage('업로드 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [validateUrl],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelect,
    multiple: false,
    maxFiles: maxFileCount,
    maxSize: maxFileSize,
  });

  /**
   * 파일 업로드 상태에 따라 진행률을 렌더링하는 함수
   * @param {UploadFile} file - 업로드 대상 파일 객체
   * @returns {JSX.Element} 상태에 맞는 JSX 엘리먼트 반환
   */
  const renderFileProgress = (file: UploadFile) => {
    return (
      <ProgressBar
        className={styles.progress}
        progress={file.progress} // 진행률 수치 (숫자 값)
        label={file.status} // 진행률 레이블 (현재 상태 표시)
        isFailed={file.status === Status.FAILED} // 실패 상태 여부에 따라 실패 스타일 적용
      />
    );
  };

  const reset = () => {
    setFiles([]);
    setIsLoading(false);
    setStatus(null);
    setValidationResult(null);
    setProgressMessage('');
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
        <Button className={styles.btn_delete} onlyIcon onClick={reset}>
          <IcoTrash03 width={20} height={20} stroke="#131C30" />
        </Button>
      );

    /**
     * 파일 상태와 대응하는 JSX 템플릿 맵
     */
    const statusMap: Record<string, JSX.Element> = {
      /**
       * 완료 (completed) 상태:
       */
      [Status.COMPLETED]: (
        <>
          {renderControl(
            <IcoComplete02 width={20} height={20} fill="#3EB838" className={styles.complete} />,
          )}
          {renderDeleteButton()}
        </>
      ),
      [Status.FAILED]: (
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
       * 기본 상태 - 업로드 중 (uploading) 상태:
       * - 제어 아이콘 비어 있음
       * - 삭제 버튼 영역 비어 있음
       */
      default: (
        <>
          {renderControl(<></>)}
          <div className={styles.delele_btn_wrap}></div>
        </>
      ),
    };

    // 파일 상태에 따른 컴포넌트 반환 (일치하지 않는 상태는 기본 상태로 처리)
    return statusMap[file.status] || statusMap.default;
  };

  return (
    <ModalContainer>
      <ModalTitle>엑셀 업로드</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={cn(styles.start, styles.wrap)}>
            <div className={cn(styles.file_wrap, styles.type_excel)}>
              {files.length === 0 && (
                <div className={styles.attach_area} {...getRootProps()}>
                  <Button className={styles.btn_file}>
                    <IcoUploadCloud width={40} height={40} stroke={'#131C30'} />
                    <strong className={styles.file_title}>
                      {t(
                        'LABEL.message.upload.uploadDescription',
                        '영역을 클릭하거나 파일을 마우스로 끌어놓으세요',
                      )}
                    </strong>
                    <span
                      className={styles.file_guide}
                    >{`${acceptFileString} ${maxFileCount === 1 ? ` / 최대 1개 파일` : ''} ${maxFileSize ? `/ Max file size : ${formatFileSize(maxFileSize)}` : ''} `}</span>
                    <input {...getInputProps()} accept={acceptFileString} />
                  </Button>
                </div>
              )}

              {/* 파일 업로드 후 */}
              {files.length > 0 && (
                <div className={styles.upload_status}>
                  {files.map((file) => (
                    <div className={styles.file_item} key={file.name}>
                      <div className={styles.file_name}>
                        <IcoFileExcel width={24} height={25} className={styles.icon_type} />
                        <em className={styles.name}>{file.name}</em>
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
          <div className={cn(styles.start, styles.wrap)}>
            <div className={styles.title_box}>
              <div className={styles.title_info}>
                <h3 className={styles.sub_title}>{t('업로드 결과')}</h3>
                {isLoading && progressMessage && (
                  <p className={cn(styles.status_text, 'text-blue-600')}>
                    {progressMessage}
                    {dots}
                  </p>
                )}
                {status === Status.FAILED && (
                  <p className={cn(styles.status_text)}>
                    {t('실패')}
                    {Boolean(validationResult?.failedRows) && (
                      <span className={cn(styles.data_text, styles.error)}>
                        {validationResult?.failedRows?.length} {t('행')}
                      </span>
                    )}
                  </p>
                )}
                {status === Status.COMPLETED && (
                  <p className={cn(styles.status_text)}>
                    {t('완료')}
                    {Boolean(validationResult?.successRows) && (
                      <span className={cn(styles.data_text)}>
                        {validationResult?.successRows?.length} {t('행')}
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className={styles.btn_wrap}>
                <Button
                  label={t('엑셀 양식 다운로드')}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
                <Button
                  label={t('CSV 양식 다운로드')}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
              </div>
            </div>
            <div className={styles.result_wrap}>
              {validationResult && (
                <pre className={styles.status_text}>
                  {validationResult?.errorMessage ||
                    validationResult?.failedRows
                      ?.map((row) => `{${row}${t('행')}} ${t('데이터를 확인해주세요.')}`)
                      .join('\n')}
                </pre>
              )}
            </div>
            <NoticeBox
              iconVisible={false}
              descriptions={[
                t('양식과 다르게 작성된 파일은 업로드를 할 수 없습니다.'),
                t('업로드가 되지 않을 경우, 결과를 확인 후 다시 작성하여 업로드해 주세요.'),
              ]}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={t('확인')}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal(validationResult?.successRows)}
          disabled={!(status === Status.COMPLETED && validationResult?.successRows?.length)}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ExcelUploadModal = ExcelUploadModalComponent;
