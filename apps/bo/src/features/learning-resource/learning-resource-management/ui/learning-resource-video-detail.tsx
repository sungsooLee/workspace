//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002 / 학습자원조회_나의 학습자원_등록_동영상(자체)

import { DateRangePickerFormField, FormDisplay, SubTitlesFormField } from '@features/form';
import { MediaContentRequiredCheckFormField } from '@features/form/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow, InputModalSelectorFormField } from '@learnway/ui';
import {
  ChannelChoiceModal,
  ContentsHistoryInfoFormField,
  FormRow,
  ManagerChoiceModal,
} from '@shared/ui';

interface Props {
  provider: DynamicFormProvider;
}
const LearningResourceVideoDetailComponent = ({ provider }: Props) => {
  return (
    <>
      <ContentsRow>
        {/*채널*/}
        <FormRow
          provider={provider}
          name="channelName"
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <ChannelChoiceModal />,
              }}
            />
          }
        />
        <FormRow provider={provider} name="langCountryCode" />
      </ContentsRow>
      <ContentsRow>
        {/*학습자원명*/}
        <FormRow provider={provider} name="contentName" />
      </ContentsRow>
      <ContentsRow>
        {/*학습자원 설명*/}
        <FormRow provider={provider} name="description" />
      </ContentsRow>
      <ContentsRow>
        {/*담당자*/}
        <FormRow
          provider={provider}
          name="coordinatorName"
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <ManagerChoiceModal />,
              }}
            />
          }
        />
        {/*연락처*/}
        <FormRow provider={provider} name="coordinatorTelNo" />
      </ContentsRow>
      <ContentsRow type="horizontal">
        {/*사용기한*/}
        <FormRow provider={provider} name="isUnlimited" />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUnlimited', value: false }]}>
        <ContentsRow>
          <FormRow
            provider={provider}
            name="contentUseDate"
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
      </FormDisplay>
      {/*외주개발업체 정보*/}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow provider={provider} name="isVendored" />
      </ContentsRow>
      {/*외주개발업체 상세*/}
      <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
        <ContentsRow>
          {/*외부개발업체*/}
          <FormRow
            provider={provider}
            name="vendorName"
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <ManagerChoiceModal />,
                }}
              />
            }
          />
        </ContentsRow>
        <ContentsRow>
          {/*외주개발업체 담당자*/}
          <FormRow provider={provider} name="vendorCoordinatorName" />
          {/*외주개발업체 연락처*/}
          <FormRow provider={provider} name="vendorTelNo" />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        {/*태그*/}
        <FormRow provider={provider} name="tags" />
      </ContentsRow>
      <ContentsRow>
        {/*학습자원개요*/}
        <FormRow provider={provider} name="aiSummary" />
      </ContentsRow>
      <ContentsRow>
        {/* 키워드 */}
        <FormRow provider={provider} name="aiKeyword" />
      </ContentsRow>
      <ContentsRow type="horizontal" className="inactive">
        {/* 교육지원활용 여부 */}
        <FormRow provider={provider} name="isCourseUsed" />
      </ContentsRow>
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
