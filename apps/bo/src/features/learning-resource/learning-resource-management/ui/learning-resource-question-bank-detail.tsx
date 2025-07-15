import { FC, useEffect } from 'react';
import { t } from 'i18next';

import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import previewImg from '@assets/images/temp/img_exam_basic.jpg';

import { FormSubTitle, SplitPanel } from '@learnway/ui';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';

import { LearningResourceBaseForm } from './learning-resource-base-form';

const LearningResourceQuestionBankDetailComponent: FC<any> = ({ formMode, baseInfo }) => {
  const { provider, getValues, updateFormData, onFormValid, onSubmit, formState, watch } =
    useDynamicForm2();

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    if (!baseInfo) return;
    updateFormData(baseInfo);
  }, [baseInfo]);

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
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
    </form>
  );
};

export const LearningResourceQuestionBankDetail = LearningResourceQuestionBankDetailComponent;
