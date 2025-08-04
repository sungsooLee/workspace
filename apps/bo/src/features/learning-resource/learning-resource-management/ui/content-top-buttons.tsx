import { useDeleteContent, usePostContentExport } from '@entities/learning-resource';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { DynamicFormProvider, useCurrentRoute } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { ContentCourseMappingModal } from '@shared/ui';
import { useBlocker, useRouter } from '@tanstack/react-router';
import { ContentCreateType, ContentExportRes, ContentInformation } from '@types';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { getDetailPathByContentType } from '../service/util';
import { TranslationListModal } from './learning-resource-translation-list-modal';

interface Props {
  provider: DynamicFormProvider;
  hasMapping?: boolean;
}

const ContentTopButtonsComponent = ({ provider, hasMapping = false }: Props) => {
  const { data: authUser } = useFetchAuthUser();

  const { openModal, alert: openAlert, confirm: openConfirm } = useModal();
  const router = useRouter();
  const {
    state: { listParam },
  } = useCurrentRoute();
  const { watch, getValues, formState } = provider;

  const tenantId = watch('tenantId');
  const contentUuid = watch('contentUuid');
  const channelUuid = watch('channelUuid');
  const contentType = watch('contentType');
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

  const detailUrl = useMemo(
    () => getDetailPathByContentType(contentType) || '/learning/learning-resource',
    [contentType],
  );

  const { exportContent } = usePostContentExport({
    onSuccess: (result: ContentExportRes) => {
      if (result.destContentUuid) {
        router.navigate({
          to: detailUrl,
          state: {
            contentUuid: result.destContentUuid,
            listParam: {
              ...listParam,
              tenantId: result.destTenantId,
              channelUuid: result.destChannelUuid,
            },
          },
          replace: true,
        });
      }
    },
  });

  const handleCourseMapping = useCallback(() => {
    openModal({
      content: (
        <ContentCourseMappingModal
          contentUuid={contentUuid}
          channelUuid={data.channelUuid}
          lastVisitedBoRoleId={authUser!.activeRole!.roleId}
        />
      ),
      width: 'lg',
    });
  }, [contentUuid, data]);

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

  const handleTranslateAction = useCallback(() => {
    if (!contentUuid) return;

    exportContent({
      tenantId,
      contentUuid,
      destChannelUuid: data.channelUuid,
      languageCountryCode: data.languageCountryCode,
    });
  }, [tenantId, contentUuid, data]);

  return (
    <>
      {contentUuid && !isDrafted && (
        <>
          <Button variant="gray" size="sm">
            {t('과정 개설')}
          </Button>
          <Button
            variant="point"
            size="sm"
            onClick={handleCourseMapping}
            disabled={authUser?.activeRole?.roleType === 'CHANNEL_GUEST_COURSE'}
          >
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
      <Button variant="point" size="sm" onClick={handleDelete} disabled={hasMapping}>
        {t('삭제')}
      </Button>
      {contentUuid && !isDrafted && (
        <Button
          variant="point"
          size="sm"
          disabled={createType !== ContentCreateType.MANUAL}
          onClick={handleTranslateAction}
        >
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
