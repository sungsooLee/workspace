//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 교육자원조회_나의 교육자원_등록_동영상(자체)

import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsHistoryInfoFormField, MediaContentRequiredCheckFormField } from '@shared/ui/form';
import { LearningResourceBaseForm } from './learning-resource-base-form';

interface Props {
  provider: DynamicFormProvider;
}
const LearningResourceETCDetailComponent = ({ provider }: Props) => {
  return (
    <>
      <LearningResourceBaseForm provider={provider} showAiInfo showLessonTime />
      <MediaContentRequiredCheckFormField provider={provider} />
      <ContentsHistoryInfoFormField provider={provider} />
    </>
  );
};

export const LearningResourceETCDetail = LearningResourceETCDetailComponent;
