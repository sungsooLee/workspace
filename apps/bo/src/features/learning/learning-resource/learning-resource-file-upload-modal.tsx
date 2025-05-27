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
import { useFileManager, useS3Uploader } from '@learnway/hooks';
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
  const maxFileCount = 1;
  const maxFileSize = 1024 * 1024 * 10;
  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
    s3Path: 'upload/leaning-resource/video/',
    maxFileCount,
    acceptFiles: acceptFiles[type],
  });
  const { createFileGroupFiles } = useFileManager();
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddFiles = (files: File[]) => {
    setErrorMessage('');
    addFiles(files);
  };

  const handleEncoding = async () => {
    const channelInfo = await open({
      content: <ChannelChoiceModal />,
    });
  };

  const initFileInfo = useCallback(async () => {
    const createFiles = files
      .filter((file) => file.status === 'completed')
      .map((file) => {
        return {
          uploadType: 'CONTENTS',
          affairsType: 'PMS',
          reposType: 'S3',
          languageCode: 'ko',
          detailPath: file.detailPath,
          basicPath: file.basicPath,
          files: {
            fileUploadType: file.uploadType === 'single-part' ? 'S3_SINGLEPART' : 'S3_MULTIPART',
            originalFileName: file.fileName,
            serverFileName: file.s3FileName,
            fileSize: file.size,
          },
        };
      });
    // const response = await createFileGroupFiles(createFiles[0] as CreateFileGroupFilesInfoReq[]);
    const response = await createFileGroupFiles(createFiles[0] as any); // 타입 에러 수정 필요
    console.log('response => ', response);
    console.log('createFiles => ', createFiles);
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
      initFileInfo();
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
              maxFileSize={maxFileSize}
              addFiles={handleAddFiles}
              acceptFiles={acceptFiles[type]}
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
          disabled={stats.status !== 'complete'}
          size={'lg'}
          onClick={handleEncoding}
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
