import React, { ChangeEvent } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import {
  Badge,
  Button,
  FileItem,
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
  const { files, addFiles } = useS3Uploader({ s3Path: 'upload/leaning/resource/video' });
  const { close: closeModal } = useModal();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('change', e.target.files);
    if (e.target.files?.length) {
      console.log('Array.from(e.target.files) =>', Array.from(e.target.files));
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };
  const renderFileProgress = (file: UploadFile) => {
    switch (file.status) {
      case 'validating':
        return <p className={styles.file_status_text}>{'유효성 검토중'}</p>;
      case 'attach-error':
        return <p className={styles.file_status_text}>{'업로드 불가'}</p>;
      default:
        return (
          <Progress
            className={styles.progress}
            value={file.progress}
            label={file.status}
            isFailed={file.status === 'failed'}
          />
        );
    }
  };
  const renderFileProcessButton = (file: UploadFile) => {
    switch (file.status) {
      case 'uploading':
      case 'idle':
        return <></>;
      case 'validating':
        return (
          <>
            <div className={styles.control_wrap}>
              <Badge
                className={styles.file_status}
                option={{ label: '', value: '' }}
                variant="dot"
                status="ing"
              />
            </div>
            <Button className={styles.btn_delete} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
          </>
        );
      case 'attach-error':
        return (
          <>
            <div className={styles.control_wrap}>
              <Badge
                className={styles.file_status}
                option={{ label: '', value: '' }}
                variant="dot"
                status="error"
              />
            </div>
            <Button className={styles.btn_delete} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
          </>
        );
      default:
        return <></>;
    }
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
                      <div className={styles.progress_area}>renderFileProgress(file)</div>

                      <div className={styles.control_wrap}>
                        <Button className={styles.btn_status} onlyIcon>
                          <IcoRefresh width={20} height={20} fill="#00AFD5" />
                        </Button>
                      </div>
                      <div className={styles.control_wrap}>
                        <Button className={styles.btn_status} onlyIcon>
                          <IcoPause width={20} height={20} fill="#A9AFB8" />
                        </Button>
                      </div>
                      <Button className={styles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
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
