import { z } from '@learnway/shared';
import { Button, TreeNode } from '@learnway/ui';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import React, { FC, useEffect, useState } from 'react';
import { useDynamicForm } from '@learnway/hooks';
import { FormRow } from '../../../shared/ui/form';
import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig } from '@learnway/hooks';

const MenuViewComponent: FC<any> = ({ selectedNode, mode, parentNode, onSave }) => {
  // const {data} =

  const { provider, fetchData, onSubmit, onFormChange } = useDynamicForm(formConfig);

  useEffect(() => {
    if (mode === 'view' || mode === 'edit') {
      if (selectedNode) fetchData(selectedNode);
    } else if (mode === 'add' && parentNode) {
      const initialData = {
        isUsed: true,
        parentNode: parentNode.key,
        location: `${parentNode.title}`,
      };
      fetchData(initialData);
    }
  }, [selectedNode, mode, parentNode]);

  // 폼 초기화를 처리하는 핸들러
  const handleReset = () => {
    onFormChange(); // 폼 데이터를 초기화
  };

  const handleOnSubmit = (node: any) => {
    console.log(node);
  };

  const getTitle = () => {
    if (mode === 'add') {
      return parentNode ? `${parentNode.title} 하위 메뉴 추가` : '메뉴 추가';
    } else if (mode === 'edit') {
      return `${selectedNode?.title} 메뉴 수정`;
    }
    return '메뉴 정보';
  };

  // UI 렌더링
  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">{getTitle()}</h3>
          <div className="flex gap-2">
            {mode !== 'view' && (
              <>
                <Button type="button" variant="gray2" size="sm" onClick={handleReset}>
                  초기화
                </Button>
                <Button type="submit" variant="point" size="sm">
                  저장
                </Button>
              </>
            )}
          </div>
        </div>
        {/* 폼 필드 - location (비활성화 상태) */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'location'} disabled={true} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - code */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'code'} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - title */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'title'} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - url */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'url'} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - isPersonalInfo */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'isPersonalInfo'} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - description */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'description'} />
          </FormRow>
        </ContentsRow>
      </form>
    </div>
  );
};

export default MenuViewComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'key',
      type: 'text',
      label: '키',
      value: '',
    },
    {
      name: 'parentKey',
      type: 'text',
      label: '부모키',
      value: '',
    },
    {
      name: 'isUsed',
      type: 'custom',
      value: false,
    },
    {
      name: 'location',
      type: 'text',
      label: '메뉴 위치',
      value: '',
    },
    {
      label: '메뉴 코드',
      name: 'code',
      type: 'text',
      value: '',
    },
    {
      label: '메뉴명',
      name: 'title',
      type: 'text',
      value: '',
    },
    {
      label: '메뉴 URL',
      name: 'url',
      type: 'text',
      value: '',
    },
    {
      label: '개인정보 항목 포함 여부',
      subText: 'ON인 경우 엑셀 다운로드 시 사유를 입력해야 합니다.',
      name: 'isPersonalInfo',
      type: 'switch',
      value: false,
    },
    {
      label: '메뉴 설명',
      name: 'description',
      type: 'textarea',
      value: '',
    },
  ],
  validator: {},
};

const Title: FC<any> = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center space-x-2">{children}</div>
      </div>
      <hr className="mt-2 w-full border-t-2 border-gray-900" />
    </div>
  );
};
