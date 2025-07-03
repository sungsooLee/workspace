import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  DndFileProgress,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
} from '@learnway/ui';
import { useS3Uploader } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { LEARNING_TYPE } from '@learnway/config';
import { t } from 'i18next';
import { ChannelChoiceModal } from '@features/shared';

interface Props {
  channel: {
    channelId: string;
    channelName: string;
  };
  type: LEARNING_TYPE;
}
const acceptFiles = {
  [LEARNING_TYPE.VIDEO]: [
    'MP4',
    'WMV',
    'TS',
    'AVI',
    'MKV',
    'MTS',
    'MOV',
    'MXF',
    'MPEG',
    'MPG',
    'WEBM',
    'ASF',
    'SKM',
    'K3G',
  ],
};

const LearningResourceFileUploadModalComponent: FC<Props> = ({ channel, type }) => {
  const { close, open } = useModal();
  const maxFileCount = 100;
  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove, inputAccept } =
    useS3Uploader({
      s3Path: 'upload/content/original',
      affairsType: 'CMS',
      languageCode: 'ko',
      groupMode: 'individual',
      maxFileCount,
      maxFileSize: 20 * 1024 * 1024,
      acceptFiles: acceptFiles[type],
    });
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddFiles = (files: File[]) => {
    setErrorMessage('');
    addFiles(files);
  };

  const handleEncoding = () => {
    // Encoding 완료 이벤트 구독 처리
  };

  const onConfirm = useCallback(async () => {
    close(files);
  }, [files]);

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
    if (stats.status === 'completed') {
      handleEncoding();
    }
  }, [stats]);
  return (
    <ModalContainer>
      <ModalTitle>{'파일 업로드'}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.selected_area}>
            <p className={popupStyles.selected_text}>{channel.channelName}</p>
          </div>
          <div className={popupStyles.title_wrap}>
            <p className={popupStyles.text}>
              {t('LABEL.message.learningResourceFileUploadModal.uploaderLabel')}
            </p>
          </div>
          <div className={popupStyles.pop_contents}>
            <DndFileProgress
              files={files}
              maxFileCount={maxFileCount}
              addFiles={handleAddFiles}
              inputAccept={inputAccept}
              onRemove={onRemove}
              onPause={onPause}
              onResume={onResume}
              onRetry={onRetry}
              guideText={t('LABEL.message.learningResourceFileUploadModal.uploaderGuideText')}
              errorMessage={errorMessage}
              wrapSize={'lg'}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => close()} />
        <Button
          label={'확인'}
          variant={'primary'}
          disabled={stats.status !== 'completed'}
          size={'lg'}
          onClick={onConfirm}
        />
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
