import {
  ContentExportRes,
  ContentInformation,
  learningResourceQueryOptions,
  useDeleteContent,
  usePostContentExport,
} from '@entities/learning-resource';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { DynamicFormProvider, useCurrentRoute } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { ContentCreateType } from '@shared/types/enums';
import { ContentCourseMappingModal } from '@shared/ui/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useBlocker, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { TranslationListModal } from './learning-resource-translation-list-modal';

interface Props {
  provider: DynamicFormProvider;
  hasMapping?: boolean;
}

const ContentTopButtonsComponent = ({ provider, hasMapping = false }: Props) => {
  const { data: authUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const { openModal, alert: openAlert, confirm: openConfirm } = useModal();
  const router = useRouter();
  const {
    state: { listParam, isTranslated },
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

  const { exportContent } = usePostContentExport({
    onSuccess: (result: ContentExportRes) => {
      if (result.destContentUuid) {
        router.navigate({
          to: '/learning/learning-resource/view',
          state: {
            contentUuid: result.destContentUuid,
            isTranslated: true,
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
    // 번역 항목이 있고 공유 항목이 있으면 삭제 불가 alert
    const removable = await queryClient.fetchQuery(
      learningResourceQueryOptions.getContentRemovable(contentUuid),
    );

    if (removable === 'REASON_TRANSLATE') {
      await openAlert({
        title: t('번역본을 가진 교육자원입니다.'),
        content: t('번역본을 가진 교육자원은 삭제할 수 없습니다.'),
      });
      return;
    } else if (removable === 'REASON_SHARED') {
      await openAlert({
        title: t('타채널에 공유 중입니다.'),
        content: t('공유 중인 교육자원은 삭제할 수 없습니다.'),
      });
      return;
    }

    if (isCourseUsed) {
      await openAlert({
        title: t('과정에서 사용 중입니다.'),
        content: t('과정에서 사용중인 교육자원은 삭제할 수 없습니다.'),
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
      {contentUuid && !isDrafted && !isTranslated && (
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
            disabled={createType === ContentCreateType.TRANSLATE}
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
      {!isTranslated && (
        <Button variant="point" size="sm" onClick={handleDelete} disabled={hasMapping}>
          {t('삭제')}
        </Button>
      )}
      {contentUuid && !isDrafted && !isTranslated && (
        <Button
          variant="point"
          size="sm"
          disabled={createType === ContentCreateType.TRANSLATE}
          onClick={handleTranslateAction}
        >
          {t('번역')}
        </Button>
      )}
      <Button type="submit" variant="primary" size="sm">
        {/* 저장 완료 후 toast */}
        {t('저장')}
      </Button>
    </>
  );
};

export const ContentTopButtons = ContentTopButtonsComponent;
