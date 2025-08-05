import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LEARNING_TYPE } from '@learnway/config';
import { DynamicFormProvider, formatFileSize, useFileManager } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { useHtmlVideoResource } from '@entities/learning-resource/service/html-video-resource.hook';
import { MediaInfo } from '@features/learning-resource/learning-resource-management/ui/media-info';
import { LearningResourceFileUploadModal } from '@features/learning-resource';

interface HtmlVideoInfoProps {
  provider: DynamicFormProvider;
}

const HtmlVideoInfoComponent = ({ provider }: HtmlVideoInfoProps) => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { fileDownload } = useFileManager();
  const { watch } = provider;

  const {
    contentUuid,
    fileUuid,
    isDrafted,
    processingStatus,
    handleChangeHtmlVideoFile,
    htmlFileResource,
  } = useHtmlVideoResource(provider);

  const handleClickFileDownload = useCallback(async () => {
    if (fileUuid) {
      await fileDownload(fileUuid);
    }
  }, [fileUuid]);

  const tenantId = watch('tenantId');
  const channelUuid = watch('channelUuid');
  const channelName = watch('channelName');

  const handleClickFileChange = useCallback(async () => {
    const uuid = await openModal({
      width: 'lg',
      content: (
        <LearningResourceFileUploadModal
          channel={{ tenantId, channelUuid, channelName }}
          type={LEARNING_TYPE.HTML5_VIDEO}
          maxFileCount={1}
        />
      ),
    });
    if (!uuid) {
      return;
    }

    handleChangeHtmlVideoFile(uuid);
  }, [tenantId, channelUuid, channelName]);

  const buttons = useMemo(
    () => [
      { label: t('원본 다운로드'), onClick: handleClickFileDownload },
      { label: t('파일 변경'), onClick: handleClickFileChange },
      { label: t('미리보기'), onClick: handleClickFileDownload },
    ],
    [],
  );

  const infoList = useMemo(() => {
    const { originalFileName = '', fileSize = 0, fileType } = htmlFileResource ?? {};
    return [
      { title: t('파일명'), text: originalFileName.split('.')[0] },
      {
        title: t('원본용량'),
        text: formatFileSize(fileSize),
      },
      { title: t('파일형식'), text: fileType },
    ];
  }, [htmlFileResource]);

  return (
    <MediaInfo
      status={processingStatus}
      buttons={buttons}
      type={LEARNING_TYPE.HTML5_VIDEO}
      infoList={infoList}
    />
  );
};

HtmlVideoInfoComponent.displayName = 'HtmlVideoInfo';

export const HtmlVideoInfo = HtmlVideoInfoComponent;
