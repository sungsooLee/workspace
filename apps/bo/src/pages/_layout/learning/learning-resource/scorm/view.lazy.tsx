import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
//  IA106 / NLP_BO_CMS_1032, NLP_BO_CMS_1014 / 학습자원조회_나의 학습자원_등록_스콤

import { learningResourceQueryOptions, usePutScormUpdate } from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import {
  ContentTopButtons,
  convertToScormForm,
  convertToScormSubmit,
  getTooltipContent,
  LearningResourceScormDetail,
  ScormInfo } from '@features/learning-resource';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ContentCreateType, PutScormUpdateRes } from '@types';
import { t } from 'i18next';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/scorm/view')({
  component: RouteComponent });

function RouteComponent() {
  const { confirm: openConfirm } = useModal();
  const {
    state: { contentUuid } } = useCurrentRoute();
  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );
  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  const { provider, onSubmit, updateFormData, formState, getValues } = useDynamicForm2();

  useEffect(() => {
    if (data) updateFormData(convertToScormForm(data));
  }, [data]);

  const { update: updateScormContent } = usePutScormUpdate({
    onSuccess: (result: PutScormUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToScormForm(result));
    } });

  const handleFormSubmit = async (data: any) => {
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.') })
    ) {
      updateScormContent(convertToScormSubmit(data));
    }
  };

  if (fetchError) {
    console.log('🚀 ~ RouteComponent ~ fetchError:', fetchError);
    return <NotFound />;
  }

  if (!data) {
    return <PageContainer />;
  }
  const debug = true;

  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <PageContainer
        tooltipProps={{
          show: !!hasMapping || data?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(data?.createType)),
          type: data?.createType }}
      >
        <ContentsButtons>
          {debug && (
            <Button
              variant="point"
              onClick={() =>
                console.log(
                  '🚀 ~ data & Form values:',
                  formState.isDirty,
                  data,
                  convertToScormSubmit(getValues()),
                )
              }
            >
              폼 데이터 확인 for debug
            </Button>
          )}
          <ContentTopButtons provider={provider} hasMapping={hasMapping} />
        </ContentsButtons>
        <MainContents>
          <LearningResourceScormDetail provider={provider} />
        </MainContents>
        <SubContents>
          <ScormInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}
