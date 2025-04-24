import React, { ChangeEvent } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import {
  Badge,
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Progress,
  useModal,
} from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn } from '@learnway/shared';
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
import { UploadFile, useS3Uploader } from '@learnway/hooks'; // 파일 업로드

const ExcelUploadModalComponent = () => {
  const { files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
    s3Path: 'upload/leaning/resource/video',
  });
  const { close: closeModal } = useModal();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

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
      <Progress
        className={styles.progress}
        value={file.progress} // 진행률 수치 (숫자 값)
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
    <ModalContainer>
      <ModalTitle>엑셀 업로드</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={cn(styles.start, styles.wrap)}>
            <div className={cn(styles.file_wrap, styles.type_excel)}>
              {files.length === 0 && (
                <div className={styles.attach_area}>
                  <Button className={styles.btn_file}>
                    <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
                    <strong className={styles.file_title}>
                      {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                    </strong>
                    <span className={styles.file_guide}>{'XLSX, CSV / Max file size : 50MB'}</span>
                    <input type="file" className={styles.input_file} onChange={handleFileChange} />
                  </Button>
                </div>
              )}

              {/* 파일 업로드 후 */}
              {files.length > 0 && (
                <div className={styles.upload_status}>
                  {files.map((file) => (
                    <div className={styles.file_item}>
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
            <div className={styles.title_box}>
              <h3 className={styles.sub_title}>{'업로드 결과'}</h3>
              {/* 실패 CASE */}
              <p className={styles.status_text}>
                실패<span className={cn(styles.data_text, styles.error)}>100행</span>
              </p>
              {/* 완료 CASE */}
              <p className={styles.status_text}>
                완료<span className={cn(styles.data_text)}>100행</span>
              </p>
            </div>
            <div className={styles.result_wrap}>
              <p className={styles.status_text}>{'상단 영역에 데이터를 업로드하세요.'}</p>
              <p className={styles.status_text}>{`${'{12행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{20행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{30행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
            </div>
            <NoticeBox
              iconVisible={false}
              descriptions={[
                '양식과 다르게 작성된 파일은 업로드를 할 수 없습니다.',
                '업로드가 되지 않을 경우, 결과를 확인 후 다시 작성하여 업로드해 주세요.',
              ]}
            />
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
