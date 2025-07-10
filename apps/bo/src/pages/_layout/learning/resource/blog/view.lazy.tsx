import { MouseEvent, useRef, useState } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { Button, Divider, useModal } from '@learnway/ui';
import { isEmptyData } from '@learnway/shared';
import defaultImage from '@assets/images/temp/img_temp_blog_default.png';
import { MainContents, PageContainer, ContentsButtons, SubContents } from '@shared/ui';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { PreviewLearningWindow } from '@features/learning-resource/learning-resource-management/ui/preview-learning-window';

import { BlogDetail } from './-components/blog-detail';
import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const formRef = useRef<HTMLFormElement>(null);

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

  const openBlogPreviewPopup = () => {
    openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={data?.contentUuid} />,
    });
  };

  const handleClickGoListButton = async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  };

  const handleClickDeleteButton = async () => {
    console.log('mappingData', mappingData);

    if (
      await openConfirm({
        title: t('삭제 하시겠습니까?'),
        content: '모든 정보가 삭제되며 복구 불가합니다.\n삭제 후 학습자원 조회화면으로 이동합니다.',
      })
    )
      if (mappingData?.hasMapping) {
        await openAlert({
          title: '과정에서 사용 중입니다.',
          content: '과정에서 사용중인 학습자원은 삭제할 수 없습니다.',
        });
        return;
      } else {
        // delete
      }
  };

  const handleClickSubmitButton = (e: MouseEvent<HTMLButtonElement>) => {
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

    if (formRef.current) {
      formRef.current?.dispatchEvent(submitEvent);
    }
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="search" size="sm" label={t('과정개설')} />
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
          mode="update"
          blogInfo={data}
          setThumbnailImage={setThumbnailImage}
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
