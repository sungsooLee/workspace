import { LearningSequence } from '@entities/learning-sequence';
import {
  useDeleteSequence,
  useUpdateSequence,
} from '@entities/learning-sequence/service/learning-sequence.hook';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { InstructorListPopup } from '@features/learning-operate-support/instructor-tutor/instructor-management';
import { TriggerKey, useCourseActions } from '@features/learning-operate/course/course-management';
import { CODE_GROUP, DynamicFormProvider } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { SplitPanel } from '@learnway/ui/elements';
import {
  ChipListModalSelectorFormField,
  InputModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui/form-field';
import { useModal } from '@learnway/ui/modal';
import { PhoneNumberFormField } from '@learnway/ui/phone-number';

import {
  DateRangePickerFormField,
  DropdownFormField,
  FormDisplay,
  FormRow,
  FormRow2,
  InputFormField,
  PassOptionFormField,
  SwitchFormField,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
} from '@shared/ui/form';
import {
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupChoiceModal,
  UserGroupTabsChoiceModal,
} from '@shared/ui/modal';

import { useQueryClient } from '@tanstack/react-query';
import { useUpdateEffect } from 'ahooks';
import { FormEventHandler, forwardRef, useCallback, useEffect } from 'react';
import {
  Control,
  FieldValues,
  FormState,
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type SequenceDetailComponentProps = {
  mode: string;
  setMode?: (value: any) => void;
  courseId?: number;
  sequenceId: number;
  lastTriggered?: any;
  provider: DynamicFormProvider;
  updateFormData: (data?: Record<string, any>) => void;
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onFormChange?: (values?: Record<string, any>) => void;
  onFormValid?: UseFormTrigger<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  formState?: FormState<FieldValues>;
  control?: Control<FieldValues, any, FieldValues> & {
    isFieldRequired: (fieldName: string) => boolean;
  };
  formValues?: any;
  resetDirtyState: () => void;
};

/**
 * NLP_BO_LMS_0033 : 차수 상세
 * @returns
 */
const SequenceDetailComponent = forwardRef<HTMLElement, SequenceDetailComponentProps>(
  (
    {
      mode,
      setMode,
      courseId: courseIdProps,
      sequenceId: sequenceIdProps,
      lastTriggered,
      provider,
      updateFormData,
      onSubmit,
      getValues,
      formValues,
      resetDirtyState,
    },
    ref,
  ) => {
    console.log('##courseIdProps=>', courseIdProps);
    console.log('##sequenceIdProps=>', sequenceIdProps);
    const { t } = useTranslation();
    const { confirm: openConfirm, openModal, showSaveComplete } = useModal();
    const { setCheckDirtyForm } = useCourseActions();

    const { updateSequence } = useUpdateSequence({
      onSuccess: async (response: any) => {
        console.log('useUpdateSequence :: onSuccess', response);
        await showSaveComplete();
        setCheckDirtyForm(() => false);
      },
    });
    const { deleteSequence } = useDeleteSequence({
      onSuccess: async (response: any) => {
        console.log('useDeleteSequence :: onSuccess', response);
        await showSaveComplete();
        if (setMode) setMode('MAIN');
      },
    });

    useUpdateEffect(() => {
      switch (lastTriggered?.key) {
        case TriggerKey.LIST:
          if (mode === 'DETAIL') if (setMode) setMode('MAIN');
          break;
        case TriggerKey.SAVE:
          console.log('###저장');
          handleUpdateSequence();
          break;
        case TriggerKey.DELETE:
          console.log('###삭제');
          handleDeleteSequence();
          break;
      }
    }, [lastTriggered]);

    const handleUpdateSequence = useCallback(async () => {
      updateFormData({ ...formValues });
      const run = onSubmit(async (data) => {
        // if (!(await saveConfirm())) {
        //   return;
        // }
        updateSequence({ sequenceId: sequenceIdProps, ...formDataToRequestData(formValues) });
      });
      // 가짜 이벤트 객체를 생성해서 수동으로 호출
      run({ preventDefault: () => null } as any);
    }, [formValues, onSubmit]);

    const handleDeleteSequence = async () => {
      const confirm = await openConfirm(t('삭제 하시겠습니까?'));
      if (!confirm) return;
      deleteSequence({ sequenceId: sequenceIdProps });
    };

    const initializeData = async () => {
      const result = await queryClient.fetchQuery(queryOptions.sequenceDetail(sequenceIdProps));
      console.log('## result', result);
      if (result) {
        console.log('SequenceDetailComponent init');
        updateFormData(responseDataToFormData(result));
      }
    };

    useEffect(() => {
      initializeData();
    }, []);

    const queryClient = useQueryClient();

    return (
      <form>
        <SplitPanel size={['auto', 40]} divider>
          <div>
            <ContentsRow>
              {/*유형*/}
              <FormRow2
                provider={provider}
                name={'courseType'}
                label={t('유형')}
                disabled
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.CourseType'],
                    }}
                  />
                }
                validation={{ required: true }}
              />
              {/*채널*/}
              <FormRow2
                provider={provider}
                name={'channelUuid'}
                label={t('채널')}
                disabled
                element={<TenantChannelDropdownFormField2 tenantId={-1} />}
                validation={{ required: true }}
              />
            </ContentsRow>
            {/* 공개대상 */}
            <FormSubTitle label={t('공개대상')} />
            {/*테넌트*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'tenantIds'}
                label={t('테넌트')}
                format={'array'}
                element={
                  <TenantByRoleChannelCheckboxFormField channelUuid={getValues().channelUuid} />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            {/*학습대상(유저그룹)*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'targetList'}
                format={'object'}
                label={t('학습대상(유저그룹)')}
                validation={{ required: true }}
                element={
                  <ChipListModalSelectorFormField
                    modalConfig={() => ({
                      width: 'xl',
                      content: (
                        <UserGroupTabsChoiceModal
                          tenantIds={getValues().tenantIds}
                          option={getValues().targetList}
                        />
                      ),
                    })}
                    chipList={{
                      labelField: 'pathValue',
                      valueField: 'pathKey',
                      wordwrap: true,
                    }}
                    showAddButton
                  />
                }
                actionNode={
                  <Button
                    variant="text"
                    label={t('대상자')}
                    onClick={(e: any) => {
                      openModal({
                        width: 'xl',
                        content: <UserGroupChoiceModal groups={getValues().targetList} />,
                      });
                    }}
                  />
                }
              />
            </ContentsRow>
            {/*차수*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseSequenceName'}
                label={t('차수명')}
                element={<InputFormField type={'text'} maxLength={40} />}
                validation={{ required: true }}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'isUsed'}
                label={t('차수 사용여부')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
              <FormRow2
                provider={provider}
                name={'enrollmentRange'}
                label={t('수강신청 기간')}
                format={'object'}
                element={<DateRangePickerFormField />}
                validation={{
                  required: true,
                  conditions: [
                    {
                      fn: (values: any) => !values.enrollmentRange?.from,
                      message: t('시작 날짜를 선택하세요'),
                    },
                    {
                      fn: (values: any) => !values.enrollmentRange?.to,
                      message: t('종료 날짜를 선택하세요'),
                    },
                    {
                      fn: (values: any) => values.enrollmentRange.from > values.enrollmentRange.to,
                      message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
                    },
                  ],
                }}
              />
            </ContentsRow>
            <ContentsRow>
              {/* 학습기간 유형 */}
              <FormRow2
                provider={provider}
                name={'learningStartType'}
                label={t('학습기간 유형')}
                element={
                  <RadioGroupFormField
                    options={[
                      {
                        value: 'FIXED_DATE',
                        label: t('기간 지정'),
                        node: (
                          <FormRow2
                            provider={provider}
                            name={'learningStartRange'}
                            format={'object'}
                            element={<DateRangePickerFormField />}
                          />
                        ),
                      },
                      {
                        value: 'DAYS_AFTER_ENROLL',
                        label: t('시작일 기준'),
                        node: (
                          <FormRow2
                            provider={provider}
                            name={'learningStartDays'}
                            // value={''}
                            element={
                              <InputFormField
                                type="number"
                                prefixText={t('학습 가능일로부터')}
                                suffixText={t('일')}
                              />
                            }
                          />
                        ),
                      },
                    ]}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            <ContentsRow>
              {/* 수강취소 */}
              <FormRow2
                provider={provider}
                name={'isEnrollCancelDeadLineActivated'}
                label={t('수강취소')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'], // 사용/미사용
                      optionsNode: [
                        {
                          value: false,
                        },
                        {
                          value: true, // 수강취소 기간
                          node: (
                            <FormRow2
                              provider={provider}
                              name={'enrollCancelRange'}
                              format={'object'}
                              /* enrollCancelStartDateTime 수강취소가능시작일시
                              enrollCancelEndDateTime	수강취소가능종료일시 */
                              element={<DateRangePickerFormField />}
                              validation={{
                                required: true,
                                conditions: [
                                  {
                                    fn: (values: any) =>
                                      values.isEnrollCancelDeadLineActivated &&
                                      !values.enrollCancelRange?.from,
                                    message: t('시작 날짜를 선택하세요'),
                                  },
                                  {
                                    fn: (values: any) =>
                                      values.isEnrollCancelDeadLineActivated &&
                                      !values.enrollCancelRange?.to,
                                    message: t('종료 날짜를 선택하세요'),
                                  },
                                  {
                                    fn: (values: any) =>
                                      values.isEnrollCancelDeadLineActivated &&
                                      values.enrollCancelRange.from > values.enrollCancelRange.to,
                                    message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
                                  },
                                ],
                              }}
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            <ContentsRow>
              {/* 교육공간 */}
              <FormRow2
                provider={provider}
                name={'learningSpaceType'}
                label={t('교육공간')}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.LearningSpaceType'],
                      optionsNode: [
                        {
                          value: 'REGISTERED', // 장소선택
                          node: (
                            <>
                              <FormRow2
                                provider={provider}
                                name={'learningSpaceId'}
                                type={'hidden'}
                                value={''}
                              />
                              <FormRow2
                                provider={provider}
                                name={'learningSpaceName'}
                                value={''}
                                element={
                                  <InputModalSelectorFormField
                                    modalConfig={{
                                      content: <TrainingPlaceChoiceModal />,
                                    }}
                                    transformModalData={(data: any) => ({
                                      learningSpaceId: data.learningSpaceId,
                                      learningSpaceName: data.learningSpaceName,
                                    })}
                                  />
                                }
                              />
                            </>
                          ),
                        },
                        {
                          value: 'MANUAL', // 직접입력
                          node: (
                            <FormRow2
                              provider={provider}
                              name={'learningSpaceNameKeyIn'}
                              value={''}
                              element={<InputFormField />}
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
              />
            </ContentsRow>
            {/* 수강신청 */}
            <FormSubTitle label={t('수강신청')} />
            <ContentsRow>
              {/* 승인 */}
              <FormRow2
                provider={provider}
                name={'approvalLineType'}
                label={t('승인 결재 라인')}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.CourseType'],
                    }}
                    options={[
                      {
                        value: 'NONE',
                        label: 'NONE',
                      },
                      {
                        value: 'LEADER',
                        label: 'LEADER',
                      },
                      {
                        value: 'OPERATOR',
                        label: 'OPERATOR',
                      },
                      {
                        value: 'LEADER_OPERATOR',
                        label: 'LEADER_OPERATOR',
                      },
                      {
                        value: 'DEPEND_COMPANY',
                        label: 'DEPEND_COMPANY',
                      },
                    ]}
                  />
                }
                validation={{ required: true }}
              />
              {/* 정원 */}
              <FormRow2
                provider={provider}
                name={'isMaxEnrollQuotaRestricted'}
                label={t('정원')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: 'mock.options.use',
                      optionsNode: [
                        {
                          value: false,
                        },
                        {
                          value: true,
                          node: (
                            <FormRow2
                              provider={provider}
                              name={'maxEnrollQuota'}
                              value={''}
                              element={
                                <InputFormField
                                  type="number"
                                  prefixText={t('정원')}
                                  suffixText={t('명')}
                                />
                              }
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            {/* 수강신청 대기 */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'waitListPickMethodType'}
                label={t('수강신청 대기')}
                element={
                  <RadioGroupFormField
                    options={[
                      { label: t('미사용'), value: 'NONE' },
                      { label: t('자동모드'), value: 'AUTO' },
                      { label: t('수동모드'), value: 'MANUAL' },
                    ]}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            {/*교재*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isTextbookProvided'}
                label={t('교재')}
                format={'boolean'}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isTextbookProvided', value: true }]}
            >
              {/*교재명, 교재비*/}
              <ContentsRow>
                {/*교재명*/}
                <FormRow2
                  provider={provider}
                  name={'textbookName'}
                  label={t('교재명')}
                  element={<InputFormField />}
                />
                {/*교재비*/}
                <FormRow2
                  provider={provider}
                  name={'textbookFee'}
                  label={t('교재비')}
                  format={'number'}
                  element={<InputFormField prefixText={t('1인당')} suffixText={t('원')} />}
                />
              </ContentsRow>
            </FormDisplay>
            {/*강사*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isInstructorAssigned'}
                label={t('강사')}
                format={'boolean'}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            {/* 강사 */}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isInstructorAssigned', value: true }]}
            >
              <ContentsRow>
                {/* 강사  */}
                <FormRow2
                  provider={provider}
                  name={'instructorAssignType'}
                  label={t('강사')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.InstructorAssignType'],
                        optionsNode: [
                          {
                            value: 'REGISTERED', // 선택
                            node: (
                              // 강사 선택
                              <FormRow2
                                provider={provider}
                                name={'instructorName'}
                                element={
                                  <InputModalSelectorFormField
                                    modalConfig={{
                                      width: 'xl',
                                      content: <InstructorListPopup />,
                                    }}
                                    transformModalData={(data: any) => ({
                                      instructorId: data.instructorId,
                                      instructorName: data.instructorName,
                                    })}
                                  />
                                }
                              />
                            ),
                          },
                          {
                            value: 'MANUAL', // 직접입력
                            node: (
                              // 강사 직접입력
                              <FormRow2
                                provider={provider}
                                name={'instructorName'}
                                element={<InputFormField />}
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
                {/*강사 ID - hidden */}
                <FormRow2 provider={provider} name={'instructorId'} type={'hidden'} value={''} />
              </ContentsRow>
            </FormDisplay>
            {/*관리자*/}
            <FormSubTitle label={t('관리자')} />
            {/*담당자*/}
            <ContentsRow>
              {/*담당자*/}
              <FormRow2
                provider={provider}
                name={'coordinatorName'}
                label={t('담당자')}
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      content: <UserChoiceModal />,
                    }}
                    transformModalData={(data: any) => ({
                      coordinatorUuid: data.uuid,
                      coordinatorName: `${data.name}/${data?.dept?.deptName}`,
                      coordinatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                    })}
                  />
                }
                validation={{ required: true }}
              />
              {/*연락처*/}
              <FormRow2
                provider={provider}
                name={'coordinatorTelNo'}
                label={t('연락처')}
                element={
                  <PhoneNumberFormField
                    fields={{ nationCode: 'coordinatorTelCountryCode', number: 'coordinatorTelNo' }}
                    phoneNumberConfig={{
                      options: [{ value: 'KOR_82', label: '+82' }],
                    }}
                  />
                }
              />
              {/*이메일*/}
              <FormRow2
                provider={provider}
                name={'coordinatorEmail'}
                label={t('이메일')}
                element={<InputFormField />}
              />
              {/*담당자 ID - hidden */}
              <FormRow2 provider={provider} name={'coordinatorId'} type={'hidden'} value={''} />
            </ContentsRow>
            {/*운영자*/}
            <ContentsRow>
              {/*운영자*/}
              <FormRow2
                provider={provider}
                name={'operatorName'}
                label={t('운영자')}
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      content: <UserChoiceModal />,
                    }}
                    transformModalData={(data: any) => ({
                      operatorUuid: data.uuid,
                      operatorName: `${data.name}/${data?.dept?.deptName}`,
                      operatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                    })}
                  />
                }
                validation={{ required: true }}
              />
              {/*연락처*/}
              <FormRow2
                provider={provider}
                name={'operatorTelNo'}
                label={t('연락처')}
                element={
                  <PhoneNumberFormField
                    fields={{ nationCode: 'operatorTelCountryCode', number: 'operatorTelNo' }}
                    phoneNumberConfig={{
                      options: [{ value: 'KOR_82', label: '+82' }],
                    }}
                  />
                }
              />
              {/*이메일*/}
              <FormRow2
                provider={provider}
                name={'operatorEmail'}
                label={t('이메일')}
                element={<InputFormField />}
              />
              {/*운영자 ID - hidden */}
              <FormRow2 provider={provider} name={'operatorId'} type={'hidden'} value={''} />
            </ContentsRow>
            {/* 학습환경 */}
            <FormSubTitle label={t('학습환경')} />
            <ContentsRow>
              {/*기기 제한*/}
              <FormRow2
                provider={provider}
                name={'deviceRestrictType'}
                label={t('기기 제한')}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.DeviceRestrictType'],
                    }}
                  />
                }
              />
              {/*네트워크 제한*/}
              <FormRow2
                provider={provider}
                name={'isIntranetRestricted'}
                label={t('네트워크 제한')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              {/*학습시간 제한*/}
              <FormRow2
                provider={provider}
                name={'learningRestrictTimeType'}
                label={t('학습시간 제한')}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.LearningRestrictTimeType'],
                    }}
                  />
                }
              />
              {/*복습 제한*/}
              <FormRow2
                provider={provider}
                name={'isReviewRestricted'}
                label={t('복습 제한')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                      optionsNode: [
                        {
                          value: true, // 사용
                          node: (
                            // 복습 가능 기간(개월)
                            <FormRow2
                              provider={provider}
                              name={'maxReviewPeriodMonths'}
                              element={
                                <InputFormField
                                  type={'number'}
                                  min={0}
                                  prefixText={t('학습 종료일 기준')}
                                  suffixText={t('개월')}
                                />
                              }
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              {/*화면캡쳐 방지*/}
              <FormRow2
                provider={provider}
                name={'isCaptureBlockEnabled'}
                label={t('화면캡쳐 방지')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
              {/*학습전 보안 서약*/}
              <FormRow2
                provider={provider}
                name={'isSecurityAgreementEnable'}
                label={t('학습전 보안 서약')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
            </ContentsRow>
            {/*학습제어*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isLearnControlEnabled'}
                format={'boolean'}
                label={t('학습제어')}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            {/* 1일 진도제한, 진도 초기화, 순차 학습  */}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isLearnControlEnabled', value: true }]}
            >
              <ContentsRow>
                {/* 1일 진도제한 */}
                <FormRow2
                  provider={provider}
                  name={'isDailyLearningProgressRestricted'}
                  label={t('1일 진도제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                        optionsNode: [
                          {
                            value: true, // 사용
                            node: (
                              // 1일 진도 제한(%)
                              <FormRow2
                                provider={provider}
                                name={'maxDailyLearningProgress'}
                                element={
                                  <InputFormField
                                    type={'number'}
                                    min={0}
                                    prefixText={t('하루 기준')}
                                    suffixText="%"
                                  />
                                }
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
                {/* 진도 초기화 */}
                <FormRow2
                  provider={provider}
                  name={'isProgressResetEnabled'}
                  label={t('진도 초기화')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/* 순차 학습  */}
                <FormRow2
                  provider={provider}
                  name={'isSequentialLearningRequired'}
                  label={t('순차 학습')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 동영상 탐색바 제한  */}
                <FormRow2
                  provider={provider}
                  name={'isPlayerControlRestricted'}
                  label={t('동영상 탐색바 제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/* 동영상 배속 제한 */}
                <FormRow2
                  provider={provider}
                  name={'maxPlayBackRate'}
                  label={t('동영상 배속 제한')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['cms.video.PlayBackRate'],
                      }}
                    />
                  }
                />
              </ContentsRow>
            </FormDisplay>
            {/*이수기준*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isUsePassOption'}
                label={t('이수기준')}
                format={'boolean'}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isUsePassOption', value: true }]}
            >
              {/* 이수처리 설정, 수료증 제공 */}
              <ContentsRow>
                {/* 이수처리 방식*/}
                <FormRow2
                  provider={provider}
                  name={'passMethodType'}
                  label={t('이수처리 방식')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.PassMethodType'],
                      }}
                    />
                  }
                />
                {/* 수료증 제공 */}
                <FormRow2
                  provider={provider}
                  name={'isCertificateProvided'}
                  format={'boolean'}
                  label={t('수료증 제공')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              {/*이수기준 설정 */}
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name={'passOption'}
                  label={t('이수기준 설정')}
                  format={'object'}
                  element={<PassOptionFormField />}
                />
              </ContentsRow>
              {/* 인정 학습시간, 학습 포인트 */}
              <ContentsRow>
                {/* 인정 학습시간  */}
                <FormRow2
                  provider={provider}
                  name={'recognizedStudyMinType'}
                  label={t('인정 학습시간')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.RecognizedStudyMinType'],
                        optionsNode: [
                          {
                            value: 'COUNT_TIME', // 회수 및 학습시간
                            node: (
                              <>
                                {/* // 인정 학습 횟수 */}
                                <FormRow2
                                  provider={provider}
                                  name={'recognizedStudyCycles'}
                                  element={
                                    <InputFormField type={'number'} min={0} suffixText={t('회')} />
                                  }
                                />
                                {/* // 인정학습시간(분) */}
                                <FormRow2
                                  provider={provider}
                                  name={'recognizedStudyMinutes'}
                                  element={
                                    <InputFormField type={'number'} min={0} suffixText={t('분')} />
                                  }
                                />
                              </>
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
                {/* 학습 포인트 */}
                <FormRow2
                  provider={provider}
                  name={'isRecognizedStudyPoint'}
                  label={t('학습 포인트')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                        optionsNode: [
                          {
                            value: true, // 사용
                            node: (
                              // 인정학습점수(학습포인트)
                              <FormRow2
                                provider={provider}
                                name={'recognizedStudyPoint'}
                                element={
                                  <InputFormField
                                    type={'number'}
                                    min={0}
                                    suffixText={t('포인트')}
                                  />
                                }
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
              </ContentsRow>
            </FormDisplay>
            {/*학습환경*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isLearnEnvEnabled'}
                label={t('학습환경')}
                format={'boolean'}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            {/* 기기 제한, 네트워크 제한, 학습시간 제한 */}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isLearnEnvEnabled', value: true }]}
            >
              <ContentsRow>
                {/*기기 제한*/}
                <FormRow2
                  provider={provider}
                  name={'deviceRestrictType'}
                  label={t('기기 제한')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.DeviceRestrictType'],
                      }}
                    />
                  }
                />
                {/*네트워크 제한*/}
                <FormRow2
                  provider={provider}
                  name={'isIntranetRestricted'}
                  label={t('네트워크 제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/*학습시간 제한*/}
                <FormRow2
                  provider={provider}
                  name={'learningRestrictTimeType'}
                  label={t('학습시간 제한')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.LearningRestrictTimeType'],
                      }}
                    />
                  }
                />
                {/*복습 제한*/}
                <FormRow2
                  provider={provider}
                  name={'isReviewRestricted'}
                  label={t('복습 제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                        optionsNode: [
                          {
                            value: true, // 사용
                            node: (
                              // 복습 가능 기간(개월)
                              <FormRow2
                                provider={provider}
                                name={'maxReviewPeriodMonths'}
                                element={
                                  <InputFormField
                                    type={'number'}
                                    min={0}
                                    prefixText={t('학습 종료일 기준')}
                                    suffixText={t('개월')}
                                  />
                                }
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/*화면캡쳐 방지*/}
                <FormRow2
                  provider={provider}
                  name={'isCaptureBlockEnabled'}
                  label={t('화면캡쳐 방지')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/*학습전 보안 서약*/}
                <FormRow2
                  provider={provider}
                  name={'isSecurityAgreementEnable'}
                  label={t('학습전 보안 서약')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
            </FormDisplay>
            {/*학습제어*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isLearnControlEnabled'}
                format={'boolean'}
                label={t('학습제어')}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            {/* 1일 진도제한, 진도 초기화, 순차 학습  */}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isLearnControlEnabled', value: true }]}
            >
              <ContentsRow>
                {/* 1일 진도제한 */}
                <FormRow2
                  provider={provider}
                  name={'isDailyLearningProgressRestricted'}
                  label={t('1일 진도제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                        optionsNode: [
                          {
                            value: true, // 사용
                            node: (
                              // 1일 진도 제한(%)
                              <FormRow2
                                provider={provider}
                                name={'maxDailyLearningProgress'}
                                element={
                                  <InputFormField
                                    type={'number'}
                                    min={0}
                                    prefixText={t('하루 기준')}
                                    suffixText="%"
                                  />
                                }
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
                {/* 진도 초기화 */}
                <FormRow2
                  provider={provider}
                  name={'isProgressResetEnabled'}
                  label={t('진도 초기화')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/* 순차 학습  */}
                <FormRow2
                  provider={provider}
                  name={'isSequentialLearningRequired'}
                  label={t('순차 학습')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 동영상 탐색바 제한  */}
                <FormRow2
                  provider={provider}
                  name={'isPlayerControlRestricted'}
                  label={t('동영상 탐색바 제한')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/* 동영상 배속 제한 */}
                <FormRow2
                  provider={provider}
                  name={'maxPlayBackRate'}
                  label={t('동영상 배속 제한')}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['cms.video.PlayBackRate'],
                      }}
                    />
                  }
                />
                {/* dummy */}
                <FormRow provider={provider} name={''} />
              </ContentsRow>
            </FormDisplay>
            {/*행정항목*/}
            <FormSubTitle label={t('행정항목')} />
            {/*HMG 과정 데이터 표준 대분류, 중분류*/}
            <ContentsRow>
              {/* 대분류  */}
              <FormRow2
                provider={provider}
                name={'hmgStandardMainCategory'}
                label={t('HMG 과정 데이터 표준 대분류')}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.HmgStandardMainCategory'],
                    }}
                  />
                }
                validation={{ required: true }}
              />
              {/* 중분류 */}
              <FormRow2
                provider={provider}
                name={'hmgStandardSubCategory'}
                label={t('HMG 과정 데이터 표준 중분류')}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.HmgStandardSubCategory'],
                    }}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>
            {/* 1인당 교육비, 고용보험 환급비용 */}
            <ContentsRow>
              {/* 1인당 교육비  */}
              <FormRow2
                provider={provider}
                name={'isUseTrainingCostPerPerson'}
                label={t('1인당 교육비')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                      optionsNode: [
                        {
                          value: true, // 사용
                          node: (
                            // 1인당 교육비(원)
                            <FormRow2
                              provider={provider}
                              name={'trainingCostPerPerson'}
                              format={'number'}
                              element={
                                <InputFormField type={'number'} min={0} suffixText={t('원')} />
                              }
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
              />
              {/* 고용보험 환급비용 */}
              <FormRow2
                provider={provider}
                name={'isUseEmploymentInsuranceRefund'}
                label={t('고용보험 환급비용')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                      optionsNode: [
                        {
                          value: true, // 사용
                          node: (
                            // 고용보험 환급비(원)
                            <FormRow2
                              provider={provider}
                              name={'employmentInsuranceRefund'}
                              format={'number'}
                              element={
                                <InputFormField type={'number'} min={0} suffixText={t('원')} />
                              }
                            />
                          ),
                        },
                      ],
                    }}
                  />
                }
              />
            </ContentsRow>
            {/* 숙박 여부, 추가예정 항목 */}
            <ContentsRow>
              {/* 숙박 여부  */}
              <FormRow2
                provider={provider}
                name={'isStayed'}
                label={t('숙박 여부')}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
              {/* 추가예정 항목 */}
              <FormRow2 provider={provider} name={''} />
            </ContentsRow>
            {/*오토에버 위탁 전용*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isUseOutsourcing'}
                label={t('(테넌트) 전용')}
                format={'boolean'}
                element={<SwitchFormField />}
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isUseOutsourcing', value: true }]}
            >
              {/* 사전 레벨테스트, 교재 배송지 수집 */}
              <ContentsRow>
                {/* 사전 레벨테스트  */}
                <FormRow2
                  provider={provider}
                  name={'isPreLevelTestRequired'}
                  label={t('사전 레벨테스트')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 교재 배송지 수집 */}
                <FormRow2
                  provider={provider}
                  name={'isBookDeliveryInfoRequired'}
                  label={t('교재 배송지 수집')}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              {/*튜터*/}
              <ContentsRow>
                {/* 튜터 */}
                <FormRow2
                  provider={provider}
                  name={'tutorName'}
                  label={t('튜터')}
                  element={
                    <InputModalSelectorFormField
                      modalConfig={{
                        content: <InstructorListPopup />,
                      }}
                      transformModalData={(modalData: any) => {
                        return {
                          tutorId: modalData.instructorId,
                          tutorName: modalData.instructorName,
                        };
                      }}
                    />
                  }
                />
                {/* 튜터 ID */}
                <FormRow2 provider={provider} name={'tutorId'} format={'number'} type={'hidden'} />
                {/* 위탁 소유회사 */}
                <FormRow2
                  provider={provider}
                  name={'outsourcingCompanyName'}
                  label={t('위탁 소유회사')}
                  element={
                    <InputModalSelectorFormField
                      modalConfig={{
                        content: <InstructorListPopup />,
                      }}
                      transformModalData={(modalData: any) => {
                        return {
                          outsourcingCompanyId: modalData.instructorId,
                          outsourcingCompanyName: modalData.instructorName,
                        };
                      }}
                    />
                  }
                />
                {/* 위탁 소유회사 ID */}
                <FormRow2
                  provider={provider}
                  name={'outsourcingCompanyId'}
                  format={'number'}
                  type={'hidden'}
                />
                {/* 과정아이디 - hidden */}
                <FormRow2 provider={provider} name={'courseId'} type={'hidden'} format={'number'} />
                {/* 대표 썸네일 이미지 UUID - hidden */}
                <FormRow2
                  provider={provider}
                  name={'primaryThumbnailFileUuid'}
                  type={'hidden'}
                  format={'string'}
                />
              </ContentsRow>
            </FormDisplay>
          </div>
          {/* 커리큘럼 */}
          <div>
            <h2>{t('커리큘럼')}</h2>
          </div>
        </SplitPanel>
      </form>
    );
  },
);

export const SequenceDetail = SequenceDetailComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: LearningSequence): any => {
  console.log('##responseDataToFormData=>', d);
  return {
    ...d,
    tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    // 학습시작일시 설정
    learningStartRange: { from: d.learningStartDateTime, to: d.learningEndDateTime },
    // 수강취소 기간 설정
    enrollCancelRange: { from: d.enrollCancelStartDateTime, to: d.enrollCancelEndDateTime },
    // 수강신청 기간 설정
    enrollmentRange: { from: d.enrollStartDateTime, to: d.enrollEndDateTime },
    // 이수기준 설정
    passOption: {
      progressMinPassScore: d.progressMinPassScore, // 진도 최소 이수 점수
      attendanceMinPassScore: d.attendanceMinPassScore, // 출석 최소 이수 점수
      examMinPassScore: d.examMinPassScore, // 평가 최소 이수 점수
      asgmtMinPassScore: d.asgmtMinPassScore, // 과제 최소 이수 점수
      totalMinPassScore: d.totalMinPassScore, // 총점 최소 이수 점수
      progressWeights: d.progressWeights, // 진도 반영 비율
      attendanceWeights: d.attendanceWeights, // 출석 반영 비율
      examWeights: d.examWeights, // 평가 반영 비율
      asgmtWeights: d.asgmtWeights, // 과제 반영 비율
    },
    // 학습대상 - TODO targetList == '' 인 경우가 있음 (원인 파악전까지)
    targetList: Array.isArray(d.targetList) ? d.targetList : undefined,
  };
};

/**
 * 차수 기본 정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component BasicInfo
 * @param {LearningSequence} d - 차수 기본 정보 폼 데이터
 * @returns {LearningSequence} 차수 기본 정보 요청 데이터
 */
export const formDataToRequestData = (d: LearningSequence) => {
  console.log('####formDataToRequestData=>', d);
  d.curriculumId = 0; // TODO: 커리큘럼 개발완료되면 넘어온 값으로 대체되어야함

  // 수강취소(미사용/사용)
  if (!d.isEnrollCancelDeadLineActivated) {
    d.enrollCancelRange = null;
    d.enrollCancelStartDateTime = null;
    d.enrollCancelEndDateTime = null;
  }

  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 교육공간 > 차세데 학습학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = null; // 교육 장소 ID
    d.learningSpaceName = null; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = null; // 교육 장소 직접입력
  }
  // 교육공간 > 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = null; // 교육 장소 직접입력
  }
  // 교육공간 > 직적입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = null; // 교육 장소 ID
    d.learningSpaceName = null; // 교육 장소(선택입력)
  }
  // 학습대상-ID 배열
  d.targetListIds = d.targetList?.map((d: any) => d.id);
  // 담당자, 운영자 연락처 국가코드
  // d.coordinatorTelCountryCode = 'KOR_82';
  // d.operatorTelCountryCode = 'KOR_82';
  // 복습 제한 > 미사용
  if (d.isReviewRestricted === false) {
    d.maxReviewPeriodMonths = null; // 복습 제한 기간(개월)
  }
  // 1일 진도제한 > 미사용
  if (d.isDailyLearningProgressRestricted === false) {
    d.maxDailyLearningProgress = null; // 1일 진도제한(분)
  }

  // 인정 학습시간 > 학습시간
  if (d.recognizedStudyMinType === 'TIME') {
    d.recognizedStudyCycles = null; // 인정 학습 횟수
    d.recognizedStudyMinutes = null; // 인정 학습시간(분)
  }
  // 학습포인트 > 미사용
  if (d.isRecognizedStudyPoint === false) {
    d.recognizedStudyPoint = null; // 인정학습점수(학습포인트)
  }
  // 강사 > 강사선택
  // if (d.instructorAssignType === 'REGISTERED') {
  //   d.instructorName = null; // 강사 직접입력
  // }
  // 1인당 교육비 > 미사용
  if (d.isUseTrainingCostPerPerson === false) {
    d.trainingCostPerPerson = null; // 1인당 교육비(원)
  }

  // 고용보험 환급비용 > 미사용
  if (d.isUseEmploymentInsuranceRefund === false) {
    d.employmentInsuranceRefund = null; // 고용보험 환급비(원)
  }

  // 날짜 범위 쪼개기
  if (d.enrollmentRange) {
    d.enrollStartDateTime = d.enrollmentRange?.from;
    d.enrollEndDateTime = d.enrollmentRange?.to;
  }

  if (d.enrollCancelRange) {
    d.enrollCancelStartDateTime = d.enrollCancelRange?.from;
    d.enrollCancelEndDateTime = d.enrollCancelRange?.to;
  }

  if (d.learningStartRange) {
    d.learningStartDateTime = d.learningStartRange?.from;
    d.learningEndDateTime = d.learningStartRange?.to;
  }

  return {
    tenantIds: d.tenantList ? d.tenantList?.map((x: any) => x.tenantId) : [],
    targetList: d.targetList,
    courseSequenceName: d.courseSequenceName,
    isUsed: d.isUsed,
    enrollStartDateTime: d.enrollStartDateTime,
    enrollEndDateTime: d.enrollEndDateTime,
    isEnrollCancelDeadLineActivated: d.isEnrollCancelDeadLineActivated,
    enrollCancelStartDateTime: d.enrollCancelStartDateTime,
    enrollCancelEndDateTime: d.enrollCancelEndDateTime,
    learningStartType: d.learningStartType,
    learningStartDays: d.learningStartType === 'DAYS_AFTER_ENROLL' ? d.learningStartDays : null,
    learningStartDateTime: d.learningStartType === 'FIXED_DATE' ? d.learningStartDateTime : null,
    learningEndDateTime: d.learningStartType === 'FIXED_DATE' ? d.learningEndDateTime : null,
    learningSpaceType: d.learningSpaceType,
    learningSpaceId: d.learningSpaceId,
    learningSpaceName: d.learningSpaceName,
    learningSpaceNameKeyIn: d.learningSpaceNameKeyIn,
    approvalLineType: d.approvalLineType,
    isMaxEnrollQuotaRestricted: d.isMaxEnrollQuotaRestricted,
    maxEnrollQuota: d.maxEnrollQuota,
    waitListPickMethodType: d.waitListPickMethodType,
    maxWaitlistQuota: d.maxWaitlistQuota,
    isInstructorAssigned: d.isInstructorAssigned,
    instructorAssignType: d.instructorAssignType,
    instructorId: d.instructorId,
    instructorName: d.instructorName,
    isTextbookProvided: d.isTextbookProvided,
    textbookName: d.textbookName,
    textbookFee: d.textbookFee,
    coordinatorUuid: d.coordinatorUuid,
    coordinatorName: d.coordinatorName,
    coordinatorDeptName: d.coordinatorDeptName,
    coordinatorTelCountryCode: d.coordinatorTelCountryCode,
    coordinatorTelNo: d.coordinatorTelNo,
    coordinatorEmail: d.coordinatorEmail,
    operatorUuid: d.operatorUuid,
    operatorName: d.operatorName,
    operatorDeptName: d.operatorDeptName,
    operatorTelCountryCode: d.operatorTelCountryCode,
    operatorTelNo: d.operatorTelNo,
    operatorEmail: d.operatorEmail,
    isUsePassOption: d.isUsePassOption,
    passMethodType: d.passMethodType,
    isCertificateProvided: d.isCertificateProvided,
    progressMinPassScore: d.progressMinPassScore,
    attendanceMinPassScore: d.attendanceMinPassScore,
    examMinPassScore: d.examMinPassScore,
    asgmtMinPassScore: d.asgmtMinPassScore,
    totalMinPassScore: d.totalMinPassScore,
    progressWeights: d.progressWeights,
    attendanceWeights: d.attendanceWeights,
    examWeights: d.examWeights,
    asgmtWeights: d.asgmtWeights,
    recognizedStudyMinType: d.recognizedStudyMinType,
    recognizedStudyCycles: d.recognizedStudyCycles,
    recognizedStudyMinutes: d.recognizedStudyMinutes,
    isRecognizedStudyPoint: d.isRecognizedStudyPoint,
    recognizedStudyPoint: d.recognizedStudyPoint,
    isLearnEnvEnabled: d.isLearnEnvEnabled,
    deviceRestrictType: d.deviceRestrictType,
    isIntranetRestricted: d.isIntranetRestricted,
    learningRestrictTimeType: d.learningRestrictTimeType,
    isReviewRestricted: d.isReviewRestricted,
    maxReviewPeriodMonths: d.maxReviewPeriodMonths,
    isCaptureBlockEnabled: d.isCaptureBlockEnabled,
    isSecurityAgreementEnable: d.isSecurityAgreementEnable,
    isLearnControlEnabled: d.isLearnControlEnabled,
    isDailyLearningProgressRestricted: d.isDailyLearningProgressRestricted,
    maxDailyLearningProgress: d.maxDailyLearningProgress,
    isProgressResetEnabled: d.isProgressResetEnabled,
    isSequentialLearningRequired: d.isSequentialLearningRequired,
    isPlayerControlRestricted: d.isPlayerControlRestricted,
    maxPlayBackRate: d.maxPlayBackRate,
    hmgStandardMainCategory: d.hmgStandardMainCategory,
    hmgStandardSubCategory: d.hmgStandardSubCategory,
    isUseTrainingCostPerPerson: d.isUseTrainingCostPerPerson,
    trainingCostPerPerson: d.trainingCostPerPerson,
    isUseEmploymentInsuranceRefund: d.isUseEmploymentInsuranceRefund,
    employmentInsuranceRefund: d.employmentInsuranceRefund,
    isStayed: d.isStayed,
    isCarTenantCustomOption: d.isCarTenantCustomOption,
    isRotemTenantCustomOption: d.isRotemTenantCustomOption,
    isOutsourcingTenantCustomOption: d.isOutsourcingTenantCustomOption,
    isWiaTenantCustomOption: d.isWiaTenantCustomOption,
    isAutoeverTenantCustomOption: d.isAutoeverTenantCustomOption,
    tenantCustoms: d.tenantCustoms == null ? [] : d.tenantCustoms,
    curriculumId: d.curriculumId,
  };
};
