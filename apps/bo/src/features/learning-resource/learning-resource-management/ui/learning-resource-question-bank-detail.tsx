import { forwardRef, useEffect, useImperativeHandle } from 'react';

import previewImg from '@assets/images/temp/img_exam_basic.jpg';
import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';

import { UseDynamicFormResult } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { SplitPanel } from '@learnway/ui/elements';

import { ContentBaseInfo } from '@entities/learning-resource';
import { getQuestionBankRequestData } from '@features/learning-resource/learning-resource-management/service/question-bank/common';
import {
  QuestionBankFormData,
  QuestionBankTabFormRef,
} from '@features/learning-resource/learning-resource-management/service/question-bank/type';
import { isLocalhost } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { FormRow2 } from '@shared/ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useLearningResourceQuestionDetailForm } from '../service/learning-resource-question-detail-from.hook';
import { LearningResourceBaseForm } from './learning-resource-base-form';

type QuestionBankDetailProps = {
  form: UseDynamicFormResult;
  isExamMapping?: boolean;
};

const LearningResourceQuestionBankDetailComponent = forwardRef<
  QuestionBankTabFormRef,
  QuestionBankDetailProps
>(({ form, isExamMapping }, ref) => {
  const { t } = useTranslation();

  const { confirm: openConfirm } = useModal();
  const { baseInfo, formMode, createQuestionBank } = useLearningResourceQuestionDetailForm();

  const { provider, getValues, updateFormData } = form;

  const handleSaveBasicInfo = async (data: Record<string, any>) => {
    if (
      await openConfirm({
        title: '저장 하시겠습니까?',
        content: '입력한 정보로 저장합니다.',
      })
    ) {
      const payload = getQuestionBankRequestData({ data: data as QuestionBankFormData }); //getValues();
      console.log('formSave', payload);
      createQuestionBank(payload as ContentBaseInfo);
    }
  };

  useImperativeHandle(ref, () => ({
    save: (data?: Record<string, any>) => handleSaveBasicInfo(data as Record<string, any>),
  }));

  useEffect(() => {
    if (!baseInfo) return;

    console.log('baseInfo', baseInfo);
    updateFormData({
      ...baseInfo,
      contentUseDate: {
        from: baseInfo.contentUseStartDate
          ? dayjs(baseInfo.contentUseStartDate).toDate()
          : undefined,
        to: baseInfo.contentUseEndDate ? dayjs(baseInfo.contentUseEndDate).toDate() : undefined,
      },
    });
  }, [baseInfo]);

  return (
    <SplitPanel size={['auto', 416]} divider>
      <div key="base1">
        {isLocalhost() && (
          <Button
            type="button"
            label="test"
            onClick={() => {
              console.log(getValues());
            }}
          />
        )}
        <FormSubTitle label={t('기본정보')} />
        <LearningResourceBaseForm
          provider={provider}
          formMode={formMode}
          hasMapping={!!isExamMapping}
          contentNameMaxLength={10}
        />
        <FormRow2
          provider={provider}
          name="isExamMapping"
          type="hidden"
          format="boolean"
          value={false}
        />
      </div>
      <div key="base2">
        <FormSubTitle noLine label={t('문제은행')} />
        <div className={movieInfoStyles.media}>
          <img src={previewImg} width="100%" alt="" />
        </div>
      </div>
    </SplitPanel>
  );
});

export const LearningResourceQuestionBankDetail = LearningResourceQuestionBankDetailComponent;
