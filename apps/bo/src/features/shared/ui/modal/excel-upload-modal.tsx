import React from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn } from '@learnway/shared';
import { IcoDownload } from '@learnway/icons';
import { NoticeBox } from '@shared/ui';
import { useS3Uploader } from '@learnway/hooks';
import { DndFileProgress } from '@features/shared/ui/modal/dnd-file-progress'; // 파일 업로드

const ExcelUploadModalComponent = () => {
  const acceptFiles = ['xlsx'];
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;
  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
    s3Path: 'upload/leaning/resource/video',
    maxFileCount,
    acceptFiles,
  });

  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>엑셀 업로드</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <DndFileProgress
            files={files}
            maxFileCount={maxFileCount}
            maxFileSize={maxFileSize}
            addFiles={addFiles}
            acceptFiles={acceptFiles}
            onRemove={onRemove}
            onPause={onPause}
            onResume={onResume}
            onRetry={onRetry}
          />
          <div className={cn(styles.start, styles.wrap)}>
            <div className={styles.title_box}>
              <div className={styles.title_info}>
                <h3 className={styles.sub_title}>{'업로드 결과'}</h3>
                {/* 실패 CASE */}
                <p className={styles.status_text}>
                  실패
                  <span className={cn(styles.data_text, styles.error)}>
                    {stats.failed + stats['validating-error']}행
                  </span>
                </p>
                {/* 완료 CASE */}
                <p className={styles.status_text}>
                  완료<span className={cn(styles.data_text)}>{stats.completed}행</span>
                </p>
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
              {stats.status === 'idle' && (
                <p className={styles.status_text}>{'상단 영역에 데이터를 업로드하세요.'}</p>
              )}

              {/*<p className={styles.status_text}>{`${'{12행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{20행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{30행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>*/}
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
