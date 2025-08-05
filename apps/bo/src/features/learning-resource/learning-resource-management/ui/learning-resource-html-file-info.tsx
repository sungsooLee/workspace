import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import { useChangeHTML5VideoFile } from '@entities/learning-resource';
import { LearningResourceFileUploadModal } from '@features/learning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { formatFileSize, useFileManager } from '@learnway/hooks';
import { ChannelChoiceModal, PreviewLearningWindow } from '@shared/ui';
import { HtmlVideoFileChangeRes, ProcessingStatus } from '@types';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

import movieStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import styles from './html-detail.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

type FileInfoProps = {
  contentUuid: string;
  uuid: string;
  processingStatus: ProcessingStatus;
};

const FileInfoComponent = ({ contentUuid, uuid, processingStatus }: FileInfoProps) => {
  const [fileUuid, setFileUuid] = useState<string>(uuid);
  const [fileAttrs, setFileAttrs] = useState<{ label: string; value: string }[]>([]);

  const { getFileInfo, fileDownload } = useFileManager();

  const initOrRenewFileInfo = useCallback(async () => {
    console.log('fileUuid', uuid, fileUuid);
    if (fileUuid) {
      const response = await getFileInfo(fileUuid);
      const { originalFileName = '', fileSize, fileType = '' } = response;
      setFileAttrs([
        { label: t('파일명'), value: originalFileName.split('.')[0] },
        {
          label: t('원본용량'),
          value: formatFileSize(fileSize),
        },
        { label: t('파일형식'), value: fileType },
      ]);
    }
  }, [fileUuid]);

  const handleClickFileDownload = useCallback(async () => {
    if (fileUuid) {
      await fileDownload(fileUuid);
    }
  }, [fileUuid]);

  const { change: changeFile } = useChangeHTML5VideoFile({
    onSuccess: (result: HtmlVideoFileChangeRes) => {
      if (result?.fileUuid) {
        setFileUuid(result.fileUuid);
      }
    },
  });

  const { openModal } = useModal();

  const handleClickFileChange = async () => {
    const channelInfo = await openModal({
      content: <ChannelChoiceModal />,
    });

    if (!channelInfo) {
      return;
    }

    const uploadedFileUuid = await openModal({
      content: (
        <LearningResourceFileUploadModal
          channel={channelInfo}
          type={LEARNING_TYPE.HTML5_VIDEO}
          maxFileCount={1}
        />
      ),
      width: 'lg',
    });

    if (!uploadedFileUuid) {
      return;
    }

    changeFile({ contentUuid, fileUuid: uploadedFileUuid });
  };

  const openHTMLVideoPreviewPopup = useCallback(() => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={contentUuid} />,
    });
  }, [contentUuid]);

  useEffect(() => {
    (async () => await initOrRenewFileInfo())();
  }, [fileUuid]);

  return (
    <div className={styles.sub_container}>
      <strong className={styles.title}>{t('업로드 파일')}</strong>
      <ul className={movieStyles.btn_list}>
        <li>
          <Button
            type="button"
            className={movieStyles.btn_text}
            label={t('원본 다운로드')}
            onClick={handleClickFileDownload}
          />
        </li>
        <li>
          <Button
            type="button"
            className={movieStyles.btn_text}
            label={t('파일 변경')}
            onClick={handleClickFileChange}
          />
        </li>
        {processingStatus === ProcessingStatus.COMPLETE && (
          <li>
            <Button
              type="button"
              className={movieStyles.btn_text}
              label={t('미리보기')}
              onClick={openHTMLVideoPreviewPopup}
            />
          </li>
        )}
      </ul>
      {/* 파일 정보 조회 영역 */}
      <div className={styles.thumbnail_container}>
        <img src={defaultImage} width="100%" alt="" />
      </div>
      {fileAttrs.length > 0 && (
        <table className={styles.file_info_container}>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '70%' }} />
          </colgroup>
          <tbody>
            {fileAttrs?.map((attr, i) => (
              <tr key={i}>
                <th>{attr.label}</th>
                <td>{attr.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

FileInfoComponent.displayName = 'FileInfo';

export const LearningResourceHtmlFileInfo = FileInfoComponent;
