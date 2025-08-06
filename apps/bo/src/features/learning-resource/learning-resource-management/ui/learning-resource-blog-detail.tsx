import { BlogDetailRes } from '@entities/learning-resource';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { UseDynamicFormResult } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useRoleInfo } from '../service/util';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { ContentsRow } from '@learnway/ui/contents-row';

import { ContentsHistoryInfoFormField, MediaContentRequiredCheckFormField } from '@shared/ui/form';
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
  const { provider, getValues, updateFormData, onFormChange, watch } = form;

  const createType = watch('createType');
  console.log('createType', createType);

  const { data: loginUser } = useFetchAuthUser();

  const { initRoleInfo } = useRoleInfo({
    loginUser,
    onChannelMemberCallback: () => {
      updateFormData({
        ...getValues(),
        coordinatorUuid: loginUser?.uuid,
        coordinatorName: loginUser?.name,
        coordinatorTelCountryCode: loginUser?.phoneNumberNationCode,
        coordinatorTelNo: loginUser?.phoneNumber,
      });
    },
  });

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
    <>
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
    </>
  );
};

BlogDetailComponent.displayName = 'BlogDetail';

export const LearningResourceBlogDetail = BlogDetailComponent;
