import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormSubTitle } from '@shared/ui';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TabFormRef } from '../common/tab-form-ref';
import { SplitPanel } from '@learnway/ui';

interface curriculumProps {
  dummy?: any;
  // dynamicForm: UseDynamicFormResult;
  initialData?: any;
}

const CurriculumComponent = forwardRef<TabFormRef, curriculumProps>(
  ({ dummy, initialData }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, fetchData } =
      useDynamicForm(formConfig);

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = getValues();
        const errors = formState.errors;

        return {
          isValid,
          data: isValid ? data : undefined,
          errors: isValid ? undefined : errors,
        };
      },
    }));

    useEffect(() => {
      console.log('curriculumComponent init');
      // 초기 데이터가 있으면 설정
      if (initialData) {
        fetchData(initialData);
      }
    }, [initialData]);

    return (
      <div>
        {/*대표커리큘럼설정*/}
        <FormSubTitle label={t('대표 커리큘럼 설정')} lineType={'dark'} />
        {/* 트리 */}
        <SplitPanel>
          <div>LEFT</div>
          <div>RIGHT</div>
        </SplitPanel>
      </div>
    );
  },
);

export const Curriculum = CurriculumComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    // 승인 결재 라인
    {
      name: '승인 결재 라인',
      type: 'custom',
      label: '승인 결재 라인',
      format: 'string',
      value: '',
    },
    // 정원
    {
      name: '정원',
      type: 'custom',
      label: '정원',
      format: 'string',
      value: '',
    },
    // 수강신청 대기
    {
      name: '수강신청 대기',
      type: 'custom',
      label: '수강신청 대기',
      format: 'string',
      value: '',
    },
    // 차수 중복수강
    {
      name: '차수 중복수강',
      type: 'custom',
      label: '차수 중복수강',
      format: 'string',
      value: '',
    },
    // 사전 레벨테스트
    {
      name: '사전 레벨테스트',
      type: 'custom',
      label: '사전 레벨테스트',
      format: 'string',
      value: '',
    },
    // 교재 배송지 수집
    {
      name: '교재 배송지 수집',
      type: 'custom',
      label: '교재 배송지 수집',
      format: 'string',
      value: '',
    },
  ],
  // validator: {
  //   '승인 결재 라인': {
  //     format: 'string',
  //     required: true,
  //   },
  //   정원: {
  //     format: 'string',
  //     required: true,
  //   },
  //   '수강신청 대기': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '차수 중복수강': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '사전 레벨테스트': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '교재 배송지 수집': {
  //     format: 'string',
  //     required: true,
  //   },
  // },
};
