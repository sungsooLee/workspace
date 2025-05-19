import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';

import { FormTranslationBox } from '@features/platform/ui/platform/system/translation/form-translation-box';

import {
  Button,
  ContentsRow,
  DynamicFormField,
  GridBox,
  TreeContainer,
  TreeNode,
  TreeView,
  useModal,
} from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { ContentsHistoryInfoFormField, FormRow } from '@shared/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { EnFormMode } from '@types';
import { TenantDetailMenuMappingModal } from './tenant-detail-menu-mapping-modal';
/** Hook 정의 */
import {
  useChangeMenuTenentDnd,
  useDeleteMenuTenent,
  useFetchMenuTenantDetail,
  useFetchMenuTenantMappingTree,
  useUpdateMenuTenant,
} from '@entities/tenant/service/tenant-menu-manage.hook';
/** method import */
import { findMenuPathById } from '@features/platform/menu/service/menu.service';
import {
  getAllTreeKeys,
  getFirstExpandKeys,
  moveNodeCheck,
  transformMenuApiDataToTreeData,
} from '../service/tenant-detail-tree.service';

// import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { useTabContainStatusContext } from '@learnway/hooks';
import { ApiInfoModal } from '@features/platform/menu/ui/api-info-modal';

const DIVICE_NAME = {
  PC: 'PC',
  Mobile: 'Mobile',
};

const TenantDetailMenuTreeComponent: FC<any> = ({ menuScope, roleInfo }) => {
  const routerState = useRouterState();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [apiMappingMenuList, setApiMappingMenuList] = useState([]);
  const tenantId = routerState.location.state?.tenantId;

  const {
    provider,
    fetchData,
    onSubmit,
    onFormChange,
    getValues,
    formState,
    clearFormError,
    control,
  } = useDynamicForm(formConfig);
  const { onChangeDirtyForm } = useTabContainStatusContext();
  const { open: openModal, confirm: openConfirm } = useModal();

  // fetch data
  const { data: detailData, refetch: refetchDetail } = useFetchMenuTenantDetail(
    selectedNode?.tenantMappingMenuId || undefined,
  );
  const { data: menuData, refetch: refetchMenuTree } = useFetchMenuTenantMappingTree(
    tenantId,
    menuScope,
  );
  const { delete: deleteMenuTenent } = useDeleteMenuTenent(tenantId, menuScope, {
    onSuccess: () => {
      refetchMenuTree();
    },
  });
  const { update: updateMenuTenent } = useUpdateMenuTenant(tenantId, menuScope, {});
  const { change: changeMenuPosition } = useChangeMenuTenentDnd(tenantId, menuScope, {
    onSuccess: () => {
      refetchMenuTree();
    },
  });
  const columnHelper = createColumnHelper<any>();

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };
  const handleSelectedNodeChange = (node: TreeNode | null) => {
    if (node && node.key !== '1') {
      setSelectedNode(node);
      if (node) {
        setFormMode(EnFormMode.VIEW);
      } else {
        setFormMode(EnFormMode.NONE);
      }
    }
  };
  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        {
          console.log('devents ', events);
          const payload = moveNodeCheck(events);
          if (payload) {
            payload.menuScopeCode = menuScope;
            console.log('dsend', payload);
            changeMenuPosition(payload);
          }
        }
        break;
    }
  };
  const handleTenantDetailMenuMapping = async () => {
    const modalScope = menuScope;
    const modalTenantId = tenantId;
    await openModal({
      content: <TenantDetailMenuMappingModal menuScopeCode={modalScope} tenantId={modalTenantId} />,
      width: 'xl',
    });
  };

  const handleDeleteMenuTenant = () => {
    openConfirm({
      title: t('삭제 하시겠습니까?'),
      content: (
        <>
          <p>{t('하위 메뉴 존재 시 모두 삭제되며,')}</p>
          <p>{t('삭제 후 복구할 수 없습니다.')}</p>
        </>
      ),
      onClose: (value: boolean) => {
        if (value) {
          const payload = { ...selectedNode };
          console.log('delete!', payload);
          deleteMenuTenent(payload);
          setFormMode(EnFormMode.NONE);
        }
      },
    });
  };

  const handleUpdateMenuTenant = () => {
    openConfirm({
      title: t('저장 하시겠습니까?'),
      content: <p>{t('입력한 정보로 저장됩니다.')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          const payload = { ...getValues() };
          payload.isWebExposed = payload.deviceNames.includes(DIVICE_NAME.PC);
          payload.isMobileExposed = payload.deviceNames.includes(DIVICE_NAME.Mobile);
          payload.tenantId = tenantId;
          payload.parentMenuId = payload.parentId;
          updateMenuTenent(payload, {
            onSuccess: () => {
              refetchDetail();
            },
          });
        }
      },
    });
  };

  useEffect(() => {
    if (menuData) {
      console.log(menuData);
      const transformedData = transformMenuApiDataToTreeData(menuData);
      setTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [menuData]);

  useEffect(() => {
    if (detailData) {
      const location = findMenuPathById(treeData, detailData?.menuId);
      const deviceNames = [];
      if (detailData.isWebExposed) {
        deviceNames.push(DIVICE_NAME.PC);
      }
      if (detailData.isMobileExposed) {
        deviceNames.push(DIVICE_NAME.Mobile);
      }
      setApiMappingMenuList(detailData.apiMappingMenuList);
      fetchData({
        ...detailData,
        deviceNames: deviceNames,
        location: location,
      });
      setFormMode(EnFormMode.VIEW);
    }
  }, [detailData]);

  console.log('formDirty1', formState.isDirty);
  useEffect(() => {
    console.log('formDirty', formState.isDirty);
    // onChangeDirtyForm(formState.isDirty);
  }, [formState]);

  const columns = [
    columnHelper.accessor('apiName', {
      cell: (info) => info.getValue(),
      header: t('분류'),
      size: 120,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('apiId', {
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
      size: 490,
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
            삭제
          </Button>
        );
      },
      header: '삭제',
      size: 100,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('테넌트 메뉴 목록')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                if (treeData) {
                  const allKeys = getAllTreeKeys(treeData);
                  handleExpandChange(allKeys);
                }
              }}
            >
              {t('전체펼침')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                const firstKeys = getFirstExpandKeys(treeData);
                handleExpandChange(firstKeys || []);
              }}
            >
              {t('전체닫기')}
            </Button>
            {roleInfo === 'PLATFORM' && (
              <Button variant="save" size="sm" onClick={() => handleTenantDetailMenuMapping()}>
                {t('메뉴 맵핑')}
              </Button>
            )}
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView
              treeId="tenant-menu-tree"
              type={'SAME_LEVEL_ONLY'}
              data={treeData}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              onAction={handleTreeAction}
              onExpandedKeysChange={handleExpandChange}
              onSelectedNodeChange={handleSelectedNodeChange}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('메뉴 정보')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => onFormChange()}
              disabled={EnFormMode.NONE === formMode}
            >
              {t('초기화')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              disabled={EnFormMode.VIEW !== formMode}
              onClick={handleDeleteMenuTenant}
            >
              {t('삭제')}
            </Button>
            <Button
              variant="save"
              size="sm"
              disabled={EnFormMode.NONE === formMode}
              onClick={handleUpdateMenuTenant}
            >
              {t('저장')}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="location" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="parentName" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="menuCode" disabled={true} />
              <Button variant="gray" size="sm" disabled>
                {t('중복')}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="menuName" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="path" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="menuDesc" disabled={EnFormMode.NONE === formMode} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type={'horizontal'}>
            <FormRow provider={provider}>
              <DynamicFormField name="isHiddenMenu" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="deviceNames" disabled={EnFormMode.NONE === formMode}>
                <FormTranslationBox />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow provider={provider}>
              <DynamicFormField name="isPersoninfoInclusion" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow provider={provider}>
              <DynamicFormField name="isUsed" disabled={EnFormMode.NONE === formMode} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="apiMappingMenuList">
                <GridBox
                  data={getValues('apiMappingMenuList') || []}
                  columns={columns}
                  showTotalCount={true}
                  title={t('API')}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

export const TenantDetailMenuTree = TenantDetailMenuTreeComponent;

// Form 구조 정의
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'location',
      type: 'text',
      label: t('위치'),
      value: '',
    },
    {
      name: 'path',
      type: 'text',
      label: t('메뉴 위치'),
      value: '',
    },
    {
      name: 'parentId',
      type: 'hidden',
      format: 'number',
      value: 0,
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위메뉴명'),
      value: '',
    },
    {
      name: 'menuCode',
      type: 'text',
      label: t('메뉴코드'),
      value: '',
    },
    {
      name: 'menuName',
      type: 'text',
      label: t('메뉴명'),
      value: '',
    },
    {
      name: 'menuDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
      size: 50,
    },
    {
      name: 'isHiddenMenu',
      tooltip: t(
        'Hidden메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.',
      ),
      type: 'switch',
      label: t('Hidden 메뉴'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('적용') : t('미적용')),
      },
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'deviceNames',
      type: 'checkbox-group',
      label: t('디바이스 노출 여부'),
      value: [],
      options: [
        { label: t('PC'), value: DIVICE_NAME.PC },
        { label: t('모바일'), value: DIVICE_NAME.Mobile },
      ],
    },
    {
      name: 'isPersoninfoInclusion',
      type: 'switch',
      label: t('게인정보'),
      tooltip: t('개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.'),
      switchConfig: { label: (value: boolean) => (value ? t('사용') : t('미사용')) },
      value: false,
    },
    {
      name: 'apiMappingMenuList',
      type: 'custom',
      format: 'array',
      value: [],
    },
  ],
  validator: {
    menuCode: { required: true },
    deviceNames: { required: true },
  },
};
