import { DropdownFormField } from '@features/form';
import { FormDisplay } from '@features/form/ui/form-display';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, Input, RadioGroupFormField } from '@learnway/ui';
import { FormRow2, SwitchFormField } from '@shared/ui';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseCreateSubPage } from '../../../../hooks/use-course-create-sub-page';
import { CourseTabBaseProps } from '../../../../types/type';

const CourseRegistrationComponent = forwardRef<HTMLElement, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider } = form;

  const { courseConfig } = useCourseCreateSubPage(form);

  return (
    <div>
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
      <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollRequired', value: true }]}>
        <ContentsRow>
          {/*승인*/}
          <FormRow2
            provider={provider}
            name={'approvalLineType'}
            label={'승인 결재 라인'}
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
            label={'정원'}
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
            validation={{ required: true }}
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
    </div>
  );
});

export const CourseRegistration = CourseRegistrationComponent;
