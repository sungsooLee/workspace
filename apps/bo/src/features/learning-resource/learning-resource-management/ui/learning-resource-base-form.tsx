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
  UserChoiceModal,
} from '@shared/ui';

import { EnFormMode } from '@types';

import { DropdownFormField, FormDisplay } from '@features/form';
import { DateRangePickerFormField } from '@features/form/ui';
import { User } from '@learnway/types';

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
              transformModalData={(modalData: any) => {
                return {
                  channelName: modalData.channelName,
                  channelUuid: modalData.channelUuid,
                  tenantId: modalData.tenantId,
                };
              }}
            />
          }
        />
        {/*언어*/}
        <FormRow2
          provider={provider}
          name="languageCountryCode"
          label={'언어'}
          format="object"
          validation={{ required: true }}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
              }}
            />
          }
        />
      </ContentsRow>
      {/*학습자원명*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="contentName"
          label={'학습자원명'}
          value=""
          validation={{ required: true }}
          element={<Input maxLength={150} />}
        />
      </ContentsRow>
      {/*학습자원 설명*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="description"
          label="학습자원 설명"
          value=""
          element={<TextareaFormField maxLength={2000} />}
        />
      </ContentsRow>
      {/*담당자*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          label="담당자"
          name="coordinatorName"
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <UserChoiceModal title="담당자" />,
              }}
              transformModalData={(data: User) => ({
                coordinatorUuid: data.uuid,
                coordinatorName: `${data.name}/${data?.dept?.deptName}/${data?.company?.name}`,
                coordinatorTelNo: data.phoneNumber,
              })}
            />
          }
        />
        <FormRow2 provider={provider} type="hidden" name="coordinatorUuid" />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name="coordinatorTelNo"
          label={t('연락처')}
          format="object"
          validation={{ required: true }}
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
          format="boolean"
          value={true}
          element={
            <SwitchFormField
              invert
              switchConfig={{
                label: (value: boolean) => (value ? '무기한' : '기간설정'),
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
            format="object"
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
            format="object"
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
            value=""
            element={<Input />}
          />
          {/*외주개발업체 연락처*/}
          <FormRow2
            provider={provider}
            label={t('외주개발업체 연락처')}
            name="vendorTelNo"
            value=""
            element={<PhoneNumberFormField />}
            fields={{
              nationCode: 'vendorNationCode',
              number: 'vendorTelNo',
            }}
          />
        </ContentsRow>
      </FormDisplay>
      {/*태그*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          label="태그"
          name="tags"
          value={[]}
          element={<ChipListFormField />}
          placeholder="한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요."
          limitPlaceholder="여러개의 태그는 쉼표로 구분"
          tooltip="태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다."
          chipListConfig={{
            showInput: true,
          }}
        />
      </ContentsRow>
      {/* 교육지원활용 여부 */}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          name="isCourseUsed"
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
