//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 교육자원조회_나의 교육자원_등록_동영상(자체)

import { ContentsHistoryInfoFormField, MediaContentRequiredCheckFormField } from '@shared/ui/form';

import { DynamicFormProvider } from '@learnway/hooks';
import { LearningResourceBaseForm } from './learning-resource-base-form';

interface Props {
  provider: DynamicFormProvider;
}
const LearningResourceScormDetailComponent = ({ provider }: Props) => {
  return (
    <>
      <LearningResourceBaseForm provider={provider} showAiInfo showLessonTime readOnlyLessonTime />
      <MediaContentRequiredCheckFormField provider={provider} />
      <ContentsHistoryInfoFormField provider={provider} />
    </>
  );
};

export const LearningResourceScormDetail = LearningResourceScormDetailComponent;
