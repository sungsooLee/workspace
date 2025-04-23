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
import { TenantCategoryUpdate } from 'src/types/entities/tenant-category';
import { ReceiptRussianRuble } from 'lucide-react';

const TenantCategoryViewComponent: FC<any> = ({
  tenantId,
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

  const { data } = useFetchTenantCategoryDetail(tenantId, selectedNode?.menuId || '');

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
      console.log('## selectedNode', selectedNode);
      if (data) {
        const initialData = {
          categoryPath: data?.categoryPath,
          categoryName: data?.categoryName,
          categoryCode: data?.categoryCode,
          categoryContent: data?.categoryContent,
          isUsed: isInitMode || isRoot ? false : data?.isUsed,
          key: selectedNode.key,
          parentKey: selectedNode.parentKey,
          parentCategoryName: selectedNode.parentMenuName,
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
        parentCategoryName: selectedNode.parentMenuName,
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
    console.log('## mode :: ', mode);
    console.log('## data :: ', data);
    if (mode === 'view') {
      const body: TenantCategoryUpdate = {
        name: data!.categoryName,
        categoryCode: data!.categoryCode,
        categoryContent: data!.categoryContent,
        isUsed: node.isUsed,
        whiteList: data!.whiteList.combines,
      };
      console.log('## body :: ', body);
      onUpdate({
        tenantId: tenantId,
        categoryId: data!.categoryId,
        data: body,
      });
      return;
    }

    /*
export interface CategoryDetail {
  name: string;
  categoryCode: string;
  categoryContent: string;
  categoryPath: string;
}
      */
    /*
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
    */
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    onDelete(selectedNode.id);
  };

  return (
    <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
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
            <Button type="submit" variant="save" size="sm" disabled={isInitMode || isRoot}>
              {'저장'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryPath'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'parentCategoryName'} disabled={true} />
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
          <ContentsRow type={'horizontal'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isUsed'} disabled={isInitMode || isRoot} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryContent'} disabled={true} resize="none" />
            </FormRow>
          </ContentsRow>

          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </form>
    </div>
  );
};

export default TenantCategoryViewComponent;

/*
categoryCode: "tenant_category_1"
categoryContent: "카테고리 내용입니다."
categoryId: 6
categoryName: "tenant카테고리001"
categoryPath: "root"
isUsed: true
*/

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'categoryPath',
      type: 'text',
      label: t('카테고리 위치'),
      value: '',
      placeholder: '',
    },
    {
      name: 'parentCategoryName',
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
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: false,
      format: 'boolean',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'categoryContent',
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
