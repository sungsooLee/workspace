import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { RadioGroupFormField } from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { DropdownFormField, FormDisplay, FormRow2, SwitchFormField } from '@shared/ui/form';
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
          label={t('수강신청')}
          format={'boolean'}
          element={<SwitchFormField disabled={courseConfig?.enrollOption !== 'OPTIONAL'} />}
        />
      </ContentsRow>
      {/*승인 결재 라인, 정원*/}
      <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollRequired', value: true }]}>
        <ContentsRow>
          {/*승인*/}
          <FormRow2
            provider={provider}
            name={'approvalLineType'}
            label={t('승인 결재 라인')}
            validation={{ required: true, format: 'string' }}
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
            validation={{ required: true, format: 'boolean' }}
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
            validation={{ required: true, format: 'string' }}
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
            validation={{ required: true, format: 'boolean' }}
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
            validation={{ required: true, format: 'boolean' }}
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
