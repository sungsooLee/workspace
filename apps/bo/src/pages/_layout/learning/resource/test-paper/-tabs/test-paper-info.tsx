import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
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
  useModal,
} from '@learnway/ui';
import {
  ChannelByRoleId,
  ExamResultVisibleMoment,
  ExamTemplateType,
  TestPaperBasicInfoSaveRes,
} from '@types';
import { useCreateExamPaperContent } from '@entities/learning-resource';
import {
  ChannelChoiceModal,
  CheckBoxFormField,
  ChipListFormField,
  CompanyChoiceModal,
  FormRow2,
  PhoneNumberFormField,
  SwitchFormField,
  UserChoiceModal,
} from '@shared/ui';
import { DateRangePickerFormField, DropdownFormField, FormDisplay } from '@features/form';

import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import { ExamBasicInfoProps, TabFormRef, TestPaperBasicInfoFormData } from '../-common/type';
import { getExamSaveRequestDataFromFormData } from '../-common/common';

const TestPaperInfoComponent = forwardRef<TabFormRef, ExamBasicInfoProps>(
  ({ tenantId, mode, data = {}, hasMapping = false }, ref) => {
    const { provider, getValues, updateFormData, onFormValid, onSubmit, formState, watch } =
      useDynamicForm2();

    const router = useRouter();
    const { confirm: openConfirm } = useModal();

    const examTemplateTypeOptions = useMemo(
      () => [
        { label: t('일반 시험지'), value: ExamTemplateType.EXAM },
        { label: t('OMR 시험지'), value: ExamTemplateType.OMR },
        { label: t('OX 퀴즈'), value: ExamTemplateType.QUIZ },
      ],
      [],
    );

    const resultVisibleMomentOptions = useMemo(
      () => [
        { label: t('시험 종료 후'), value: ExamResultVisibleMoment.ON_EXAM_END },
        { label: t('시험 제출 후'), value: ExamResultVisibleMoment.ON_SUBMIT },
      ],
      [],
    );

    const isCourseUsed = watch('isCourseUsed');

    const { create: saveBasicInfo } = useCreateExamPaperContent({
      onSuccess: (result: TestPaperBasicInfoSaveRes) => {
        console.log(result);

        if (result?.examUuid) {
          router.navigate({
            to: '/learning/resource/test-paper/view',
            state: { mode: 'UPDATE', contentUuid: result.examUuid },
            replace: true,
          });
        }
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        save: async () => {
          const isValid = await onFormValid();
          console.log(isValid);
          if (!isValid) {
            return;
          }

          const payload = getExamSaveRequestDataFromFormData({
            values: getValues() as TestPaperBasicInfoFormData,
            mode,
            contentUuid: data?.contentUuid,
          });

          if (
            await openConfirm({
              title: t('LABEL.confirm.save.title'),
              content: t('입력한 정보로 저장합니다.'),
            })
          ) {
            saveBasicInfo(payload);
          }
        },
      }),
      [],
    );

    return (
      // FIXME: 추후 공통 컴포넌트로 수정 필요 (LearningResourceBaseForm)
      <div className={styles.wrap}>
        <FormSubTitle label={t('기본 정보')} />

        <ContentsRow>
          {/* 시험지 유형 */}
          <FormRow2
            provider={provider}
            name="examTemplateType"
            label={t('시험지 유형')}
            value={ExamTemplateType.EXAM}
            validation={{ required: true }}
            element={
              <RadioGroupFormField options={examTemplateTypeOptions} disabled={hasMapping} />
            }
          />
        </ContentsRow>

        <ContentsRow>
          {/* 테넌트 ID */}
          <FormRow2 provider={provider} name="tenantId" type="hidden" value={tenantId} />
          {/* 채널 */}
          <FormRow2 provider={provider} name="channelUuid" type="hidden" />
          <FormRow2
            provider={provider}
            name="channelName"
            type="text"
            label={t('LABEL.form.label.channel')}
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
                disabled={hasMapping}
              />
            }
          />
          {/* 언어 */}
          <FormRow2
            provider={provider}
            name="languageCountryCode"
            label={t('LABEL.form.label.langCountryCode')}
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
            label={t('LABEL.form.label.contentName')}
            validation={{ required: true }}
            element={<Input maxLength={10} disabled={hasMapping} />}
            placeholder={t('LABEL.form.input.placeholder1', {
              type: t('LABEL.form.label.contentName'),
            })}
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
            label={t('LABEL.form.label.coordinator')}
            validation={{ required: true }}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <UserChoiceModal title={t('LABEL.form.label.coordinator')} />,
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
            label={t('LABEL.modal.modifierInfo.phoneNumber')}
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
              label={t('LABEL.modal.modifierInfo.phoneNumber')}
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
            <FormRow2
              provider={provider}
              name="vendorTelCountryCode"
              type="hidden"
              value="KOR_82"
            />
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
            value={true}
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
            element={<Input type="number" suffixText={t('개')} min={0} disabled={hasMapping} />}
            placeholder="0"
          />
          {/* 페이지별 문항수 */}
          <FormRow2
            provider={provider}
            name="questionCountPerPage"
            label={t('페이지별 문항수')}
            format="number"
            validation={{ required: true }}
            element={<Input type="number" suffixText={t('개')} min={0} disabled={hasMapping} />}
            placeholder="0"
          />
          {/* 시험시간 */}
          <FormRow2
            provider={provider}
            name="examLimitTime"
            label={t('시험시간')}
            format="number"
            validation={{ required: true }}
            element={<Input type="number" suffixText={t('분')} min={0} disabled={hasMapping} />}
            placeholder="0"
          />
          {/* 시험 응시 가능 횟수 (0이면 재시험 불가) */}
          <FormRow2
            provider={provider}
            name="maxAttemptCount"
            label={t('시험응시 횟수')}
            format="number"
            validation={{ required: true }}
            element={<Input type="number" suffixText={t('회')} min={0} disabled={hasMapping} />}
            placeholder="0"
          />
        </ContentsRow>

        <ContentsRow type="horizontal" className="inactive">
          {/* 문항이동 제어 */}
          <FormRow2
            provider={provider}
            name="isMoveQuestion"
            label={t('문항이동 제어')}
            format="boolean"
            value={false}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? '제어' : '제어안함 '),
                }}
                disabled={hasMapping}
              />
            }
            tooltip={t('시험 문항을 순차적으로 풀어야 한다면 문항이동 제어기능을 사용하세요.')}
          />
        </ContentsRow>

        <ContentsRow type="horizontal" className="inactive">
          {/* 시험 응시 후 결과 공개 여부 */}
          <FormRow2
            provider={provider}
            name="isShowResult"
            label={t('시험응시 후 결과 공개')}
            format="boolean"
            value={false}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? '공개' : '비공개 '),
                }}
                disabled={hasMapping}
              />
            }
            tooltip={t(
              '결과 공개는 시험 응시 후 총점, 시험문항, 문항별 채점(정답을 맞췄는지 여부), 문항별 정답, 정답의 해설을 학습자에게 공개할지, 공개한다면 언제 공개할지 설정합니다.',
            )}
          />
        </ContentsRow>
        {/* 결과 공개 범위 상세 설정 */}
        <FormDisplay provider={provider} dependencies={[{ name: 'isShowResult', value: true }]}>
          <ContentsRow className="pt-0">
            <FormRow2
              provider={provider}
              name="isShowTotalScore"
              format="boolean"
              value={false}
              element={
                <CheckBoxFormField checkConfig={{ label: t('총점') }} disabled={hasMapping} />
              }
            />
            <FormRow2
              provider={provider}
              name="isShowQuestion"
              format="boolean"
              value={false}
              element={
                <CheckBoxFormField checkConfig={{ label: t('시험 문항') }} disabled={hasMapping} />
              }
            />
            <FormRow2
              provider={provider}
              name="isShowScore"
              format="boolean"
              value={false}
              element={
                <CheckBoxFormField
                  checkConfig={{ label: t('문항별 채점') }}
                  disabled={hasMapping}
                />
              }
            />
            <FormRow2
              provider={provider}
              name="isShowCorrectAnswer"
              format="boolean"
              value={false}
              element={
                <CheckBoxFormField
                  checkConfig={{ label: t('문항별 정답') }}
                  disabled={hasMapping}
                />
              }
            />
            <FormRow2
              provider={provider}
              name="isShowAnswerExplain"
              format="boolean"
              value={false}
              element={
                <CheckBoxFormField
                  checkConfig={{ label: t('정답의 해설') }}
                  disabled={hasMapping}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            {/* 결과보기 가능 시점 - 시험 종료 후 / 시험 제출 후 */}
            <FormRow2
              provider={provider}
              name="resultVisibleTime"
              label={t('결과보기 가능 시점')}
              value={ExamResultVisibleMoment.ON_EXAM_END}
              element={
                <RadioGroupFormField options={resultVisibleMomentOptions} disabled={hasMapping} />
              }
            />
          </ContentsRow>
        </FormDisplay>

        <ContentsRow type="horizontal" className="inactive">
          {/* 재응시 시 이전 선택 오답 비활성화 */}
          <FormRow2
            provider={provider}
            name="isDisableWrongRetry"
            label={t('재응시 시 이전 선택 오답 비활성화')}
            format="boolean"
            value={false}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? t('LABEL.button.apply') : '미적용 '),
                }}
                disabled={hasMapping}
              />
            }
            tooltip={t(
              '비활성화 적용 시 이전 응시 때 선택한 오답 보기들은 재응시 시 선택을 할 수 없는 상태로 보여집니다.',
            )}
          />
        </ContentsRow>

        <ContentsRow type="horizontal" className="inactive">
          {/* 제한시간 초과 시 자동 제출 */}
          <FormRow2
            provider={provider}
            name="isAutoSubmit"
            label={t('시험제한시간 초과 시 자동제출')}
            format="boolean"
            value={true}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? '자동제출' : '직접제출 '),
                }}
                disabled={hasMapping}
              />
            }
            tooltip={t(
              '자동제출 설정 시 시험 제한시간이 지나면 시험지가 자동제출됩니다. 직접제출 설정 시 시험 제한시간이 지나더라도 ‘제출’버튼을 클릭해야 시험지가 제출됩니다.',
            )}
          />
        </ContentsRow>

        <ContentsRow type="horizontal" className="inactive">
          {/* 시험 종료 안내 여부 */}
          <FormRow2
            provider={provider}
            name="isExamEndNotice"
            label={t('시험 종료 안내')}
            format="boolean"
            value={false}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? '종료안내' : '안내안함 '),
                }}
                disabled={hasMapping}
              />
            }
            tooltip={t('시험 응시 중 시험 종료 시간에 대한 안내를 받을 수 있습니다.')}
          />
        </ContentsRow>
        <FormDisplay provider={provider} dependencies={[{ name: 'isExamEndNotice', value: true }]}>
          <ContentsRow className="w-1/2 pt-0">
            <FormRow2
              provider={provider}
              name="examEndNoticeOffsetMinutes"
              label={t('시험시간 종료')}
              format="number"
              element={<Input type="number" suffixText={t('분전')} disabled={hasMapping} />}
              placeholder={t('LABEL.form.placeholder.input')}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="examEndNoticeMessage"
              label={t('종료메세지')}
              element={<TextareaFormField maxLength={500} disabled={hasMapping} />}
              placeholder={t('LABEL.form.placeholder.input')}
            />
          </ContentsRow>
        </FormDisplay>
      </div>
    );
  },
);

TestPaperInfoComponent.displayName = 'TestPaperInfo';

export const TestPaperInfo = TestPaperInfoComponent;
