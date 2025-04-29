import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  DndFileProgress,
  ModalBody,
  ModalContainer,
  ModalFooter,
  Progress,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { useFileUploader } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const LearningResourceFileUploadModalComponent = () => {
  const { close } = useModal();
  const { files, addFiles, onRemove, onRetry, onCancel, onResume } = useFileUploader(uploadConfig);

  return (
    <ModalContainer>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.title_wrap}>
            <h2 className={popupStyles.title}>{'파일 업로드'}</h2>
            <p className={popupStyles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
            <p className={styles.file_status_view}>
              <span className={styles.file_completed}>
                {'완료'} <em className={styles.num}>{'4'}</em>
              </span>
              <span className={styles.file_failed}>
                {'실패'} <em className={styles.num}>{'2'}</em>
              </span>
              <span className={styles.file_ing}>
                파일 올리는중 <em className={styles.ing}>1/1</em>
              </span>
            </p>
            <DndFileProgress
              files={files}
              addFiles={addFiles}
              onRetry={onRetry}
              onCancel={onCancel}
              onRemove={onRemove}
              multiple
            />
            <p className={styles.guide_text}>
              {'업로드된 동영상은 학습자원목록에서 조회가능합니다.'}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => close()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceFileUploadModal = LearningResourceFileUploadModalComponent;

const uploadConfig = {
  isAuto: true,
  maxFileCount: 1,
  maxFileSize: 1024 * 1024 * 1024,
  s3Path: '/learning/resource/video',
};
