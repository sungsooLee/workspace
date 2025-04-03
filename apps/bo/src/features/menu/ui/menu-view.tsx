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
import { t } from 'i18next';

const MenuViewComponent: FC<any> = ({
  treeData,
  selectedNode,
  mode,
  parentNode,
  menuScope,
  onSave,
  onUpdate,
  onDelete,
}) => {
  const { data, isLoading, refetch } = useMenuManagerDetail(
    mode !== 'add' && selectedNode ? selectedNode.menuId : undefined,
  );
  // useEffect(() => {
  //   refetch();
  // }, [refetch, selectedNode]);
  // TODO: 역할에 따라서 메타 설정이 다르면 Config 설정 어떻게 분기 처리?
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  const { checkExistsMenu } = useCheckExistsMenu({
    onSuccess: (data: any) => {
      const isUnique = !data;
      setIsSuccessCodeCheck(isUnique);
      setCodeCheckState(isUnique ? 'success' : 'duplicate');

      onFormChange?.({
        isDuplicateMenuCode: isUnique,
      });
    },
    onError: () => {
      setIsSuccessCodeCheck(false);
      setCodeCheckState('error');
      onFormChange?.({ isDuplicateMenuCode: false });
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
          useYn: data.useYn || false,
          location: location || '', // 경로 생성 함수
          code: data.menuCode || '',
          title: data.menuName || t(`${data.menuCode}`),
          url: data.path || '',
          personalDataContainYn: data.personalDataContainYn || false,
          menuDesc: data.menuDesc || '',
          parentMenuName: data.parentCode,
          visiblePcYn: data?.visiblePcYn,
          visibleMobileYn: data?.visibleMobileYn,
          visible: [
            data.visiblePcYn === true && 'visiblePcYn',
            data.visibleMobileYn === true && 'visibleMobileYn',
          ].filter(Boolean),
          isDuplicateMenuCode: true, // view 모드에서는 기본적으로 중복 체크 통과로 설정
        };

        initialFromValuesRef.current = { ...formData };

        setCodeCheckState('none');
        fetchData(formData);
      }
    } else if (mode === 'add' && parentNode) {
      initialFromValuesRef.current = null;
      const location = findMenuPathById(treeData, parentNode.menuId);
      const initialData = {
        key: '', // 신규 메뉴는 키 없음
        parentKey: parentNode.key || '',
        parentMenuName: parentNode.title,
        useYn: true,
        location: location,
        code: '',
        title: '',
        url: '',
        personalDataContainYn: false,
        menuDesc: '',
        isDuplicateMenuCode: false,
        visible: ['visiblePcYn'],
        hiddenYn: false,
      };
      fetchData(initialData);
    } else if (mode === 'init') {
      const initialData = {
        key: '',
        parentKey: '',
        parentMenuName: '',
        useYn: false,
        location: '',
        code: '',
        title: '',
        url: '',
        personalDataContainYn: false,
        menuDesc: '',
        isDuplicateMenuCode: false,
        visible: [],
        hiddenYn: false,
      };
      fetchData(initialData);
    }
  }, [data, selectedNode, mode, parentNode, isLoading]);

  // 폼 초기화를 처리하는 핸들러
  const handleReset = () => {
    // if (initialFromValuesRef.current) {
    //   fetchData(initialFromValuesRef.current);
    // } else {
    onFormChange();
    // }
  };

  const isFieldChanged = (fieldName: string, currentValue: any) => {
    if (!initialFromValuesRef.current) return true; // 초기 값이 없으면 변경된 것으로 간주

    return initialFromValuesRef.current[fieldName] !== currentValue;
  };

  const handleCodeChange = (newCode: string) => {
    const isChanged = isFieldChanged('code', newCode);

    if (onFormChange) {
      // 코드가 변경됐을 경우에만 중복 체크 필요
      onFormChange({
        isDuplicateMenuCode: !isChanged && mode === 'view',
      });
      setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    }
  };

  const handleOnSubmit = (node: any) => {
    console.log(codeCheckState);
    console.log(isSuccessCodeCheck);
    const visibleMobileYn = node.visible.find((element: string) => element === 'visibleMobileYn')
      ? true
      : false;
    const visiblePcYn = node.visible.find((element: string) => element === 'visiblePcYn')
      ? true
      : false;
    // View 모드에서 저장 처리
    if (mode === 'view') {
      // 메뉴 코드가 변경되었는지 확인
      const isCodeChanged = isFieldChanged('code', node.code);

      // 코드가 변경되지 않았으면 중복 체크 없이 진행
      if (!isCodeChanged) {
        // 수정 API 호출을 위한 데이터 준비
        const updateData = {
          menuId: selectedNode.menuId,
          menuCode: node.code,
          parentId: node.parentKey,
          deleteYn: false,
          hiddenYn: node.hiddenYn,
          useYn: true,
          visiblePcYn: visiblePcYn,
          visibleMobileYn: visibleMobileYn,
          menuDesc: node.menuDesc,
          personalDataContainYn: node.personalDataContainYn,
          sortOrder: 1,
          path: node.url,
          menuScope: menuScope,
          translations: [
            {
              locale: 'ko',
              translation: node.title,
            },
          ],
          apiMappingMenuList: [],
        };

        // 수정 API 호출
        onUpdate(updateData);
        // console.log(updateData);
        return;
      }
    }
    if (codeCheckState === 'none') {
      setFormError?.('code', '메뉴 코드의 중복 여부를 확인해 주세요.');
      return;
    }

    if (!isSuccessCodeCheck || codeCheckState === 'duplicate') {
      setFormError?.('code', '이미 사용 중인 메뉴 코드입니다.');
      return;
    }
    console.log(node);

    const tmpData = {
      menuCode: node.code,
      parentId: node.parentKey,
      deleteYn: false,
      hiddenYn: node.hiddenYn,
      useYn: true,
      visiblePcYn: visiblePcYn,
      visibleMobileYn: visibleMobileYn,
      menuDesc: node.menuDesc,
      personalDataContainYn: node.personalDataContainYn,
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
    console.log(tmpData);
    onSave(tmpData);
    // 메뉴 저장 성공했을때 메뉴 다시 갖고와야됨..
  };

  const handleDelete = () => {
    const deleteNode = {
      menuId: selectedNode.menuId,
    };
    onDelete(deleteNode);
  };

  const getTitle = () => {
    if (mode === 'add') {
      return parentNode ? `${parentNode.title} 하위 메뉴 추가` : '메뉴 추가';
    }
    return '메뉴 정보';
  };

  const DuplicateCodeGuideText = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
    (
      {
        name,
        value,
        onChange,
        getValues,
        clearFormError,
        onFormChange,
        checkExistsMenu,
        isSuccess,
        disabled,
      },
      ref,
    ) => {
      const { onChangeGuideText } = useDynamicFormContext();
      useEffect(() => {
        switch (codeCheckState) {
          case 'success':
            onChangeGuideText(
              <span style={{ color: 'blue' }}>사용할 수 있는 메뉴 코드입니다.</span>,
            );
            break;
          case 'duplicate':
            onChangeGuideText(
              <span style={{ color: 'red' }}>이미 사용 중인 메뉴 코드입니다.</span>,
            );
            break;
          case 'error':
            onChangeGuideText(
              <span style={{ color: 'red' }}>중복 확인 중 오류가 발생했습니다.</span>,
            );
            break;
          // case 'none':
          // default:
          //   onChangeGuideText('코드 입력 후 중복 버튼을 눌러 중복 확인을 해주세요.');
        }
      }, [codeCheckState, onChangeGuideText]);

      useEffect(() => {
        return () => {
          onChangeGuideText('');
        };
      }, [onChangeGuideText]);

      return (
        <div className="flex w-full gap-x-2" ref={ref}>
          <Input
            value={value}
            onChange={(e: any) => {
              onChange(e.target.value);
              handleCodeChange(e.target.value);
              // if (onFormChange) {
              //   onFormChange({ isDuplicateMenuCode: false });
              //   setCodeCheckState('none');
              // }
            }}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="gray"
            size="sm"
            disabled={disabled}
            onClick={() => {
              const { code, parentKey } = getValues();

              // Validate code before checking
              if (!code) {
                clearFormError(name);
                setFormError?.('code', '메뉴 코드를 입력해주세요.');
                return;
              }

              const data = {
                menuCode: code,
                parentId: parentKey,
              };

              // Clear any existing errors and perform the check
              clearFormError(name);
              checkExistsMenu(data);
            }}>
            중복
          </Button>
        </div>
      );
    },
  );

  const isInitMode = mode === 'init';

  // UI 렌더링
  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">{getTitle()}</h3>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="gray2"
              size="sm"
              onClick={handleReset}
              disabled={isInitMode}>
              초기화
            </Button>
            <Button
              variant="point"
              size="sm"
              disabled={isInitMode || mode === 'add'}
              onClick={handleDelete}>
              삭제
            </Button>
            <Button type="submit" variant="point" size="sm" disabled={isInitMode}>
              저장
            </Button>
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
              <DuplicateCodeGuideText
                clearFormError={clearFormError}
                checkExistsMenu={checkExistsMenu}
                isSuccess={isSuccessCodeCheck}
                disabled={isInitMode}
              />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - title */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'title'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - url */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'url'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        {/* 폼 필드 - description */}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'menuDesc'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'hiddenYn'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'visible'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'personalDataContainYn'} disabled={isInitMode} />
          </FormRow>
        </ContentsRow>

        {/* <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'apiMappingMenuList'}></DynamicFormField>
          </FormRow>
        </ContentsRow> */}
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
      label: t('키'),
      value: '',
    },
    {
      name: 'parentKey',
      type: 'text',
      label: t('부모키'),
      value: '',
    },
    {
      name: 'useYn',
      type: 'custom',
      value: false,
    },
    {
      name: 'location',
      type: 'text',
      label: t('메뉴 위치'),
      value: '',
    },
    {
      label: t('상위 메뉴명'),
      name: 'parentMenuName',
      type: 'text',
      value: '',
    },
    {
      label: t('메뉴 코드'),
      name: 'code',
      type: 'custom',
      maxLength: 20,
      value: '',
    },
    {
      label: t('메뉴명'),
      name: 'title',
      type: 'text',
      maxLength: 10,
      value: '',
    },
    {
      label: t('메뉴 URL'),
      name: 'url',
      type: 'text',
      value: '',
    },
    {
      label: t('개인정보'),
      // required: true,
      tooltip: '개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.',
      name: 'personalDataContainYn',
      type: 'switch',
      value: false,
    },
    {
      label: t('Hidden 메뉴'),
      tooltip: '',
      name: 'hiddenYn',
      type: 'switch',
      value: false,
    },
    // {
    //   label: ''
    // },
    {
      label: t('메뉴 설명'),
      name: 'menuDesc',
      type: 'textarea',
      value: '',
    },
    {
      name: 'isDuplicateMenuCode',
      type: 'hidden',
      format: 'boolean',
      value: false,
    },
    {
      name: 'visible',
      type: 'checkbox-group',
      label: t('디바이스 노출 여부'),
      format: 'array',
      value: [],
      options: [
        {
          value: 'visiblePcYn',
          label: 'PC',
        },
        {
          value: 'visibleMobileYn',
          label: '모바일',
        },
      ],
    },
    // {
    //   name: 'apiMappingMenuList',
    //   type: 'custom',
    //   label: t('API'),
    //   format: 'array',
    //   value: [],
    // },
  ],
  validator: {
    isDuplicateMenuCode: {
      required: {
        fn: (values) => {
          return values.isDuplicateMenuCode === true;
        },
        message: t('메뉴 코드의 중복 여부를 확인해주세요.'),
        path: 'code',
      },
      conditions: [],
    },
    code: {
      required: true,
      // conditions: []
    },
    title: {
      required: true,
    },
    url: {
      required: true,
    },
    visible: {
      required: {
        fn: (values) => {
          return !values.visibleMobileYn && !values.visiblePcYn;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};
