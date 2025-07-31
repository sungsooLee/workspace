import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
// IA106, IA105 / NLP_BO_CMS_1059, NLP_BO_CMS_1060

import { LEARNING_TYPE } from '@learnway/config';
import { S3_PATH, useS3Uploader } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { DndFileProgress } from '@learnway/ui/dnd-file-progress';
import { t } from 'i18next';
import { map } from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';

interface Props {
  channel: {
    channelUuid: string;
    channelName: string;
    tenantId: string;
  };
  type: LEARNING_TYPE;
  maxFileCount?: number;
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
  [LEARNING_TYPE.SCORM]: ['ZIP'],
  [LEARNING_TYPE.HTML5_VIDEO]: ['ZIP'],
  [LEARNING_TYPE.ETC]: ['PPTX', 'DOX', 'DOCX', 'XLS', 'PSD', 'PDF', 'HWP', 'TXT'] };

const LearningResourceFileUploadModalComponent: FC<Props> = ({
  channel,
  type,
  maxFileCount = 100 }) => {
  const { closeModal } = useModal();
  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove, inputAccept } =
    useS3Uploader({
      s3Path: S3_PATH['upload/content/original'],
      affairsType: 'CMS',
      maxFileCount,
      maxFileSize: 4 * 1024 * 1024 * 1024,
      acceptFiles: acceptFiles[type] });
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddFiles = (files: File[]) => {
    setErrorMessage('');
    addFiles(files);
  };

  const handleEncoding = () => {
    // Encoding 완료 이벤트 구독 처리
  };

  const onConfirm = useCallback(async () => {
    if (maxFileCount === 1) {
      closeModal(map(files, 'fileUuid')[0]);
    } else {
      closeModal(map(files, 'fileUuid'));
    }
  }, [files]);

  useEffect(() => {
    if (stats.status === 'validating-error' && files.length === 1) {
      if (files[0].message === 'size error') {
        setErrorMessage(t('LABEL.messages.learningResourceFileUploadModal.sizeError'));
      }
      if (files[0].message === 'extension error') {
        setErrorMessage(t('LABEL.messages.learningResourceFileUploadModal.extensionError'));
      }
      onRemove();
    }
    if (stats.status === 'completed') {
      handleEncoding();
    }
  }, [stats]);
  return (
    <ModalContainer>
      <ModalTitle>{t('파일 업로드')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.selected_area}>
            <p className={popupStyles.selected_text}>{channel.channelName}</p>
          </div>
          <div className={popupStyles.title_wrap}>
            <p className={popupStyles.text}>
              {t('LABEL.messages.learningResourceFileUploadModal.uploaderLabel')}
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
              guideText={t('LABEL.messages.learningResourceFileUploadModal.uploaderGuideText')}
              errorMessage={errorMessage}
              wrapSize={'lg'}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={t('확인')}
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
