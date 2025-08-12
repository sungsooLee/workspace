import { BlogDetailRes } from '@entities/learning-resource';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { UseDynamicFormResult } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useRoleInfo } from '../service/util';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { ContentsRow } from '@learnway/ui/contents-row';

import { ContentsHistoryInfoFormField, MediaContentRequiredCheckFormField } from '@shared/ui/form';
import { SplitPanel } from '@learnway/ui/elements';
import { t } from 'i18next';
import styles from '@widgets/learning/learning-resource/ui/blog-detail.module.css';
import defaultImage from '@learnway/styles/bo/assets/images/temp/img_exam_basic.jpg';
import { PreviewLearningWindow } from '@shared/ui/modal';
import { useModal } from '@learnway/ui/modal';

type BlogDetailProps = {
  form: UseDynamicFormResult;
  contentUuid?: string;
  blogInfo?: Partial<BlogDetailRes>;
  hasMapping?: boolean;
};

const BlogDetailComponent = ({
  form,
  contentUuid,
  blogInfo = {},
  hasMapping = false,
}: BlogDetailProps) => {
  const { openModal } = useModal();

  const { provider, getValues, updateFormData, onFormChange, watch } = form;

  const createType = watch('createType');

  const { data: loginUser } = useFetchAuthUser();

  const { initRoleInfo } = useRoleInfo({
    loginUser,
    onChannelMemberCallback: () => {
      updateFormData({
        ...getValues(),
        coordinatorUuid: loginUser?.uuid,
        coordinatorName: loginUser?.name,
        // coordinatorTelCountryCode: loginUser?.phoneNumberNationCode,
        coordinatorTelNo: loginUser?.phoneNumber,
      });
    },
  });

  const openBlogPreviewPopup = useCallback(async () => {
    await openModal({
      width: 'full',
      content: <PreviewLearningWindow contentUuid={contentUuid} />,
    });
  }, [contentUuid]);

  useEffect(() => {
    (async () => {
      await initRoleInfo();
    })();
  }, [loginUser]);

  useEffect(() => {
    if (contentUuid && !isEmptyData(blogInfo)) {
      onFormChange({
        ...blogInfo,
        contentUseDate: {
          from: blogInfo.contentUseStartDate
            ? dayjs(blogInfo.contentUseStartDate).toDate()
            : undefined,
          to: blogInfo.contentUseEndDate ? dayjs(blogInfo.contentUseEndDate).toDate() : undefined,
        },
        blogContent: JSON.stringify(blogInfo.blogContent ?? {}),
        aiSummary: blogInfo.aiSummary ?? '',
        aiKeyword: blogInfo.aiKeyword ?? '',
      });
    }
  }, [blogInfo]);

  return (
    <SplitPanel size={['auto', 416]} divider>
      <div key="main">
        <LearningResourceBaseForm
          provider={provider}
          showAiInfo
          showLessonTime
          showBlogEditor
          hasMapping={hasMapping}
          createType={createType}
        />

        {/* 필수 확인 영역 */}
        <MediaContentRequiredCheckFormField provider={provider} />

        {/* 이력정보 */}
        {contentUuid && (
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField provider={provider} />
          </ContentsRow>
        )}
      </div>

      {/* 이미지 및 미리보기 영역 */}
      <div key="sub">
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
      </div>
    </SplitPanel>
  );
};

BlogDetailComponent.displayName = 'BlogDetail';

export const LearningResourceBlogDetail = BlogDetailComponent;
