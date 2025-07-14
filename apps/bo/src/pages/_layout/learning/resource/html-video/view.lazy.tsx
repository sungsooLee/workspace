/* IA112 / NLP_BO_CMS_1022 - 나의 학습자원 > HTML 상세(저장 및 조회용) */
import { useCallback, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Button, Divider, useModal } from '@learnway/ui';
import { learningResourceQueryOptions, useDeleteContent } from '@entities/learning-resource';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui';
import { HtmlDetail } from './-components/html-detail';
import { ProcessingStatus } from '@types';
import { FileInfo } from '@pages/_layout/learning/resource/html-video/-components/file-info';

export const Route = createLazyFileRoute('/_layout/learning/resource/html-video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const [tenantId, setTenantId] = useState<number>(-1);

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(routerState.location.state?.contentUuid),
  );

  const { data: mappingData } = useQuery(
    learningResourceQueryOptions.getCoursesMapping(routerState.location.state?.contentUuid),
  );

  const { data: htmlStatus } = useQuery(
    learningResourceQueryOptions.getHTML5Status(routerState.location.state?.contentUuid),
  );

  // draft: 임시저장 상태 / complete: 한 번이라도 저장 버튼을 눌러 저장한 상태
  const [mode, setMode] = useState<'draft' | 'complete'>('draft');

  const { open: openModal, confirm: openConfirm } = useModal();

  const handleClickSaveButton = async () => {
    if (formRef.current) {
      formRef.current?.requestSubmit();
    }
  };

  const handleClickGoListButton = useCallback(async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  }, []);

  const { delete: deleteBlogContent } = useDeleteContent({
    onSuccess: (result: unknown) => {
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
      deleteBlogContent(data?.contentUuid as string);
    }
  }, [data?.contentUuid]);

  const handleClickCourseButton = () => {
    router.navigate({
      to: '/learning/course/create/view',
    });
  };

  useEffect(() => {
    if (!routerState.location.state?.contentUuid) {
      router.navigate({
        to: '/learning/learning-resource',
        replace: true,
      });
    }
  }, [routerState.location.state]);

  useEffect(() => {
    if (loginUser?.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser?.tenants?.length) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

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
            <Button type="button" variant="point" size="sm" label={t('매핑과정')} />
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
          disabled={!!mappingData?.hasMapping}
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
        <HtmlDetail
          ref={formRef}
          mode={mode}
          tenantId={tenantId}
          data={data}
          hasMapping={mappingData?.hasMapping}
        />
      </MainContents>

      <SubContents>
        {data?.contentUuid && data?.fileUuid && (
          <FileInfo contentUuid={data.contentUuid} uuid={data.fileUuid} mode={mode} />
        )}
      </SubContents>
    </PageContainer>
  );
}
