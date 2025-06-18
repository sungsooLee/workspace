import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  TextareaFormField,
} from '@learnway/ui';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { ChannelListModal, TeacherListModal } from '@features/learning/course';
import { DropdownFormField } from '@features/form';
import { t } from 'i18next';
import { formConfig } from './form-config';
import { TabFormRef } from '../common/tab-form-ref';

interface BasicInfoProps {
  dummy?: any;
  onSave?: () => void;
  initialData?: any;
}

const BasicInfoComponent = forwardRef<TabFormRef, BasicInfoProps>(
  ({ dummy, onSave, initialData }, ref) => {
    const { t } = useTranslation();

    const { provider, getValues, fetchData, onFormValid, formState } = useDynamicForm(formConfig);

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
        <FormSubTitle label={t('기본 정보 설정')} lineType={'dark'} />
        {/*유형, 채널*/}
        <ContentsRow>
          {/*유형*/}
          <FormRow
            provider={provider}
            name={'유형'}
            element={
              <DropdownFormField
                options={[
                  {
                    label: '이러닝',
                    value: '이러닝',
                  },
                  {
                    label: '클래스',
                    value: '클래스',
                  },
                  {
                    label: '라이브',
                    value: '라이브',
                  },
                  {
                    label: '시험',
                    value: '시험',
                  },
                  {
                    label: '설문',
                    value: '설문',
                  },
                  {
                    label: '페키지',
                    value: '페키지',
                  },
                ]}
              />
            }
          />
          {/*채널*/}
          <FormRow
            provider={provider}
            name={'채널'}
            element={
              <DropdownFormField
                options={[
                  {
                    label: '채널1',
                    value: '채널1',
                  },
                  {
                    label: '채널2',
                    value: '채널2',
                  },
                ]}
              />
            }
          />
        </ContentsRow>

        {/*공개대상*/}
        <FormSubTitle label={t('공개대상')} lineType={'dark'} />
        {/*테넌트*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'테넌트'}
            element={
              <CheckboxGroupFormField
                options={[
                  { value: 'tenant1', label: '테넌트1' },
                  { value: 'tenant2', label: '테넌트2' },
                ]}
              />
            }
          />
        </ContentsRow>
        {/*카테고리*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'카테고리'}
            element={
              <ListModalSelectorFormField
                deletable
                modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                options={[
                  { value: 'tenant1', label: '테넌트1' },
                  { value: 'tenant2', label: '테넌트2' },
                ]}
                actionNode={<Button variant="text" size="sm" label={t('추가')} />}
              />
            }
          />
        </ContentsRow>
        {/*학습대상(유저그룹)*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'학습대상'}
            element={
              <ChipListModalSelectorFormField
                modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'id',
                  wordwrap: true,
                }}
                actionNode={<Button variant="text" size="sm" label={t('추가')} />}
              />
            }
          />
        </ContentsRow>

        {/*과정소개*/}
        <FormSubTitle label={t('과정소개')} lineType={'dark'} />
        {/*언어 설정*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'언어 설정'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
          />
        </ContentsRow>
        {/*과정명*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'과정명'}
            element={<Input disabled={getValues()?.['교육 목표'] === 'a'} />}
          />
        </ContentsRow>
        {/*과정 요약*/}
        <ContentsRow>
          <FormRow provider={provider} name={'과정 요약'} element={<TextareaFormField />} />
        </ContentsRow>
        {/*교육 내용*/}
        <ContentsRow>
          <FormRow provider={provider} name={'교육 내용'} element={<EditorFormField />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'난이도'}
            element={
              <CheckboxGroupFormField
                options={[
                  {
                    label: '없음',
                    value: '',
                  },
                  {
                    label: '입문',
                    value: '1',
                  },
                  {
                    label: '초급',
                    value: '2',
                  },
                  {
                    label: '중급',
                    value: '3',
                  },
                  {
                    label: '고급',
                    value: '4',
                  },
                ]}
              />
            }
          />
          <FormRow
            provider={provider}
            name={'교육공간'}
            element={
              <CheckboxGroupFormField
                options={[
                  {
                    label: '차세대 학습플렛폼',
                    value: '1',
                  },
                  {
                    label: '공간선택',
                    value: '2',
                  },
                  {
                    label: '직접입력',
                    value: '3',
                  },
                ]}
              />
            }
          />
        </ContentsRow>

        {/*관리자*/}
        <FormSubTitle label={t('관리자')} lineType={'dark'} />
        {/*담당자*/}
        <ContentsRow>
          {/*담당자*/}
          <FormRow
            provider={provider}
            name={'담당자'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
          />
          {/*담당자-연락처*/}
          <FormRow provider={provider} name={'담당자연락처'} element={<Input />} />
          {/*담당자-이메일*/}
          <FormRow provider={provider} name={'담당자이메일'} element={<Input />} />
        </ContentsRow>
        {/*운영자*/}
        <ContentsRow>
          {/*운영자*/}
          <FormRow
            provider={provider}
            name={'운영자'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
          />
          {/*운영자-연락처*/}
          <FormRow provider={provider} name={'운영자연락처'} element={<Input />} />
          {/*운영자-이메일*/}
          <FormRow provider={provider} name={'운영자이메일'} element={<Input />} />
        </ContentsRow>
      </div>
    );
  },
);

export const BasicInfo = BasicInfoComponent;
