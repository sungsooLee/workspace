import { FC, useEffect, useImperativeHandle, useRef } from 'react';
import { t } from 'i18next';

import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import previewImg from '@assets/images/temp/img_exam_basic.jpg';

import { FormSubTitle, SplitPanel } from '@learnway/ui';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';

import { LearningResourceBaseForm } from './learning-resource-base-form';
import { useLearningResourceQuestionDetailForm } from '../service/learning-resource-question-detail-from.hook';

const LearningResourceQuestionBankDetailComponent = (props: any, ref: any) => {
  const { baseInfo, formMode, setFuncInfo, createQuestionBank } =
    useLearningResourceQuestionDetailForm();

  const { provider, getValues, onFormValid } = useDynamicForm2();

  const handleFormSave = async () => {
    const valid = await onFormValid();
    if (valid) {
      const payload = getValues();
      console.log('formSave', payload);
      createQuestionBank(
        payload,
        (data: any) => {
          console.log('success data', data);
        },
        (error: any) => {
          console.log('error data', error);
        },
      );
    }
  };
  useEffect(() => {
    if (!baseInfo) return;
  }, [baseInfo]);

  useEffect(() => {
    console.log('ok form');
    setFuncInfo({ saveBaseInfo: handleFormSave });
  }, []);

  return (
    <SplitPanel size={['auto', 416]} divider>
      <div>
        <LearningResourceBaseForm provider={provider} formMode={formMode} />
      </div>
      <div>
        <FormSubTitle noLine label={'문제은행'} />
        {/* btn_list */}
        {/* <ul className={movieInfoStyles.btn_list}>
            {buttons.map((btn, index) => (
              <li>
                <Button key={index} onClick={btn.onClick} className={movieInfoStyles.btn_text}>
                  {btn.label}
                </Button>
              </li>
            ))}
          </ul> */}
        {/* 이미지 영역 */}
        <div className={movieInfoStyles.media}>
          <img src={previewImg} width="100%" alt="" />
        </div>
      </div>
    </SplitPanel>
  );
};

export const LearningResourceQuestionBankDetail = LearningResourceQuestionBankDetailComponent;
