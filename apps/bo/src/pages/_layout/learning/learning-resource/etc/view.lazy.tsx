// IA109 / NLP_BO_CMS_1027, NLP_BO_CMS_1009

import { createLazyFileRoute, useBlocker, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, Divider, useModal } from '@learnway/ui';
import {
  PageContainer,
  MainContents,
  ContentsButtons,
  SubContents,
  ContentCourseMappingModal,
} from '@shared/ui';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { useQuery } from '@tanstack/react-query';
import {
  learningResourceQueryOptions,
  useDeleteContent,
  usePutETCUpdate,
} from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import { useCallback, useEffect } from 'react';
import {
  convertToETCForm,
  convertToETCSubmit,
  ETCInfo,
  LearningResourceETCDetail,
} from '@features/learning-resource';
import { PutETCUpdateRes } from '@types';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/etc/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal, alert: openAlert, confirm: openConfirm } = useModal();
  const {
    state: { contentUuid, listParam },
  } = useCurrentRoute();
  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const router = useRouter();
  const { provider, onSubmit, updateFormData, formState, getValues, watch } = useDynamicForm2();

  const isDrafted = watch('isDrafted');
  const isCourseUsed = watch('isCourseUsed');

  useBlocker({
    shouldBlockFn: async () => {
      if (!formState.isDirty) return false;
      return !(await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('입력 중인 항목이 초기화됩니다.'),
      }));
    },
  });

  useEffect(() => {
    if (data) updateFormData(convertToETCForm(data));
  }, [data]);

  const { delete: deleteETCContent } = useDeleteContent({
    onSuccess: (result: number) => {
      console.log('delete success', result);
      return router.navigate({
        to: '/learning/learning-resource',
        state: { listParam },
        replace: true,
      });
    },
  });

  const { update: updateETCContent } = usePutETCUpdate({
    onSuccess: (result: PutETCUpdateRes) => {
      console.log('update success', result);
      updateFormData(convertToETCForm(result));
    },
  });

  const handleDelete = useCallback(async () => {
    if (isCourseUsed) {
      await openAlert({
        title: t('과정에서 사용 중입니다.'),
        content: t('과정에서 사용중인 학습자원은 삭제할 수 없습니다.'),
      });
      return;
    }
    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: t('삭제 후 목록으로 이동합니다.'),
      })
    ) {
      deleteETCContent(contentUuid as string);
    }
  }, [data]);

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

  const handleCourseMapping = useCallback(() => {
    openModal({
      content: (
        <ContentCourseMappingModal
          contentUuid={contentUuid}
          channelUuid={data?.channelUuid || ''}
        />
      ),
      width: 'lg',
    });
  }, [data]);

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
      <PageContainer>
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
          {!isDrafted && (
            <>
              <Button variant="gray" size="sm">
                {t('과정 개설')}
              </Button>
              <Button variant="point" size="sm" onClick={handleCourseMapping}>
                {t('매핑과정')}
              </Button>
              <Button variant="point" size="sm">
                {t('번역현황')}
              </Button>
            </>
          )}
          <Button
            variant="point"
            size="sm"
            onClick={() =>
              router.navigate({ to: '/learning/learning-resource', state: { listParam } })
            }
          >
            {t('목록')}
          </Button>
          <Divider orientation={'vertical'} />
          <Button variant="point" size="sm" onClick={handleDelete}>
            {t('삭제')}
          </Button>
          {!isDrafted && (
            <Button variant="point" size="sm">
              {t('번역')}
            </Button>
          )}
          <Button type="submit" variant="primary" size="sm">
            {t('저장')}
          </Button>
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
