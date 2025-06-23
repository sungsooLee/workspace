import React, { FC, useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import {
  TreeNode,
  useModal,
  Button,
  TreeContainer,
  TreeView,
  ContentsRow,
  Input,
  Textarea,
  ChipListModalSelectorFormField,
  DndTreeView,
} from '@learnway/ui';
import { FormInfoArea, FormRow, ContentsHistoryInfoFormField, SwitchFormField } from '@shared/ui';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

import { DuplicateCodeGuideText, findMenuPathById } from '@features/platform/category';

import { TenantDetailCategoryMappingModal } from './tenant-detail-category-mapping-modal';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';

import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import {
  useDeleteTenantCategory,
  useFetchTenantCategory,
  useUpdateTenantCategory,
  useMoveTenantCategory,
  useCreateTenantCategory,
} from '@entities/tenant/service/tenant-category.hook';
import { useFetchTenant } from '@entities/tenant';
import { transformApiDataToTreeData } from '@features/platform/category';
import {
  getAllTreeKeys,
  getFirstExpandKeys,
  transformMenuApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import { useFetchTenantCategoryDetail } from '@entities/tenant/service/tenant-category.hook';
import { useFetchUserGroups } from '@entities/users/service/user-groups.hook';
import { useCheckExistsCategory } from '@entities/category';

import { UserGroupTabsChoiceModal } from '@features/shared';
import { EnFormMode, TenantCategoryCreate, TenantCategoryUpdate } from '@types';

import { TenantCategoryDetail } from '@types';

enum EnCategoryType {
  TENANT = 'TENANT',
  ROOT = 'ROOT',
  COMMON = 'COMMON',
}

/**
 * 화면번호:
 * NLP_BO_TMS_1002_02_01 (플랫폼 : 카테고리 매핑), NLP_BO_TMS_1002_02_02 (플랫폼: 카테고리 상세)
 * NLP_BO_TMS_1003_03 (테넌트: 카테고리 추가), NLP_BO_TMS_1003_03_01 (테넌트: 카테고리 추가 상세 ), NLP_BO_TMS_1003_03_01_01 (테넌트: 카테고리 버튼 삭제)
 * @param param0
 * @returns
 */
const TenantDetailCategoryComponent = ({ roleInfo }: { roleInfo?: string }) => {
  const { alert: openAlert, open: openModal, confirm: openConfirm } = useModal();

  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [mode, setMode] = useState(EnFormMode.NONE);
  const [selectedNode, setSelectedNode] = useState<any>();

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId;

  const { data, refetch } = useFetchTenantCategory(tenantId);
  const { data: tenant } = useFetchTenant(tenantId);

  // 테넌트 관리자 여부
  const isTenantManager = roleInfo === 'PLATFORM' ? false : true;

  // delete
  const { delete: deleteTenantCategory } = useDeleteTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
      setMode(EnFormMode.NONE);
    },
  });

  const { update: updateTenantCategory } = useUpdateTenantCategory(tenantId, {});
  const { create: createTenantCategory } = useCreateTenantCategory(tenantId, {});
  const { move: moveTenantCategory } = useMoveTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      refetch();
    },
    onError: async (data: any) => {
      //
    },
  });

  const { data: categoryDetail } = useFetchTenantCategoryDetail(tenantId, selectedNode?.menuId);
  const { data: userGroups } = useFetchUserGroups();
  // 카테고리 코드 체크는 마스터/테넌트 카테고리 공통 사용
  const { checkExistsCategory: checkExists } = useCheckExistsCategory({});

  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const duplicateCheck = async (tenantName: string) => {
    const result = await new Promise((resolve) => {
      checkExists(tenantName, { onSuccess: resolve });
    });

    if (result) return DuplicateState.ok;
    else return DuplicateState.duplicated;
  };

  const handleNodeClick = (node: TreeNode) => {
    setMode(EnFormMode.VIEW);
    setSelectedNode(node);
  };

  const handleNodeMove = (id: string, destinationParentId: string, sortSeq: number) => {
    const payload = {
      id,
      destinationParentId,
      sortSeq: sortSeq + 1,
    };
    moveTenantCategory({
      tenantId: tenantId,
      categoryId: id,
      data: payload,
    });
  };

  const handleNodeAdd = (node: any) => {
    clearAllFormErrors();
    setSelectedNode(null);
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });
    initData.isUsed = true;
    setMode(EnFormMode.ADD);
    setExpandedKeys([...expandedKeys, node.key]);
    const location = findMenuPathById(treeData, node?.menuId);
    const fdat = {
      ...initData,
      location: location,
      parentKey: node.key,
      parentCategoryName: node.title,
      sortSeq: (selectedNode?.children?.length ?? 0) + 1,
    };
    fetchData(fdat);
  };

  const handleSave = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: <p>{t('LABEL.confirm.save.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          createTenantCategory(payload, {
            onSuccess: (data: any) => {
              refetch();
            },
          });
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.modify.title'),
      content: <p>{t('LABEL.confirm.modify.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          updateTenantCategory(payload, {
            onSuccess: (data: any) => {
              refetch();
            },
          });
        }
      },
    });
  };

  const handleNodeChange = () => {
    refetch();
    setMode(EnFormMode.NONE);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    if (selectedNode.children && selectedNode.children.length > 0) {
      openAlert({
        title: t('LABEL.alert.delete.title'),
        content: t('LABEL.alert.delete.message', { type: t('LABEL.common.code.category') }),
      });
      return false;
    }
    const payload: any = {};
    payload.tenantId = tenantId;
    payload.categoryId = selectedNode.id;

    openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: (
        <p>{t('LABEL.confirm.delete.message', { type: t('LABEL.common.code.category') })}</p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          deleteTenantCategory(payload);
          setMode(EnFormMode.NONE);
        }
      },
    });
  };

  const handleTreeAction = (event: any) => {
    console.log('event', event);
    switch (event.type) {
      case 'NODE_SELECT':
        if (event.node.depth > 0) {
          handleNodeClick(event.node);
        }
        break;
      case 'NODE_MOVE': {
        const nodeInfo = event;
        const targetDepth =
          nodeInfo.position === 'INSIDE'
            ? nodeInfo.targetNode?.depth + 1
            : nodeInfo.targetNode?.depth;
        const parentKey =
          nodeInfo.position === 'INSIDE'
            ? nodeInfo.targetNode?.key
            : nodeInfo.targetNode?.parentKey;
        if (nodeInfo.sourceNode.depth !== targetDepth) {
          alert(t('LABEL.alert.movableSameLevel'));
          return false;
        }
        if (nodeInfo.sourceNode.parentKey !== parentKey) {
          alert(t('LABEL.alert.movableSameParent', { type: t('LABEL.common.category') }));
          return false;
        }
        if (nodeInfo.position === 'INSIDE') {
          handleNodeMove(
            nodeInfo.sourceNode.menuId,
            nodeInfo.targetNode.menuId,
            nodeInfo.targetIndex,
          );
        }
        //BEFORE 혹은 AFTER 이면 부모 노드가 타겟 되어야함.
        else {
          handleNodeMove(
            nodeInfo.sourceNode.menuId,
            nodeInfo.targetNode.parentKey,
            nodeInfo.targetIndex,
          );
        }

        break;
      }
    }
  };

  const handleTenantDetailCategoryMapping = async () => {
    const modalTenantId = tenantId;
    await openModal({
      content: (
        <TenantDetailCategoryMappingModal
          tenantId={modalTenantId}
          onNodeChange={() => {
            handleNodeChange();
          }}
        />
      ),
      width: 'xl',
    });
  };

  const handleOnSubmit = (formData: any) => {
    const userGroups = formData.userGroups.map((n: { value: number }) => ({
      combineType: 'USER_GROUP',
      combineValue: n.value,
    }));

    if (mode === EnFormMode.VIEW) {
      const body: TenantCategoryUpdate = {
        name: formData.categoryName,
        categoryCode: formData.code.fieldValue,
        categoryContent: formData.categoryContent,
        isUsed: formData.tenantIsUsed,
        whiteList: userGroups,
      };
      handleUpdate({
        tenantId: tenantId,
        categoryId: categoryDetail?.categoryId,
        data: body,
      });
      return;
    } else if (mode === EnFormMode.ADD) {
      const body: TenantCategoryCreate = {
        name: formData.categoryName,
        categoryCode: formData.code.fieldValue,
        categoryContent: formData.categoryContent,
        categoryType: EnCategoryType.TENANT,
        sortSeq: formData.sortSeq,
        parentId: formData.parentKey,
        whiteList: userGroups,
        isUsed: formData.tenantIsUsed,
      };
      handleSave({
        tenantId: tenantId,
        data: body,
      });
    }
  };

  useEffect(() => {
    if (data && tenant) {
      const transformedData = transformApiDataToTreeData(data);

      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [data, tenant]);

  useEffect(() => {
    if (categoryDetail) {
      const mappedUserGroups: any = [];
      if (categoryDetail?.whiteList?.combines) {
        categoryDetail?.whiteList.combines.forEach(
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
      const location = findMenuPathById(treeData, selectedNode?.menuId);
      fetchData({
        ...categoryDetail,
        location: location,
        code: { fieldValue: categoryDetail.categoryCode, checkState: DuplicateState.okStart },
        sortSeq: (selectedNode?.children?.length ?? 0) + 1,
        userGroups: mappedUserGroups,
        key: selectedNode.key,
        parentKey: selectedNode.parentKey,
        parentCategoryName: selectedNode.parentMenuName,
      });
      setMode(EnFormMode.VIEW);
    }
  }, [categoryDetail]);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if (
      isTenantManager &&
      (node.depth === 0 || node?.categoryType === EnCategoryType.TENANT) &&
      tenant?.isTenantCategory
    )
      return (
        <div className="gap-10px flex">
          <div className="flex items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleNodeAdd(node);
              }}
              variant="gray2"
              size="xs"
              type="button"
              disabled={level === 5}
            >
              {node.depth === 0
                ? t('LABEL.tree.add', { type: t('LABEL.common.code.tenantCategory') })
                : t('LABEL.tree.depthAdd', { type: t('LABEL.common.code.tenantCategory') })}
            </Button>
          </div>
        </div>
      );
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('LABEL.page.tenantCategory.title')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                const allKeys = getAllTreeKeys(treeData);
                setExpandedKeys(allKeys);
              }}
            >
              {t('LABEL.tree.expand')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => setExpandedKeys([])}
            >
              {t('LABEL.tree.closed')}
            </Button>
            {!isTenantManager && (
              <Button
                variant="save"
                size="sm"
                onClick={() => handleTenantDetailCategoryMapping()}
                disabled={!tenant?.isCommonCategory}
              >
                {t('LABEL.tree.mapping', { type: t('LABEL.common.code.category') })}
              </Button>
            )}
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <DndTreeView
              treeId="1"
              type="SAME_LEVEL_ONLY"
              data={treeData}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              onAction={handleTreeAction}
              onExpandedKeysChange={setExpandedKeys}
              nodeButtons={renderNodeButtons}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{t('LABEL.common.categoryInfo')}</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={() => onFormChange()}
                disabled={mode === EnFormMode.NONE}
              >
                {t('LABEL.button.reset')}
              </Button>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                disabled={
                  mode !== EnFormMode.VIEW ||
                  (isTenantManager &&
                    selectedNode &&
                    selectedNode.categoryType === EnCategoryType.COMMON)
                }
                onClick={handleDelete}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button type="submit" variant="save" size="sm" disabled={mode === EnFormMode.NONE}>
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow provider={provider} name="location" element={<Input disabled={true} />} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="parentCategoryName"
                element={<Input disabled={true} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name="code"
                element={
                  <DuplicateCheckInputFormField
                    onDuplicationCheck={duplicateCheck}
                    disabled={
                      mode === EnFormMode.NONE ||
                      !isTenantManager ||
                      (isTenantManager &&
                        selectedNode &&
                        selectedNode.categoryType !== EnCategoryType.TENANT)
                    }
                  />
                }
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name="categoryName"
                element={
                  <Input
                    disabled={
                      mode === EnFormMode.NONE ||
                      !isTenantManager ||
                      (isTenantManager &&
                        selectedNode &&
                        selectedNode.categoryType !== EnCategoryType.TENANT)
                    }
                  />
                }
              />
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow
                provider={provider}
                name="tenantIsUsed"
                element={
                  <SwitchFormField
                    disabled={
                      mode === EnFormMode.NONE ||
                      (selectedNode &&
                        selectedNode.categoryType !== EnCategoryType.TENANT &&
                        !getValues('isUsed'))
                    }
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="categoryContent"
                element={
                  <Textarea
                    disabled={
                      mode === EnFormMode.NONE ||
                      (selectedNode && selectedNode.categoryType !== EnCategoryType.TENANT) ||
                      !isTenantManager
                    }
                    resize="none"
                  />
                }
              />
            </ContentsRow>
            {/** TODO. 유저그룹 팝업 작업 후 수정 */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name="userGroups"
                element={
                  <ChipListModalSelectorFormField
                    disabled={EnFormMode.NONE}
                    modalConfig={{
                      content: <UserGroupTabsChoiceModal />,
                      title: '',
                      width: 'x1',
                    }}
                    showAddButton
                    chipList={{
                      showInput: false,
                      labelField: 'label',
                      valueField: 'value',
                      wordwrap: true,
                    }}
                  />
                }
              />
            </ContentsRow>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TenantDetailCategory = TenantDetailCategoryComponent;

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
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
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
      type: 'hidden',
      value: false,
      format: 'boolean',
    },
    {
      name: 'tenantIsUsed',
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
      type: 'custom',
      label: t('LABEL.form.label.userGroupSetting'),
      format: 'array',
      placeholder: '',
      description: '',
      value: [],
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
    code: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.code.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.code.checkState === DuplicateState.check ||
            values.code.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('코드') }),
        },
        {
          fn: (values: Record<string, any>) => values.code.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('코드') }),
        },
      ],
    },
  },
};
