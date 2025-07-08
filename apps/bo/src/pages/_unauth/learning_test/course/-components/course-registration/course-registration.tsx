import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, Input, RadioGroupFormField } from '@learnway/ui';
import { DropdownFormField } from '@features/form';
import { FormRow2, SwitchFormField } from '@shared/ui';
import { useTranslation } from 'react-i18next';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { FormDisplay } from '@features/form/ui/form-display';
import { CourseTabBaseProps, TabFormRef } from '../../-common/type';
import { Course } from '@types';

const CourseRegistrationComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, updateFormData, onFormValid, formState } = useDynamicForm2({
      builders: [],
    });

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = formDataToRequestData(getValues());
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
      getValues: () => {
        console.log('getValues', getValues());
        return getValues();
      },
    }));

    useEffect(() => {
      console.log('CourseRegistrationComponent init', formData);
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(formData);
      }
    }, [formData]);

    console.log('CourseRegistrationComponent initialData', getValues());

    return (
      <div>
        {/*수강신청*/}
        {/* <FormSubTitle label={t('수강신청')} /> */}
        <ContentsRow type={'horizontal'} titleMode>
          <FormRow2
            provider={provider}
            name={'isEnrollRequired'}
            label={'수강신청'}
            element={<SwitchFormField disabled={courseConfig.enrollOption === 'IMPOSSIBLE'} />}
          />
        </ContentsRow>
        {/*승인 결재 라인, 정원*/}
        <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollRequired', value: true }]}>
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
      </div>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;

/**
 * 수강신청 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component CourseRegistration
 * @param {Course} d - 수강신청 폼 데이터
 * @returns {Course} 수강신청 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
  // 정원 > 미사용
  if (d.isMaxEnrollQuotaRestricted === false) {
    d.maxEnrollQuota = undefined; // 수강 신청 정원
  }

  // 수강신청 대기 > 미사용
  if (d.waitListPickMethodType === 'NONE') {
    d.maxWaitlistQuota = undefined; // 수강 신청 최대 대기 인원
  }
  // 수강신청 대기 > 자동 모드
  else if (d.waitListPickMethodType === 'AUTO') {
    d.maxWaitlistQuota = undefined; // 수강 신청 최대 대기 인원
  }

  // 리턴
  return d;
};
