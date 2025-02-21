import React, { FC, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../widgets/layout/ui/container/parts/contents-row';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import useDynamicForm from '../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { DynamicFormConfig, DynamicFormField } from '../../../../shared/ui/dynamic-form-field';
import { FormRow } from '../../../../shared/ui/form-row';
import { z } from '@learnway/shared';

export const Route = createFileRoute('/_layout/partners/tenant/')({
  component: RouteComponent,
});

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      label: '폼A 채널',
      type: 'text',
      value: '',
    },
    {
      name: 'channel2',
      label: '채널2',
      type: 'text',
      value: '',
    },
  ],
  validator: {
    channel: z.string().required(),
    channel2: z.string().required(),
  },
};

function RouteComponent() {
  const { provider, onSubmit, onFormChange, setFormError, formState } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  const handleSetError = () => {
    console.log('set error');
    setFormError('channel2', 'custom message' + String(Math.floor(Math.random() * 100)));
  };

  useEffect(() => {
    console.log('formState.errors => ', formState.errors);
  }, [formState.errors]);
  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="button" variant="point" size="sm" onClick={() => onFormChange()}>
            초기화
          </Button>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
          <Button type="button" variant="point" size="sm" onClick={handleSetError}>
            강제 에러 세팅
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'channel'} />
            </FormRow>
          </ContentsRow>
          <div className={'h-[800px] w-full'}></div>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'channel2'} />
            </FormRow>
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const Title: FC<any> = ({ title, onChange }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {onChange && (
            <Button type={'button'} variant="point" size="sm" onClick={onChange}>
              + 메뉴추가
            </Button>
          )}
        </div>
      </div>
      <hr className="mt-2 w-full border-t-2 border-gray-900" />
    </div>
  );
};
