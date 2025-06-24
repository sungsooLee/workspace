// IA011 / NLP_BO_PMS_1100_4
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { cn, httpService } from '@learnway/shared';
import {
  IcoComplete02,
  IcoDownload,
  IcoFileExcel,
  IcoPause,
  IcoRefresh,
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
  uploadUrl: string;
  templateUrls?: {
    xlsx?: string;
    csv?: string;
  };
}
interface ValidationResult {
  success: boolean;
  totalRows: number;
  successRows: number;
  failedRows: number;
  errors?: Array<{
    row: number;
    message: string;
  }>;
}

export interface UploadFile {
  file: File; // 파일
  extension: string; // 확장자
  name: string; // 실제 원본 파일명
  size: number; // 파일 사이즈
  displaySize: string; // 포맷팅된 사이즈
  progress: number; // 업로드 Progress
  status: UploadStatus; // 파일 상태
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
    status: 'validating',
  };
}

const ExcelUploadModalComponent = ({
  validateUrl,
  uploadUrl,
  templateUrls,
}: ExcelUploadModalProps) => {
  const acceptFiles = ['xlsx', 'xls'];
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;

  const acceptFileString = useMemo(() => {
    if (!acceptFiles) return '';
    if (typeof acceptFiles === 'string') return acceptFiles;
    return acceptFiles
      .map((acceptFile: any) => (acceptFile.startsWith('.') ? acceptFile : `.${acceptFile}`))
      .join(', ')
      .toUpperCase();
  }, [acceptFiles]);

  const { close: closeModal } = useModal();

  const [uploadStep, setUploadStep] = useState<
    'select' | 'validating' | 'validated' | 'uploading' | 'completed'
  >('select');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const files = useMemo(() => compact([uploadedFile]).map(toUploadFile), [uploadedFile]);

  // 파일 선택 시 자동 유효성 검사 실행
  const handleFileSelect = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0];
      setUploadedFile(file);
      setUploadStep('validating');
      setIsLoading(true);

      try {
        // FormData로 파일 전송
        const formData = new FormData();
        formData.append('file', file);

        // const response = await fetch(`${, {
        //   method: 'POST',
        //   body: formData,
        // });
        const response = await httpService.post(`${PMSApiPrefix()}` + validateUrl, formData);

        // const result: ValidationResult = await response.json();
        console.log(response);

        // if (response.ok) {
        //   setValidationResult(result);
        //   setUploadStep('validated');
        // } else {
        //   throw new Error('유효성 검사 실패');
        // }
      } catch (error) {
        console.error('Validation error:', error);
        setValidationResult({
          success: false,
          totalRows: 0,
          successRows: 0,
          failedRows: 0,
          errors: [{ row: 0, message: '유효성 검사 중 오류가 발생했습니다.' }],
        });
        setUploadStep('validated');
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

  // 실제 업로드 실행
  const handleConfirmUpload = useCallback(async () => {
    if (!uploadedFile || !validationResult?.success) return;

    setUploadStep('uploading');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStep('completed');
      } else {
        throw new Error('업로드 실패');
      }
    } catch (error) {
      console.error('Upload error:', error);
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, uploadUrl, validationResult]);

  // 다시 선택
  const handleReselect = useCallback(() => {
    setUploadStep('select');
    setValidationResult(null);
    setUploadedFile(null);
  }, []);

  // 템플릿 다운로드
  // const handleTemplateDownload = useCallback(
  //   (type: 'xlsx' | 'csv') => {
  //     const url = templateUrls?.[type];
  //     if (url) {
  //       window.open(url, '_blank');
  //     }
  //   },
  //   [templateUrls],
  // );

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
        <Button className={styles.btn_delete} onlyIcon onClick={() => {} /*onRemove(file.name)*/}>
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
            <Button
              className={styles.btn_status}
              onlyIcon
              onClick={() => {} /*onPause(file.name)*/}
            >
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
            <Button
              className={styles.btn_status}
              onlyIcon
              onClick={() => {} /*onPause?.(file.name)*/}
            >
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
              onClick={
                () => {}
                // file.status === 'paused' ? onResume?.(file.name) : onRetry?.(file.name)
              }
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
                <h3 className={styles.sub_title}>{'업로드 결과'}</h3>
                {/* 실패 CASE */}
                <p className={styles.status_text}>
                  실패
                  {/* <span className={cn(styles.data_text, styles.error)}>
                    {stats.failed + stats['validating-error']}행
                  </span> */}
                </p>
                {/* 완료 CASE */}
                {/* <p className={styles.status_text}>
                  완료<span className={cn(styles.data_text)}>{stats.completed}행</span>
                </p> */}
              </div>
              <div className={styles.btn_wrap}>
                <Button
                  label={'엑셀 양식 다운로드'}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
                <Button
                  label={'CSV 양식 다운로드'}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
              </div>
            </div>
            <div className={styles.result_wrap}>
              {/* {stats.status === 'idle' && (
                <p className={styles.status_text}>{'상단 영역에 데이터를 업로드하세요.'}</p>
              )} */}
            </div>
            <NoticeBox
              iconVisible={false}
              descriptions={[
                '양식과 다르게 작성된 파일은 업로드를 할 수 없습니다.',
                '업로드가 되지 않을 경우, 결과를 확인 후 다시 작성하여 업로드해 주세요.',
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
          onClick={() => closeModal()}
          disabled
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ExcelUploadModal = ExcelUploadModalComponent;
