import React, { FC } from 'react';
import {
  Button,
  DndFileProgress,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  UppyUpload,
  useModal,
} from '@learnway/ui';
import { useS3Uploader } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn } from '@learnway/shared';

interface Props {
  channel: {
    channelId: string;
    channelName: string;
  };
}

const LearningResourceFileUploadModalComponent: FC<Props> = ({ channel }) => {
  const { close } = useModal();
  const acceptFiles = ['xlsx'];
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;
  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
    s3Path: 'upload/leaning/resource/video',
    maxFileCount,
    acceptFiles,
  });

  return (
    <ModalContainer>
      {/*<DndFileProgress
              files={files}
              addFiles={addFiles}
              onRetry={onRetry}
              onCancel={onCancel}
              onRemove={onRemove}
              multiple
            />
            <p className={styles.guide_text}>
              {'업로드된 동영상은 학습자원목록에서 조회가능합니다.'}
            </p>*/}
      <ModalTitle>{'파일 업로드'}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.selected_area}>
            <p className={popupStyles.selected_text}>{channel.channelName}</p>
          </div>
          <div className={popupStyles.title_wrap}>
            <p className={popupStyles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
          </div>
          <div className={popupStyles.pop_contents}>
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
            <p className={cn(popupStyles.sub_text, popupStyles.dot)}>
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
