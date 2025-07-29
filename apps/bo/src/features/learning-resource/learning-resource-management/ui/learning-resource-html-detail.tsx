import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { UseDynamicFormResult } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import { ContentsRow } from '@learnway/ui';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { HtmlVideoDetailRes } from '@types';
import { ContentsHistoryInfoFormField } from '@shared/ui';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { useRoleInfo } from '../service/util';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

type HtmlDetailProps = {
  form: UseDynamicFormResult;
  data?: Partial<HtmlVideoDetailRes>;
  hasMapping?: boolean;
};

const HtmlDetailComponent = ({ form, data = {}, hasMapping = false }: HtmlDetailProps) => {
  const { provider, getValues, updateFormData, onFormChange, watch } = form;

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

  const createType = watch('createType');

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

  return (
    <>
      <LearningResourceBaseForm
        provider={provider}
        showAiInfo
        showLessonTime
        hasMapping={hasMapping}
        createType={createType}
      />

      {/* 필수 확인 영역 */}
      <MediaContentRequiredCheckFormField provider={provider} />

      {/* 이력정보 */}
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField provider={provider} />
      </ContentsRow>
    </>
  );
};

HtmlDetailComponent.displayName = 'HtmlDetail';

export const LearningResourceHtmlDetail = HtmlDetailComponent;
