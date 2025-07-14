import { DropdownFormField } from '@features/form';
import { CategoryChoiceModal } from '@features/learning-operate/course/course-management';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  PhoneNumberFormField,
  RadioGroupFormField,
  SplitPanel,
} from '@learnway/ui';
import {
  FormRow2,
  TenantByRoleChannelCheckboxFormField,
  TenantChannelDropdownFormField2,
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupTabsChoiceModal,
} from '@shared/ui';
import { Course } from '@types';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';
import { CourseStatsSummary } from '../../../-components/course-stats-summary/course-stats-summary';

const CourseDetailComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, onConfigPropChange, data: { formData, courseConfig, isSaved } }, ref) => {
    const { t } = useTranslation();

    const { provider, getValues, updateFormData, onFormValid, formState, watch } =
      useDynamicForm2();

    const channelUuid = watch('channelUuid');
    const courseType = watch('courseType');

    console.log('----- basic', { formData, courseConfig, channelUuid, courseType, isSaved });

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
      console.log('CourseDetailComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(responseDataToFormData(formData));
      }
    }, [formData]);

    // 유형과 채널이 모두 변경되었을 때 상위 컴포넌트에 알림
    useEffect(() => {
      const hasProp = courseType && channelUuid;
      const isChanged = formData.courseType !== courseType || formData.channelUuid !== channelUuid;
      if (hasProp && isChanged) {
        console.log('유형과 채널 변경됨:', { courseType, channelUuid });
        // 상위 컴포넌트에 변경 알림
        onConfigPropChange?.({ courseType, channelUuid });
      }
    }, [courseType, channelUuid, onConfigPropChange]);

    return (
      <div>
        {/* 과정 통계 요약 CourseStatsSummary*/}
        <CourseStatsSummary courseId={formData.courseId} />

        <SplitPanel size={['auto', 440]} divider>
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
                element={<TenantChannelDropdownFormField2 tenantId={-1} />}
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
                        categoryPath: d.path,
                      }));
                    }}
                    list={{
                      labelField: 'categoryPath',
                      valueField: 'categoryId',
                    }}
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
                      labelField: 'name',
                      valueField: 'name',
                      wordwrap: true,
                    }}
                    showAddButton
                    // transformModalData={(data: any) => console.log('data', data)}
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
            {/*교육 내용*/}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'courseContent'}
                label={'교육내용'}
                element={<EditorFormField />}
              />
            </ContentsRow>
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
                name={'coordinatorTelNo'}
                label={'연락처'}
                element={
                  <PhoneNumberFormField
                    fields={{ nationCode: 'coordinatorTelCountryCode', number: 'coordinatorTelNo' }}
                    phoneNumberConfig={{
                      options: [{ value: 'KOR_82', label: '+82' }],
                    }}
                  />
                }
              />
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
                name={'operatorTelNo'}
                label={'연락처'}
                element={
                  <PhoneNumberFormField
                    fields={{ nationCode: 'operatorTelCountryCode', number: 'operatorTelNo' }}
                    phoneNumberConfig={{
                      options: [{ value: 'KOR_82', label: '+82' }],
                    }}
                  />
                }
              />
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
          </div>
          {/* 커리큘럼 */}
          <div>
            <h2>커리큘럼</h2>
          </div>
        </SplitPanel>
      </div>
    );
  },
);

export const CourseDetail = CourseDetailComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course): Course => {
  return {
    ...d,
    // primaryCategoryId: 1, // 서버에서 받으면 삭제
    // categoryIds: d?.categories?.map((d: any) => d.categoryId), // 카테고리 아이디
    // tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    targetList: d?.targetList?.map((d: any) => ({
      ...d,
      name: d?.combiners?.[0]?.combineValue,
    })),
    // 카테고리 팝업 에러나서 임시 설정
    // categories: [
    //   {
    //     categoryId: 11,
    //     name: '1-1',
    //     categoryCode: 'category11',
    //     categoryContent: '',
    //     categoryPath: 'ROOT>한글명-CATE00011>1-1',
    //     isPrimary: false,
    //     tenantIds: [2],
    //   },
    // ],
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
  d.primaryCategoryId = d.categories?.[0]?.categoryId;
  // 학습대상-ID 배열
  d.targetListIds = d.targetList?.map((d: any) => d.id);

  // 담당자, 운영자 연락처 국가코드
  d.coordinatorTelCountryCode = 'KOR_82';
  d.operatorTelCountryCode = 'KOR_82';

  return d;
};
