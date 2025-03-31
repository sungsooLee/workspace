import { z } from '@learnway/shared';
import { Button, Input, TreeNode } from '@learnway/ui';
import { ContentsRow } from '@learnway/ui';
import React, { FC, forwardRef, useEffect, useState } from 'react';
import { BaseFormFieldProps, useDynamicForm, useDynamicFormContext } from '@learnway/hooks';
import { FormRow } from '../../../shared/ui/form';
import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig } from '@learnway/hooks';
import {
  useCheckExistsMenu,
  useCreateMenu,
  useMenuManagerDetail,
} from '../../../entities/menu/service/menu-manager.hook';
import { findMenuPathById } from '../service/menu.service';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { useTranslation } from 'react-i18next';

const MenuViewComponent: FC<any> = ({
  treeData,
  selectedNode,
  mode,
  parentNode,
  menuScope,
  onSave,
}) => {
  const { data, isLoading } = useMenuManagerDetail(
    mode !== 'add' && selectedNode ? selectedNode.menuId : undefined,
  );
  // TODO: 역할에 따라서 메타 설정이 다르면 Config 설정 어떻게 분기 처리?
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError } =
    useDynamicForm(formConfig);
  // const { create, isSuccess } = useCreateMenu({});
  const { checkExistsMenu } = useCheckExistsMenu({
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (mode === 'view') {
      const location = findMenuPathById(treeData, selectedNode.menuId);
      if (data) {
        const formData = {
          key: data.menuId?.toString() || '',
          parentKey: data.parentId?.toString() || '',
          isUsed: data.useYn || false,
          location: location || '', // 경로 생성 함수
          code: data.menuCode || '',
          title: data.menuName || t(`${data.menuCode}`),
          url: data.path || '',
          isPersonalInfo: data.personalDataContainYn || false,
          description: data.menuDesc || '',
          parentMenuName: data.parentName,
        };
        fetchData(formData);
      }
    } else if (mode === 'add' && parentNode) {
      const location = findMenuPathById(treeData, parentNode.menuId);
      const initialData = {
        key: '', // 신규 메뉴는 키 없음
        parentKey: parentNode.key || '',
        parentMenuName: parentNode.title,
        isUsed: true,
        location: location,
        code: '',
        title: '',
        url: '',
        isPersonalInfo: false,
        description: '',
        isDuplicateMenuCode: false,
      };
      fetchData(initialData);
    }
  }, [data, selectedNode, mode, parentNode, isLoading]);

  // 폼 초기화를 처리하는 핸들러
  const handleReset = () => {
    onFormChange(); // 폼 데이터를 초기화
  };

  const handleOnSubmit = (node: any) => {
    console.log(node);
    console.log(getValues());
    // console.log(node);
    const tmpData = {
      menuCode: node.code,
      parentId: node.parentKey,
      deleteYn: false,
      hiddenYn: false,
      useYn: true,
      visiblePcYn: true,
      visibleMobileYn: true,
      messageDesc: node.description,
      personalDataContainYn: node.isPersonalInfo,
      sortOrder: 1,
      path: node.url,
      menuScope: menuScope,
      translations: [
        {
          locale: 'ko', //TODO: 현재 선택된 locale값 들어가게 변경해야됨.
          translation: node.title,
        },
      ],
    };
    // onSave(tmpData);
    // 메뉴 저장 성공했을때 메뉴 다시 갖고와야됨..
  };

  const getTitle = () => {
    if (mode === 'add') {
      return parentNode ? `${parentNode.title} 하위 메뉴 추가` : '메뉴 추가';
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
                  삭제
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

        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'parentMenuName'} disabled={true} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - code */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'code'}>
              <DuplicateCodeGuideText clearFormError={clearFormError} />
            </DynamicFormField>
            {/* <Button
              variant="gray"
              size="sm"
              onClick={() => {
                const { code, parentKey } = provider.getValues();
                const data = {
                  menuCode: code,
                  parentId: parentKey,
                };
                console.log(data);
                checkExistsMenu(data);
              }}>
              중복
            </Button> */}
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

const DuplicateCodeGuideText = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ name, value, onChange, provider, onFormChange, getValues, clearFormError }, ref) => {
    const { onChangeGuideText } = useDynamicFormContext();

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input value={value} onChange={(e: any) => onChange(e.target.value)} />
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => {
            const { code, parentKey } = getValues();
            const data = {
              menuCode: code,
              parentId: parentKey,
            };
            clearFormError(name);
            onFormChange?.({ isDuplicateMenuCode: true });
            console.log(data);
          }}>
          중복
        </Button>
      </div>
    );
  },
);

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
      label: '상위 메뉴명',
      name: 'parentMenuName',
      type: 'text',
      value: '',
    },
    {
      label: '메뉴 코드',
      name: 'code',
      type: 'custom',
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
      label: '개인정보',
      // required: true,
      // subText: 'ON인 경우 엑셀 다운로드 시 사유를 입력해야 합니다.',
      tooltip: 'ON인 경우 엑셀 다운로드 시 사유를 입력해야 합니다.',
      name: 'isPersonalInfo',
      type: 'switch',
      value: false,
    },
    // {
    //   label: ''
    // },
    {
      label: '메뉴 설명',
      name: 'description',
      type: 'textarea',
      value: '',
    },
    {
      name: 'isDuplicateMenuCode',
      type: 'hidden',
      format: 'boolean',
      value: false,
    },
  ],
  validator: {
    isDuplicateMenuCode: {
      required: {
        fn: (values) => !values.isDuplicateMenuCode,
        message: '메뉴 코드의 중복 여부를 확인해주세요.',
        path: 'code',
      },
    },
    code: {
      required: true,
    },
    title: {
      required: true,
    },
    url: {
      required: true,
    },
  },
};
