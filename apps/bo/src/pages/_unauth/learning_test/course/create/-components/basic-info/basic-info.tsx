import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DynamicFormField,
  InputModalSelectorFormField,
} from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
import { useDynamicForm, UseDynamicFormResult } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { ChannelListModal, TeacherListModal } from '@features/learning/course';
import { formConfig } from './form-config';

interface BasicInfoProps {
  dynamicForm: UseDynamicFormResult;
}

const BasicInfoComponent = forwardRef<HTMLDivElement, BasicInfoProps>(({ dynamicForm }, ref) => {
  const { t } = useTranslation();
  // const { provider, getValues, fetchData } = dynamicForm;
  const { provider, getValues, onSubmit, fetchData } = useDynamicForm(formConfig);

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
        <FormRow provider={provider}>
          <DynamicFormField name={'강의 유형'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
              transformModalData={(modalData: any) => ({
                '강의 유형': modalData?.channelName,
                '강의 유형 아이디': modalData?.channelId,
              })}
            />
          </DynamicFormField>
        </FormRow>
        {/*강의 세부 요청*/}
        <FormRow provider={provider}>
          <DynamicFormField name={'강의 세부 요청'}>
            <InputModalSelectorFormField
              modalConfig={{
                content: <ChannelListModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
        {/*채널*/}
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
    </div>
  );
});

export const BasicInfo = BasicInfoComponent;
