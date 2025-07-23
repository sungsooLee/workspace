import React, { forwardRef, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { ContentsRow, useModal } from '@learnway/ui';
import { cn, isEmptyData } from '@learnway/shared';
import { useDynamicForm2 } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { BlogDetailRes, BlogPostRes, BlogUpdateReq } from '@types';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { useCreateBlogContent, useUpdateBlogContent } from '@entities/learning-resource';
import { LearningResourceBaseForm } from '@features/learning-resource/learning-resource-management/ui/learning-resource-base-form';
import { useRoleInfo } from '../../-common/common';
import { getPayloadFromBlogSubmit } from '../-common/form-submit';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { ContentsHistoryInfoFormField } from '@shared/ui';

type BlogDetailProps = {
  tenantId: number;
  mode: 'create' | 'update';
  blogInfo?: Partial<BlogDetailRes>;
  hasMapping?: boolean;
};

const BlogDetailComponent = forwardRef<HTMLFormElement, BlogDetailProps>(
  ({ tenantId, mode, blogInfo = {}, hasMapping = false }, ref) => {
    const router = useRouter();
    const { confirm: openConfirm } = useModal();

    const { provider, onSubmit, getValues, updateFormData, onFormChange } = useDynamicForm2();

    const { create: createBlogContent } = useCreateBlogContent({
      onSuccess: (result: BlogPostRes) => {
        if (result?.contentUuid) {
          return router.navigate({
            to: '/learning/resource/blog/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const { update: updateBlogContent } = useUpdateBlogContent({
      onSuccess: (result: BlogPostRes) => {
        if (result?.contentUuid) {
          return router.navigate({
            to: '/learning/resource/blog/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const handleOnSubmit = async (data: any): Promise<void> => {
      console.log(data);
      const { payload } = getPayloadFromBlogSubmit({
        data,
        tenantId,
        mode,
        contentUuid: mode === 'update' ? blogInfo?.contentUuid : '',
      });

      if (
        await openConfirm({
          title: t('LABEL.confirm.save.title'),
          content: t('입력한 정보로 저장합니다.'),
        })
      ) {
        if (mode === 'create') {
          createBlogContent(payload);
        } else {
          updateBlogContent(payload as BlogUpdateReq);
        }
      }
    };

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
      if (mode === 'update' && !isEmptyData(blogInfo)) {
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
      <form ref={ref} onSubmit={onSubmit(handleOnSubmit)}>
        <LearningResourceBaseForm
          provider={provider}
          showAiInfo
          showLessonTime
          showBlogEditor
          hasMapping={hasMapping}
        />

        {/* 필수 확인 영역 */}
        <MediaContentRequiredCheckFormField provider={provider} />

        {/* 이력정보 */}
        {mode === 'update' && (
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField provider={provider} />
          </ContentsRow>
        )}
      </form>
    );
  },
);

BlogDetailComponent.displayName = 'BlogDetail';

export const BlogDetail = BlogDetailComponent;
