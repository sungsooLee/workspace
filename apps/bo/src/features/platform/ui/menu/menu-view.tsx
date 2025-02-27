import useDynamicForm from '../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { DynamicFormConfig, DynamicFormField } from '../../../../shared/ui/dynamic-form-field';
import { z } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { ContentsRow } from '../../../../widgets/layout/ui/container/parts/contents-row';
import { FormRow } from '../../../../shared/ui/form-row';
import React, { FC, useEffect, useState } from 'react';

/**
 * MenuViewComponent - GNB 메뉴 추가/수정을 위한 컴포넌트
 * @param {any} treeData - 트리 데이터를 전달받아 추가/수정 시 사용
 * @param {Function} onChange - 상태 변경을 부모에 전달하기 위한 함수
 * @returns {JSX.Element} - 메뉴 추가/수정 UI를 렌더링하는 JSX
 */
const MenuViewComponent: FC<any> = ({ treeData, onChange }) => {
  // useDynamicForm hook을 이용해 폼 관련 데이터와 핸들러를 가져오며, formConfig를 설정에 사용
  const { provider, fetchData, onSubmit, onFormChange } = useDynamicForm(formConfig);

  // 현재 동작 타입('EDIT', 'ADD' 등)을 관리하는 상태
  const [type, setType] = useState();

  // 폼 초기화를 처리하는 핸들러
  const handleOnReset = () => {
    onFormChange(); // 폼 데이터를 초기화
  };

  // 폼 제출 시 호출되는 핸들러
  // treeData와 선택된 타입을 기반으로 상태를 상위에 전달
  const handleOnSubmit = (node: any) => {
    onChange({ type, node }); // 상위 컴포넌트에 type 및 node 정보를 전달
  };

  // 노드를 삭제할 때 호출되는 핸들러
  const handleDeleteNode = () => {
    onChange({ type: 'DELETE', node: treeData.node }); // DELETE 작업 타입으로 상태 전달
  };

  // treeData가 변경될 때 실행되는 사이드 이펙트
  useEffect(() => {
    setType(treeData.type); // treeData의 type 값을 상태에 설정
    fetchData(treeData.node); // treeData.node를 기반으로 데이터를 fetch
  }, [treeData]);

  // UI 렌더링
  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      {/* 폼 - onSubmit 이벤트 핸들러 등록 */}
      <form onSubmit={onSubmit(handleOnSubmit)}>
        {/* 제목과 버튼 */}
        <Title title={'GNB 메뉴 추가'}>
          {/* "수정" 상태일 때만 삭제 버튼 표시 */}
          {type === 'EDIT' && (
            <Button
              type={'button'}
              variant="line"
              className={'text-red-600'}
              size={'sm'}
              onClick={handleDeleteNode}>
              삭제
            </Button>
          )}
          {/* 초기화 버튼 */}
          <Button type="button" variant="point" size="sm" onClick={handleOnReset}>
            GNM 메뉴 추가 초기화
          </Button>
          {/* 제출 버튼 - 현재 타입에 따라 텍스트 변경 ('ADD' 또는 'EDIT') */}
          <Button type="submit" variant="point" size="sm">
            {type === 'ADD' ? `GNB 메뉴 추가` : `GNB 메뉴 수정`}
          </Button>
        </Title>

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
      value: '',
    },
    {
      label: '메뉴 설명',
      name: 'description',
      type: 'textarea',
      value: '',
    },
  ],
  validator: {
    code: z.string().required(),
    title: z.string().required(),
    url: z.string().required(),
  },
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
