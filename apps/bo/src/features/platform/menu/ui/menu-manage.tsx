import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useRouter } from '@tanstack/react-router';
import {
  Button,
  CheckboxGroupFormField,
  ContentsRow,
  findNodePath,
  GridBox,
  Input,
  Textarea,
  TreeBox,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  useModal,
} from '@learnway/ui';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { ApiInfoModal } from './api-info-modal';
import { MenuApiMappingModal } from './menu-api-mapping-modal';

import {
  findMenuPathById,
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '../service/menu.service';
import {
  useCheckExistsMenu,
  useCreateMenu,
  useDeleteMenu,
  useMenuManageDetail,
  useMenuTree,
  useMoveMenu,
  useUpdateMenu,
} from '../../../../entities/menu';
import { FormRow, SwitchFormField } from '../../../../shared/ui';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { MenuDetail } from '../../../../types/entities/menu';
import { useWatch } from 'react-hook-form';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
} from '@features/tenant/management/ui/duplicate-check-input-form-field';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const DEVICE_NAME = {
  PC: 'PC',
  Mobile: 'Mobile',
};

const columnHelper = createColumnHelper<any>();

export const MenuManage = ({ menuScope }: any) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [parentNode, setParentNode] = useState<TreeNode | null>(null);

  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);
  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const prevDataRef = useRef<any>(null);
  const router = useRouter();
  const { showSaveComplete, showDeleteComplete, showUpdateComplete } = useModal();

  const { data } = useMenuTree(menuScope, 'ko');
  const { data: detailData } = useMenuManageDetail(selectedNode?.menuId || '', {
    enabled: !!selectedNode?.menuId,
  });

  const { create: createMenu } = useCreateMenu({});
  const { update: updateMenu } = useUpdateMenu({});
  const { delete: deleteMenu } = useDeleteMenu({});
  const { move: moveMenu } = useMoveMenu({});
  const { checkExistsMenu, isLoading } = useCheckExistsMenu({});

  const duplicateCheck = async (code: string) => {
    const result = await new Promise((resolve) => {
      checkExistsMenu({ menuScopeCode: menuScope, menuCode: code }, { onSuccess: resolve });
    });
    if (result) return DuplicateState.duplicated;
    return DuplicateState.ok;
  };

  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control, getValues } =
    useDynamicForm(formConfig);
  const typeWatch = useWatch({ control, name: 'deviceNames' });
  const prevTypeWatchRef = useRef<string[]>([]);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const initialFromValuesRef = useRef<any>(null);

  const handleOnSubmit = (node: any) => {
    const apiMappingKeys = [] as number[];
    node.apiMappingMenuList.forEach((i: any) => apiMappingKeys.push(i.apiId));
    if (formMode === FORM_MODE.VIEW) {
      const updateData = {
        ...node,
        menuCode: node.code.fieldValue,
        menuId: selectedNode?.menuId,
        isWebExposed: node.deviceNames.includes(DEVICE_NAME.PC),
        isMobileExposed: node.deviceNames.includes(DEVICE_NAME.Mobile),
        apiMappingMenuList: apiMappingKeys,
        sortOrder: node.sortOrder,
        menuScope: menuScope,
      };
      update(updateData);
    } else if (formMode === FORM_MODE.ADD) {
      //
      const createData = {
        ...node,
        menuCode: node.code.fieldValue,
        parentId: parentNode?.menuId,
        isWebExposed: node.deviceNames.includes(DEVICE_NAME.PC),
        isMobileExposed: node.deviceNames.includes(DEVICE_NAME.Mobile),
        apiMappingMenuList: apiMappingKeys,
        sortOrder:
          parentNode?.children && parentNode.children.length > 0
            ? parentNode.children.length + 1
            : 1,
        menuScope: menuScope,
      };
      create(createData);
    }
  };

  useEffect(() => {
    if (typeWatch && detailData && formMode !== FORM_MODE.NONE) {
      const data = detailData as MenuDetail;
      const { parentId } = data;
      
      if (parentId !== null) {
        if (typeWatch.length === 0) {
          openAlert({
            content: t('LABEL.form.validation.selectAtLeastCount', { count: 1 }),
          });
          fetchData({ ...getValues(), deviceNames: prevTypeWatchRef.current });
        } else {
          prevTypeWatchRef.current = typeWatch;
        }
      }
    }
  }, [typeWatch]);

  useEffect(() => {
    if (data) {
      prevDataRef.current = data;

      const transformedData = transformApiDataToTreeData(data, menuScope);
      setTreeData(transformedData);

      if (lastCreatedMenuId) {
        // 새로 생성된 메뉴 노드 찾기
        const newNode = findNodeByMenuId(transformedData, lastCreatedMenuId);
        if (newNode) {
          // 노드 경로 찾기 (부모 노드들의 키)
          const nodePath = findNodePath(transformedData, lastCreatedMenuId);
          if (nodePath) {
            // 부모 노드들을 펼치기 위해 expandedKeys 업데이트
            // 마지막 노드(새로 생성된 노드)는 제외하지 않고 모두 포함
            setExpandedKeys((prev) => {
              const combined = [...new Set([...prev, ...nodePath])];
              return combined;
            });
            // 새 노드 선택
            setSelectedNode(newNode);
            setFormMode(FORM_MODE.VIEW);
            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        }
      }
    }
  }, [data, lastCreatedMenuId]);

  useEffect(() => {
    if (detailData && treeData) {
      if (formMode === FORM_MODE.VIEW) {
        const data = detailData as MenuDetail;
        const location = selectedNode && findMenuPathById(treeData, selectedNode.menuId);
        const deviceNames = [];
        if (data.isWebExposed) deviceNames.push(DEVICE_NAME.PC);
        if (data.isMobileExposed) deviceNames.push(DEVICE_NAME.Mobile);
        const formData = {
          ...data,
          location: location,
          code: { fieldValue: data.menuCode, checkState: DuplicateState.okStart },
          deviceNames: deviceNames,
        };
        fetchData({ ...formData });
        initialFromValuesRef.current = { ...formData };
        prevTypeWatchRef.current = deviceNames;
        setFormMode(FORM_MODE.VIEW);
      }
    }
  }, [detailData, formMode]);

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    setSelectedNode(node);
    if (node) {
      setFormMode(FORM_MODE.VIEW);
    } else {
      setFormMode(FORM_MODE.NONE);
    }
  };

  const addNode = (node: any) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });

    setParentNode(node);
    const location = findMenuPathById(treeData, node.menuId);
    fetchData({
      ...initData,
      location: location,
      parentCode: node.menuCode,
      deviceNames: ['PC'],
    });

    setFormMode(FORM_MODE.ADD);
  };

  const columns = [
    columnHelper.accessor('apiName', {
      cell: (info: CellContext<any, string>) => {
        const rowData = info.row.original;
        return (
          <p
            className="cursor-pointer underline"
            onClick={() => {
              openModal({
                content: <ApiInfoModal apiId={rowData.apiUuid} />,
                width: 's',
                closeOnOutsideClick: true,
              });
            }}
          >
            {info.getValue()}
          </p>
        );
      },
      header: 'API',
      // size: 490,
      size: 400,
      meta: { size: 'auto' },
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => {
        return (
          <Button
            onClick={() => {
              const rowData = info.row.original;
              const currentApiList = getValues('apiMappingMenuList') || [];
              const updatedApiList = currentApiList.filter(
                (item: any) => item.apiId !== rowData.apiId,
              );
              fetchData({ ...getValues(), apiMappingMenuList: updatedApiList });
            }}
            variant="gray2"
            size={'xs'}
            type={'button'}
          >
            {t('LABEL.button.delete')}
          </Button>
        );
      },
      header: t('LABEL.grid.header.remove'),
      size: 100,
      meta: {
        // size: 'auto',
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const handleApiMapping = async () => {
    const selectedApiKeys = getValues('apiMappingMenuList');
    const keyArray = selectedApiKeys.map((item: TreeNode) => item.apiUuid.toString());

    const selectApis = await openModal({
      content: <MenuApiMappingModal menuScopeCode={menuScope} selectedApiKeys={keyArray} />,
      width: 'xl',
    });
    fetchData({ ...getValues(), apiMappingMenuList: [...selectApis] });
  };

  const update = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.modify.title'),
      content: t('LABEL.confirm.modify.message'),
      onClose: (value: boolean) => {
        if (value) {
          updateMenu(payload, {
            onSuccess: async (data: any) => {
              showUpdateComplete();
              if (data && data.menuId) {
                setSelectedNode(null);
                setLastCreatedMenuId(data.menuId.toString());
              }
            },
          });
        }
      },
    });
  };

  const create = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: t('LABEL.confirm.save.message'),
      onClose: (value: boolean) => {
        if (value) {
          createMenu(payload, {
            onSuccess: async (data: any) => {
              showSaveComplete();
              if (data && data.menuId) {
                setLastCreatedMenuId(data.menuId.toString());
              }
            },
          });
        }
      },
    });
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        if (nodeInfo.position === 'INSIDE') {
          const payload = {
            menuId: nodeInfo.sourceNode.menuId,
            destinationParentId: nodeInfo.targetNode?.menuId,
            sortOrder: 1,
            menuScopeCode: menuScope,
          };
          moveMenu(payload);
        } else {
          const targetIndex = nodeInfo.targetIndex!;
          const payload = {
            menuId: nodeInfo.sourceNode.menuId,
            destinationParentId: nodeInfo.targetNode?.parentKey,
            sortOrder: targetIndex + 1,
            menuScopeCode: menuScope,
          };
          moveMenu(payload);
        }

        break;
      }
    }
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addNode(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
          disabled={level >= 5}
        >
          {level === 0 ? t('LABEL.menu.add') : t('LABEL.menu.addSub')}
        </Button>
      </div>
    </div>
  );

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const handleReset = async () => {
    const isReset = await openConfirm({
      title: t('LABEL.confirm.reset.title'),
    });
    if (isReset) {
      onFormChange();
      if (FORM_MODE.ADD === formMode) {
        fetchData({ apiMappingMenuList: [] });
      } else if (FORM_MODE.VIEW === formMode) {
        if (initialFromValuesRef.current) fetchData({ ...initialFromValuesRef.current });
      }
    }
  };

  const handleDelete = () => {
    openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: t('LABEL.confirm.delete.message', { type: t('LABEL.common.code.menu') }),
      onClose: (value: boolean) => {
        const payload = {
          menuId: selectedNode?.menuId,
        };
        if (value && payload) {
          deleteMenu(payload, {
            onSuccess: async (data: any) => {
              showDeleteComplete();
              setSelectedNode(null);
              clearAllFormErrors();
              const initData: { [key: string]: any } = {};
              formConfig.builders.forEach((item) => {
                initData[item.name] = item.value;
              });
              fetchData({ ...initData });
              setFormMode(FORM_MODE.NONE);
            },
          });
        }
      },
    });
  };

  return (
    <>
      <TreeContainer>
        <TreeBox
          title={t('LABEL.menu.list')}
          data={treeData}
          treeId={'menu-tree'}
          expandedKeys={expandedKeys}
          onExpandedKeysChange={handleExpandChange}
          renderNodeButtons={renderNodeButtons}
          onAction={handleTreeAction}
          type={'DRAG_DROP'}
          selectedNode={selectedNode}
          initLevel={1}
          handleSelectedNodeChange={handleSelectedNodeChange}
          maxDepth={5}
          isSelectableNode={(node: TreeNode) => {
            return node && node.level !== 0;
          }}
        />
      </TreeContainer>
      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{t('LABEL.menu.info')}</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button
                type="button"
                variant="text"
                size="sm"
                onClick={handleReset}
                disabled={formMode === FORM_MODE.NONE}
                className={layoutStyles.btn_text}
              >
                {t('LABEL.button.reset')}
              </Button>
              <Button
                variant="text"
                size="sm"
                disabled={formMode === FORM_MODE.NONE || formMode === FORM_MODE.ADD}
                onClick={handleDelete}
                className={layoutStyles.btn_text}
                icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button type="submit" variant="save" size="sm" disabled={formMode === FORM_MODE.NONE}>
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          {/* 폼 필드 - location (비활성화 상태) */}

          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'location'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'parentCode'}
                element={<Input disabled={true} hiddenPlaceholder={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            {/* 폼 필드 - code */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'code'}
                element={
                  <DuplicateCheckInputFormField
                    onDuplicationCheck={duplicateCheck}
                    disabled={formMode === FORM_MODE.NONE}
                    inputType={'alphanumeric'}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>

            {/* 폼 필드 - title */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'menuName'}
                element={
                  <Input
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              >
                <Button
                  type="button"
                  variant="gray"
                  size="sm"
                  disabled={formMode !== FORM_MODE.VIEW}
                  onClick={() => {
                    const menuCode = getValues('menuCode');
                    const menuName = getValues('menuName');
                    router.navigate({
                      to: '/platform/system/multilingual',
                      state: {
                        keyType: menuScope === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
                        multilingualKey: menuCode,
                        translation: menuName,
                      },
                    });
                  }}
                >
                  {t('LABEL.button.multilingualManage')}{' '}
                </Button>
              </FormRow>
            </ContentsRow>

            {/* 폼 필드 - url */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'path'}
                element={
                  <Input
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>

            {/* 폼 필드 - description */}
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'menuDesc'}
                element={
                  <Textarea
                    disabled={formMode === FORM_MODE.NONE}
                    hiddenPlaceholder={formMode === FORM_MODE.NONE}
                  />
                }
              />
            </ContentsRow>

            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow
                provider={provider}
                name={'isHiddenMenu'}
                element={<SwitchFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'deviceNames'}
                element={<CheckboxGroupFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>

            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow
                provider={provider}
                name={'isPersoninfoInclusion'}
                element={<SwitchFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>
            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow
                provider={provider}
                name={'isUsed'}
                element={<SwitchFormField disabled={formMode === FORM_MODE.NONE} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'apiMappingMenuList'}
                element={
                  <GridBox
                    data={getValues('apiMappingMenuList') || []}
                    columns={columns}
                    showTotalCount={true}
                    title={t('API')}
                    clientSideSorting={true}
                    customButtonNode={
                      <Button
                        variant="text"
                        onClick={() => handleApiMapping()}
                        disabled={formMode === FORM_MODE.NONE}
                        className={layoutStyles.btn_text}
                        icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
                      >
                        {t('LABEL.grid.header.add')}
                      </Button>
                    }
                  />
                }
              />
            </ContentsRow>
          </div>
        </form>
      </div>
    </>
  );
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'location',
      type: 'text',
      label: t('LABEL.menu.location'),
      value: '',
    },
    {
      label: t('LABEL.menu.parentName'),
      name: 'parentCode',
      type: 'text',
      value: '',
    },
    {
      label: t('LABEL.menu.code'),
      name: 'code',
      type: 'custom',
      format: 'object',
      maxLength: 150,
      value: { fieldValue: '', checkState: DuplicateState.needInput },
    },
    {
      label: t('LABEL.menu.name'),
      name: 'menuName',
      type: 'text',
      maxLength: 10,
      value: '',
    },
    {
      label: t('LABEL.menu.url'),
      name: 'path',
      type: 'text',
      maxLength: 50,
      value: '',
    },
    {
      label: t('LABEL.menu.personalInfo'),
      tooltip: t('LABEL.menu.personalInfoTooltip'),
      name: 'isPersoninfoInclusion',
      type: 'switch',
      switchConfig: {
        label: (value: boolean) =>
          value ? t('LABEL.menu.personalInfo') : t('LABEL.menu.personalInfoNotIncluded'),
      },
      value: false,
    },
    {
      label: t('LABEL.menu.hide'),
      tooltip: t('LABEL.menu.hideTooltip'),
      name: 'isHiddenMenu',
      type: 'switch',
      switchConfig: {
        label: (value: boolean) => (value ? t('LABEL.common.enable') : t('LABEL.common.disable')),
      },
      value: false,
    },
    {
      label: t('LABEL.menu.description'),
      name: 'menuDesc',
      type: 'textarea',
      maxLength: 100,
      value: '',
    },

    {
      name: 'deviceNames',
      type: 'checkbox-group',
      label: t('LABEL.menu.device'),
      format: 'array',
      value: [],
      options: [
        {
          value: DEVICE_NAME.PC,
          label: t('LABEL.menu.pc'),
        },
        {
          value: DEVICE_NAME.Mobile,
          label: t('LABEL.menu.mobile'),
        },
      ],
    },

    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('LABEL.common.enable') : t('LABEL.common.disable')),
      },
    },
    {
      name: 'apiMappingMenuList',
      type: 'custom',
      format: 'array',
      value: [],
    },
  ],
  validator: {
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
          message: t('LABEL.form.validation.needInput', { code: t('LABEL.cdId') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.code.checkState === DuplicateState.check ||
            values.code.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('LABEL.cdId') }),
        },
        {
          fn: (values: Record<string, any>) => values.code.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('LABEL.cdId') }),
        },
      ],
    },
    menuName: {
      required: true,
    },
    // path: {
    //   required: true,
    // },
    deviceNames: {
      required: {
        fn: (values) => {
          return !values.isMobileExposed && !values.isWebExposed;
        },
        message: t('LABEL.form.validation.selectAtLeastCount', { count: 1 }),
      },
    },
  },
};
