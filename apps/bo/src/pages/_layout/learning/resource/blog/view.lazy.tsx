/* IA110 / NLP_BO_CMS_1013 - 나의 학습자원 > 블로그 삳세 */
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { useCurrentRoute } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Button, Divider, useModal } from '@learnway/ui';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import {
  ContentCourseMappingModal,
  ContentsButtons,
  MainContents,
  PageContainer,
  SubContents,
} from '@shared/ui';
import { learningResourceQueryOptions, useDeleteContent } from '@entities/learning-resource';
import { PreviewLearningWindow } from '@features/learning-resource/learning-resource-management/ui/preview-learning-window';
import { LearningResourceBlogDetail } from '@features/learning-resource';

import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { state } = useCurrentRoute();

  const formRef = useRef<HTMLFormElement>(null);

  const { data: loginUser } = useFetchAuthUser();
  const [tenantId, setTenantId] = useState<number>(-1);

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(state?.contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(state?.contentUuid),
  );

  const { open: openModal, alert: openAlert, confirm: openConfirm } = useModal();

  const openBlogPreviewPopup = useCallback(() => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={data?.contentUuid} />,
    });
  }, [data?.contentUuid]);

  const handleClickCourseMapping = useCallback(async () => {
    if (!state?.contentUuid) {
      return;
    }
    await openModal({
      content: (
        <ContentCourseMappingModal
          channelUuid={data?.channelUuid ?? ''}
          contentUuid={state.contentUuid}
        />
      ),
      width: 'lg',
    });
  }, [data]);

  const handleClickGoListButton = useCallback(async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({
        to: '/learning/learning-resource',
        state: { listParam: state?.listParam },
      });
    }
  }, [state]);

  const { delete: deleteBlogContent } = useDeleteContent({
    onSuccess: (result: number) => {
      console.log('delete success', result);
      return router.navigate({ to: '/learning/learning-resource', replace: true });
    },
  });

  const handleClickDeleteButton = async () => {
    console.log('hasMapping', hasMapping);

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
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('매핑과정')}
          onClick={handleClickCourseMapping}
        />
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
          disabled={hasMapping}
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
        <LearningResourceBlogDetail
          ref={formRef}
          tenantId={tenantId}
          mode="update"
          blogInfo={data}
          hasMapping={hasMapping}
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
          <img width="100%" src={defaultImage} alt="" />
        </div>
      </SubContents>
    </PageContainer>
  );
}
