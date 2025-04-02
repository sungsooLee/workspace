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
  onUpdate,
  onDelete,
}) => {
  const { data, isLoading } = useMenuManagerDetail(
    mode !== 'add' && selectedNode ? selectedNode.menuId : undefined,
  );
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
          isUsed: data.useYn || false,
          location: location || '', // 경로 생성 함수
          code: data.menuCode || '',
          title: data.menuName || t(`${data.menuCode}`),
          url: data.path || '',
          isPersonalInfo: data.personalDataContainYn || false,
          description: data.menuDesc || '',
          parentMenuName: data.parentCode,
          visiblePcYn: data?.visiblePcYn,
          visibleMobileYn: data?.visibleMobileYn,
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
        isUsed: true,
        location: location,
        code: '',
        title: '',
        url: '',
        isPersonalInfo: false,
        description: '',
        isDuplicateMenuCode: false,
        // visible: [],
      };
      fetchData(initialData);
    }
  }, [data, selectedNode, mode, parentNode, isLoading]);

  // 폼 초기화를 처리하는 핸들러
  const handleReset = () => {
    onFormChange(); // 폼 데이터를 초기화
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
          hiddenYn: false,
          useYn: true,
          visiblePcYn: node.visiblePcYn,
          visibleMobileYn: node.visibleMobileYn,
          messageDesc: node.description,
          personalDataContainYn: node.isPersonalInfo,
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
      }
      return;
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
          />
          <Button
            type="button"
            variant="gray"
            size="sm"
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

  // UI 렌더링
  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">{getTitle()}</h3>
          <div className="flex gap-2">
            <Button type="button" variant="gray2" size="sm" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="point" size="sm" disabled={mode === 'add'} onClick={handleDelete}>
              삭제
            </Button>
            <Button type="submit" variant="point" size="sm">
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
              />
            </DynamicFormField>
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

        {/* <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'visible'} />
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
    // {
    //   name: 'visible',
    //   type: 'checkbox-group',
    //   label: '디바이스 노출 여부',
    //   value: ['visiblePcYn', 'visibleMobileYn'],
    //   options: [
    //     {
    //       value: 'visiblePcYn',
    //       label: 'PC',
    //     },
    //     {
    //       value: 'visibleMobileYn',
    //       label: '모바일',
    //     },
    //   ],
    // },
  ],
  validator: {
    isDuplicateMenuCode: {
      required: {
        fn: (values) => {
          return values.isDuplicateMenuCode === true;
        },
        message: '메뉴 코드의 중복 여부를 확인해주세요.',
        path: 'code',
      },
      conditions: [],
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
