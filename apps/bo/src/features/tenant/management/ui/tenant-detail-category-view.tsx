import React, { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import { FormInfoArea, FormRow, ContentsHistoryInfoFormField } from '@shared/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

import { DuplicateCodeGuideText, findMenuPathById } from '@features/platform/category';
import { useFetchTenantCategoryDetail } from '@entities/tenant/service/tenant-category.hook';
import { useFetchUserGroups } from '@entities/users/service/user-groups.hook';
import { TenantCategoryCreate, TenantCategoryUpdate } from 'src/types/entities/tenant-category';
import { useCheckExistsCategory } from '@entities/category';

const TenantCategoryViewComponent: FC<any> = ({
  tenantId,
  treeData,
  selectedNode,
  mode,
  isTenantManager,
  useTenantMapping,
  useCommonMapping,
  onReset,
  onSave,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation();

  const isRoot = useMemo(() => {
    return selectedNode?.depth === 0;
  }, [selectedNode]);

  const isInitMode = useMemo(() => {
    return mode === 'init';
  }, [mode]);

  const { data } = useFetchTenantCategoryDetail(tenantId, selectedNode?.menuId || '');
  const { data: userGroups } = useFetchUserGroups();

  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);
  const { alert: openAlert } = useModal();
  const [isTenantManagerUpdatable, setIsTenantManagerUpdatable] = useState(false);
  const [isUsedDisabled, setIsUsedDisabled] = useState(false);
  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  // 카테고리 코드 체크는 마스터/테넌트 카테고리 공통 사용
  const { checkExistsCategory: checkExists } = useCheckExistsCategory({});

  useEffect(() => {
    console.log('## selectedNode :: ', selectedNode);
    setIsTenantManagerUpdatable(
      isTenantManager &&
        useTenantMapping &&
        (selectedNode?.categoryType === 'TENANT' ||
          (mode === 'add' && selectedNode?.categoryType === 'ROOT')),
    );
    if (isInitMode || isRoot) setIsUsedDisabled(true);
    else if (isTenantManager && selectedNode?.categoryType === 'COMMON') setIsUsedDisabled(true);
    else setIsUsedDisabled(false);

    dataInit(data, selectedNode, mode);
  }, [data, selectedNode, mode, userGroups]);

  function dataInit(data: any, selectedNode: any, mode: string) {
    if (mode === 'view') {
      if (data) {
        const mappedUserGroups: any = [];
        if (data?.whiteList?.combines) {
          data?.whiteList.combines.forEach(
            (combine: { combineType: string; combineValue: number }) => {
              if (combine.combineType === 'USER_GROUP' && userGroups) {
                userGroups.forEach((group: { userGroupId: number; userGroupName: string }) => {
                  if (group.userGroupId === combine.combineValue) {
                    mappedUserGroups.push({ label: group.userGroupName, value: group.userGroupId });
                  }
                });
              }
            },
          );
        }
        const initialData = {
          location: data?.categoryPath,
          code: data?.categoryCode,
          categoryName: data?.categoryName,
          categoryContent: data?.categoryContent,
          isUsed: isInitMode || isRoot ? false : data?.isUsed,
          key: selectedNode.key,
          parentKey: selectedNode.parentKey,
          parentCategoryName: selectedNode.parentMenuName,
          sortSeq: selectedNode?.children?.length ?? 0 + 1,
          userGroups: mappedUserGroups,
          isDuplicateCode: true,
        };
        fetchData(initialData);
        setCodeCheckState('none');
        initialFromValuesRef.current = { ...initialData };
      }
    } else if (mode === 'add' && selectedNode) {
      console.log('### add node', selectedNode);
      // TODO. 카테고리 추가 구현
      initialFromValuesRef.current = null;
      const location = findMenuPathById(treeData, selectedNode?.menuId);
      const initialData = {
        location: location,
        code: '',
        categoryName: '',
        categoryContent: '',
        isUsed: true,
        key: '',
        parentKey: selectedNode.key,
        parentCategoryName: selectedNode.name,
        sortSeq: selectedNode?.children?.length ?? 0 + 1,
        userGroups: [],
        isDuplicateCode: false,
      };
      fetchData(initialData);
    } else if (mode === 'init') {
      const initialData = {
        location: '',
        code: '',
        categoryName: '',
        categoryContent: '',
        isUsed: false,
        key: '',
        parentKey: '',
        parentCategoryName: '',
        sortSeq: 0,
        userGroups: [],
        isDuplicateCode: false,
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

  const handleCodeChange = (newCode: string) => {
    const isChanged = isFieldChanged('code', newCode);

    if (onFormChange) {
      // 코드가 변경됐을 경우에만 중복 체크 필요
      onFormChange({
        isDuplicateCode: !isChanged && mode === 'view',
      });
      setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    }
  };

  const handleOnSubmit = (node: any) => {
    console.log('## node :: ', node);
    console.log('## mode :: ', mode);
    console.log('## data :: ', data);
    const isCodeChanged = isFieldChanged('code', node.code);
    if (isCodeChanged) {
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
    }

    const userGroups = node.userGroups.map((n: { value: number }) => ({
      combineType: 'USER_GROUP',
      combineValue: n.value,
    }));

    if (mode === 'view') {
      const body: TenantCategoryUpdate = {
        name: node.categoryName,
        categoryCode: node.code,
        categoryContent: node.categoryContent,
        isUsed: node.isUsed,
        whiteList: userGroups,
      };
      console.log('## body :: ', body);
      onUpdate({
        tenantId: tenantId,
        categoryId: data!.categoryId,
        data: body,
      });
      return;
    } else if (mode === 'add') {
      // TODO. 테넌트 카테고리는 사용여부 전송 안한다면 true인 상태로 disable 처리?
      const body: TenantCategoryCreate = {
        name: node.categoryName,
        categoryCode: node.code,
        categoryContent: node.categoryContent,
        categoryType: 'TENANT',
        sortSeq: node.sortSeq,
        parentId: node.parentKey,
        whiteList: userGroups,
      };
      console.log('## body :: ', body);
      onSave({
        tenantId: tenantId,
        data: body,
      });
    }
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    if (selectedNode.children) {
      openAlert({
        title: t('LABEL.alert.delete.title'),
        content: t('LABEL.alert.delete.message', { code: t('LABEL.common.code.category') }),
      });
      return false;
    }
    const payload: any = {};
    payload.tenantId = tenantId;
    payload.categoryId = selectedNode.id;
    onDelete(payload);
  };

  return (
    <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('LABEL.common.categoryInfo')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={handleReset}
              disabled={isInitMode || (mode === 'view' && isRoot)}
            >
              {t('LABEL.button.reset')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              disabled={isInitMode || (mode === 'view' && isRoot)}
              onClick={handleDelete}
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
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'location'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'parentCategoryName'} disabled={true} />
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'code'} disabled={!isTenantManagerUpdatable}>
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
                          isDuplicateCode: isUnique,
                        });
                      },
                      onError: () => {
                        console.log('#### error');
                        setIsSuccessCodeCheck(false);
                        setCodeCheckState('error');
                        onFormChange?.({ isDuplicateCode: false });
                      },
                    });
                  }}
                  isSuccess={isSuccessCodeCheck}
                  disabled={!isTenantManagerUpdatable}
                  codeCheckState={codeCheckState}
                  handleCodeChange={handleCodeChange}
                  setFormError={setFormError}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryName'} disabled={!isTenantManagerUpdatable} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type={'horizontal'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isUsed'} disabled={isUsedDisabled} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField
                name={'categoryContent'}
                disabled={!isTenantManagerUpdatable}
                resize="none"
              />
            </FormRow>
          </ContentsRow>
          {/** TODO. 공통 컴포넌트 및 유저그룹 팝업 작업 후 수정 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <FormInfoArea>
                <Button variant="gray" size="sm" disabled={isInitMode || isRoot}>
                  {t('LABEL.button.add')}
                </Button>
              </FormInfoArea>
              <DynamicFormField name={'userGroups'} disabled={isInitMode || isRoot} />
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

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'location',
      type: 'text',
      label: t('LABEL.form.input.categoryLocation'),
      value: '',
      placeholder: '',
    },
    {
      name: 'parentCategoryName',
      type: 'text',
      label: t('LABEL.form.input.categoryParentName'),
      value: '',
      placeholder: '',
    },
    {
      name: 'code',
      type: 'custom',
      label: t('LABEL.form.input.categoryCode'),
      value: '',
      placeholder: '',
      maxLength: 20,
    },
    {
      name: 'categoryName',
      type: 'text',
      label: t('LABEL.form.input.categoryCodeName'),
      value: '',
      placeholder: '',
      maxLength: 10,
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('LABEL.form.label.useYn'),
      value: false,
      format: 'boolean',
      tooltip: t('LABEL.form.tooltip.tenantCategoryIsUsed'),
      switchConfig: {
        label: (value: boolean) => (value ? t('LABEL.common.enable') : t('LABEL.common.disable')),
      },
    },
    {
      name: 'categoryContent',
      type: 'textarea',
      label: t('LABEL.form.input.description'),
      value: '',
      maxLength: 50,
    },
    {
      name: 'userGroups',
      type: 'chip-list',
      label: t('LABEL.form.label.userGroupSetting'),
      format: 'array',
      placeholder: '',
      description: '',
      value: [],
      chipListConfig: {
        showInput: false,
        labelField: 'label',
        valueField: 'value',
        wordwrap: true,
      },
    },
    {
      name: 'isDuplicateCode',
      type: 'hidden',
      format: 'boolean',
      value: false,
    },
    {
      label: 'sortSeq',
      name: 'sortSeq',
      type: 'hidden',
      value: 0,
    },
    {
      name: 'parentKey',
      type: 'text',
      label: 'parentKey',
      value: '',
    },
  ],
  validator: {
    categoryCode: true,
    categoryName: true,
    isDuplicateCode: {
      required: {
        fn: (values) => {
          return values.isDuplicateCode === true;
        },
        message: t('LABEL.form.validation.check', { code: t('LABEL.form.input.categoryCode') }),
        path: 'code',
      },
      conditions: [],
    },
  },
};
