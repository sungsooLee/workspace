import React, { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { Button, useModal } from '@learnway/ui';

import { LEARNING_TYPE } from '@learnway/config';
import { formatFileSize, useFileManager } from '@learnway/hooks';
import { HtmlVideoFileChangeRes } from '@types';
import { useChangeHTML5VideoFile } from '@entities/learning-resource';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import { ChannelChoiceModal } from '@shared/ui';
import { LearningResourceFileUploadModal } from '@features/learning-resource';
import { PreviewLearningWindow } from '@features/learning-resource/learning-resource-management/ui/preview-learning-window';

import movieStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import styles from '../html-detail.module.css';

type FileInfoProps = {
  contentUuid: string;
  uuid: string;
  mode: 'draft' | 'complete';
};

const FileInfoComponent = ({ contentUuid, uuid, mode }: FileInfoProps) => {
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

  const { open: openModal } = useModal();

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
            className={movieStyles.btn_text}
            label={t('원본 다운로드')}
            onClick={handleClickFileDownload}
          />
        </li>
        <li>
          <Button
            className={movieStyles.btn_text}
            label={t('파일 변경')}
            onClick={handleClickFileChange}
          />
        </li>
        {mode === 'complete' && (
          <li>
            <Button
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

export const FileInfo = FileInfoComponent;
