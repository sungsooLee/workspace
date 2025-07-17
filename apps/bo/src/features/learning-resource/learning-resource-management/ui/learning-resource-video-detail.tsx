//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 학습자원조회_나의 학습자원_등록_동영상(자체)

import { FormDisplay, SubTitlesFormField } from '@features/form';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormRow2, SwitchFormField } from '@shared/ui';
import { LearningResourceBaseForm } from './learning-resource-base-form';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { t } from 'i18next';

interface Props {
  provider: DynamicFormProvider;
}
const LearningResourceVideoDetailComponent = ({ provider }: Props) => {
  return (
    <>
      <LearningResourceBaseForm provider={provider} showAiInfo showLessonTime readOnlyLessonTime />
      <ContentsRow type="horizontal" className="inactive">
        {/* 자막 여부 */}
        <FormRow2
          label={t('자막 추가')}
          provider={provider}
          name="isSubtitles"
          switchConfig={{
            label: (value: boolean, getValues: UseFormGetValues<FieldValues>) =>
              value ? `자막 ${getValues().subtitles?.length || 0}개` : '자막 없음',
            labelTarget: 'subtitles',
          }}
          element={<SwitchFormField />}
          value={true}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isSubtitles', value: true }]}>
        <ContentsRow>
          {/*자막 목록*/}
          <FormRow2
            provider={provider}
            name="subtitles"
            type="custom"
            format="array"
            value={[]}
            element={<SubTitlesFormField />}
          />
        </ContentsRow>
      </FormDisplay>
      <MediaContentRequiredCheckFormField provider={provider} />
      <ContentsHistoryInfoFormField provider={provider} />
    </>
  );
};

export const LearningResourceVideoDetail = LearningResourceVideoDetailComponent;
