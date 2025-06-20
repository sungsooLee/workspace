// IA011 / NLP_BO_PMS_1100_4
import { useCallback, useEffect, useState } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn, httpService } from '@learnway/shared';
import { IcoDownload } from '@learnway/icons';
import { NoticeBox } from '@shared/ui';
import { useS3Uploader } from '@learnway/hooks';
import { DndFileProgress } from './dnd-file-progress'; // 파일 업로드
import { PMSApiPrefix } from '../../../../../../../libs/config/src';

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

const ExcelUploadModalComponent = ({
  validateUrl,
  uploadUrl,
  templateUrls,
}: ExcelUploadModalProps) => {
  const acceptFiles = ['xlsx', 'xls'];
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;
  // const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
  //   s3Path: 'upload/learning/resource/video',
  //   maxFileCount,
  //   acceptFiles,
  // });

  const { close: closeModal } = useModal();

  const [uploadStep, setUploadStep] = useState<
    'select' | 'validating' | 'validated' | 'uploading' | 'completed'
  >('select');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  /*
  useEffect(() => {
    if (stats.status === 'validating-error' && files.length === 1) {
      if (files[0].message === 'size error') {
        setErrorMessage('LABEL.message.learningResourceFileUploadModal.sizeError');
      }
      if (files[0].message === 'extension error') {
        setErrorMessage(t('LABEL.message.learningResourceFileUploadModal.extensionError'));
      }
      onRemove();
    }
  }, [stats]);

  * */
  useEffect(() => {
    // if (stats.status === 'complete') {
    //   //이때 파일 객체의 첫번째 값을 가져오면 된다.
    //   /*const form = new FormData();
    //   form.append('file', files[0]);*/
    // }
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>엑셀 업로드</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          {/* <DndFileProgress
            files={files}
            maxFileCount={maxFileCount}
            maxFileSize={maxFileSize}
            addFiles={addFiles}
            acceptFiles={acceptFiles}
            onRemove={onRemove}
            onPause={onPause}
            onResume={onResume}
            onRetry={onRetry}
          /> */}
          <DndFileProgress
            files={[]}
            maxFileCount={maxFileCount}
            maxFileSize={maxFileSize}
            addFiles={handleFileSelect}
            acceptFiles={acceptFiles}
            // onRemove={() => {}}
            // onPause={() => {}}
            // onResume={() => {}}
            // onRetry={() => {}}
          />
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
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ExcelUploadModal = ExcelUploadModalComponent;
