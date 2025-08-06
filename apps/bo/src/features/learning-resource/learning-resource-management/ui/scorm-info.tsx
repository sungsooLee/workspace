import { useModal } from '@learnway/ui/modal';
//  IA106 / NLP_BO_CMS_1032, NLP_BO_CMS_1014

import { useScormResource } from '@entities/learning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { DynamicFormProvider, useFileManager } from '@learnway/hooks';
import { formatBytes } from '@learnway/shared';
import { PreviewLearningWindow } from '@shared/ui/modal';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { LearningResourceFileUploadModal } from './learning-resource-file-upload-modal';
import { ScormViewModal } from './learning-resource-scorm-view-modal';
import { MediaInfo } from './media-info';

interface MovieInfoProps {
  provider: DynamicFormProvider;
}

const ScormInfoComponent = ({ provider }: MovieInfoProps) => {
  const { openModal } = useModal();
  const { fileDownload } = useFileManager();
  const { watch } = provider;
  const {
    contentUuid,
    isDrafted,
    processingStatus: status,
    playTime,
    scormResource,
    handleChangeScorm,
  } = useScormResource(provider);

  const fileUuid = useMemo(() => scormResource?.fileInfo.fileUuid, [scormResource]);
  const downloadOriginal = useCallback(() => {
    if (fileUuid) fileDownload(fileUuid);
  }, [fileUuid]);

  const tenantId = watch('tenantId');
  const channelUuid = watch('channelUuid');
  const channelName = watch('channelName');
  const changeFile = useCallback(async () => {
    const fileUuid = await openModal({
      width: 'lg',
      content: (
        <LearningResourceFileUploadModal
          channel={{ channelUuid, channelName, tenantId }}
          type={LEARNING_TYPE.SCORM}
          maxFileCount={1}
        />
      ),
    });
    if (!fileUuid) return;

    handleChangeScorm(fileUuid);
  }, [tenantId, channelUuid, channelName]);

  const scormView = useCallback(() => {
    if (contentUuid && scormResource?.children)
      openModal({
        width: 'md',
        content: <ScormViewModal contentUuid={contentUuid} scormData={scormResource.children} />,
      });
  }, [contentUuid, scormResource]);

  const preview = useCallback(() => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={contentUuid} />,
    });
  }, [contentUuid]);
  // media info_list
  const infoList = [
    { title: '파일명', text: scormResource?.fileInfo.fileName },
    // { title: '재생시간', text: playTime },
    { title: '원본용량', text: formatBytes(scormResource?.fileInfo.fileSize || 0) },
    // { title: '720P  용량', text: '1.6GB' },
    // { title: '480P 용량', text: '900MB' },
    // { title: '해상도', text: `${width} X ${height}` },
    { title: '파일형식', text: scormResource?.fileInfo.extType?.toLocaleUpperCase() },
    // { title: '비디오 코덱', text: 'H264' },
    // { title: '비디오 프레임레이트', text: '' },
    // { title: '오디오 코덱', text: '' },
    // { title: '오디오 샘플레이트', text: '' },
  ];

  // media btn list
  const buttons = [
    {
      label: t('원본 다운로드'),
      onClick: downloadOriginal,
    },
    {
      label: t('파일 변경'),
      onClick: changeFile,
    },
    {
      label: t('스콤보기'),
      onClick: scormView,
    },
    {
      label: t('미리보기'),
      onClick: preview,
    },
  ];

  return (
    <MediaInfo status={status} buttons={buttons} type={LEARNING_TYPE.SCORM} infoList={infoList} />
  );
};

export const ScormInfo = ScormInfoComponent;
