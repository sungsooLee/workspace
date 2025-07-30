// IA109 / NLP_BO_CMS_1027, NLP_BO_CMS_1009

import { learningResourceQueryOptions, usePutETCUpdate } from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import {
  ContentTopButtons,
  convertToETCForm,
  convertToETCSubmit,
  ETCInfo,
  getTooltipContent,
  LearningResourceETCDetail,
} from '@features/learning-resource';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { Button, useModal } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ContentCreateType, PutETCUpdateRes } from '@types';
import { t } from 'i18next';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/etc/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { confirm: openConfirm } = useModal();
  const {
    state: { contentUuid },
  } = useCurrentRoute();
  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );
  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  const { provider, onSubmit, updateFormData, formState, getValues } = useDynamicForm2();

  useEffect(() => {
    if (data) updateFormData(convertToETCForm(data));
  }, [data]);

  const { update: updateETCContent } = usePutETCUpdate({
    onSuccess: (result: PutETCUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToETCForm(result));
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      updateETCContent(convertToETCSubmit(data));
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
          type: data?.createType,
        }}
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
                  convertToETCSubmit(getValues()),
                )
              }
            >
              폼 데이터 확인 for debug
            </Button>
          )}
          <ContentTopButtons provider={provider} hasMapping={hasMapping} />
        </ContentsButtons>
        <MainContents>
          <LearningResourceETCDetail provider={provider} />
        </MainContents>
        <SubContents>
          <ETCInfo provider={provider} />
        </SubContents>
      </PageContainer>
    </form>
  );
}
