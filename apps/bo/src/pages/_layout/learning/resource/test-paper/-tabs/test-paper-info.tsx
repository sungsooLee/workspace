import { useMemo } from 'react';
import { t } from 'i18next';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { Company, User } from '@learnway/types';
import {
  ContentsRow,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui';
import { ChannelByRoleId } from '@types';
import {
  ChannelChoiceModal,
  ChipListFormField,
  CompanyChoiceModal,
  FormRow2,
  PhoneNumberFormField,
  SwitchFormField,
  UserChoiceModal,
} from '@shared/ui';
import { DateRangePickerFormField, DropdownFormField, FormDisplay } from '@features/form';
import { ExamTemplateType } from '../-common/type';

const TestPaperInfoComponent = () => {
  const { provider, getValues, updateFormData, onFormValid, onSubmit, formState, watch } =
    useDynamicForm2();

  const examTemplateTypeOptions = useMemo(
    () => [
      { label: t('일반 시험지'), value: ExamTemplateType.EXAM },
      { label: t('OMR 시험지'), value: ExamTemplateType.OMR },
      { label: t('OX 퀴즈'), value: ExamTemplateType.QUIZ },
    ],
    [],
  );

  const isCourseUsed = watch('isCourseUsed');

  return (
    // FIXME: 추후 공통 컴포넌트로 수정 필요 (LearningResourceBaseForm)
    <div>
      <FormSubTitle label={t('기본정보')} />

      <ContentsRow>
        {/* 시험지 유형 */}
        <FormRow2
          provider={provider}
          name="examTemplateType"
          label={t('시험지 유형')}
          value={ExamTemplateType.EXAM}
          validation={{ required: true }}
          element={<RadioGroupFormField options={examTemplateTypeOptions} />}
        />
      </ContentsRow>

      <ContentsRow>
        {/* 채널 */}
        <FormRow2 provider={provider} name="channelUuid" type="hidden" />
        <FormRow2
          provider={provider}
          name="channelName"
          type="text"
          label={t('채널')}
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelChoiceModal />,
              }}
              transformModalData={(data: ChannelByRoleId) => ({
                channelUuid: data.channelUuid,
                channelName: data.channelName,
              })}
              onFormChange={(
                values: Record<
                  string,
                  {
                    channelUuid: string;
                    channelName: string;
                  }
                >,
              ) => {
                updateFormData({ ...getValues(), ...values });
              }}
            />
          }
        />
        {/* 언어 */}
        <FormRow2
          provider={provider}
          name="langCountryCode"
          label={t('언어')}
          value="KO"
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

      <ContentsRow>
        {/* 학습자원명 */}
        <FormRow2
          provider={provider}
          name="contentName"
          label={t('학습자원명')}
          validation={{ required: true }}
          element={<Input max={150} />}
          placeholder={t('LABEL.form.input.placeholder1', { type: t('학습자원명') })}
        />
      </ContentsRow>

      <ContentsRow>
        {/* 학습자원 설명 */}
        <FormRow2
          provider={provider}
          name="description"
          label={t('학습자원 설명')}
          element={<TextareaFormField maxLength={2000} />}
          placeholder={t('학습자원에 대한 설명을 입력하세요.')}
        />
      </ContentsRow>

      <ContentsRow>
        {/* 담당자 */}
        <FormRow2 provider={provider} name="coordinatorUuid" type="hidden" />
        <FormRow2
          provider={provider}
          name="coordinatorName"
          label="담당자"
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
                coordinatorName: data.name,
                coordinatorTelNo: data.phoneNumber,
              })}
              onFormChange={(
                values: Record<
                  string,
                  {
                    coordinatorUuid: string;
                    coordinatorName: string;
                    coordinatorTelNo: string;
                  }
                >,
              ) => {
                updateFormData({ ...getValues(), ...values });
                console.log(getValues());
              }}
            />
          }
        />
        {/* 담당자 연락처 */}
        <FormRow2
          provider={provider}
          name="coordinatorTelNo"
          label={t('연락처')}
          validation={{ required: true }}
          element={<PhoneNumberFormField />}
          fields={{
            nationCode: 'coordinatorTelCountryCode',
            number: 'coordinatorTelNo',
          }}
        />
        {/* 연락처 국가코드 */}
        <FormRow2
          provider={provider}
          name="coordinatorTelCountryCode"
          type="hidden"
          value="KOR_82"
        />
      </ContentsRow>

      <ContentsRow type="horizontal" className="inactive">
        {/* 사용기한 */}
        <FormRow2
          provider={provider}
          name="isUnlimited"
          label={t('사용기한')}
          value={true}
          validation={{ required: true }}
          element={
            <SwitchFormField
              invert
              switchConfig={{
                label: (value: boolean) => (value ? '기간설정' : '무기한'),
              }}
            />
          }
          tooltip={t('사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.')}
        />
      </ContentsRow>
      {/* 사용기한 상세 설정 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isUnlimited', value: false }]}>
        <ContentsRow className="pt-0">
          <FormRow2
            provider={provider}
            name="contentUseDate"
            format="object"
            value={{ from: undefined, to: undefined }}
            validation={{
              required: true,
              conditions: [
                {
                  fn: (values: Record<string, any>) => {
                    if (values.isLimitExist) {
                      return !values.contentUseDate.from || !values.contentUseDate.to;
                    }
                    return false;
                  },
                  message: t('LABEL.form.input.placeholder3', {
                    field: t('시작일 및 종료일'),
                    inputType: t('LABEL.form.input.select'),
                  }),
                },
                {
                  fn: (values: Record<string, any>) => {
                    if (!!values.contentUseDate.from && !!values.contentUseDate.to) {
                      return !(values.contentUseDate.from < values.contentUseDate.to);
                    }
                    return false;
                  },
                  message: t('시작일은 종료일보다 이전이어야 합니다.'),
                },
              ],
            }}
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type="horizontal" className="inactive">
        {/* 외주개발업체 정보 */}
        <FormRow2
          provider={provider}
          name="isVendored"
          label={t('외주개발업체 정보')}
          format="boolean"
          value={false}
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? t('있음') : t('없음')),
              }}
            />
          }
        />
      </ContentsRow>
      {/* 외주개발업체 정보 상세 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
        <ContentsRow className="pt-0">
          <FormRow2
            provider={provider}
            name="vendorName"
            validation={{
              required: {
                fn: (values: Record<string, any>) => {
                  if (values.isVendored) {
                    return !values.vendorCode && !values.vendorName;
                  }
                  return false;
                },
              },
            }}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <CompanyChoiceModal />,
                }}
                transformModalData={(data: Company) => ({
                  vendorCode: data.companyId,
                  vendorName: data.name,
                })}
                onFormChange={(
                  values: Record<string, { vendorCode: number; vendorName: string }>,
                ) => {
                  updateFormData({ ...getValues(), ...values });
                }}
              />
            }
          />
          <FormRow2 provider={provider} name="vendorCode" type="hidden" />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="vendorCoordinatorName"
            type="text"
            validation={{
              required: {
                fn: (values: Record<string, any>) => {
                  if (values.isVendored) {
                    return !values.vendorCoordinatorName;
                  }
                  return false;
                },
              },
            }}
          />
          <FormRow2
            provider={provider}
            name="vendorTelNo"
            label={t('연락처')}
            validation={{
              required: {
                fn: (values: Record<string, any>) => {
                  if (values.isVendored) {
                    return !values.vendorTelNo;
                  }
                  return false;
                },
              },
            }}
            element={<PhoneNumberFormField />}
            fields={{
              nationCode: 'vendorTelCountryCode',
              number: 'vendorTelNo',
            }}
          />
          {/* 연락처 국가코드 */}
          <FormRow2 provider={provider} name="vendorTelCountryCode" type="hidden" value="KOR_82" />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow>
        {/* 태그 */}
        <FormRow2
          provider={provider}
          name="tags"
          label={t('태그')}
          format="array"
          value={[]}
          validation={{ required: true }}
          element={<ChipListFormField />}
          placeholder={t('한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요.')}
          limitPlaceholder={t('여러개의 태그는 쉼표로 구분')}
          tooltip={t('태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.')}
          chipListConfig={{
            showInput: true,
            labelField: 'label',
            valueField: 'value',
            wordwrap: true,
          }}
        />
      </ContentsRow>

      <ContentsRow type="horizontal" className="inactive">
        {/* 교육자원 활용 여부 */}
        <FormRow2
          provider={provider}
          name="isCourseUsed"
          label={t('교육자원활용')}
          format="boolean"
          value={false}
          validation={{ required: true }}
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? '활용' : '활용 불가'),
              }}
            />
          }
          guideText={
            isCourseUsed
              ? t('해당 학습자원으로 교육 과정을 개설할 수 있습니다.')
              : t('해당 학습자원으로 교육 과정을 개설할 수 없습니다.')
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('시험지 상세 설정')} lineType="dark" />
      <ContentsRow>
        {/* 시험문항 */}
        <FormRow2
          provider={provider}
          name="questionCount"
          label={t('시험문항')}
          format="number"
          validation={{
            required: {
              fn: (values: Record<string, any>) => {
                return !values.questionCount || values.questionCount < 1;
              },
            },
          }}
          element={<Input type="number" suffixText="개" />}
          placeholder="0"
        />
        {/* 페이지별 문항수 */}
        <FormRow2
          provider={provider}
          name="questionCountPerPage"
          label={t('페이지별 문항수')}
          format="number"
          validation={{ required: true }}
          element={<Input type="number" suffixText="개" />}
          placeholder="0"
        />
        {/* 시험시간 */}
        <FormRow2
          provider={provider}
          name="examLimitTime"
          label={t('시험시간')}
          format="number"
          validation={{ required: true }}
          element={<Input type="number" suffixText="분" />}
          placeholder="0"
        />
        {/* 시험 응시 가능 횟수 (0이면 재시험 불가) */}
        <FormRow2
          provider={provider}
          name="maxAttemptCount"
          label={t('시험응시 횟수')}
          format="number"
          validation={{ required: true }}
          element={<Input type="number" suffixText="회" />}
          placeholder="0"
        />
      </ContentsRow>

      <ContentsRow type="horizontal" className="inactive">
        {/* 문항이동 제어 */}
        <FormRow2
          provider={provider}
          name="isMoveQuestion"
          label={t('문항이동 제어')}
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? '제어' : '제어안함 '),
              }}
            />
          }
          tooltip={t('시험 문항을 순차적으로 풀어야 한다면 문항이동 제어기능을 사용하세요.')}
        />
      </ContentsRow>
    </div>
  );
};

TestPaperInfoComponent.displayName = 'TestPaperInfo';

export const TestPaperInfo = TestPaperInfoComponent;
