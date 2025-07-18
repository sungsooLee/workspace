import { useEffect, useCallback, useState, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css

import {
  Button,
  Checkbox,
  ChipListModalSelectorFormField,
  ContentsRow,
  Divider,
  FormSubTitle,
  GridBox,
  Input,
  InputModalSelectorFormField,
  PhoneNumberFormField,
  RadioGroupFormField,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import {
  useSearchBox,
  SearchBoxConfig,
  CODE_GROUP,
  SelectOption,
  compactValues,
  DynamicFormConfig,
  useDynamicForm,
  useDynamicForm2,
} from '@learnway/hooks';
import { useQueryClient } from '@tanstack/react-query';
import {
  FormRow,
  FormRow2,
  GridExcelDownloadButton,
  GridExcelUploadButton,
  SwitchFormField,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupTabsChoiceModal,
} from '@shared/ui';
import dayjs from 'dayjs';
import { DateTimeRangePickerFormField, DropdownFormField, FormDisplay } from '@features/form';
import { InstructorListPopup } from '@features/learning-operate-support/instructor-tutor/instructor-management/modal/instructor-list-modal';

type SequenceDetailComponentProps = {
  setMode?: (value: any) => void;
  courseId: number;
  sequenceId: number;
};

/**
 * NLP_BO_LMS_0033 : 차수 상세
 * @returns
 */
const SequenceDetailComponent = ({
  setMode,
  courseId,
  sequenceId,
}: SequenceDetailComponentProps) => {
  console.log('##courseId=>', courseId);
  console.log('##sequenceId=>', sequenceId);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    onFormValid,
    getValues,
    setValue,
    formState,
    control,
  } = useDynamicForm2();

  const queryClient = useQueryClient();

  const handleOnSubmit = async (formData: any) => {
    console.log('##formData:', formData);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <ContentsRow>
        {/*유형*/}
        <FormRow2
          provider={provider}
          name={'courseType'}
          label={'유형'}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['lms.course.CourseType'],
              }}
            />
          }
        />
        {/*채널*/}
        <FormRow2
          provider={provider}
          name={'channelUuid'}
          label={'채널'}
          element={<TenantChannelDropdownFormField2 tenantId={-1} />}
        />
      </ContentsRow>
      {/* 공개대상 */}
      <FormSubTitle label={t('공개대상')} />
      {/*테넌트*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'tenantIds'}
          label={'테넌트'}
          element={<TenantByRoleChannelCheckboxFormField channelUuid={getValues().channelUuid} />}
        />
      </ContentsRow>
      {/*학습대상(유저그룹)*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'targetList'}
          label={'학습대상(유저그룹)'}
          element={
            <ChipListModalSelectorFormField
              modalConfig={() => ({
                content: (
                  <UserGroupTabsChoiceModal
                    tenantIds={getValues().tenantIds}
                    option={getValues().targetList}
                  />
                ),
              })}
              chipList={{
                labelField: 'name',
                valueField: 'name',
                wordwrap: true,
              }}
              showAddButton
              // transformModalData={(data: any) => console.log('data', data)}
            />
          }
        />
      </ContentsRow>
      {/*차수*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'sequenceName'}
          label={'차수명'}
          element={<Input type={'text'} maxLength={40} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isSequenceUsed'}
          label={'차수 사용여부'}
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
          name={'regDate'}
          label={'수강신청 기간'}
          element={<DateTimeRangePickerFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        {/* 학습기간 유형 */}
        <FormRow2
          provider={provider}
          name={'eduDateType'}
          label={'학습기간 유형'}
          element={
            <RadioGroupFormField
              options={[
                {
                  value: false,
                  label: t('시작일 기준'),
                  node: (
                    <FormRow2
                      provider={provider}
                      name={'eduDate1'}
                      value={''}
                      element={<DateTimeRangePickerFormField />}
                    />
                  ),
                },
                {
                  value: true,
                  label: t('기간 지정'),
                  node: (
                    <FormRow2
                      provider={provider}
                      name={'eduDate2'}
                      value={''}
                      element={
                        <Input type="number" prefixText="학습 가능일로부터" suffixText="일" />
                      }
                    />
                  ),
                },
              ]}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        {/* 수강취소 */}
        <FormRow2
          provider={provider}
          name={'cancel'}
          label={'수강취소'}
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
                        name={'cancelDate'}
                        value={''}
                        element={<DateTimeRangePickerFormField />}
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
        {/* 교육공간 */}
        <FormRow2
          provider={provider}
          name={'learningSpaceType'}
          label={'교육공간'}
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
                        element={<Input />}
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
          name={'approvalStat'}
          label={'승인'}
          element={
            <DropdownFormField
              //   optionsConfig={{
              //     codeGroup: CODE_GROUP['lms.course.CourseType'],
              //   }}
              options={[
                {
                  value: false,
                  label: '반려',
                },
                {
                  value: true,
                  label: '승인',
                },
              ]}
            />
          }
        />
        {/* 정원 */}
        <FormRow2
          provider={provider}
          name={'capacity'}
          label={t('정원')}
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
                        name={'capacity1'}
                        value={''}
                        element={
                          <Input type="number" prefixText={t('정원')} suffixText={t('명')} />
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
      {/*교재*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isTextbookProvided'}
          label={'교재'}
          format={'boolean'}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isTextbookProvided', value: true }]}>
        {/*교재명, 교재비*/}
        <ContentsRow>
          {/*교재명*/}
          <FormRow2
            provider={provider}
            name={'textbookName'}
            label={'교재명'}
            element={<Input />}
          />
          {/*교재비*/}
          <FormRow2
            provider={provider}
            name={'textbookFee'}
            label={'교재비'}
            format={'number'}
            element={<Input prefixText={'1인당'} suffixText={'원'} />}
          />
        </ContentsRow>
      </FormDisplay>
      {/*강사*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isInstructorAssigned'}
          label={'강사'}
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
            label={'강사'}
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
                        <FormRow2 provider={provider} name={'instructorName'} element={<Input />} />
                      ),
                    },
                  ],
                }}
              />
            }
          />
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
          label={'담당자'}
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
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'coordinatorTelNo'}
          label={'연락처'}
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
          label={'이메일'}
          element={<Input />}
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
          label={'운영자'}
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
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'operatorTelNo'}
          label={'연락처'}
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
        <FormRow2 provider={provider} name={'operatorEmail'} label={'이메일'} element={<Input />} />
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
          label={'기기 제한'}
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
          label={'네트워크 제한'}
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
          label={'학습시간 제한'}
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
          label={'복습 제한'}
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
                          <Input
                            type={'number'}
                            min={0}
                            prefixText={'학습 종료일 기준'}
                            suffixText="개월"
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
          label={'화면캡쳐 방지'}
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
          label={'학습전 보안 서약'}
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
          label={'학습제어'}
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
            label={'1일 진도제한'}
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
                            <Input
                              type={'number'}
                              min={0}
                              prefixText={'하루 기준'}
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
            label={'진도 초기화'}
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
            label={'순차 학습'}
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
            label={'동영상 탐색바 제한'}
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
            label={'동영상 배속 제한'}
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
          label={'이수기준'}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUsePassOption', value: true }]}>
        {/* 이수처리 설정, 수료증 제공 */}
        <ContentsRow>
          {/* 이수처리 방식*/}
          <FormRow2
            provider={provider}
            name={'passMethodType'}
            label={'이수처리 방식'}
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
            label={'수료증 제공'}
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
    </form>
  );
};

export const SequenceDetail = SequenceDetailComponent;
