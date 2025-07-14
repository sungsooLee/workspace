import { IcoMinus, IcoPlus } from '@learnway/icons';
import { Button, SplitPanel, TreeBox, TreeContainer } from '@learnway/ui';
import { FormSubTitle } from '@shared/ui';
import { Course } from '@types';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';
import { useDynamicForm2 } from '@learnway/hooks';

const CurriculumComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, updateFormData } =
      useDynamicForm2();

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
      console.log('curriculumComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(responseDataToFormData(formData));
      }
    }, [formData]);

    return (
      <div>
        {/*대표커리큘럼설정*/}
        <FormSubTitle
          label={t('대표 커리큘럼 설정')}
          lineType={'dark'}
          actionNode={<Button variant="text" size="sm" label={t('미리보기')} />}
        />
        {/* 트리 */}
        <SplitPanel divider>
          <div>
            <TreeContainer>
              <TreeBox
                data={[]}
                treeId={'menu-tree'}
                title={'목차'}
                customButtonNode={
                  <>
                    <Button variant="text" size="sm" label={t('불러오기')} />
                    <Button
                      variant="text"
                      size="sm"
                      label={t('신규등록')}
                      icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
                    />
                  </>
                }
              />
            </TreeContainer>
          </div>
          <div>
            <FormSubTitle
              label={t('상세정보')}
              lineType={'dark'}
              actionNode={
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('LABEL.grid.header.remove', '삭제')}
                    icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
                  />
                  <Button variant="save" size="sm" label={t('저장')} />
                </>
              }
            />
          </div>
        </SplitPanel>
      </div>
    );
  },
);

export const Curriculum = CurriculumComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (response: Course): Course => {
  // 리턴
  return response;
};

/**
 * 상세정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component Curriculum
 * @param {Course} d - 상세정보 폼 데이터
 * @returns {Course} 상세정보 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
  return {
    ...d,
  };
};
