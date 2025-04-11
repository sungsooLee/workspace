import React, { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { DuplicateCodeGuideText } from '@features/category/ui/category-code-input';
import { findMenuPathById } from '@features/category/service/category.service';
import { FormRow } from '@shared/ui/form';
import { useCheckExistsCategory, useFetchCategoryDetail } from '@entities/category';

const CategoryViewComponent: FC<any> = ({
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

  const { data } = useFetchCategoryDetail(selectedNode?.menuId, mode);

  // TODO: 역할에 따라서 메타 설정이 다르면 Config 설정 어떻게 분기 처리?
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  const { checkExistsCategory: checkExists } = useCheckExistsCategory({
    onSuccess: (data: any) => {
      console.log('success');

      const isUnique = !data;
      setIsSuccessCodeCheck(isUnique);
      setCodeCheckState(isUnique ? 'success' : 'duplicate');

      onFormChange?.({
        isDuplicateMenuCode: isUnique,
      });
    },
    onError: () => {
      console.log('error');
      setIsSuccessCodeCheck(false);
      setCodeCheckState('error');
      onFormChange?.({ isDuplicateMenuCode: false });
    },
  });

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
          isDuplicateMenuCode: false,
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
  // 폼 초기화를 처리하는 핸들러
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

  const handleCodeChange = (newCode: string) => {
    console.log('## newCode', newCode);
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
    console.log('## node :: ', node);

    if (codeCheckState === 'none') {
      setFormError?.('code', '메뉴 코드의 중복 여부를 확인해 주세요.');
      return;
    }

    if (!isSuccessCodeCheck || codeCheckState === 'duplicate') {
      setFormError?.('code', '이미 사용 중인 메뉴 코드입니다.');
      return;
    }

    // View 모드에서 저장 처리
    if (mode === 'view') {
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

  const getTitle = () => {
    if (mode === 'add') {
      return selectedNode ? `${selectedNode.title} 하위 카테고리 추가` : '카테고리 추가';
    }
    if (mode === 'view') {
      return selectedNode ? `${selectedNode.title} 카테고리` : '카테고리';
    }
    return '카테고리';
  };

  return (
    <div className={layoutStyles.inner}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{getTitle()}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={handleReset}
              disabled={isInitMode || isRoot}
              className={layoutStyles.btn_text}
            >
              초기화
            </Button>
            <Button
              variant="text"
              size="sm"
              disabled={isInitMode || mode === 'add' || isRoot}
              onClick={handleDelete}
              className={layoutStyles.btn_text}
            >
              삭제
            </Button>
            <Button type="submit" variant="save" size="sm" disabled={isInitMode || isRoot}>
              저장
            </Button>
          </div>
        </div>
        {/* 폼 필드 - location (비활성화 상태) */}

        <div className={layoutStyles.inner_contents}>
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
              <DynamicFormField name={'code'} disabled={isRoot}>
                <DuplicateCodeGuideText
                  clearFormError={clearFormError}
                  checkExists={checkExists}
                  isSuccess={isSuccessCodeCheck}
                  disabled={isInitMode || isRoot}
                  codeCheckState={codeCheckState}
                  handleCodeChange={handleCodeChange}
                  setFormError={setFormError}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - title */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'name'} disabled={isInitMode || isRoot} />
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - description */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryContent'} disabled={isInitMode || isRoot} />
            </FormRow>
          </ContentsRow>
        </div>
      </form>
    </div>
  );
};

export default CategoryViewComponent;

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
      name: 'location',
      type: 'text',
      label: t('카테고리 위치'),
      value: '',
    },
    {
      label: t('상위 카테고리명'),
      name: 'parentMenuName',
      type: 'text',
      value: '',
    },
    {
      label: t('카테고리 코드'),
      name: 'code',
      type: 'custom',
      maxLength: 20,
      value: '',
    },
    {
      label: t('카테고리명'),
      name: 'name',
      type: 'text',
      maxLength: 10,
      value: '',
    },
    {
      label: 'sortSeq',
      name: 'sortSeq',
      type: 'hidden',
      maxLength: 50,
      value: 0,
    },
    {
      label: t('설명'),
      name: 'categoryContent',
      type: 'textarea',
      maxLength: 50,
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
    },
    name: {
      required: true,
    },
  },
};
