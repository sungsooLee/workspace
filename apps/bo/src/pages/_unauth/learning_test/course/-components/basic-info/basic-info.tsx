import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DynamicFormField,
  Input,
  InputModalSelectorFormField,
} from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
import { UseDynamicFormResult } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { ChannelListModal, TeacherListModal } from '@features/learning/course';

interface BasicInfoProps {
  dynamicForm: UseDynamicFormResult;
}

const BasicInfoComponent = forwardRef<HTMLDivElement, BasicInfoProps>(({ dynamicForm }, ref) => {
  const { t } = useTranslation();
  const { provider, getValues, fetchData } = dynamicForm;
  // const { provider, getValues, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  useEffect(() => {
    console.log('BasicInfoComponent init');
    // fetchData({});
  }, []);

  return (
    <div ref={ref}>
      <ContentsRow>
        {/*강의 유형*/}
        <FormRow
          provider={provider}
          name={'강의 유형'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
              transformModalData={(modalData: any) => ({
                '강의 유형': modalData?.channelName,
                '강의 유형 아이디': modalData?.channelId,
              })}
            />
          }
        />
        {/*강의 세부 요청*/}
        <FormRow
          provider={provider}
          name={'강의 세부 요청'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          }
        />
        {/*채널*/}
        <FormRow
          provider={provider}
          name={'채널'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          }
        />
      </ContentsRow>
      {/*과정소개 타이틀*/}
      <FormSubTitle label={t('과정소개')} />
      {/*언어 설정*/}
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'채널'}
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
        {/* TODO. 과정명이 어떤 컴포넌트인지 추적 불가해서 일단 Input 으로 작성 합니다.*/}
        <FormRow
          provider={provider}
          name={'과정명'}
          element={<Input disabled={getValues()?.['교육 목표'] === 'a'} />}
        />
      </ContentsRow>
      {/*교육 목표*/}
      <ContentsRow>
        <FormRow provider={provider} name={'교육 목표'} />
      </ContentsRow>
      {/*교육 내용*/}
      <ContentsRow>
        <FormRow provider={provider} name={'교육 내용'} />
      </ContentsRow>
      {/*학습 대상*/}
      <ContentsRow>
        <FormRow provider={provider} name={'학습 대상'} />
      </ContentsRow>
      {/*과정 요약*/}
      <ContentsRow>
        <FormRow provider={provider} name={'과정 요약'} />
      </ContentsRow>
      {/*공개범위 타이틀*/}
      <FormSubTitle label={t('공개범위')} />
      {/*난이도*/}
      <ContentsRow>
        <FormRow provider={provider} name={'난이도'} />
      </ContentsRow>
      {/*테넌트*/}
      <ContentsRow>
        <FormRow provider={provider} name={'테넌트'} />
      </ContentsRow>
      {/*카테고리*/}
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'카테고리'}
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
      {/*과정 관리자 타이틀*/}
      <FormSubTitle label={t('과정 관리자')} />
      {/*담당자*/}
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'채널'}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          }
        />
      </ContentsRow>
      {/*담당자 연락처*/}
      <ContentsRow>
        <FormRow provider={provider} name={'담당자 연락처'} />
      </ContentsRow>
      {/*운영자*/}
      <ContentsRow>
        <FormRow provider={provider} name={'운영자'} />
      </ContentsRow>
      {/*담당자 연락처*/}
      <ContentsRow>
        <FormRow provider={provider} name={'담당자 연락처'} />
      </ContentsRow>
    </div>
  );
});

export const BasicInfo = BasicInfoComponent;
