/* IA112 / NLP_BO_CMS_1022 - 나의 학습자원 > HTML 상세(저장 및 조회용) */
import {
  ContentInformation,
  HtmlVideoMetadataRes,
  useUpdateHTML5Metadata,
} from '@entities/learning-resource';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceHtmlDetail,
} from '@features/learning-resource';
import { getPayloadFromHtmlMetadataSubmit } from '@features/learning-resource/learning-resource-management/service/learning-resource-html-form-submit';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { ContentCreateType, ContentStatusCode } from '@shared/types/enums';

import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui/layout';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { HtmlVideoInfo } from '@features/learning-resource/learning-resource-management/ui/html-video-info';

interface Props {
  content: ContentInformation;
  hasMapping?: boolean;
}

function HtmlViewComponent({ content, hasMapping }: Props) {
  const router = useRouter();
  const {
    state: { isTranslated },
  } = useCurrentRoute();
  const { t } = useTranslation();

  const { confirm: openConfirm } = useModal();

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const { update: updateMetadata } = useUpdateHTML5Metadata({
    onSuccess: (result: HtmlVideoMetadataRes) => {
      if (result?.contentUuid && result.contentStatusCode === ContentStatusCode.SAVED) {
        return router.navigate({
          to: '/learning/learning-resource/view',
          state: {
            contentUuid: result.contentUuid,
            listParam: {
              tenantId: result.tenantId,
              channelUuid: result.channelUuid,
            },
          },
          replace: true,
        });
      }
    },
  });

  const handleSubmit = async (formData: any): Promise<void> => {
    const { payload } = getPayloadFromHtmlMetadataSubmit({
      data: formData,
      contentUuid: content?.contentUuid ?? '',
    });

    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      })
    ) {
      updateMetadata(payload);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <PageContainer
        title={`${t('HTML')} ${!isTranslated ? t('상세') : t('번역')}`}
        tooltipProps={{
          show: !isTranslated && (!!hasMapping || content?.createType !== ContentCreateType.MANUAL),
          content: t(getTooltipContent(content?.createType)),
          type: content?.createType,
        }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <LearningResourceHtmlDetail form={form} data={content} hasMapping={hasMapping} />
        </MainContents>

        <SubContents>
          <HtmlVideoInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}

export const HtmlView = HtmlViewComponent;
