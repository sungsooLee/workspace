import { DropdownFormField, FormDisplay } from '@features/form';
import { InstructorListPopup } from '@features/learning-operate-support/instructor-tutor/instructor-management/modal/instructor-list-modal';
import { CourseChoiceModal } from '@features/learning-operate/course/course-management';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { SplitPanel } from '@learnway/ui/elements';
import {
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  InputModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui/form-field';
import { FormRow, FormRow2, PassOptionFormField, SwitchFormField } from '@shared/ui';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseCreateSubPage } from '../../../../hooks/use-course-create-sub-page';
import { CourseTabBaseProps } from '../../../../types/type';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';

const DetailInfoComponent = forwardRef<HTMLElement, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider, getValues, watch } = form;

  const { courseConfig } = useCourseCreateSubPage(form);

  const channelUuid = watch('channelUuid');
  const courseType = watch('courseType');

  console.log('----- basic', {
    channelUuid,
    courseType,
    values: getValues(),
  });

  return (
    <div>
      {/*학습환경*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isLearnEnvEnabled'}
          label={t('학습환경')}
          format={'boolean'}
          element={<SwitchFormField disabled={courseConfig?.learningEnvOption === 'IMPOSSIBLE'} />}
        />
      </ContentsRow>
      {/* 기기 제한, 네트워크 제한, 학습시간 제한 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isLearnEnvEnabled', value: true }]}>
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
            <SwitchFormField disabled={courseConfig?.learningControlOption === 'IMPOSSIBLE'} />
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
                              prefixText={t('하루 기준')}
                              suffixText={'%'}
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
      <FormDisplay provider={provider} dependencies={[{ name: 'isUsePassOption', value: true }]}>
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
                        <SplitPanel gap={10}>
                          {/* 인정 학습 횟수 */}
                          <FormRow2
                            provider={provider}
                            name={'recognizedStudyCycles'}
                            format={'number'}
                            element={<Input type={'number'} min={0} suffixText={t('회')} />}
                          />
                          {/* 인정학습시간(분) */}
                          <FormRow2
                            provider={provider}
                            name={'recognizedStudyMinutes'}
                            format={'number'}
                            element={<Input type={'number'} min={0} suffixText={t('분')} />}
                          />
                        </SplitPanel>
                      ),
                    },
                  ],
                }}
              />
            }
          />
        </ContentsRow>
      </FormDisplay>

      {/*커뮤니티 및 공유설정*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isCommunicationToolEnabled'}
          label={t('커뮤니티 및 공유설정')}
          format={'boolean'}
          element={
            <SwitchFormField disabled={courseConfig?.communicationOption === 'IMPOSSIBLE'} />
          }
        />
      </ContentsRow>
      {/* 커뮤니티 및 공유 설정 */}
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCommunicationToolEnabled', value: true }]}
      >
        {/* 공지사항(새소식), 학습창 댓글 */}
        <ContentsRow>
          {/* 공지사항(새소식) */}
          <FormRow2
            provider={provider}
            name={'isNoticeEnabled'}
            label={t('공지사항(새소식)')}
            format={'boolean'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 학습창 댓글 */}
          <FormRow2
            provider={provider}
            name={'isReplyEnabled'}
            label={t('학습창 댓글')}
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
          <FormRow2
            provider={provider}
            name={'communityList'}
            label={t('커뮤니티')}
            format={'array'}
            type={'array'}
            element={
              <CheckboxGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CommunityType'],
                }}
              />
            }
          />
          <FormRow2
            provider={provider}
            name={'isSharingAllowed'}
            label={t('과정공유')}
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

      {/*강사*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isInstructorAssigned'}
          label={t('강사')}
          format={'boolean'}
          element={<SwitchFormField disabled={courseConfig?.instructorOption === 'IMPOSSIBLE'} />}
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
                      value: 'REGISTERED', // 강사선택
                      node: (
                        // 강사 직접입력
                        <FormRow2
                          provider={provider}
                          name={'instructorName'}
                          label={''}
                          element={
                            <InputModalSelectorFormField
                              modalConfig={{
                                content: <InstructorListPopup />,
                              }}
                              transformModalData={(modalData: any) => {
                                return {
                                  instructorId: modalData.instructorId,
                                  instructorName: modalData.instructorName,
                                };
                              }}
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
          {/* 강사 ID */}
          <FormRow2 provider={provider} name={'instructorId'} format={'number'} type={'hidden'} />
        </ContentsRow>
      </FormDisplay>

      {/*교재*/}
      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isTextbookProvided'}
          label={t('교재')}
          format={'boolean'}
          element={<SwitchFormField disabled={courseConfig?.textBookOption === 'IMPOSSIBLE'} />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isTextbookProvided', value: true }]}>
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
            element={<Input prefixText={t('1인당')} suffixText={t('원')} />}
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
                  width: 'xl',
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
                  width: 'xl',
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
                        element={<Input type={'number'} min={0} suffixText={t('원')} />}
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
                        element={<Input type={'number'} min={0} suffixText={t('원')} />}
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
      <FormDisplay provider={provider} dependencies={[{ name: 'isUseOutsourcing', value: true }]}>
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
        </ContentsRow>
      </FormDisplay>
    </div>
  );
});

export const DetailInfo = DetailInfoComponent;
