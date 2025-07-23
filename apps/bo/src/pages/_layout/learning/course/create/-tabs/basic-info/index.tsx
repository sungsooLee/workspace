import { DropdownFormField } from '@features/form';
import { CategoryChoiceModal } from '@features/learning-operate/course/course-management';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import {
  Badge,
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  FormSubTitle,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  RadioGroupFormField,
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
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, CourseTabFormRef } from '../../../-common/type';
import { useCourseCreateSubPage } from '../../../-hooks/use-course-create-sub-page';

const BasicInfoComponent = forwardRef<CourseTabFormRef, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider, getValues, watch, onFormChange } = form;

  const { isUpdateMode, courseConfig } = useCourseCreateSubPage(form);

  const channelUuid = watch('channelUuid');
  const courseType = watch('courseType');

  console.log('----- basic ..', {
    channelUuid,
    courseType,
    values: getValues(),
  });

  return (
    <form>
      {/*기본정보*/}
      <FormSubTitle label={t('기본정보')} />
      {/*유형, 채널*/}
      <ContentsRow>
        {/*유형*/}
        <FormRow2
          provider={provider}
          name={'courseType'}
          label={'유형'}
          disabled={isUpdateMode}
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
          label={'채널'}
          disabled={isUpdateMode}
          validation={{ required: true }}
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
          format={'array'}
          validation={{ required: true }}
          element={<TenantByRoleChannelCheckboxFormField channelUuid={getValues().channelUuid} />}
        />
      </ContentsRow>
      {/*카테고리*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'categories'}
          label={'카테고리'}
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
                  <Badge option={{ label: '대표', value: '' }} variant={'text'} status="fill" />
                ),
              }}
              selectedValue={getValues()?.primaryCategoryId}
              onSelected={(option: any) => onFormChange({ primaryCategoryId: option.categoryId })}
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
                labelField: 'pathValue',
                valueField: 'pathKey',
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
          label={'과정명'}
          validation={{ required: true }}
          element={<Input maxLength={40} />}
        />
      </ContentsRow>
      {/*교육 내용*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'courseContent'}
          label={'교육내용'}
          validation={{ required: true }}
          element={<EditorFormField />}
        />
      </ContentsRow>
      {/* 난이도 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'trainingLevelType'}
          label={'난이도'}
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
          label={'교육공간'}
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
          label={'담당자'}
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <UserChoiceModal />,
              }}
              transformModalData={(data: any) => ({
                coordinatorUuid: data.uuid,
                coordinatorName: data.uuid ? `${data.name}/${data?.dept?.deptName}` : '',
                coordinatorDeptName: data.uuid ? `${data.name}/${data?.dept?.deptName}` : '',
              })}
            />
          }
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'연락처1'}
          label={'연락처'}
          element={
            <>
              <FormRow2
                provider={provider}
                name={'coordinatorTelCountryCode'}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['cmmon.TelCountryCode'],
                    }}
                  />
                }
              />
              <FormRow2 provider={provider} name={'coordinatorTelNo'} element={<Input />} />
            </>
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
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <UserChoiceModal />,
              }}
              transformModalData={(data: any) => ({
                operatorUuid: data.uuid,
                operatorName: data.uuid ? `${data.name}/${data?.dept?.deptName}` : '',
                operatorDeptName: data.uuid ? `${data.name}/${data?.dept?.deptName}` : '',
              })}
            />
          }
        />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name={'연락처2'}
          label={'연락처'}
          element={
            <>
              <FormRow2
                provider={provider}
                name={'operatorTelCountryCode'}
                element={
                  <DropdownFormField
                    optionsConfig={{
                      codeGroup: CODE_GROUP['cmmon.TelCountryCode'],
                    }}
                  />
                }
              />
              <FormRow2 provider={provider} name={'operatorTelNo'} element={<Input />} />
            </>
          }
        />
        {/*이메일*/}
        <FormRow2 provider={provider} name={'operatorEmail'} label={'이메일'} element={<Input />} />
        {/*운영자 ID - hidden */}
        <FormRow2 provider={provider} name={'operatorId'} type={'hidden'} value={''} />
      </ContentsRow>
    </form>
  );
});

export const BasicInfo = BasicInfoComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course): Course => {
  return {
    ...d,
    tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
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
  // d.primaryCategoryId = d.categories?.[0]?.categoryId;
  // 학습대상-ID 배열
  d.targetListIds = d.targetList?.map((d: any) => d.id);

  // 담당자, 운영자 연락처 국가코드
  d.coordinatorTelCountryCode = 'KOR_82';
  d.operatorTelCountryCode = 'KOR_82';

  return d;
};
