import {
  queryKeys,
  useCheckExistsMenu,
  useCreateMenu,
  useDeleteMenu,
  useMenuManageDetail,
  useMenuTree,
  useMoveMenu,
  useUpdateMenu,
} from '@entities/menu';

import { EnFormMode } from '@shared/types/enums';
import { DuplicateCheckInputFormField, SwitchFormField } from '@shared/ui/form';
import { DuplicateState } from '@shared/ui/form/ui/duplicate-check-input-form-field';

import { useDynamicForm2 } from '@learnway/hooks';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormRow2 } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { CheckboxGroupFormField } from '@learnway/ui/form-field';
import { GridBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import {
  findNodePath,
  TreeBox,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
} from '@learnway/ui/tree-view';
import { ApiMappingMenuDetail, MenuDetail } from '@shared/types/menu';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
  findMenuPathById,
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '../service/menu.service';
import { ApiInfoModal } from './api-info-modal';
import { MenuApiMappingModal } from './menu-api-mapping-modal';

const DEVICE_NAME = {
  PC: 'PC',
  Mobile: 'Mobile',
} as const;

const MAX_MENU_DEPTH = 5;
const INITIAL_FORM_DATA = {
  location: '',
  parentCode: '',
  code: { fieldValue: '', checkState: DuplicateState.needInput },
  menuName: '',
  path: '',
  menuDesc: '',
  isHiddenMenu: false,
  deviceNames: [] as string[],
  isPersoninfoInclusion: false,
  isUsed: true,
  apiMappingMenuList: [],
};

const columnHelper = createColumnHelper<any>();

export const MenuManage = ({ menuScope }: { menuScope: string }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [parentNode, setParentNode] = useState<TreeNode | null>(null);

  const [formMode, setFormMode] = useState<EnFormMode>(EnFormMode.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);
  const { openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const prevDataRef = useRef<any>(null);
  const router = useRouter();
  const { showSaveComplete, showDeleteComplete, showUpdateComplete } = useModal();

  const { data, isLoading, isFetching } = useMenuTree(menuScope, 'ko');
  const { data: detailData } = useMenuManageDetail(selectedNode?.menuId || '');

  const { create: createMenu } = useCreateMenu({});
  const { update: updateMenu } = useUpdateMenu({});
  const { delete: deleteMenu } = useDeleteMenu({});
  const { move: moveMenu } = useMoveMenu({});
  const { checkExists } = useCheckExistsMenu();

  const queryClient = useQueryClient();

  const duplicateCheck = useCallback(
    async (code: string) => {
      try {
        if (!menuScope || !code) {
          return DuplicateState.needInput;
        }
        const result = await checkExists(menuScope, code);
        return result ? DuplicateState.duplicated : DuplicateState.ok;
      } catch (error) {
        return DuplicateState.needInput;
      }
    },
    [menuScope, checkExists],
  );

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    clearFormError,
    control,
    getValues,
    setFormError,
    clearAllValidators,
  } = useDynamicForm2();
  const typeWatch = useWatch({ control, name: 'deviceNames' });
  const prevTypeWatchRef = useRef<string[]>([]);

  const initialFromValuesRef = useRef<any>(null);

  const handleOnSubmit = (node: Record<string, any>) => {
    const apiMappingKeys = [] as number[];
    if (node?.apiMappingMenuList) {
      node.apiMappingMenuList.forEach((i: ApiMappingMenuDetail) => {
        const { apiId } = i;
        if (apiId) {
          apiMappingKeys.push(apiId);
        }
      });
    }
    if (formMode === EnFormMode.VIEW) {
      const updateData = {
        ...node,
        menuCode: node.code && node.code.fieldValue,
        menuId: selectedNode?.menuId,
        isWebExposed: node.deviceNames && node.deviceNames.includes(DEVICE_NAME.PC),
        isMobileExposed: node.deviceNames && node.deviceNames.includes(DEVICE_NAME.Mobile),
        apiMappingMenuList: apiMappingKeys,
        sortOrder: node.sortOrder,
        menuScope,
      };
      update(updateData);
    } else if (formMode === EnFormMode.ADD) {
      //
      const createData = {
        ...node,
        menuCode: node.code && node.code.fieldValue,
        parentId: parentNode?.menuId,
        isWebExposed: node.deviceNames && node.deviceNames.includes(DEVICE_NAME.PC),
        isMobileExposed: node.deviceNames && node.deviceNames.includes(DEVICE_NAME.Mobile),
        apiMappingMenuList: apiMappingKeys,
        sortOrder:
          parentNode?.children && parentNode.children.length > 0
            ? parentNode.children.length + 1
            : 1,
        menuScope,
      };
      create(createData);
    }
  };

  useEffect(() => {
    if (typeWatch && detailData && formMode !== EnFormMode.NONE) {
      const data = detailData as MenuDetail;
      const { parentId } = data;

      if (parentId !== null) {
        if (typeWatch.length === 0 && prevTypeWatchRef.current.length > 0) {
          openAlert({
            content: t('LABEL.form.validation.selectAtLeastCount', { count: 1 }),
          });
          updateFormData({ ...getValues(), deviceNames: prevTypeWatchRef.current });
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
            setFormMode(EnFormMode.VIEW);
            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        }
      }
    }
  }, [data, lastCreatedMenuId]);

  useEffect(() => {
    if (detailData && treeData) {
      if (formMode === EnFormMode.VIEW) {
        const data = detailData as MenuDetail;
        const deviceNames = [];
        if (data.isWebExposed) deviceNames.push(DEVICE_NAME.PC);
        if (data.isMobileExposed) deviceNames.push(DEVICE_NAME.Mobile);
        const formData = {
          ...data,
          apiMappingMenuList: data?.apiMappingMenuList ?? [],
          location: detailData.fullPath,
          parentCode: data.parentName,
          code: { fieldValue: data.menuCode, checkState: DuplicateState.okStart },
          deviceNames,
        };
        updateFormData({ ...formData });
        initialFromValuesRef.current = { ...formData };
        prevTypeWatchRef.current = deviceNames;
        setFormMode(EnFormMode.VIEW);
      }
    }
  }, [detailData, formMode]);

  const handleSelectedNodeChange = useCallback(
    async (node: TreeNode | null) => {
      clearAllValidators();
      setSelectedNode(node);

      if (node) {
        setFormMode(EnFormMode.VIEW);
      } else {
        setFormMode(EnFormMode.NONE);
        initialFromValuesRef.current = null;
      }
    },
    [clearAllValidators],
  );

  const addNode = useCallback(
    async (node: any) => {
      clearAllValidators();
      setParentNode(node);

      const location = findMenuPathById(treeData, node.menuId);
      const addFormData = {
        ...INITIAL_FORM_DATA,
        location,
        parentCode: node.title,
        deviceNames: ['PC'],
      };

      updateFormData(addFormData);
      initialFromValuesRef.current = { ...addFormData };
      setFormMode(EnFormMode.ADD);
    },
    [clearAllValidators, treeData, updateFormData],
  );

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
              updateFormData({ ...getValues(), apiMappingMenuList: updatedApiList });
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
    const keyArray =
      selectedApiKeys && selectedApiKeys.map((item: TreeNode) => item.apiUuid.toString());

    const selectApis = await openModal({
      content: <MenuApiMappingModal menuScopeCode={menuScope} selectedApiKeys={keyArray} />,
      width: 'xl',
      height: 'fix',
    });
    updateFormData({ ...getValues(), apiMappingMenuList: [...selectApis] });
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

  const calculateSortOrder = (nodeInfo: any) => {
    if (nodeInfo.position === 'INSIDE') {
      // 타겟 노드의 자식으로 이동 - 항상 첫 번째 자식이 되도록
      return 1;
    }

    const sourceNode = nodeInfo.sourceNode;
    const targetNode = nodeInfo.targetNode;

    if (!targetNode || !targetNode.sortOrder) {
      // targetNode의 sortOrder가 없으면 targetIndex 기반으로 계산
      return nodeInfo.position === 'BEFORE' ? nodeInfo.targetIndex + 1 : nodeInfo.targetIndex + 2;
    }

    // 같은 부모 내에서 이동하는 경우, 소스와 타겟의 sortOrder 관계를 고려
    const sourceSortOrder = sourceNode.sortOrder || 0;
    const targetSortOrder = targetNode.sortOrder;
    const sameParent = sourceNode.parentKey === targetNode.parentKey;

    if (nodeInfo.position === 'BEFORE') {
      // 타겟 노드 앞에 삽입
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 -1 보정
        return targetSortOrder - 1;
      }
      return targetSortOrder;
    } else {
      // 타겟 노드 뒤에 삽입 (AFTER)
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 보정 없이 타겟 순서 사용
        return targetSortOrder;
      }
      return targetSortOrder + 1;
    }
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_MOVE': {
        const nodeInfo = event;
        const sortOrder = calculateSortOrder(nodeInfo);

        const payload = {
          menuId: nodeInfo.sourceNode.menuId,
          destinationParentId:
            nodeInfo.position === 'INSIDE'
              ? nodeInfo.targetNode?.menuId
              : nodeInfo.targetNode?.parentKey,
          sortOrder,
          menuScopeCode: menuScope,
        };

        moveMenu(payload, {
          onSuccess: async () => {
            if (selectedNode?.menuId) {
              await queryClient.invalidateQueries({
                queryKey: [...queryKeys.detail(selectedNode.menuId)],
              });
            }
          },
        });

        break;
      }
    }
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            await addNode(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
          disabled={level >= MAX_MENU_DEPTH}
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
      if (EnFormMode.ADD === formMode) {
        updateFormData({ apiMappingMenuList: [] });
      } else if (EnFormMode.VIEW === formMode) {
        if (initialFromValuesRef.current) updateFormData({ ...initialFromValuesRef.current });
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
            onSuccess: async () => {
              showDeleteComplete();
              setSelectedNode(null);
              clearAllValidators();
              updateFormData({ ...INITIAL_FORM_DATA });
              setFormMode(EnFormMode.NONE);
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
          maxDepth={MAX_MENU_DEPTH}
          isSelectableNode={(node: TreeNode) => {
            return node && node.level !== 0;
          }}
          isLoading={isLoading || isFetching}
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
                disabled={formMode === EnFormMode.NONE}
                className={layoutStyles.btn_text}
              >
                {t('LABEL.button.reset')}
              </Button>
              <Button
                variant="text"
                size="sm"
                disabled={formMode === EnFormMode.NONE || formMode === EnFormMode.ADD}
                onClick={handleDelete}
                className={layoutStyles.btn_text}
                icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
              >
                {t('LABEL.button.delete')}
              </Button>
              <Button
                type="submit"
                variant="save"
                size="sm"
                disabled={formMode === EnFormMode.NONE}
              >
                {t('LABEL.button.save')}
              </Button>
            </div>
          </div>
          {/* 폼 필드 - location (비활성화 상태) */}

          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'location'}
                label={t('LABEL.menu.location')}
                value={''}
                element={<Input disabled={true} hiddenPlaceholder={formMode === EnFormMode.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'parentCode'}
                label={t('LABEL.menu.parentName')}
                value={''}
                element={<Input disabled={true} hiddenPlaceholder={formMode === EnFormMode.NONE} />}
              />
            </ContentsRow>

            {/* 폼 필드 - code */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'code'}
                label={t('LABEL.menu.code')}
                format={'object'}
                maxLength={150}
                value={{ fieldValue: '', checkState: DuplicateState.needInput }}
                element={
                  <DuplicateCheckInputFormField
                    id="code"
                    onDuplicationCheck={duplicateCheck}
                    disabled={formMode === EnFormMode.NONE}
                    type={'alphanumeric'}
                    hiddenPlaceholder={formMode === EnFormMode.NONE}
                    validation={{
                      onError: (msg: string) => {
                        setFormError('code', msg);
                      },
                      onSuccess: () => clearFormError('code'),
                    }}
                  />
                }
                validation={{
                  format: 'object',
                  required: true,
                  conditions: [
                    {
                      fn: (values: Record<string, any>) => {
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
                      fn: (values: Record<string, any>) =>
                        values.code.checkState === DuplicateState.duplicated,
                      message: t('LABEL.form.validation.duplicated', { code: t('LABEL.cdId') }),
                    },
                  ],
                }}
              />
            </ContentsRow>

            {/* 폼 필드 - title */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'menuName'}
                label={t('LABEL.menu.name')}
                maxLength={10}
                value={''}
                element={
                  <Input
                    disabled={formMode === EnFormMode.NONE}
                    hiddenPlaceholder={formMode === EnFormMode.NONE}
                  />
                }
                validation={{ required: true }}
              >
                <Button
                  type="button"
                  variant="gray"
                  size="sm"
                  disabled={formMode !== EnFormMode.VIEW}
                  onClick={() => {
                    const menuCode = getValues('menuCode');
                    const menuName = getValues('menuName');
                    router.navigate({
                      to: '/platform/system/multilingual',
                      state: {
                        keyType: menuScope === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
                        isMenuEntry: true,
                        multilingualKey: menuCode,
                        translation: menuName,
                      },
                    });
                  }}
                >
                  {t('LABEL.button.multilingualManage')}{' '}
                </Button>
              </FormRow2>
            </ContentsRow>

            {/* 폼 필드 - url */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'path'}
                label={t('LABEL.menu.url')}
                maxLength={50}
                value={''}
                element={
                  <Input
                    id="path"
                    disabled={formMode === EnFormMode.NONE}
                    hiddenPlaceholder={formMode === EnFormMode.NONE}
                    type={'url'}
                    validation={{
                      onError: (msg) => setFormError('path', msg),
                      onSuccess: () => clearFormError('path'),
                    }}
                  />
                }
              />
            </ContentsRow>

            {/* 폼 필드 - description */}
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'menuDesc'}
                label={t('LABEL.menu.description')}
                maxLength={100}
                value={''}
                element={
                  <Textarea
                    disabled={formMode === EnFormMode.NONE}
                    hiddenPlaceholder={formMode === EnFormMode.NONE}
                    inputType={'koreanPlus'}
                  />
                }
              />
            </ContentsRow>

            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow2
                provider={provider}
                name={'isHiddenMenu'}
                label={t('LABEL.menu.hide')}
                tooltip={t('LABEL.menu.hideTooltip')}
                value={false}
                element={<SwitchFormField disabled={formMode === EnFormMode.NONE} />}
              />
            </ContentsRow>

            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'deviceNames'}
                label={t('LABEL.menu.device')}
                format={'array'}
                value={[]}
                element={<CheckboxGroupFormField disabled={formMode === EnFormMode.NONE} />}
                options={[
                  {
                    value: DEVICE_NAME.PC,
                    label: t('LABEL.menu.pc'),
                  },
                  {
                    value: DEVICE_NAME.Mobile,
                    label: t('LABEL.menu.mobile'),
                  },
                ]}
                validation={{
                  required: {
                    fn: (values: Record<string, any>) => {
                      return !values.isMobileExposed && !values.isWebExposed;
                    },
                    message: t('LABEL.form.validation.selectAtLeastCount', { count: 1 }),
                  },
                }}
              />
            </ContentsRow>

            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow2
                provider={provider}
                name={'isPersoninfoInclusion'}
                label={t('LABEL.menu.personalInfo')}
                tooltip={t('LABEL.menu.personalInfoTooltip')}
                value={false}
                element={<SwitchFormField disabled={formMode === EnFormMode.NONE} />}
              />
            </ContentsRow>
            <ContentsRow type={'horizontal'} className={'inactive'}>
              <FormRow2
                provider={provider}
                name={'isUsed'}
                label={t('사용 여부')}
                value={true}
                element={<SwitchFormField disabled={formMode === EnFormMode.NONE} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'apiMappingMenuList'}
                format={'array'}
                value={[]}
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
                        disabled={formMode === EnFormMode.NONE}
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
