import React, { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, Switch, Tooltip, DynamicFormField } from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';

import { findMenuPathById } from '@features/category/service/category.service';
import { useFetchTenantCategoryDetail } from '@entities/tenant/service/tenant-category.hook';

const TenantCategoryViewComponent: FC<any> = ({
  treeData,
  selectedNode,
  mode,
  onReset,
  onSave,
  onUpdate,
  onDelete,
}) => {
  console.log('## selectedNode :: ', selectedNode);
  const { t } = useTranslation();

  const isRoot = useMemo(() => {
    return selectedNode?.depth === 0;
  }, [selectedNode]);

  const isInitMode = useMemo(() => {
    return mode === 'init';
  }, [mode]);

  const { data } = useFetchTenantCategoryDetail(1, selectedNode?.menuId);

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  useEffect(() => {
    dataInit(data, selectedNode, mode);
  }, [data, selectedNode, mode]);

  function dataInit(data: any, selectedNode: any, mode: string) {
    if (mode === 'view') {
      const location = findMenuPathById(treeData, selectedNode?.menuId);
      console.log('## location', location);
      if (data) {
        const initialData = {
          location: location ?? '',
          key: selectedNode.key,
          parentKey: selectedNode.parentKey,
          parentMenuName: selectedNode.parentMenuName,
          isDuplicateMenuCode: true,
          name: data?.name,
          code: data?.categoryCode,
          categoryContent: data?.categoryContent,
          categoryType: 'COMMON',
          sortSeq: selectedNode?.children?.length ?? 0 + 1,
        };
        fetchData(initialData);
        setCodeCheckState('none');
        initialFromValuesRef.current = { ...initialData };
      }
    } else if (mode === 'add' && selectedNode) {
      console.log('## sort seq ==== ', (selectedNode?.children?.length ?? 0) + 1);
      initialFromValuesRef.current = null;
      const location = findMenuPathById(treeData, selectedNode?.menuId);
      const initialData = {
        location: location ?? '',
        key: '',
        parentKey: selectedNode.key,
        parentMenuName: selectedNode.parentMenuName,
        isDuplicateMenuCode: false,
        name: '', // 입력 필드
        code: '', // 입력 필드
        categoryContent: '', // 입력 필드
        categoryType: 'COMMON',
        sortSeq: (selectedNode?.children?.length ?? 0) + 1,
      };
      fetchData(initialData);
    } else if (mode === 'init') {
      const initialData = {
        location: '',
        key: '',
        parentKey: '',
        parentMenuName: '',
        isDuplicateMenuCode: false,
        name: '', // 입력 필드
        code: '', // 입력 필드
        categoryContent: '', // 입력 필드
        categoryType: 'COMMON',
        sortSeq: 0,
      };
      fetchData(initialData);
      setCodeCheckState('none');
    }
  }

  const handleReset = () => {
    // onReset?.();
    // setCodeCheckState('none');
    onFormChange();

    dataInit(data, selectedNode, mode);
  };

  const isFieldChanged = (fieldName: string, currentValue: any) => {
    if (!initialFromValuesRef.current) return true; // 초기 값이 없으면 변경된 것으로 간주
    return initialFromValuesRef.current[fieldName] !== currentValue;
  };

  const handleOnSubmit = (node: any) => {
    console.log('## node :: ', node);

    /*
    {카테고리 코드}를 입력해 주세요. 

    {카테고리 코드}를 다시 확인해 주세요.

    이미 사용 중인 {카테고리 코드}입니다. 

    사용할 수 있는 {카테고리 코드} 입니다. 

    {카테고리 코드}의 중복 여부를 확인해 주세요. 
    */

    // View 모드에서 저장 처리
    if (mode === 'view') {
      const isCodeChanged = isFieldChanged('code', node.code);
      // 코드가 변경되지 않았으면 중복 체크 없이 진행
      if (!isCodeChanged) {
        const body = {
          name: node.name,
          categoryCode: node.code,
          categoryContent: node.categoryContent,
          id: node.key,
        };
        console.log('## check body', body);
        // 수정 API 호출
        onUpdate(body);
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

    const body = {
      name: node.name,
      categoryCode: node.code,
      categoryContent: node.categoryContent,
      categoryType: 'COMMON',
      sortSeq: node.sortSeq,
      parentId: node.parentKey,
    };

    console.log('## check body', body);
    onSave?.(body);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    onDelete(selectedNode.id);
  };

  return (
    <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
      <div className={titleStyles.title_wrap}>
        <h3 className={titleStyles.title}>{'카테고리 정보'}</h3>
        <div className={layoutStyles.btn_wrap}>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={handleReset}
            disabled={isInitMode || isRoot}
          >
            {'초기화'}
          </Button>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            disabled={isInitMode || mode === 'add' || isRoot}
            onClick={handleDelete}
          >
            {'삭제'}
          </Button>
          <Button variant="save" size="sm" disabled={isInitMode || isRoot}>
            {'저장'}
          </Button>
        </div>
      </div>
      <div className={layoutStyles.inner_contents}>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'path'} disabled={true} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'parentName'} disabled={true} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'categoryCode'} disabled={true} />
            <Button variant="gray" size="sm" disabled>
              {'중복'}
            </Button>
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'categoryName'} disabled={true} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <div className={dynamicFormStyles.switch_wrap}>
            <p className={dynamicFormStyles.title}>
              {'사용여부'}

              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다.'}
              >
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                </Button>
              </Tooltip>
            </p>
            <Switch
              id="name-use2"
              className={dynamicFormStyles.btn_switch}
              label={'미사용'}
              // label={true ? '미사용' : '사용'}
              checked={false}
            />
          </div>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'categoryDesc'} disabled={true} resize="none" />
          </FormRow>
        </ContentsRow>

        <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
          <ContentsHistoryInfoFormField />
        </ContentsRow>
      </div>
    </div>
  );
};

export default TenantCategoryViewComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'path',
      type: 'text',
      label: t('카테고리 위치'),
      value: '',
      placeholder: '',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위 카테고리명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'categoryCode',
      type: 'text',
      label: t('카테고리 코드'),
      value: '',
      placeholder: '',
      maxLength: 15,
    },
    {
      name: 'categoryName',
      type: 'text',
      label: t('카테고리명'),
      value: '',
      placeholder: '',
      maxLength: 10,
    },
    {
      name: 'isUsable',
      type: 'switch',
      label: t('사용 여부'),
      value: false,
    },
    {
      name: 'categoryDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 50,
    },
  ],
  validator: {
    categoryCode: { required: true },
    categoryName: { required: true },
  },
};
