import { useModal } from '@learnway/ui/modal';
/* IA110 / NLP_BO_CMS_1013 - 나의 학습자원 > 블로그 삳세 */
import { useCallback, useRef } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import { ContentCreateType } from '@types';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import {
  ContentsButtons,
  MainContents,
  PageContainer,
  PreviewLearningWindow,
  SubContents,
} from '@shared/ui';
import {
  useBlogContentForm,
  useFetchBlogInfo,
} from '@features/learning-resource/learning-resource-management/service';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceBlogDetail,
} from '@features/learning-resource';

import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const { contentUuid, data, hasMapping, listParam } = useFetchBlogInfo();

  const { openModal } = useModal();

  const openBlogPreviewPopup = useCallback(async () => {
    await openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={contentUuid} />,
    });
  }, [contentUuid]);

  const { handleOnSubmit } = useBlogContentForm({ provider });

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer
        tooltipProps={{
          show: !!hasMapping || data?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(data?.createType)),
          type: data?.createType,
        }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <LearningResourceBlogDetail
            form={form}
            contentUuid={contentUuid}
            blogInfo={data}
            hasMapping={hasMapping}
          />
        </MainContents>

        <SubContents>
          <div className={styles.sub_container}>
            <strong className={styles.title}>{t('cms.content.ContentType.BLOG')}</strong>
            {contentUuid && (
              <p className={styles.preview} onClick={openBlogPreviewPopup}>
                {t('LABEL.button.preview')}
              </p>
            )}
          </div>
          <div className={styles.thumbnail_container}>
            <img width="100%" src={defaultImage} alt="" />
          </div>
        </SubContents>
      </PageContainer>
    </form>
  );
}
