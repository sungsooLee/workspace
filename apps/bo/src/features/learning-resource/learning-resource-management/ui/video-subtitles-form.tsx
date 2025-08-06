import { FormDisplay, FormRow2, SubTitlesFormField, SwitchFormField } from '@shared/ui/form';

import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { t } from 'i18next';

interface Props {
  provider: DynamicFormProvider;
}
const VideoSubtitlesFormComponent = ({ provider }: Props) => {
  const { watch } = provider;
  const isSubtitles = watch('isSubtitles');
  const videoSubtitles = watch('videoSubtitles');
  return (
    <>
      <ContentsRow type="horizontal" className="inactive">
        {/* 자막 여부 */}
        <FormRow2
          label={t('자막 추가')}
          provider={provider}
          name="isSubtitles"
          switchConfig={{
            labelTarget: 'subtitles',
          }}
          element={
            <SwitchFormField
              fieldLabel={isSubtitles ? `자막 ${videoSubtitles?.length || 0}개` : '자막 없음'}
            />
          }
          value={false}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isSubtitles', value: true }]}>
        <ContentsRow>
          {/*자막 목록*/}
          <FormRow2
            provider={provider}
            name="videoSubtitles"
            type="custom"
            format="array"
            value={[]}
            element={<SubTitlesFormField />}
          />
        </ContentsRow>
      </FormDisplay>
    </>
  );
};

export const VideoSubtitlesForm = VideoSubtitlesFormComponent;
