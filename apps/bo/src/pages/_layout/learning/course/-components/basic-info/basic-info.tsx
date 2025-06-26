import ChannelService from '@entities/channel/api/channel';
import RoleManagerService from '@entities/role/api/role-manager';
import { DropdownFormField } from '@features/form';
import { CategoryChoiceModal, ChannelListModal } from '@features/learning/course';
import { UserGroupTabsChoiceModal } from '@features/shared';
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

interface BasicInfoProps {
  dummy?: any;
  onSave?: () => void;
  initialData?: any;
}

const BasicInfoComponent = forwardRef<TabFormRef, BasicInfoProps>(
  ({ dummy, onSave, initialData }, ref) => {
    const { t } = useTranslation();

    const { provider, getValues, fetchData, onFormValid, formState, watch } = useDynamicForm2({
      builders: [],
    });

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
      console.log('BasicInfoComponent init');
      // 초기 데이터가 있으면 설정
      if (initialData) {
        fetchData(initialData);
      }
    }, [initialData]);

    return (
      <div>
        {/*기본 정보 설정*/}
        <FormSubTitle label={t('기본 정보 설정')} />
        {/*유형, 채널*/}
        <ContentsRow>
          {/*유형*/}
          <FormRow2
            provider={provider}
            name={'유형'}
            label={'유형'}
            required={true}
            element={
              <DropdownFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CourseType'],
                }}
              />
            }
            validation={{
              required: true,
              format: 'object',
            }}
          />
          {/*채널*/}
          <FormRow2
            provider={provider}
            name={'채널'}
            label={'채널'}
            element={
              <DropdownFormField
                optionsConfig={{
                  api: {
                    fn: RoleManagerService.fetchRoleMe,
                    params: 'BO',
                  },
                }}
              />
            }
            validation={{
              required: true,
              format: 'object',
            }}
          />
        </ContentsRow>

        {/*공개대상*/}
        <FormSubTitle label={t('공개대상')} />
        {/*테넌트*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'테넌트'}
            element={
              <CheckboxGroupFormField
                optionsConfig={{
                  api: {
                    fn: ChannelService.getChannelDetail,
                    params: getValues()?.채널,
                    select: (data: any) => data?.tenantList || [],
                    enabled: !!getValues()?.채널 && !!getValues()?.유형,
                  },
                  labelField: 'tenantName',
                  valueField: 'tenantId',
                }}
              />
            }
            validation={{
              required: true,
              format: 'array',
            }}
          />
        </ContentsRow>
        {/*카테고리*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'카테고리'}
            label={'카테고리'}
            value={[]}
            element={
              <ListModalSelectorFormField
                deletable
                modalConfig={{ content: <CategoryChoiceModal />, width: 'lg' }}
                transformModalData={(data: any) => ({
                  value: data.id,
                  label: data.name,
                })}
                actionNode={<Button variant="text" size="sm" label={t('추가')} />}
              />
            }
            validation={{
              required: true,
              format: 'array',
            }}
          />
        </ContentsRow>
        {/*학습대상(유저그룹)*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'학습대상'}
            label={'학습대상'}
            element={
              <ChipListModalSelectorFormField
                modalConfig={{ content: <UserGroupTabsChoiceModal /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'id',
                  wordwrap: true,
                }}
                showAddButton
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
            name={'언어 설정'}
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
            name={'과정명'}
            label={'과정명'}
            element={<Input maxLength={40} />}
            validation={{
              required: true,
              format: 'object',
            }}
          />
        </ContentsRow>
        {/*과정 요약*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'과정 요약'}
            label={'과정 요약'}
            element={<TextareaFormField maxLength={500} />}
            validation={{
              required: true,
              format: 'object',
            }}
          />
        </ContentsRow>
        {/*교육 내용*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'교육 내용'}
            label={'교육 내용'}
            element={<EditorFormField />}
            validation={{
              required: true,
              format: 'object',
            }}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'난이도'}
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
            name={'교육공간'}
            label={'교육공간'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.LearningSpaceType'],
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
            name={'담당자'}
            label={'담당자'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
            validation={{
              required: true,
              format: 'object',
            }}
          />
          {/*담당자-연락처*/}
          <FormRow2
            provider={provider}
            name={'담당자연락처'}
            label={'담당자연락처'}
            element={
              <PhoneNumberFormField
                fields={{ nationCode: '담당자연락처코드', number: '담당자연락처' }}
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
          {/*담당자-이메일*/}
          <FormRow2
            provider={provider}
            name={'담당자이메일'}
            label={'담당자이메일'}
            element={<Input />}
          />
        </ContentsRow>
        {/*운영자*/}
        <ContentsRow>
          {/*운영자*/}
          <FormRow2
            provider={provider}
            name={'운영자'}
            label={'운영자'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
            validation={{
              required: true,
              format: 'object',
            }}
          />
          {/*운영자-연락처*/}
          <FormRow2
            provider={provider}
            name={'운영자연락처'}
            label={'운영자연락처'}
            element={
              <PhoneNumberFormField
                fields={{ nationCode: '운영자연락처코드', number: '운영자연락처' }}
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
          {/*운영자-이메일*/}
          <FormRow2
            provider={provider}
            name={'운영자이메일'}
            label={'운영자이메일'}
            element={<Input />}
          />
        </ContentsRow>
      </div>
    );
  },
);

export const BasicInfo = BasicInfoComponent;
