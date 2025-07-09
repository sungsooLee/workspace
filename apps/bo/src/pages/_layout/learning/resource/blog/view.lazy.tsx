import { useRef, useState } from 'react';
import { createLazyFileRoute, useRouterState } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { Button, Divider } from '@learnway/ui';
import { isEmptyData } from '@learnway/shared';
import defaultImage from '@assets/images/temp/img_temp_blog_default.png';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@widgets/layout';
import { learningResourceQueryOptions } from '@entities/learning-resource';

import { BlogDetail } from './-components/blog-detail';
import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouterState();

  const formRef = useRef<HTMLFormElement>(null);

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(router.location.state?.contentUuid),
  );

  const thumbnailUrl = !isEmptyData(data?.thumbnailFiles)
    ? data?.thumbnailFiles[0].imageUrl
    : defaultImage;
  const [thumbnailImage, setThumbnailImage] = useState<string>(thumbnailUrl as string);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="search" size="sm" label={t('과정개설')} />
        <Button type="button" variant="point" size="sm" label={t('매핑과정')} />
        <Button type="button" variant="point" size="sm" label={t('번역현황')} />
        <Button type="button" variant="point" size="sm" label={t('목록')} />
        <Divider orientation="vertical" />
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.delete')} />
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.translate')} />
        <Button type="button" variant="primary" size="sm" label={t('LABEL.button.save')} />
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
          <strong className={styles.title}>{t('블로그')}</strong>
          <p className={styles.preview}>미리보기</p>
        </div>
        <div className={styles.thumbnail_container}>
          <img width="100%" src={thumbnailImage} alt="" />
        </div>
      </SubContents>
    </PageContainer>
  );
}
