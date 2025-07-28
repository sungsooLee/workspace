/* IA112 / NLP_BO_CMS_1022 - 나의 학습자원 > HTML 상세(저장 및 조회용) */
import { useCallback, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { Button, Divider, useModal } from '@learnway/ui';
import { useDeleteContent } from '@entities/learning-resource';
import {
  ContentCourseMappingModal,
  ContentsButtons,
  MainContents,
  PageContainer,
  SubContents,
} from '@shared/ui';
import { ProcessingStatus } from '@types';
import {
  LearningResourceHtmlDetail,
  LearningResourceHtmlFileInfo,
} from '@features/learning-resource';
import { useFetchHtmlVideoInfo } from '@features/learning-resource/learning-resource-management/service';

export const Route = createLazyFileRoute('/_layout/learning/resource/html-video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const { loginUser, contentUuid, data, hasMapping, htmlStatus, listParam } =
    useFetchHtmlVideoInfo();

  // const [tenantId, setTenantId] = useState<number>(-1);

  // draft: 임시저장 상태 / complete: 한 번이라도 저장 버튼을 눌러 저장한 상태
  const [mode, setMode] = useState<'draft' | 'complete'>('draft');

  const { openModal, confirm: openConfirm } = useModal();

  const handleClickCourseMapping = useCallback(async () => {
    if (!contentUuid) {
      return;
    }

    await openModal({
      content: (
        <ContentCourseMappingModal
          channelUuid={data?.channelUuid ?? ''}
          contentUuid={contentUuid}
        />
      ),
      width: 'lg',
    });
  }, [data]);

  const handleClickSaveButton = useCallback(() => {
    if (formRef.current) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }, []);

  const handleClickGoListButton = useCallback(async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({
        to: '/learning/learning-resource',
        state: { listParam },
      });
    }
  }, [listParam]);

  const { delete: deleteBlogContent } = useDeleteContent({
    onSuccess: (result: number) => {
      console.log('delete success', result);
      return router.navigate({ to: '/learning/learning-resource', replace: true });
    },
  });

  const handleClickDeleteButton = useCallback(async () => {
    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: t('삭제 후 목록으로 이동합니다.'),
      })
    ) {
      deleteBlogContent(contentUuid as string);
    }
  }, [contentUuid]);

  const handleClickCourseButton = useCallback(() => {
    router.navigate({
      to: '/learning/course/create',
    });
  }, []);

  useEffect(() => {
    if (!contentUuid) {
      router.navigate({
        to: '/learning/learning-resource',
        replace: true,
      });
    }
  }, [contentUuid]);

  // useEffect(() => {
  //   if (loginUser?.activeTenant) {
  //     setTenantId(loginUser.activeTenant.tenantId);
  //   } else {
  //     if (loginUser?.tenants?.length) {
  //       setTenantId(loginUser.tenants[0].tenantId);
  //     }
  //   }
  // }, [loginUser]);

  useEffect(() => {
    if (htmlStatus?.processingStatus === ProcessingStatus.COMPLETE) {
      setMode('complete');
    } else {
      setMode('draft');
    }
  }, [htmlStatus]);

  return (
    <PageContainer>
      <ContentsButtons>
        {mode === 'complete' && (
          <>
            <Button
              type="button"
              variant="search"
              size="sm"
              label={t('과정개설')}
              onClick={handleClickCourseButton}
            />
            <Button
              type="button"
              variant="point"
              size="sm"
              label={t('매핑과정')}
              onClick={handleClickCourseMapping}
            />
            <Button type="button" variant="point" size="sm" label={t('번역현황')} />
            <Button type="button" variant="point" size="sm" label={t('공유이력')} />
          </>
        )}
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('목록')}
          onClick={handleClickGoListButton}
        />
        <Divider orientation="vertical" />
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.delete')}
          onClick={handleClickDeleteButton}
          disabled={hasMapping}
        />
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.translate')} />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.save')}
          onClick={handleClickSaveButton}
        />
      </ContentsButtons>

      <MainContents>
        <LearningResourceHtmlDetail ref={formRef} mode={mode} data={data} hasMapping={hasMapping} />
      </MainContents>

      <SubContents>
        {data?.contentUuid && data?.fileUuid && (
          <LearningResourceHtmlFileInfo
            contentUuid={data.contentUuid}
            uuid={data.fileUuid}
            mode={mode}
          />
        )}
      </SubContents>
    </PageContainer>
  );
}
