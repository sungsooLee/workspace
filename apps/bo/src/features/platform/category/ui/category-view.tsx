import React, { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';

import { Button, ContentsRow, DynamicFormField, Input, TextareaFormField } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { DuplicateCodeGuideText, findMenuPathById } from '@features/platform/category';
import { useCheckExistsCategory, useFetchCategoryDetail } from '@entities/category';
import { FormRow, SwitchFormField } from '@shared/ui';

const CategoryViewComponent: FC<any> = ({
  treeData,
  selectedNode,
  mode,
  onReset,
  onSave,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation<'translation'>();
  const router = useRouter();

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

  const { checkExistsCategory: checkExists } = useCheckExistsCategory({});

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
          isUsed: data.isUsed,
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
        isUsed: false,
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
        isUsed: false,
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
    const isChanged = isFieldChanged('code', newCode);

    if (onFormChange) {
      // 코드가 변경됐을 경우에만 중복 체크 필요
      onFormChange({
        isDuplicateMenuCode: !isChanged && mode === 'view',
      });
      setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    }
  };

  const handleOnSubmit = (data: any) => {
    // View 모드에서 저장 처리
    if (mode === 'view') {
      const isCodeChanged = isFieldChanged('code', data.code);
      // 코드가 변경되지 않았으면 중복 체크 없이 진행
      if (!isCodeChanged) {
        const body = {
          name: data.name,
          categoryCode: data.code,
          categoryContent: data.categoryContent,
          id: data.key,
          isUsed: data.isUsed,
        };
        console.log('## check body', body);
        // 수정 API 호출
        onUpdate(body);
        return;
      }
    }

    // "{{code}}의 중복 여부를 확인해 주세요."
    if (codeCheckState === 'none') {
      setFormError?.(
        'code',
        t('LABEL.form.validation.check', { code: t('LABEL.form.input.categoryCode') }),
      );
      return;
    }

    //  '이미 사용 중인 {{code}} 코드입니다.'
    if (!isSuccessCodeCheck || codeCheckState === 'duplicate') {
      setFormError?.(
        'code',
        t('LABEL.form.validation.duplicated', { code: t('LABEL.form.input.categoryCode') }),
      );
      return;
    }

    const body = {
      name: data.name,
      categoryCode: data.code,
      categoryContent: data.categoryContent,
      categoryType: 'COMMON',
      sortSeq: data.sortSeq,
      parentId: data.parentKey,
    };

    console.log('## check body', body);
    onSave?.(body);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    onDelete(selectedNode.id);
  };

  const getTitle = () => {
    // 카테고리 추가, 하위카테고리 추가
    if (mode === 'add') {
      return selectedNode
        ? `${selectedNode.title} ${t('LABEL.tree.depthAdd', { type: t('LABEL.common.code.category') })}`
        : `${t('LABEL.tree.add', { type: t('LABEL.common.code.category') })}`;
    }
    // ${} 카테고리
    if (mode === 'view') {
      return selectedNode
        ? `${selectedNode.title} ${t('LABEL.common.code.category')}`
        : t('LABEL.common.code.category');
    }
    return t('LABEL.common.code.category');
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
              disabled={isInitMode || (mode === 'view' && isRoot)}
              className={layoutStyles.btn_text}
            >
              {t('LABEL.button.reset')}
            </Button>
            <Button
              variant="text"
              size="sm"
              disabled={isInitMode || (mode === 'view' && isRoot)}
              onClick={handleDelete}
              className={layoutStyles.btn_text}
            >
              {t('LABEL.button.delete')}
            </Button>
            <Button
              type="submit"
              variant="save"
              size="sm"
              disabled={isInitMode || (mode === 'view' && isRoot)}
            >
              {t('LABEL.button.save')}
            </Button>
          </div>
        </div>
        {/* 폼 필드 - location (비활성화 상태) */}
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider} name={'location'} element={<Input disabled={true} />} />
          </ContentsRow>

          <ContentsRow>
            <FormRow
              provider={provider}
              name={'parentMenuName'}
              element={<Input disabled={true} />}
            />
          </ContentsRow>

          {/* 폼 필드 - code */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'code'}
              element={
                <DuplicateCodeGuideText
                  clearFormError={clearFormError}
                  checkExists={(data: string) => {
                    checkExists(data, {
                      onSuccess: (data: any) => {
                        console.log('#### success', data);

                        const isUnique = data;
                        setIsSuccessCodeCheck(isUnique);
                        setCodeCheckState(isUnique ? 'success' : 'duplicate');

                        onFormChange?.({
                          isDuplicateMenuCode: isUnique,
                        });
                      },
                      onError: () => {
                        console.log('#### error');
                        setIsSuccessCodeCheck(false);
                        setCodeCheckState('error');
                        onFormChange?.({ isDuplicateMenuCode: false });
                      },
                    });
                  }}
                  isSuccess={isSuccessCodeCheck}
                  disabled={isInitMode || (mode === 'view' && isRoot)}
                  codeCheckState={codeCheckState}
                  handleCodeChange={handleCodeChange}
                  setFormError={setFormError}
                />
              }
            />
          </ContentsRow>

          {/* 폼 필드 - title */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'name'}
              element={<Input disabled={isInitMode || (mode === 'view' && isRoot)} />}
            >
              {/* <Button
                type="button"
                variant="point"
                size="sm"
                className="p-[10px]"
                onClick={() => {
                  const code = getValues('code');
                  console.log('### code', code);
                  router.navigate({
                    to: '/platform/system/multilingual',
                    state: {
                      keyType: 'CATEGORY', // 다국어 분류 - 공통코드
                      multilinguaKey: code,
                    },
                  });
                }}
                disabled={isInitMode || (mode === 'view' && isRoot)}
              >
                {t('LABEL.link.multilingual')}
              </Button> */}
            </FormRow>
          </ContentsRow>

          {/* 폼 필드 - description */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'categoryContent'}
              element={<TextareaFormField disabled={isInitMode || (mode === 'view' && isRoot)} />}
            />
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow
              provider={provider}
              name="isUsed"
              element={<SwitchFormField disabled={isInitMode || (mode === 'view' && isRoot)} />}
            />
          </ContentsRow>
        </div>
      </form>
    </div>
  );
};

export const CategoryView = CategoryViewComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'key',
      type: 'text',
      label: 'key',
      value: '',
    },
    {
      name: 'parentKey',
      type: 'text',
      label: 'parentKey',
      value: '',
    },
    {
      name: 'location',
      type: 'text',
      label: t('LABEL.form.input.categoryLocation'),
      value: '',
    },
    {
      label: t('LABEL.form.input.categoryParentName'),
      name: 'parentMenuName',
      type: 'text',
      value: '',
    },
    {
      label: t('LABEL.form.input.categoryCode'),
      name: 'code',
      type: 'custom',
      maxLength: 20,
      value: '',
    },
    {
      label: t('LABEL.form.input.categoryCodeName'),
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
      label: t('LABEL.form.input.description'),
      name: 'categoryContent',
      type: 'textarea',
      maxLength: 50,
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      format: 'boolean',
      label: t('사용 여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
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
        message: t('LABEL.form.validation.check', { code: t('LABEL.form.input.categoryCode') }),
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
