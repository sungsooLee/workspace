import { useFetchCourse, useFetchCourseConfig, useUpdateCourse } from '@entities/course';
import { DateRangePickerFormField, DropdownFormField, FormDisplay } from '@features/form';
import { InstructorListPopup } from '@features/learning-operate-support/instructor-tutor/instructor-management/modal/instructor-list-modal';
import {
  CategoryChoiceModal,
  CourseChoiceModal,
} from '@features/learning-operate/course/course-management';
import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import {
  Badge,
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  RadioGroupFormField,
  SplitPanel,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import {
  ChipListFormField,
  FormRow,
  FormRow2,
  SwitchFormField,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
  ThumbnailListFormField,
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupTabsChoiceModal,
} from '@shared/ui';
import { Course, CourseConfig } from '@types';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import { CourseStatsSummary } from '../../../-components/course-stats-summary/course-stats-summary';
import { PassOptionFormField } from '../../../-components/pass-option-form-field/pass-option-form-field';

const CourseDetailComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId }, ref) => {
    const { t } = useTranslation();
    const { showSaveComplete } = useModal();
    const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange } =
      useDynamicForm2();

    const { data: formData } = useFetchCourse(courseId);
    const { data: courseConfig } = useFetchCourseConfig({
      courseType: formData?.courseType,
      channelUuid: formData?.channelUuid,
    });
    const { mutate: updateCourse } = useUpdateCourse({
      onSuccess: async (response: any) => {
        console.log('useUpdateCourse :: onSuccess', response);
        await showSaveComplete();
        // router.navigate({
        //   to: '/learning/course',
        // });
      },
    });

    console.log('----- course-detail', { courseId });

    // 부모 컴포넌트에서 호출할 수 있는 메서드
    useImperativeHandle(ref, () => ({
      getValues: () => formDataToRequestData(formValues as Course),
      save: async () => {
        console.log('save');
        handleManualSubmit();
        return true;
      },
      delete: async () => {
        console.log('delete');
        return true;
      },
    }));

    useEffect(() => {
      console.log('CourseDetailComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(responseDataToFormData(formData, courseConfig));
      }
    }, [formData, courseConfig]);

    const handleManualSubmit = () => {
      // onSubmit은 폼 제출 핸들러를 생성하는 함수입니다
      const submitHandler = onSubmit((data) => {
        console.log('수동 제출 성공:', data);
        updateCourse(data as Course);
      });

      // 가짜 이벤트 객체를 생성해서 수동으로 호출
      const fakeEvent = {
        preventDefault: () => null,
      } as any;

      submitHandler(fakeEvent);
    };

    const handleSubmit = async (formData: any) => {
      console.log('handleSubmit', formData);
    };

    return (
      <form>
        {/* 과정 통계 요약 CourseStatsSummary*/}
        <CourseStatsSummary courseId={formData?.courseId} />

        <SplitPanel size={['auto', 40]} divider>
          <div>
            {/*기본정보*/}
            <FormSubTitle label={t('기본정보')} />
            {/*유형, 채널*/}
            <ContentsRow>
              {/*유형*/}
              <FormRow2
                provider={provider}
                name={'courseType'}
                label={'유형'}
                disabled
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
                disabled
                element={<TenantChannelDropdownFormField2 tenantId={-1} />}
              />
            </ContentsRow>
            {/*과정 사용*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'isUsed'}
                label={'과정 사용'}
                format={'boolean'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
                validation={{ required: true }}
              />
              {/*노출 기간*/}
              <FormRow2
                provider={provider}
                name={'courseValidityRange'}
                label={'노출 기간'}
                format={'object'}
                element={<DateRangePickerFormField />}
                validation={{ required: true }}
              />
            </ContentsRow>

            {/*공개대상*/}
            <FormSubTitle label={t('공개대상')} />
            {/*테넌트*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'tenantIds'}
                label={'테넌트'}
                format={'array'}
                element={
                  <TenantByRoleChannelCheckboxFormField channelUuid={getValues().channelUuid} />
                }
              />
            </ContentsRow>
            {/*카테고리*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'categories'}
                label={'카테고리'}
                format={'object'}
                element={
                  <ListModalSelectorFormField
                    deletable
                    modalConfig={() => ({
                      content: <CategoryChoiceModal tenantIds={getValues().tenantIds} />,
                      width: 'lg',
                    })}
                    transformModalData={(modalData: any[]) => {
                      return modalData?.map((d: any) => ({
                        categoryId: d.id,
                        categoryPath: d.fullPath,
                      }));
                    }}
                    listConfig={{
                      checkable: true,
                      deletable: true,
                      disabledActive: true,
                      labelField: 'categoryPath',
                      valueField: 'categoryId',
                      selectedNodeBeforeLabel: (
                        <Badge
                          option={{ label: '대표', value: '' }}
                          variant={'text'}
                          status="fill"
                        />
                      ),
                    }}
                    selectedValue={getValues()?.primaryCategoryId}
                    onSelected={(option: any) =>
                      onFormChange({ primaryCategoryId: option.categoryId })
                    }
                    actionNode={<Button variant="text" size="sm" label={t('추가')} />}
                  />
                }
              />
            </ContentsRow>
            {/*학습대상(유저그룹)*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'targetList'}
                format={'object'}
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
                      labelField: 'pathValue',
                      valueField: 'pathKey',
                      wordwrap: true,
                    }}
                    showAddButton
                  />
                }
              />
            </ContentsRow>

            {/*과정소개*/}
            <FormSubTitle label={t('과정소개')} />
            {/*언어*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'language'}
                label={'언어'}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
                    }}
                  />
                }
              />
            </ContentsRow>
            {/*과정명*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseName'}
                label={'과정명'}
                element={<Input maxLength={40} />}
              />
            </ContentsRow>
            {/*AI 과정 요약(AI 자동추출)*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseSummary'}
                label={'AI 과정 요약(AI 자동추출)'}
                element={<TextareaFormField maxLength={500} />}
              />
            </ContentsRow>
            {/*교육 내용*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseContent'}
                label={'교육내용'}
                element={<EditorFormField />}
              />
            </ContentsRow>
            {/* 난이도 */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'trainingLevelType'}
                label={'난이도'}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.TrainingLevelType'],
                    }}
                  />
                }
              />
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
                name={'연락처1'}
                label={'연락처'}
                element={
                  <>
                    <FormRow2
                      provider={provider}
                      name={'coordinatorTelCountryCode'}
                      element={
                        <DropdownFormField
                          optionsConfig={{
                            codeGroup: CODE_GROUP['cmmon.TelCountryCode'],
                          }}
                        />
                      }
                    />
                    <FormRow2 provider={provider} name={'coordinatorTelNo'} element={<Input />} />
                  </>
                }
              />
              {/*<FormRow2*/}
              {/*  provider={provider}*/}
              {/*  name={'coordinatorTelNo'}*/}
              {/*  label={'연락처'}*/}
              {/*  element={*/}
              {/*    <PhoneNumberFormField*/}
              {/*      fields={{ nationCode: 'coordinatorTelCountryCode', number: 'coordinatorTelNo' }}*/}
              {/*      phoneNumberConfig={{*/}
              {/*        options: [{ value: 'KOR_82', label: '+82' }],*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  }*/}
              {/*/>*/}
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
                name={'연락처2'}
                label={'연락처'}
                element={
                  <>
                    <FormRow2
                      provider={provider}
                      name={'operatorTelCountryCode'}
                      element={
                        <DropdownFormField
                          optionsConfig={{
                            codeGroup: CODE_GROUP['cmmon.TelCountryCode'],
                          }}
                        />
                      }
                    />
                    <FormRow2 provider={provider} name={'operatorTelNo'} element={<Input />} />
                  </>
                }
              />
              {/*<FormRow2*/}
              {/*  provider={provider}*/}
              {/*  name={'operatorTelNo'}*/}
              {/*  label={'연락처'}*/}
              {/*  element={*/}
              {/*    <PhoneNumberFormField*/}
              {/*      fields={{ nationCode: 'operatorTelCountryCode', number: 'operatorTelNo' }}*/}
              {/*      phoneNumberConfig={{*/}
              {/*        options: [{ value: 'KOR_82', label: '+82' }],*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  }*/}
              {/*/>*/}
              {/*이메일*/}
              <FormRow2
                provider={provider}
                name={'operatorEmail'}
                label={'이메일'}
                element={<Input />}
              />
              {/*운영자 ID - hidden */}
              <FormRow2 provider={provider} name={'operatorId'} type={'hidden'} value={''} />
            </ContentsRow>

            {/*게시*/}
            <FormSubTitle label={t('게시')} />
            {/*썸네일*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'thumbnailFileGroupUuid'}
                label={t('대표 이미지')}
                format={'string'}
                element={
                  <ThumbnailListFormField
                    uuidType={'group'}
                    uploadConfig={{
                      affairType: 'LMS',
                      s3Path: S3_PATH['upload/course/thumbnail'],
                    }}
                    selected={getValues()?.primaryThumbnailFileUuid}
                    onSelected={(selectedThumbnail1: string) =>
                      onFormChange({ primaryThumbnailFileUuid: selectedThumbnail1 })
                    }
                    // selected={selectedThumbnail1}
                    // onSelected={handleSelected}
                  />
                }
              />
            </ContentsRow>
            {/*태그*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'tagNames'}
                label={'태그'}
                format={'array'}
                element={
                  <ChipListFormField
                    chipListConfig={{
                      showInput: true,
                      labelField: 'tagName',
                      valueField: 'tagId',
                      wordwrap: true,
                    }}
                  />
                }
                validation={{ required: true }}
              />
            </ContentsRow>

            {/*수강신청*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isEnrollRequired'}
                label={'수강신청'}
                format={'boolean'}
                element={<SwitchFormField disabled={courseConfig?.enrollOption === 'IMPOSSIBLE'} />}
              />
            </ContentsRow>
            {/*승인 결재 라인, 정원*/}
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isEnrollRequired', value: true }]}
            >
              <ContentsRow>
                {/*승인 결재 라인*/}
                <FormRow2
                  provider={provider}
                  name={'approvalLineType'}
                  label={'승인 결재 라인'}
                  element={
                    <DropdownFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['pms.approval.ApprovalLineType'],
                      }}
                    />
                  }
                />
                {/*정원*/}
                <FormRow2
                  provider={provider}
                  name={'isMaxEnrollQuotaRestricted'}
                  label={'정원'}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                        optionsNode: [
                          {
                            value: true, // 사용
                            node: (
                              // 수강 신청 정원
                              <FormRow2
                                provider={provider}
                                name={'maxEnrollQuota'}
                                value={''}
                                element={<Input prefixText="정원" suffixText="명" />}
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
              </ContentsRow>
              {/*수강신청 대기, 차수 중복수강*/}
              <ContentsRow>
                {/*수강신청 대기*/}
                <FormRow2
                  provider={provider}
                  name={'waitListPickMethodType'}
                  label={'수강신청 대기'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['lms.course.WaitListPickMethodType'],
                        optionsNode: [
                          {
                            value: 'MANUAL', // 직접입력
                            node: (
                              // 수강 신청 최대 대기 인원
                              <FormRow2
                                provider={provider}
                                name={'maxWaitlistQuota'}
                                value={''}
                                element={<Input prefixText="대기 정원" suffixText="명" />}
                              />
                            ),
                          },
                        ],
                      }}
                    />
                  }
                />
                {/*차수 중복수강*/}
                <FormRow2
                  provider={provider}
                  name={'isDuplicateEnrollAllowed'}
                  label={'차수 중복수강'}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.possible'],
                      }}
                    />
                  }
                />
              </ContentsRow>
              {/*수강전 문의*/}
              <ContentsRow>
                {/*수강전 문의*/}
                <FormRow2
                  provider={provider}
                  name={'isPreEnrollQuestionAllowed'}
                  label={'수강전 문의'}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 더미 */}
                <FormRow2 provider={provider} name={'dummy'} element={<></>} />
              </ContentsRow>
            </FormDisplay>

            {/*이수기준*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isUsePassOption'}
                label={'이수기준'}
                format={'boolean'}
                element={<SwitchFormField disabled={courseConfig?.passOption === 'IMPOSSIBLE'} />}
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
              {/*이수기준 설정 */}
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name={'passOption'}
                  label={'이수기준 설정'}
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
                  label={'인정 학습시간'}
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
                                  element={<Input type={'number'} min={0} suffixText="회" />}
                                />
                                {/* // 인정학습시간(분) */}
                                <FormRow2
                                  provider={provider}
                                  name={'recognizedStudyMinutes'}
                                  element={<Input type={'number'} min={0} suffixText="분" />}
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
                  label={'학습 포인트'}
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
                                element={<Input type={'number'} min={0} suffixText="포인트" />}
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
                label={'학습환경'}
                format={'boolean'}
                element={
                  <SwitchFormField disabled={courseConfig?.learningEnvOption === 'IMPOSSIBLE'} />
                }
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
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
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
              </ContentsRow>
              {/* 복습 제한, 화면캡쳐 방지, 학습전 보안 서약 */}
              <ContentsRow>
                {/*복습 제한*/}
                <FormRow2
                  provider={provider}
                  name={'isReviewRestricted'}
                  label={'복습 제한'}
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
                {/*화면캡쳐 방지*/}
                <FormRow2
                  provider={provider}
                  name={'isCaptureBlockEnabled'}
                  label={'화면캡쳐 방지'}
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
                  label={'학습전 보안 서약'}
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
                label={'학습제어'}
                element={
                  <SwitchFormField
                    disabled={courseConfig?.learningControlOption === 'IMPOSSIBLE'}
                  />
                }
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
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 순차 학습  */}
                <FormRow2
                  provider={provider}
                  name={'isSequentialLearningRequired'}
                  label={'순차 학습'}
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
              {/* 동영상 탐색바 제한, 동영상 배속 제한 */}
              <ContentsRow>
                {/* 동영상 탐색바 제한  */}
                <FormRow2
                  provider={provider}
                  name={'isPlayerControlRestricted'}
                  label={'동영상 탐색바 제한'}
                  format={'boolean'}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
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
                {/* dummy */}
                <FormRow provider={provider} name={''} />
              </ContentsRow>
            </FormDisplay>

            {/*강사*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isInstructorAssigned'}
                label={'강사'}
                format={'boolean'}
                element={
                  <SwitchFormField disabled={courseConfig?.instructorOption === 'IMPOSSIBLE'} />
                }
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
                            value: 'MANUAL', // 직접입력
                            node: (
                              // 강사 직접입력
                              <FormRow2
                                provider={provider}
                                name={'instructorName'}
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
            </FormDisplay>

            {/*교재*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isTextbookProvided'}
                label={'교재'}
                format={'boolean'}
                element={
                  <SwitchFormField disabled={courseConfig?.textBookOption === 'IMPOSSIBLE'} />
                }
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

            {/*사전/연관학습*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isRelatedPrerequisiteCourseExisted'}
                label={'사전/연관학습'}
                format={'boolean'}
                element={
                  <SwitchFormField disabled={courseConfig?.relatedCourseOption === 'IMPOSSIBLE'} />
                }
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isRelatedPrerequisiteCourseExisted', value: true }]}
            >
              {/*사전 필수과정*/}
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name={'preRequisiteCourseList'}
                  label={'사전 필수과정'}
                  format={'array'}
                  element={
                    <ChipListModalSelectorFormField
                      modalConfig={{
                        content: (
                          <CourseChoiceModal
                            tenantIds={getValues()?.tenantIds}
                            channelUuid={getValues()?.channelUuid}
                          />
                        ),
                      }}
                      chipList={{
                        labelField: 'courseName',
                        valueField: 'courseId',
                        wordwrap: true,
                      }}
                      showAddButton
                    />
                  }
                />
              </ContentsRow>
              {/*연관 과정*/}
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name={'relatedCourseList'}
                  label={'연관 과정'}
                  format={'array'}
                  element={
                    <ChipListModalSelectorFormField
                      modalConfig={{
                        content: (
                          <CourseChoiceModal
                            tenantIds={getValues()?.tenantIds}
                            channelUuid={getValues()?.channelUuid}
                          />
                        ),
                      }}
                      chipList={{
                        labelField: 'courseName',
                        valueField: 'courseId',
                        wordwrap: true,
                      }}
                      showAddButton
                    />
                  }
                />
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
                label={'HMG 과정 데이터 표준 대분류'}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.HmgStandardMainCategory'],
                    }}
                  />
                }
              />
              {/* 중분류 */}
              <FormRow2
                provider={provider}
                name={'hmgStandardSubCategory'}
                label={'HMG 과정 데이터 표준 중분류'}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['lms.course.HmgStandardSubCategory'],
                    }}
                  />
                }
              />
            </ContentsRow>
            {/* 1인당 교육비, 고용보험 환급비용 */}
            <ContentsRow>
              {/* 1인당 교육비  */}
              <FormRow2
                provider={provider}
                name={'isUseTrainingCostPerPerson'}
                label={'1인당 교육비'}
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
                              element={<Input type={'number'} min={0} suffixText="원" />}
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
                label={'고용보험 환급비용'}
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
                              element={<Input type={'number'} min={0} suffixText="원" />}
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
                label={'숙박 여부'}
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
                label={'(테넌트) 전용'}
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
                  label={'사전 레벨테스트'}
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
                  label={'교재 배송지 수집'}
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
                  label={'튜터'}
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
                  label={'위탁 소유회사'}
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
            <h2>커리큘럼</h2>
          </div>
        </SplitPanel>
      </form>
    );
  },
);

export const CourseDetail = CourseDetailComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course, c: CourseConfig = {} as CourseConfig): Course => {
  return {
    ...d,
    tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    isLearnEnvEnabled: c.learningEnvOption !== 'IMPOSSIBLE', // 학습환경 설정 사용 여부
    isLearnControlEnabled: c.learningControlOption !== 'IMPOSSIBLE', // 학습제어 설정 사용 여부
    isUsePassOption: c.passOption !== 'IMPOSSIBLE', // 이수기준 설정 사용 여부
    isCommunicationToolEnabled: c.communicationOption !== 'IMPOSSIBLE', // 커뮤니티 및 공유설정 사용 여부
    isInstructorAssigned: c.instructorOption !== 'IMPOSSIBLE', // 강사 설정 사용 여부
    isTextbookProvided: c.textBookOption !== 'IMPOSSIBLE', // 교재 설정 사용 여부
    isRelatedPrerequisiteCourseExisted: c.relatedCourseOption !== 'IMPOSSIBLE', // 사전/연관학습 설정 사용 여부
    isUseOutsourcing: true, // 오토에버 위탁 전용 설정 여부 (CourseConfig 에 관리안함)
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
    courseValidityRange: [
      d.courseValidityStartDate, // 과정 유효 시작일
      d.courseValidityEndDate, // 과정 유효 종료일
    ],
    // tagNameArray: d.tagNames?.map((item) => item.value), // 태그
  };
};

/**
 * 과정 기본 정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component BasicInfo
 * @param {Course} d - 과정 기본 정보 폼 데이터
 * @returns {Course} 과정 기본 정보 요청 데이터
 */
export const formDataToRequestData = (d: Course) => {
  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 교육공간 > 차세데 학습학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 직적입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
  }

  // 카테고리 아이디 배열
  d.categoryIds = d.categories?.map((d: any) => d.categoryId);
  // 대표 카테고리
  // d.primaryCategoryId = d.categories?.[0]?.categoryId;
  // 학습대상-ID 배열
  d.targetListIds = d.targetList?.map((d: any) => d.id);

  // 담당자, 운영자 연락처 국가코드
  // d.coordinatorTelCountryCode = 'KOR_82';
  // d.operatorTelCountryCode = 'KOR_82';

  //사전 필수과정
  const preRequisiteCourseIds = d.preRequisiteCourseList
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);
  //연관 과정
  const relatedCourseIds = d.relatedCourseList
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);

  // 라디오 옵션 null 처리
  // 복습 제한 > 미사용
  if (d.isReviewRestricted === false) {
    d.maxReviewPeriodMonths = undefined; // 복습 제한 기간(개월)
  }

  // 1일 진도제한 > 미사용
  if (d.isDailyLearningProgressRestricted === false) {
    d.maxDailyLearningProgress = undefined; // 1일 진도제한(분)
  }

  // 인정 학습시간 > 학습시간
  if (d.recognizedStudyMinType === 'TIME') {
    d.recognizedStudyCycles = undefined; // 인정 학습 횟수
    d.recognizedStudyMinutes = undefined; // 인정 학습시간(분)
  }

  // 학습포인트 > 미사용
  if (d.isRecognizedStudyPoint === false) {
    d.recognizedStudyPoint = undefined; // 인정학습점수(학습포인트)
  }

  // 강사 > 강사선택
  if (d.instructorAssignType === 'REGISTERED') {
    d.instructorName = undefined; // 강사 직접입력
  }

  // 1인당 교육비 > 미사용
  if (d.isUseTrainingCostPerPerson === false) {
    d.trainingCostPerPerson = undefined; // 1인당 교육비(원)
  }

  // 고용보험 환급비용 > 미사용
  if (d.isUseEmploymentInsuranceRefund === false) {
    d.employmentInsuranceRefund = undefined; // 고용보험 환급비(원)
  }

  return {
    ...d,
    ...d.passOption, // 이수기준 설정
    preRequisiteCourseIds,
    relatedCourseIds,
    courseValidityStartDate: d.courseValidityRange?.[0], // 과정 유효 시작일
    courseValidityEndDate: d.courseValidityRange?.[1], // 과정 유효 종료일
    courseValidityStartHour: 0, // 과정 노출 시작 시각 (삭제 후 courseValidityStartDate에 통합 예정)
    courseValidityEndHour: 23, // 과정 노출 종료 시각 (삭제 후 courseValidityEndDate에 통합 예정)
    // thumbnailFileGroupUuid: '1', // 썸네일 이미지 Group UUID
    // primaryThumbnailFileUuid: '1', // 대표 썸네일 이미지 UUID
    // tagNames: d.tagNameArray?.map((item) => ({ value: item })), // 태그
  };
};
