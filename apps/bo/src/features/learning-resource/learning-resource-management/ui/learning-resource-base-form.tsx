import { t } from 'i18next';
import {
  ContentsRow,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  Switch,
  TextareaFormField,
} from '@learnway/ui';
import { CODE_GROUP, DynamicFormProvider, useDynamicForm2 } from '@learnway/hooks';
import {
  ChannelChoiceModal,
  ChipListFormField,
  FormRow2,
  ManagerChoiceModal,
  PhoneNumberFormField,
  SwitchFormField,
} from '@shared/ui';

import { EnFormMode } from '@types';

import { DropdownFormField, FormDisplay } from '@features/form';
import { DateRangePickerFormField } from '@features/form/ui';

const LearningResourceBaseFormComponent = ({
  provider,
  formMode,
}: {
  provider: DynamicFormProvider;
  formMode: EnFormMode;
}) => {
  return (
    <>
      <FormSubTitle label={t('기본정보')} />
      <ContentsRow>
        {/*채널 */}
        <FormRow2
          provider={provider}
          name="channelName"
          label={'채널'}
          validation={{ required: true }}
          format="object"
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
        {/*언어*/}
        <FormRow2
          provider={provider}
          name="langCountryCode"
          label={'언어'}
          format="object"
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        {/*학습자원명*/}
        <FormRow2
          provider={provider}
          name="contentName"
          label={'학습자원명'}
          value=""
          element={<Input maxLength={150} />}
        />
      </ContentsRow>
      <ContentsRow>
        {/*학습자원 설명*/}
        <FormRow2
          provider={provider}
          name="description"
          label="학습자원 설명"
          value=""
          element={<TextareaFormField maxLength={2000} />}
        />
      </ContentsRow>
      <ContentsRow>
        {/*담당자*/}
        <FormRow2
          provider={provider}
          name="coordinatorName"
          label={t('LABEL.form.label.coordinator')}
          format="object"
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
        <FormRow2
          provider={provider}
          name="coordinatorTelNo"
          label={t('연락처')}
          format="object"
          element={
            <PhoneNumberFormField
              fields={{ nationCode: 'coordinatorTelCountryCode', number: 'coordinatorTelNo' }}
              phoneNumberConfig={{
                options: [{ value: 'KOR_82', label: '+82' }],
              }}
            />
          }
        />
      </ContentsRow>
      {/* 사용기한 */}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          label={t('사용기한')}
          name="isUnlimited"
          tooltip={t('사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.')}
          value={true}
          element={
            <SwitchFormField
              invert={true}
              switchConfig={{
                label: (value: boolean) => (value ? '기간설정' : '무기한'),
              }}
            />
          }
        />
      </ContentsRow>
      {/* 사용기한 상세 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isUnlimited', value: false }]}>
        <ContentsRow className="pt-0">
          <FormRow2
            provider={provider}
            name="contentUseDate"
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
      </FormDisplay>
      {/*외주개발업체 정보*/}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          label="외주개발업체정보"
          name="isVendored"
          element={<SwitchFormField />}
          value={false}
          format="boolean"
          switchConfig={{
            label: (value: boolean) => (value ? '있음' : '없음'),
          }}
        />
      </ContentsRow>
      {/*외주개발업체 상세*/}
      <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
        <ContentsRow>
          {/*외부개발업체*/}
          <FormRow2
            provider={provider}
            name="vendorName"
            label={t('외주개발업체')}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <ManagerChoiceModal />,
                }}
                disabled={formMode === EnFormMode.VIEW}
              />
            }
          />
        </ContentsRow>
        <ContentsRow>
          {/*외주개발업체 담당자*/}
          <FormRow2
            provider={provider}
            label={t('외주개발업체 담당자')}
            name="vendorCoordinatorName"
            element={<Input />}
          />
          {/*외주개발업체 연락처*/}
          <FormRow2
            provider={provider}
            label={t('외주개발업체 연락처')}
            name="vendorTelNo"
            type="phone-number"
            element={<PhoneNumberFormField />}
            fields={{
              nationCode: 'vendorNationCode',
              number: 'vendorTelNo',
            }}
          />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        {/*태그*/}
        <FormRow2
          provider={provider}
          name="tags"
          element={<ChipListFormField />}
          placeholder="한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요."
          limitPlaceholder="여러개의 태그는 쉼표로 구분"
          tooltip="태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다."
          chipListConfig={{
            showInput: true,
          }}
        />
      </ContentsRow>
      <ContentsRow type="horizontal" className="inactive">
        {/* 교육지원활용 여부 */}
        <FormRow2
          provider={provider}
          name="isCourseUsed"
          type="switch"
          format="boolean"
          element={<SwitchFormField />}
          switchConfig={{
            label: (value: boolean) => (value ? '활용가능' : '활용불가'),
          }}
          guideText="해당 학습자원으로 교육 과정을 개설할 수 없습니다."
          value={true}
        />
      </ContentsRow>
    </>
  );
};

export const LearningResourceBaseForm = LearningResourceBaseFormComponent;
