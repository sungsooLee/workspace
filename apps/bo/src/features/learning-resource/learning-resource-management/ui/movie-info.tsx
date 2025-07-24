//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002

import { useModal } from '@learnway/ui';
import { DynamicFormProvider, useFileManager } from '@learnway/hooks';
import { useVideoResource } from '@entities/learning-resource';
import { formatBytes } from '@learnway/shared';
import { useCallback, useMemo } from 'react';
import { max } from 'lodash';
import { PreviewLearningWindow } from './preview-learning-window';
import { LearningResourceFileUploadModal } from './learning-resource-file-upload-modal';
import { LEARNING_TYPE } from '@learnway/config';
import { t } from 'i18next';
import { MediaInfo } from './media-info';

interface MovieInfoProps {
  provider: DynamicFormProvider;
}

const MovieInfoComponent = ({ provider }: MovieInfoProps) => {
  const { open: openModal } = useModal();
  const { fileDownload } = useFileManager();
  const { watch } = provider;
  const {
    contentUuid,
    isDrafted,
    processingStatus: status,
    playTime,
    videoResource,
    handleChangeVideo,
  } = useVideoResource(provider);

  const url = useMemo(() => videoResource?.masterVideo, [videoResource]);
  const height = useMemo(
    () => max(videoResource?.encodedVideos?.map((_) => _.height)) || 0,
    [videoResource],
  );
  const width = useMemo(
    () => max(videoResource?.encodedVideos?.map((_) => _.width)) || 0,
    [videoResource],
  );

  const fileUuid = useMemo(() => videoResource?.fileInfo.fileUuid, [videoResource]);
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
          type={LEARNING_TYPE.VIDEO}
          maxFileCount={1}
        />
      ),
    });
    if (!fileUuid) return;

    handleChangeVideo(fileUuid);
  }, [tenantId, channelUuid, channelName]);

  const preview = useCallback(() => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={contentUuid} />,
    });
  }, [contentUuid]);
  // media info_list
  const infoList = [
    { title: '파일명', text: videoResource?.fileInfo.fileName },
    { title: '재생시간', text: playTime },
    { title: '원본용량', text: formatBytes(videoResource?.fileInfo.fileSize || 0) },
    // { title: '720P  용량', text: '1.6GB' },
    // { title: '480P 용량', text: '900MB' },
    { title: '해상도', text: `${width} X ${height}` },
    { title: '파일형식', text: videoResource?.fileInfo.extType?.toLocaleUpperCase() },
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
      label: t('동영상 변경'),
      onClick: changeFile,
    },
    {
      label: t('콘텐츠 URL보기'),
      onClick: () => console.log('btn 3'),
    },
    {
      label: t('미리보기'),
      onClick: preview,
    },
  ];

  return (
    <MediaInfo
      status={status}
      buttons={buttons}
      type={LEARNING_TYPE.VIDEO}
      url={url}
      infoList={infoList}
    />
  );
};

export const MovieInfo = MovieInfoComponent;
