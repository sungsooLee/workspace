/* IA110 / NLP_BO_CMS_1013 - 교육자원 > 블로그 삳세 */
import { ContentInformation } from '@entities/learning-resource';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceBlogDetail,
} from '@features/learning-resource';
import { useBlogContentForm } from '@features/learning-resource/learning-resource-management/service';
import { useDynamicForm2 } from '@learnway/hooks';
import defaultImage from '@learnway/styles/bo/assets/images/thumb/img_thumb_default.jpg';
import { useModal } from '@learnway/ui/modal';
import { ContentCreateType } from '@shared/types/enums';

import { ContentsButtons, MainContents, PageContainer, SubContents } from '@shared/ui/layout';
import { PreviewLearningWindow } from '@shared/ui/modal';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './blog-detail.module.css';

interface Props {
  content?: ContentInformation;
  hasMapping?: boolean;
}

function BlogViewComponent({ content, hasMapping }: Props) {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const { openModal } = useModal();

  const openBlogPreviewPopup = useCallback(async () => {
    await openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={content?.contentUuid} />,
    });
  }, [content?.contentUuid]);

  const { handleOnSubmit } = useBlogContentForm({ provider });

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer
        title={t('블로그 상세')}
        tooltipProps={{
          show: !!hasMapping || content?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(content?.createType)),
          type: content?.createType,
        }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <LearningResourceBlogDetail
            form={form}
            contentUuid={content?.contentUuid}
            blogInfo={content}
            hasMapping={hasMapping}
          />
        </MainContents>

        <SubContents>
          <div className={styles.sub_container}>
            <strong className={styles.title}>{t('cms.content.ContentType.BLOG')}</strong>
            {content?.contentUuid && (
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

BlogViewComponent.displayName = 'BlogView';

export const BlogView = BlogViewComponent;
