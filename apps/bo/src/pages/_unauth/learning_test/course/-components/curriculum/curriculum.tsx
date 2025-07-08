import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormSubTitle } from '@shared/ui';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SplitPanel, TreeBox, TreeContainer } from '@learnway/ui';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import { CourseTabBaseProps, TabFormRef } from '../../-common/type';
import { Course } from '@types';

const CurriculumComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, updateFormData } =
      useDynamicForm(formConfig);

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
      console.log('curriculumComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(formData);
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
 * 커리큘럼 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component Curriculum
 * @param {Course} d - 커리큘럼 폼 데이터
 * @returns {Course} 커리큘럼 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 차세데 학습학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 직적입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
  }
  return d;
};

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
