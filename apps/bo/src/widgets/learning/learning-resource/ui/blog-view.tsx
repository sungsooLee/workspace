/* IA110 / NLP_BO_CMS_1013 - 교육자원 > 블로그 삳세 */
import { ContentInformation } from '@entities/learning-resource';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceBlogDetail,
} from '@features/learning-resource';
import { useBlogContentForm } from '@features/learning-resource/learning-resource-management';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { ContentCreateType } from '@shared/types/enums';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  content?: ContentInformation;
  hasMapping?: boolean;
}

function BlogViewComponent({ content, hasMapping }: Props) {
  const {
    state: { isTranslated },
  } = useCurrentRoute();
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useDynamicForm2();
  const { provider, onSubmit } = form;

  const { handleOnSubmit } = useBlogContentForm({ provider });

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer
        title={`${t('블로그')} ${!isTranslated ? t('상세') : t('번역')}`}
        tooltipProps={{
          show: !isTranslated && (!!hasMapping || content?.createType !== ContentCreateType.MANUAL),
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
      </PageContainer>
    </form>
  );
}

BlogViewComponent.displayName = 'BlogView';

export const BlogView = BlogViewComponent;
