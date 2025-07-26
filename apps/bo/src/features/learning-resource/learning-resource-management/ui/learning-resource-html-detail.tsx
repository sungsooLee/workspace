import React, { forwardRef, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { useDynamicForm2 } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import { ContentsRow, useModal } from '@learnway/ui';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { HtmlVideoDetailRes, HtmlVideoMetadataRes, ProcessingStatus } from '@types';
import { useUpdateHTML5Metadata } from '@entities/learning-resource';
import { ContentsHistoryInfoFormField } from '@shared/ui';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { useRoleInfo } from '../service/util';
import { getPayloadFromHtmlMetadataSubmit } from '../service/learning-resource-html-form-submit';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

type HtmlDetailProps = {
  mode: 'draft' | 'complete';
  tenantId: number;
  data?: Partial<HtmlVideoDetailRes>;
  hasMapping?: boolean;
};

const HtmlDetailComponent = forwardRef<HTMLFormElement, HtmlDetailProps>(
  ({ mode, tenantId, data = {}, hasMapping = false }, ref) => {
    const { provider, onSubmit, getValues, updateFormData, onFormChange } = useDynamicForm2();

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
      if (!isEmptyData(data)) {
        onFormChange({
          ...data,
          contentUseDate: {
            from: data.contentUseStartDate ? dayjs(data.contentUseStartDate).toDate() : undefined,
            to: data.contentUseEndDate ? dayjs(data.contentUseEndDate).toDate() : undefined,
          },
          aiSummary: data.aiSummary ?? '',
          aiKeyword: data.aiKeyword ?? '',
          resource: data.resource ?? {},
        });
      }
    }, [data]);

    const router = useRouter();
    const { confirm: openConfirm } = useModal();

    const { update: updateMetadata } = useUpdateHTML5Metadata({
      onSuccess: (result: HtmlVideoMetadataRes) => {
        if (result?.contentUuid && result.processingStatus === ProcessingStatus.COMPLETE) {
          return router.navigate({
            to: '/learning/resource/html-video/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const handleSubmit = async (formData: any): Promise<void> => {
      const { payload } = getPayloadFromHtmlMetadataSubmit({
        data: formData,
        tenantId,
        contentUuid: data?.contentUuid ?? '',
      });

      if (
        await openConfirm({
          title: t('LABEL.confirm.save.title'),
          content: t('입력한 정보로 저장합니다.'),
        })
      ) {
        updateMetadata(payload);
      }
    };

    return (
      <form ref={ref} method="post" onSubmit={onSubmit(handleSubmit)}>
        <LearningResourceBaseForm
          provider={provider}
          showAiInfo
          showLessonTime
          hasMapping={hasMapping}
        />

        {/* 필수 확인 영역 */}
        <MediaContentRequiredCheckFormField provider={provider} />

        {/* 이력정보 */}
        <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
          <ContentsHistoryInfoFormField provider={provider} />
        </ContentsRow>
      </form>
    );
  },
);

HtmlDetailComponent.displayName = 'HtmlDetail';

export const LearningResourceHtmlDetail = HtmlDetailComponent;
