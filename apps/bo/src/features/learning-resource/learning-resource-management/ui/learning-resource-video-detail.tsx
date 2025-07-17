//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 학습자원조회_나의 학습자원_등록_동영상(자체)

import { FormDisplay, SubTitlesFormField } from '@features/form';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormRow } from '@shared/ui';
import { LearningResourceBaseForm } from './learning-resource-base-form';

interface Props {
  provider: DynamicFormProvider;
}
const LearningResourceVideoDetailComponent = ({ provider }: Props) => {
  return (
    <>
      <LearningResourceBaseForm provider={provider} showAiInfo showLessonTime />
      <ContentsRow type="horizontal" className="inactive">
        {/* 자막 여부 */}
        <FormRow provider={provider} name={'isSubtitles'} />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isSubtitles', value: true }]}>
        <ContentsRow>
          {/*자막 목록*/}
          <FormRow provider={provider} name={'subtitles'} element={<SubTitlesFormField />} />
        </ContentsRow>
      </FormDisplay>
      <MediaContentRequiredCheckFormField provider={provider} />
      <ContentsHistoryInfoFormField provider={provider} />
    </>
  );
};

export const LearningResourceVideoDetail = LearningResourceVideoDetailComponent;
