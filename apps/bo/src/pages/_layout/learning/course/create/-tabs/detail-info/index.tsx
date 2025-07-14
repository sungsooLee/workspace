import { DropdownFormField, FormDisplay } from '@features/form';
import { CourseChoiceModal } from '@features/learning-operate/course/course-management';
import { InstructorListPopup } from '@features/platform/instructor/management/modal/instructor-list-modal';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import {
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui';
import { FormRow, FormRow2, SwitchFormField } from '@shared/ui';
import { Course, CourseConfig } from '@types';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { PassOptionFormField } from '../../../-common/pass-option-form-field';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';

const DetailInfoComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, onFormValid, formState, updateFormData } = useDynamicForm2();

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = formDataToRequestData(getValues() as Course);
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
      getValues: () => formDataToRequestData(getValues() as Course),
    }));

    useEffect(() => {
      console.log('DetailInfoComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(responseDataToFormData(formData, courseConfig));
      }
    }, [formData, courseConfig]);

    return (
      <div>
        {/*학습환경*/}
        <ContentsRow type={'horizontal'} titleMode>
          <FormRow2
            provider={provider}
            name={'isLearnEnvEnabled'}
            label={'학습환경'}
            element={<SwitchFormField disabled={courseConfig.learningEnvOption === 'IMPOSSIBLE'} />}
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
        </FormDisplay>
        {/*학습제어*/}
        <ContentsRow type={'horizontal'} titleMode>
          <FormRow2
            provider={provider}
            name={'isLearnControlEnabled'}
            label={'학습제어'}
            element={
              <SwitchFormField disabled={courseConfig.learningControlOption === 'IMPOSSIBLE'} />
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
          </ContentsRow>
          {/* 동영상 탐색바 제한, 동영상 배속 제한 */}
          <ContentsRow>
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
        {/*이수기준*/}
        <ContentsRow type={'horizontal'} titleMode>
          <FormRow2
            provider={provider}
            name={'isUsePassOption'}
            label={'이수기준'}
            element={<SwitchFormField disabled={courseConfig.passOption === 'IMPOSSIBLE'} />}
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
            {/* 학습 포인트 */}
            <FormRow2
              provider={provider}
              name={'isRecognizedStudyPoint'}
              label={'학습 포인트'}
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
          {/*이수기준 설정 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'passOption'}
              label={'이수기준 설정'}
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
            {/* dummy */}
            <FormRow provider={provider} name={''} />
            {/* dummy */}
            <FormRow provider={provider} name={''} />
          </ContentsRow>
        </FormDisplay>
        {/*커뮤니티 및 공유설정*/}
        <ContentsRow type={'horizontal'} titleMode>
          <FormRow2
            provider={provider}
            name={'isCommunicationToolEnabled'}
            label={'커뮤니티 및 공유설정'}
            element={
              <SwitchFormField disabled={courseConfig.communicationOption === 'IMPOSSIBLE'} />
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
              label={'공지사항(새소식)'}
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
              name={'isQnaBoardEnabled'}
              label={'학습창 댓글'}
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
              label={'커뮤니티'}
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
              label={'과정공유'}
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
            label={'강사'}
            element={<SwitchFormField disabled={courseConfig.instructorOption === 'IMPOSSIBLE'} />}
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
            element={<SwitchFormField disabled={courseConfig.textBookOption === 'IMPOSSIBLE'} />}
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
            element={
              <SwitchFormField disabled={courseConfig.relatedCourseOption === 'IMPOSSIBLE'} />
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
            name={'employmentInsuranceRefund'}
            label={'고용보험 환급비용'}
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
              label={'사전 레벨테스트'}
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
            <FormRow2 provider={provider} name={'tutorId'} type={'hidden'} />
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
            <FormRow2 provider={provider} name={'outsourcingCompanyId'} type={'hidden'} />
          </ContentsRow>
        </FormDisplay>
      </div>
    );
  },
);

export const DetailInfo = DetailInfoComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course, c: CourseConfig): Course => {
  return {
    ...d,
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
  };
};

/**
 * 상세정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component Curriculum
 * @param {Course} d - 상세정보 폼 데이터
 * @returns {Course} 상세정보 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
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
  };
};
