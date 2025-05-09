import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DynamicFormField,
  InputModalSelectorFormField,
} from '@learnway/ui';
import React from 'react';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { ChannelListModal, TeacherListModal } from '@features/learning/course';
import { t } from 'i18next';

const BasicInfoComponent = () => {
  const { t } = useTranslation();
  const { provider, getValues, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <>
      {/*강의 유형*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'강의 유형'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*강의 세부 요청*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'강의 세부 요청'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*채널*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'채널'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*과정소개 타이틀*/}
      <FormSubTitle label={t('과정소개')} />
      {/*언어 설정*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'채널'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*과정명*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'과정명'} />
        </FormRow>
      </ContentsRow>
      {/*교육 목표*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'교육 목표'} />
        </FormRow>
      </ContentsRow>
      {/*교육 내용*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'교육 내용'} />
        </FormRow>
      </ContentsRow>
      {/*학습 대상*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'학습 대상'} />
        </FormRow>
      </ContentsRow>
      {/*과정 요약*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'과정 요약'} />
        </FormRow>
      </ContentsRow>
      {/*공개범위 타이틀*/}
      <FormSubTitle label={t('공개범위')} />
      {/*난이도*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'난이도'} />
        </FormRow>
      </ContentsRow>
      {/*테넌트*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'테넌트'} />
        </FormRow>
      </ContentsRow>
      {/*카테고리*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'카테고리'}>
            <ChipListModalSelectorFormField
              modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
              chipList={{
                labelField: 'name',
                valueField: 'id',
                wordwrap: true,
              }}
              actionNode={<Button variant="text" size="sm" label={t('추가')} />}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*학습대상(유저그룹)*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'학습대상'}>
            <ChipListModalSelectorFormField
              modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
              chipList={{
                labelField: 'name',
                valueField: 'id',
                wordwrap: true,
              }}
              actionNode={<Button variant="text" size="sm" label={t('추가')} />}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*과정 관리자 타이틀*/}
      <FormSubTitle label={t('과정 관리자')} />
      {/*담당자*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'채널'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      {/*담당자 연락처*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'담당자 연락처'} />
        </FormRow>
      </ContentsRow>
      {/*운영자*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'운영자'} />
        </FormRow>
      </ContentsRow>
      {/*담당자 연락처*/}
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'담당자 연락처'} />
        </FormRow>
      </ContentsRow>
    </>
  );
};

export const BasicInfo = BasicInfoComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    // 강의 유형
    {
      name: '강의 유형',
      type: 'custom',
      label: '강의 유형',
      value: '',
    },
    // 강의 세부 요청
    {
      name: '강의 세부 요청',
      type: 'custom',
      label: '강의 세부 요청',
      value: '',
    },
    // 채널
    {
      name: '채널',
      type: 'custom',
      label: '채널',
      value: '',
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
      type: 'text',
      label: '과정명',
      value: '',
      placeholder: '',
      description: '',
      maxLength: 40,
    },
    // 교육 목표
    {
      name: '교육 목표',
      type: 'textarea',
      label: t('교육 목표'),
      value: '',
      placeholder: '',
      description: '',
    },
    // 교육 내용
    {
      name: '교육 내용',
      type: 'textarea',
      label: t('교육 내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    // 학습 대상
    // 과정 요약
    // 난이도
    {
      name: '난이도',
      type: 'radio-group',
      label: t('난이도'),
      format: 'string',
      options: [
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
      ],
      value: [],
      placeholder: '',
      description: '',
    },
    // 테넌트
    {
      name: '테넌트',
      type: 'checkbox-group',
      label: '테넌트',
      format: 'array',
      options: Array(10)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}`, disabled: i === 1 })),
      value: ['value1'],
      placeholder: '',
      description: '',
      showSelectAll: true,
      cols: 4,
    },
    // 카테고리
    {
      name: '카테고리',
      type: 'chip-list',
      label: '카테고리',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    // 학습대상(유저그룹)
    {
      name: '태그',
      type: 'chip-list',
      label: '태그',
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    // 담당자
    {
      name: '담당자',
      type: 'custom',
      label: '담당자',
      value: '',
    },
    // 담당자 연락처
    {
      label: '담당자 연락처',
      name: '담당자 연락처',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'contact',
      },
    },
    // 운영자
    {
      name: '운영자',
      type: 'custom',
      label: '운영자',
      value: '',
    },
    // 운영자 연락처
    {
      label: '운영자 연락처',
      name: '운영자 연락처',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'contact',
      },
    },
  ],
};
