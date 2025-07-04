import ChannelService from '@entities/channel/api/channel';
import RoleManagerService from '@entities/role/api/role-manager';
import { DropdownFormField } from '@features/form';
import { CategoryChoiceModal } from '@features/learning/course';
import {
  TrainingPlaceChoiceModal,
  UserChoiceModal,
  UserGroupTabsChoiceModal,
} from '@features/shared';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  PhoneNumberFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui';
import { FormRow2, FormSubTitle } from '@shared/ui';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TabFormRef } from '../common/tab-form-ref';
import { useFetchCourseConfig } from '@entities/course';
import { Course, CourseConfig } from '@types';

interface BasicInfoProps {
  dummy?: any;
  onSave?: () => void;
  data: { formData: Course; courseConfig: CourseConfig };
  initialData?: any;
}

const BasicInfoComponent = forwardRef<TabFormRef, BasicInfoProps>(
  ({ dummy, onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();

    const { provider, getValues, updateFormData, onFormValid, formState, watch } =
      useDynamicForm2();

    const channelUuid = watch('channelUuid');
    const courseType = watch('courseType');

    // const { data: courseConfig } = useFetchCourseConfig({
    //   channelId: channelUuid,
    //   courseType: courseType,
    // });

    console.log('----- basic', { formData, courseConfig });

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
          data,
          errors,
        };
      },
    }));

    useEffect(() => {
      console.log('BasicInfoComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(formData);
      }
    }, [formData]);

    return (
      <div>
        {/*기본 정보 설정*/}
        <FormSubTitle label={t('기본 정보 설정')} />
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
            element={
              <DropdownFormField
                optionsConfig={{
                  api: {
                    fn: () => RoleManagerService.fetchMyRoles('BO'),
                    select: (data: any) => data?.channels || [],
                  },
                }}
                options={[{ label: 'channel A', value: 9999 }]}
              />
            }
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
              <CheckboxGroupFormField
                key={`tenant-${channelUuid}`}
                optionsConfig={{
                  api: {
                    fn: () => ChannelService.getChannelDetail(channelUuid),
                    select: (data: any) => data?.tenantList || [],
                    enabled: !!channelUuid,
                  },
                  labelField: 'tenantName',
                  valueField: 'tenantId',
                }}
                options={[
                  { tenantName: 'tenant A', tenantId: 1 },
                  { tenantName: 'tenant B', tenantId: 2 },
                  { tenantName: 'tenant C', tenantId: 3 },
                ]}
              />
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
                transformModalData={(data: any) => ({
                  value: data.id,
                  label: data.name,
                })}
                list={{
                  labelField: 'name',
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
            label={'학습대상'}
            element={
              <ChipListModalSelectorFormField
                modalConfig={() => ({
                  content: <UserGroupTabsChoiceModal tenantIds={getValues().tenantIds} />,
                })}
                transformModalData={(data: any) => console.log(data)}
                chipList={{
                  labelField: 'fullPath',
                  valueField: 'key',
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
        {/*언어 설정*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'language'}
            label={'언어 설정'}
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
        {/*과정 요약*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'courseSummary'}
            label={'과정 요약'}
            element={<TextareaFormField maxLength={500} />}
          />
        </ContentsRow>
        {/*교육 내용*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'courseContent'}
            label={'교육 내용'}
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
                                transformModalData={(data: any) => console.log(data)}
                                // transformModalData={(data: any) => ({
                                //   learningSpaceId: data.channelId,
                                //   learningSpaceName: data.channelName,
                                // })}
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
                  coordinatorId: data.uuid,
                  coordinatorName: `${data.name}/${data?.dept?.deptName}`,
                })}
              />
            }
          />
          {/*담당자-연락처*/}
          <FormRow2
            provider={provider}
            name={'coordinatorTelNo'}
            label={'담당자연락처'}
            element={
              <PhoneNumberFormField
                fields={{ nationCode: 'coordinatorTelCountryCode', number: 'coordinatorTelNo' }}
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
          {/*담당자-이메일*/}
          <FormRow2
            provider={provider}
            name={'coordinatorEmail'}
            label={'담당자이메일'}
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
                  operatorId: data.uuid,
                  operatorName: `${data.name}/${data?.dept?.deptName}`,
                })}
              />
            }
          />
          {/*운영자-연락처*/}
          <FormRow2
            provider={provider}
            name={'operatorTelNo'}
            label={'운영자연락처'}
            element={
              <PhoneNumberFormField
                fields={{ nationCode: 'operatorTelCountryCode', number: 'operatorTelNo' }}
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
          {/*운영자-이메일*/}
          <FormRow2
            provider={provider}
            name={'operatorEmail'}
            label={'운영자이메일'}
            element={<Input />}
          />
          {/*운영자 ID - hidden */}
          <FormRow2 provider={provider} name={'operatorId'} type={'hidden'} value={''} />
        </ContentsRow>
      </div>
    );
  },
);

export const BasicInfo = BasicInfoComponent;
