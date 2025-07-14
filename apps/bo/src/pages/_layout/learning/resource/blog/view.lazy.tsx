/* IA110 / NLP_BO_CMS_1013 - 나의 학습자원 > 블로그 삳세 */
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { Button, Divider, useModal } from '@learnway/ui';
import { isEmptyData } from '@learnway/shared';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import { MainContents, PageContainer, ContentsButtons, SubContents } from '@shared/ui';
import { learningResourceQueryOptions, useDeleteContent } from '@entities/learning-resource';
import { PreviewLearningWindow } from '@features/learning-resource/learning-resource-management/ui/preview-learning-window';

import { BlogDetail } from './-components/blog-detail';
import styles from './blog-detail.module.css';
import { useFetchAuthUser } from '@learnway/auth/entities';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const formRef = useRef<HTMLFormElement>(null);

  const { data: loginUser } = useFetchAuthUser();
  const [tenantId, setTenantId] = useState<number>(-1);

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(routerState.location.state?.contentUuid),
  );

  const { data: mappingData } = useQuery(
    learningResourceQueryOptions.getCoursesMapping(routerState.location.state?.contentUuid),
  );

  const thumbnailUrl = !isEmptyData(data?.thumbnailFiles)
    ? data?.thumbnailFiles[0].imageUrl
    : defaultImage;
  const [thumbnailImage, setThumbnailImage] = useState<string>(thumbnailUrl as string);

  const { open: openModal, alert: openAlert, confirm: openConfirm } = useModal();

  const openBlogPreviewPopup = useCallback(() => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={data?.contentUuid} />,
    });
  }, [data?.contentUuid]);

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

  const handleClickDeleteButton = async () => {
    console.log('mappingData', mappingData);

    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: t('삭제 후 목록으로 이동합니다.'),
      })
    ) {
      deleteBlogContent(data?.contentUuid as string);
    }
  };

  const handleClickSubmitButton = (e: MouseEvent<HTMLButtonElement>) => {
    if (formRef.current) {
      formRef.current?.requestSubmit();
    }
  };

  const handleClickCourseButton = () => {
    router.navigate({
      to: '/learning/course/create/view',
    });
  };

  useEffect(() => {
    if (loginUser?.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser?.tenants?.length) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="search"
          size="sm"
          label={t('과정개설')}
          onClick={handleClickCourseButton}
        />
        <Button type="button" variant="point" size="sm" label={t('매핑과정')} />
        <Button type="button" variant="point" size="sm" label={t('번역현황')} />
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
          onClick={handleClickSubmitButton}
        />
      </ContentsButtons>

      <MainContents>
        <BlogDetail
          ref={formRef}
          tenantId={tenantId}
          mode="update"
          blogInfo={data}
          setThumbnailImage={setThumbnailImage}
          hasMapping={mappingData?.hasMapping}
        />
      </MainContents>

      <SubContents>
        <div className={styles.sub_container}>
          <strong className={styles.title}>{t('cms.content.ContentType.BLOG')}</strong>
          <p className={styles.preview} onClick={openBlogPreviewPopup}>
            {t('LABEL.button.preview')}
          </p>
        </div>
        <div className={styles.thumbnail_container}>
          <img width="100%" src={thumbnailImage} alt="" />
        </div>
      </SubContents>
    </PageContainer>
  );
}
