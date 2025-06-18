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
import React, { forwardRef, useEffect } from 'react';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { ChannelListModal, TeacherListModal } from '@features/learning/course';
import { DropdownFormField } from '@features/form';
import { t } from 'i18next';

interface BasicInfoProps {
  dummy?: any;
  onSave?: () => void;
}

const BasicInfoComponent = forwardRef<HTMLDivElement, BasicInfoProps>(({ dummy, onSave }, ref) => {
  const { t } = useTranslation();

  const { provider, getValues, fetchData } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  useEffect(() => {
    console.log('BasicInfoComponent init');
    // fetchData({});
  }, []);

  return (
    <div ref={ref}>
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
      {/*난이도, 교육공간*/}
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
});

export const BasicInfo = BasicInfoComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    // 유형
    {
      name: '유형',
      type: 'custom',
      label: '유형',
      value: '',
    },
    // 유형 ID
    {
      name: '유형아이디',
      type: 'hidden',
      value: '',
    },
    // 채널
    {
      name: '채널',
      type: 'custom',
      label: '채널',
      value: '',
    },
    // 채널 ID
    {
      name: '채널아이디',
      type: 'hidden',
      value: '',
    },
    // 테넌트
    {
      name: '테넌트',
      type: 'custom',
      label: '테넌트',
      format: 'array',
      options: [
        { value: 'tenant1', label: '테넌트1' },
        { value: 'tenant2', label: '테넌트2' },
      ],
      value: ['tenant1', 'tenant2'],
      placeholder: '',
      description: '',
    },
    // 카테고리
    {
      name: '카테고리',
      type: 'custom',
      label: '카테고리',
      format: 'array',
      value: [
        { value: 'tenant1', label: '테넌트1' },
        { value: 'tenant2', label: '테넌트2' },
      ],
      placeholder: '',
      description: '',
    },
    // 학습대상
    {
      name: '학습대상',
      type: 'custom',
      label: '학습대상',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      placeholder: '',
      description: '',
    },
    // 언어 설정
    {
      name: '언어 설정',
      type: 'custom',
      label: '언어 설정',
      value: '',
    },
    // 과정명
    {
      name: '과정명',
      type: 'custom',
      label: '과정명',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    //과정 요약
    {
      name: '과정 요약',
      type: 'custom',
      label: '과정 요약',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'custom',
      label: t('교육 내용'),
      value: '',
    },
    // 난이도
    {
      name: '난이도',
      type: 'custom',
      label: t('난이도'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: '0',
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
      ],
      value: '',
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'custom',
      label: t('교육 내용'),
      value: '',
    },
    // 교육공간
    {
      name: '교육공간',
      type: 'custom',
      label: '교육공간',
      value: '',
    },
    // 담당자
    {
      name: '담당자',
      type: 'custom',
      label: '담당자',
      value: '',
    },
    // 담당자연락처
    {
      name: '담당자연락처',
      type: 'custom',
      label: '담당자연락처',
      value: '',
    },
    // 담당자이메일
    {
      name: '담당자이메일',
      type: 'custom',
      label: '담당자이메일',
      value: '',
    },
    // 운영자
    {
      name: '운영자',
      type: 'custom',
      label: '운영자',
      value: '',
    },
    // 운영자연락처
    {
      name: '운영자연락처',
      type: 'custom',
      label: '운영자연락처',
      value: '',
    },
    // 운영자이메일
    {
      name: '운영자이메일',
      type: 'custom',
      label: '운영자이메일',
      value: '',
    },
  ],
};
