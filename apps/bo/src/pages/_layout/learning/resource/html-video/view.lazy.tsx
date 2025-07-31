import { useModal } from '@learnway/ui/modal';
/* IA112 / NLP_BO_CMS_1022 - 나의 학습자원 > HTML 상세(저장 및 조회용) */
import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { useDynamicForm2 } from '@learnway/hooks';
import { ContentCreateType, ContentStatusCode, HtmlVideoMetadataRes } from '@types';
import { useUpdateHTML5Metadata } from '@entities/learning-resource';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceHtmlDetail,
  LearningResourceHtmlFileInfo } from '@features/learning-resource';
import { useFetchHtmlVideoInfo } from '@features/learning-resource/learning-resource-management/service';
import { getPayloadFromHtmlMetadataSubmit } from '@features/learning-resource/learning-resource-management/service/learning-resource-html-form-submit';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/_layout/learning/resource/html-video/view')({
  component: RouteComponent });

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();

  const { contentUuid, data, hasMapping } = useFetchHtmlVideoInfo();

  const { confirm: openConfirm } = useModal();

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const { update: updateMetadata } = useUpdateHTML5Metadata({
    onSuccess: (result: HtmlVideoMetadataRes) => {
      if (result?.contentUuid && result.contentStatusCode === ContentStatusCode.SAVED) {
        return router.navigate({
          to: '/learning/resource/html-video/view',
          state: {
            contentUuid: result.contentUuid,
            listParam: {
              tenantId: result.tenantId,
              channelUuid: result.channelUuid } },
          replace: true });
      }
    } });

  const handleSubmit = async (formData: any): Promise<void> => {
    const { payload } = getPayloadFromHtmlMetadataSubmit({
      data: formData,
      contentUuid: data?.contentUuid ?? '' });

    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message') })
    ) {
      updateMetadata(payload);
    }
  };

  useEffect(() => {
    if (!contentUuid) {
      router.navigate({
        to: '/learning/learning-resource',
        replace: true });
    }
  }, [contentUuid]);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <PageContainer
        tooltipProps={{
          show: !!hasMapping || data?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(data?.createType)),
          type: data?.createType }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <LearningResourceHtmlDetail form={form} data={data} hasMapping={hasMapping} />
        </MainContents>

        <SubContents>
          {data?.contentUuid && data?.fileUuid && (
            <LearningResourceHtmlFileInfo
              contentUuid={data.contentUuid}
              uuid={data.fileUuid}
              status={data?.contentStatusCode ?? ContentStatusCode.TEMPORARY_SAVE}
            />
          )}
        </SubContents>
      </PageContainer>
    </form>
  );
}
