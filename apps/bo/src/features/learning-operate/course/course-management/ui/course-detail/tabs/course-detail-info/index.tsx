import { DateRangePickerFormField, DropdownFormField, FormDisplay } from '@features/form';
import { InstructorListPopup } from '@features/learning-operate-support/instructor-tutor/instructor-management';
import {
  CategoryChoiceModal,
  CourseChoiceModal,
  CourseStatsSummary,
} from '@features/learning-operate/course/course-management';
import { CODE_GROUP, S3_PATH } from '@learnway/hooks';
import { Badge } from '@learnway/ui/badge';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { SplitPanel } from '@learnway/ui/elements';
import {
  ChipListModalSelectorFormField,
  EditorFormField,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import {
  ChipListFormField,
  FormRow,
  FormRow2,
  PassOptionFormField,
  SwitchFormField,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
  ThumbnailListFormField,
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupChoiceModal,
  UserGroupTabsChoiceModal,
} from '@shared/ui';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseDetailSubCourse } from '../../../../hooks/use-course-detail-sub-course';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../../types/type';

const DetailInfoComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  (_, ref) => {
    const { t } = useTranslation();
    const { openModal } = useModal();

    const { provider, getValues, onFormChange, courseConfig, courseId } =
      useCourseDetailSubCourse();

    return (
      <form>
        {/* 과정 통계 요약 CourseStatsSummary*/}
        <CourseStatsSummary courseId={courseId} />

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
                label={t('유형')}
                disabled
                validation={{ required: true }}
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
                label={t('채널')}
                disabled
                validation={{ required: true }}
                element={<TenantChannelDropdownFormField2 tenantId={-1} />}
              />
            </ContentsRow>
            {/*과정 사용*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'isUsed'}
                label={t('과정 사용')}
                format={'boolean'}
                validation={{ required: true }}
                element={
                  <RadioGroupFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['mock.options.use'],
                    }}
                  />
                }
              />
              {/*노출 기간*/}
              <FormRow2
                provider={provider}
                name={'courseValidityRange'}
                label={t('노출 기간')}
                format={'object'}
                validation={{ required: true }}
                element={<DateRangePickerFormField displayType={'day-time-h'} />}
              />
            </ContentsRow>

            {/*공개대상*/}
            <FormSubTitle label={t('공개대상')} />
            {/*테넌트*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'tenantIds'}
                label={t('테넌트')}
                format={'array'}
                validation={{ required: true }}
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
                label={t('카테고리')}
                format={'object'}
                validation={{ required: true }}
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

            {/*과정소개*/}
            <FormSubTitle label={t('과정소개')} />
            {/*언어*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'language'}
                label={t('언어')}
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
            {/*과정명*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseName'}
                label={t('과정명')}
                validation={{ required: true }}
                element={<Input maxLength={40} />}
              />
            </ContentsRow>
            {/*AI 과정 요약(AI 자동추출)*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseSummary'}
                label={t('AI 과정 요약(AI 자동추출)')}
                element={<TextareaFormField maxLength={500} />}
              />
            </ContentsRow>
            {/*교육 내용*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseContent'}
                label={t('교육내용')}
                validation={{ required: true }}
                element={<EditorFormField />}
              />
            </ContentsRow>
            {/* 난이도 */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'trainingLevelType'}
                label={t('난이도')}
                validation={{ required: true }}
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
                label={t('교육공간')}
                validation={{ required: true }}
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
                label={t('담당자')}
                validation={{ required: true }}
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      content: <UserChoiceModal />,
                    }}
                    transformModalData={(data: any) => ({
                      coordinatorUuid: data.uuid,
                      coordinatorName: `${data.name}/${data?.dept?.deptName}`,
                      coordinatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                      coordinatorTelNo: data.phoneNumber,
                      coordinatorEmail: data.email,
                    })}
                  />
                }
              />
              {/*연락처*/}
              <FormRow2
                provider={provider}
                name={'coordinatorTelNo'}
                label={t('연락처')}
                validation={{ required: true }}
                element={<Input />}
              />
              {/*이메일*/}
              <FormRow2
                provider={provider}
                name={'coordinatorEmail'}
                label={t('이메일')}
                validation={{ required: true }}
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
                label={t('운영자')}
                validation={{ required: true }}
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      content: <UserChoiceModal />,
                    }}
                    transformModalData={(data: any) => ({
                      operatorUuid: data.uuid,
                      operatorName: `${data.name}/${data?.dept?.deptName}`,
                      operatorDeptName: `${data.name}/${data?.dept?.deptName}`,
                      operatorTelNo: data.phoneNumber,
                      operatorEmail: data.email,
                    })}
                  />
                }
              />
              {/*연락처*/}
              <FormRow2
                provider={provider}
                name={'operatorTelNo'}
                label={t('연락처')}
                validation={{ required: true }}
                element={<Input />}
              />
              {/*이메일*/}
              <FormRow2
                provider={provider}
                name={'operatorEmail'}
                label={t('이메일')}
                validation={{ required: true }}
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
                validation={{ required: true }}
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
                  />
                }
              />
            </ContentsRow>
            {/*태그*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'tagNames'}
                label={t('태그')}
                format={'array'}
                validation={{ required: true }}
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
              />
            </ContentsRow>

            {/*수강신청*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isEnrollRequired'}
                label={t('수강신청')}
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
                  label={t('승인 결재 라인')}
                  validation={{ required: true }}
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
                  label={t('정원')}
                  format={'boolean'}
                  validation={{ required: true }}
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
                                element={<Input prefixText={t('정원')} suffixText={t('명')} />}
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
                  label={t('수강신청 대기')}
                  validation={{ required: true }}
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
                                element={<Input prefixText={t('대기 정원')} suffixText={t('명')} />}
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
                  label={t('차수 중복수강')}
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
                  label={t('수강전 문의')}
                  format={'boolean'}
                  // validation={{ required: true }}
                  element={
                    <RadioGroupFormField
                      optionsConfig={{
                        codeGroup: CODE_GROUP['mock.options.use'],
                      }}
                    />
                  }
                />
                {/* 더미 */}
                <FormRow2 provider={provider} name={'dummy'} />
              </ContentsRow>
            </FormDisplay>

            {/*이수기준*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isUsePassOption'}
                label={t('이수기준')}
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
                  label={t('수료증 제공')}
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
                            value: 'TIME', // 학습시간
                            node: (
                              // 분
                              <FormRow2
                                provider={provider}
                                name={'recognizedStudyMinutes'}
                                format={'number'}
                                element={<Input type={'number'} min={0} suffixText={t('분')} />}
                              />
                            ),
                          },
                          {
                            value: 'COUNT_TIME', // 회수 및 학습시간
                            node: (
                              <>
                                {/* // 인정 학습 횟수 */}
                                <FormRow2
                                  provider={provider}
                                  name={'recognizedStudyCycles'}
                                  format={'number'}
                                  element={<Input type={'number'} min={0} suffixText={t('회')} />}
                                />
                                {/* // 인정학습시간(분) */}
                                <FormRow2
                                  provider={provider}
                                  name={'recognizedStudyMinutes'}
                                  format={'number'}
                                  element={<Input type={'number'} min={0} suffixText={t('분')} />}
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
                                element={<Input type={'number'} min={0} suffixText={t('포인트')} />}
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
              </ContentsRow>
              {/* 복습 제한, 화면캡쳐 방지, 학습전 보안 서약 */}
              <ContentsRow>
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
                                  <Input
                                    type={'number'}
                                    min={0}
                                    prefixText={'학습 종료일 기준'}
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
              </ContentsRow>
              {/* 동영상 탐색바 제한, 동영상 배속 제한 */}
              <ContentsRow>
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

            {/*강사*/}
            <ContentsRow type={'horizontal'} titleMode>
              <FormRow2
                provider={provider}
                name={'isInstructorAssigned'}
                label={t('강사')}
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
                  label={t('강사')}
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
                label={t('교재')}
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
                  label={t('교재명')}
                  element={<Input />}
                />
                {/*교재비*/}
                <FormRow2
                  provider={provider}
                  name={'textbookFee'}
                  label={t('교재비')}
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
                label={t('사전/연관학습')}
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
                  label={t('사전 필수과정')}
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
                  label={t('연관 과정')}
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
                label={t('HMG 과정 데이터 표준 대분류')}
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
                label={t('HMG 과정 데이터 표준 중분류')}
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
            <h2>커리큘럼</h2>
          </div>
        </SplitPanel>
      </form>
    );
  },
);

export const CourseDetailInfo = DetailInfoComponent;
