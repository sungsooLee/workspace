import React, { useRef } from 'react';
import { Button, ModalBody, ModalContainer, ModalFooter, UppyUpload, useModal } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn } from '@learnway/shared';
import { useFileUploader } from '@learnway/hooks';

const VideoUploadModalComponent = () => {
  const { close } = useModal();
  const {} = useFileUploader(uploadConfig);
  const ref = useRef(null);
  return (
    <ModalContainer>
      <ModalBody>
        <div className={styles.wrap}>
          <div className={styles.title_wrap}>
            <h2 className={styles.title}>{'파일 업로드'}</h2>
            <p className={styles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
          </div>
          <div className={styles.pop_contents}>
            <input ref={ref} type={'file'} multiple={true} />
            <UppyUpload />
            <p className={cn(styles.sub_text, styles.dot)}>
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

export const VideoUploadModal = VideoUploadModalComponent;

const uploadConfig = {
  isAuto: true,
  maxFileCount: 1,
  maxFileSize: 1024 * 1024 * 5,
  s3Path: '/learning/resource/video',
};
