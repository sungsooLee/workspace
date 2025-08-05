import { useModal } from '@learnway/ui/modal';
// IA109 / NLP_BO_CMS_1027, NLP_BO_CMS_1009

import { usePutETCChange } from '@entities/learning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { DynamicFormProvider, FileInfo, useFileManager } from '@learnway/hooks';
import { formatBytes, splitFileName } from '@learnway/shared';
import { ProcessingStatus } from '@shared/types/enums';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LearningResourceFileUploadModal } from './learning-resource-file-upload-modal';
import { MediaInfo } from './media-info';

interface MovieInfoProps {
  provider: DynamicFormProvider;
}

const ETCInfoComponent = ({ provider }: MovieInfoProps) => {
  const { openModal } = useModal();
  const { fileDownload, getFileInfo } = useFileManager();
  const { watch, onFormChange } = provider;

  const fileUuid = watch('fileUuid');
  const [changingFileUuid, setChangingFileUuid] = useState<string | undefined>();
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  const fetchFileInfo = useCallback(async () => {
    if (!fileUuid) return;
    const fileInfo = await getFileInfo(fileUuid);
    setFileInfo(fileInfo);
  }, [fileUuid]);

  useEffect(() => {
    fetchFileInfo();
  }, [fetchFileInfo]);

  const downloadOriginal = useCallback(() => {
    if (fileUuid) fileDownload(fileUuid);
  }, [fileUuid]);

  const tenantId = watch('tenantId');
  const channelUuid = watch('channelUuid');
  const channelName = watch('channelName');
  const contentUuid = watch('contentUuid');

  const { update: changeETC } = usePutETCChange({
    onSuccess: () => {
      onFormChange({ fileUuid: changingFileUuid });
      setChangingFileUuid(undefined);
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿?
    },
  });

  const changeFile = useCallback(async () => {
    const fileUuid = await openModal({
      width: 'lg',
      content: (
        <LearningResourceFileUploadModal
          channel={{ channelUuid, channelName, tenantId }}
          type={LEARNING_TYPE.ETC}
          maxFileCount={1}
        />
      ),
    });
    if (!fileUuid) return;

    changeETC({ contentUuid, fileUuid });
    setChangingFileUuid(fileUuid);
  }, [tenantId, channelUuid, channelName]);

  const fileExt = useMemo(
    () => (fileInfo ? splitFileName(fileInfo.serverFileName).ext : ''),
    [fileInfo],
  );

  // media info_list
  const infoList = [
    { title: '파일명', text: fileInfo?.originalFileName },
    // { title: '재생시간', text: playTime },
    { title: '원본용량', text: formatBytes(fileInfo?.fileSize || 0) },
    // { title: '720P  용량', text: '1.6GB' },
    // { title: '480P 용량', text: '900MB' },
    // { title: '해상도', text: `${width} X ${height}` },
    { title: '파일형식', text: fileExt?.toLocaleUpperCase() },
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
  ];

  return (
    <MediaInfo
      status={ProcessingStatus.COMPLETE}
      buttons={buttons}
      type={LEARNING_TYPE.ETC}
      infoList={infoList}
    />
  );
};

export const ETCInfo = ETCInfoComponent;
