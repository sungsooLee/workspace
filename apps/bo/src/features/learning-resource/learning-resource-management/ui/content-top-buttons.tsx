import { DynamicFormProvider, useCurrentRoute } from '@learnway/hooks';
import { Button, Divider, useModal } from '@learnway/ui';
import { ContentCourseMappingModal } from '@shared/ui';
import { ContentCreateType, ContentInformation } from '@types';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { TranslationListModal } from './learning-resource-translation-list-modal';
import { useBlocker, useRouter } from '@tanstack/react-router';
import { useDeleteContent } from '@entities/learning-resource';

interface Props {
  provider: DynamicFormProvider;
}

const ContentTopButtonsComponent = ({ provider }: Props) => {
  const { openModal, alert: openAlert, confirm: openConfirm } = useModal();
  const router = useRouter();
  const {
    state: { listParam },
  } = useCurrentRoute();
  const { watch, getValues, formState } = provider;

  const contentUuid = watch('contentUuid');
  const channelUuid = watch('channelUuid');
  const createType = watch('createType');
  const isDrafted = watch('isDrafted');
  const isCourseUsed = watch('isCourseUsed');

  const data = useMemo(
    () => (contentUuid ? getValues() : undefined),
    [contentUuid],
  ) as ContentInformation;

  useBlocker({
    shouldBlockFn: async () => {
      if (!formState.isDirty) return false;
      return !(await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('입력 중인 항목이 초기화됩니다.'),
      }));
    },
  });

  const { delete: deleteContent } = useDeleteContent({
    onSuccess: (result: number) => {
      console.log('delete success', result);
      return router.navigate({
        to: '/learning/learning-resource',
        state: { listParam },
        replace: true,
      });
    },
  });

  const handleCourseMapping = useCallback(() => {
    openModal({
      content: (
        <ContentCourseMappingModal contentUuid={contentUuid} channelUuid={channelUuid || ''} />
      ),
      width: 'lg',
    });
  }, [contentUuid, channelUuid]);

  const handleTranslationList = useCallback(() => {
    if (!data) return;
    openModal({
      content: <TranslationListModal contentInfo={data} />,
      width: 'lg',
    });
  }, [data]);

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
      deleteContent(contentUuid as string);
    }
  }, [isCourseUsed, contentUuid]);

  return (
    <>
      {!isDrafted && (
        <>
          <Button variant="gray" size="sm">
            {t('과정 개설')}
          </Button>
          <Button variant="point" size="sm" onClick={handleCourseMapping}>
            {t('매핑과정')}
          </Button>
          <Button
            variant="point"
            size="sm"
            disabled={createType !== ContentCreateType.MANUAL}
            onClick={handleTranslationList}
          >
            {t('번역현황')}
          </Button>
        </>
      )}
      <Button
        variant="point"
        size="sm"
        onClick={() => router.navigate({ to: '/learning/learning-resource', state: { listParam } })}
      >
        {t('목록')}
      </Button>
      <Divider orientation={'vertical'} />
      <Button variant="point" size="sm" onClick={handleDelete}>
        {t('삭제')}
      </Button>
      {!isDrafted && (
        <Button variant="point" size="sm" disabled={createType !== ContentCreateType.MANUAL}>
          {t('번역')}
        </Button>
      )}
      <Button type="submit" variant="primary" size="sm">
        {t('저장')}
      </Button>
    </>
  );
};

export const ContentTopButtons = ContentTopButtonsComponent;
