import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import {
  Button,
  Checkbox,
  GridBox,
  RadioGroup,
  RadioGroupFormField,
  TreeBox,
  TreeNode,
  useModal,
} from '@learnway/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CellContext, createColumnHelper, Table } from '@tanstack/react-table';
import { DATE_TIME_FORMAT, formatDate, getRandomId, getRowSelectionByList } from '@learnway/shared';

import { TenantDetailLearningRoleMenuMappingModal } from './tenant-detail-learning-role-menu-mapping-modal';

import {
  useFetchRoleTree,
  useFetchRoleMenus,
  useFetchMenuApis,
  useModifyMenusAndApiToRole,
} from '@entities/role/service/role-manage.hook';

import {
  getAllTreeKeys,
  getFirstExpandKeys,
  moveNodeCheck,
  transformRoleApiDataToTreeData,
  transformMenuApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import { EnFormMode, EnTenantScope, EnCompanyScope, EnChannelScope, EnDeptScope } from '@types';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('apiName', {
    cell: (info) => info.getValue(),
    header: '분류',
    size: 120,
  }),
  columnHelper.accessor('apiId', {
    cell: (info: CellContext<any, string>) => {
      const rowData = info.row.original;
      return <p className="cursor-pointer underline">{info.getValue()}</p>;
    },
    header: 'API',
    size: 490,
  }),
];
/**
 * 화면번호:
 * NLP_BO_TMS_1003_04_01(학습역할메뉴), NLP_BO_TMS_1003_04_04(HRD역할메뉴),
 * NLP_BO_PMS_1101 (플렛폼 학습역할메뉴), NLP_BO_PMS_1105 (플렛폼 HRD역할메뉴),
 * @param param0
 * @param ref
 * @returns
 */
export const TenantDetailLearningRoleMenuComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();

  const [roleTree, setRoleTree] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleMenuTree, setRoleMenuTree] = useState<TreeNode[]>([]);
  const [roleMenuTreeExpandedKeys, setRoleMenuTreeExpandedKeys] = useState<string[]>([]);
  const [selectedRoleMenu, setSelectedRoleMenu] = useState<any>(null);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const [menuSelectionType, setMenuSelectionType] = useState<'all' | 'custom'>('all');
  const [apiGridData, setApiGridData] = useState<any[]>([]);
  const [apiOriginalSelected, setApiOriginalSelected] = useState<any[]>();
  const [isDataModified, setIsDataModified] = useState<boolean>(false);

  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const { open: openModal, confirm: openConfirm } = useModal();

  const { data: roleData } = useFetchRoleTree(tenantId, siteScope);
  const { data: roleMenuData } = useFetchRoleMenus(
    tenantId,
    siteScope,
    selectedRole?.roleCode || '',
  );

  const { data: roleMenuApiData } = useFetchMenuApis(
    selectedRole?.roleCode || '',
    selectedRoleMenu?.menuId || '',
  );

  const { create: createApi } = useModifyMenusAndApiToRole({});

  const handleMenuSelectionTypeChange = (type: string) => {
    setMenuSelectionType(type === 'option01' ? 'all' : 'custom');
  };

  // 선택된 역할에 할당된 메뉴 ID 목록 가져오기
  const getRoleMenuIds = (roleId: string) => {
    return [];
  };

  // 선택된 메뉴에 속한 API ID 목록 가져오기
  const getMenuApiIds = (menuId: string) => {
    return [];
  };

  const handleRoleSelect = (node: TreeNode) => {
    setSelectedRole(node);
    setSelectedRoleMenu(null);
    setIsDataModified(false);
  };

  const handleMenuSelect = (node: TreeNode) => {
    setSelectedRoleMenu(node);
  };

  const handleRoleMenuMapping = async () => {
    const modalScope = siteScope;
    const modalTenantId = tenantId;
    const modalRoleCode = selectedRole.roleCode;
    await openModal({
      content: (
        <TenantDetailLearningRoleMenuMappingModal
          siteScope={modalScope}
          tenantId={modalTenantId}
          roleCode={modalRoleCode}
        />
      ),
      width: 'xl',
    });
  };
  const handleRightGridRowSelect = (selectedRow: any) => {
    console.log('selectedRow', selectedRow);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    if (!selectedRole) {
      alert('역할을 선택해주세요.');
      return;
    }
    const saveRows = tableInstance?.getSelectedRowModel().rows;

    if (saveRows && apiOriginalSelected) {
      const changeApis = saveRows.map((item) => {
        return item.original.apiId;
      });
      const addApis = [];
      const removeApis = [];
      for (const apiId of changeApis) {
        if (!apiOriginalSelected?.includes(apiId)) {
          addApis.push({
            menuId: selectedRoleMenu.menuId,
            apiId: apiId,
          });
        }
      }
      for (const apiId of apiOriginalSelected) {
        if (!changeApis.includes(apiId)) {
          removeApis.push({
            menuId: selectedRoleMenu.menuId,
            apiId: apiId,
          });
        }
      }
      if (addApis.length > 0 || removeApis.length > 0) {
        const payload = {
          roleCode: selectedRole.roleCode,
          body: {
            addMenuIds: [],
            removeMenuIds: [],
            addApis: addApis,
            removeApis: removeApis,
          },
        };
        console.log('payload', payload);
        createApi(payload);
      }
    }
    // // 역할-API 사용 여부 데이터 업데이트
    // roleApiUsageMockData[selectedRoleId] = { ...apiUsageState };

    // // 변경 사항 플래그 초기화
    // setIsDataModified(false);
  };

  // 역할에 할당된 메뉴 트리 생성
  const generateRoleMenuTree = (roleId: string) => {
    const assignedMenuIds = getRoleMenuIds(roleId);
  };

  const getAllMenuApiIdsForRole = (roleId: string) => {
    const menuIds = getRoleMenuIds(roleId);
    const apiIds = new Set<string>();

    menuIds.forEach((menuId: any) => {
      const menuApiIds = getMenuApiIds(menuId);
      menuApiIds.forEach((apiId: any) => apiIds.add(apiId));
    });

    return Array.from(apiIds);
  };

  useEffect(() => {
    if (roleData) {
      const transformedData = transformRoleApiDataToTreeData(roleData);
      setRoleTree(transformedData);
    }
  }, [roleData]);

  useEffect(() => {
    if (roleMenuData) {
      const transformedData = transformMenuApiDataToTreeData(roleMenuData);
      setRoleMenuTree(transformedData);
      if (transformedData && transformedData.length > 0 && roleMenuTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setRoleMenuTreeExpandedKeys(firstLevelKeys);
      }
      const root = transformedData[0];
      if (root && root.children.length > 0) {
        const firstNode = root.children[0];
        setSelectedRoleMenu(firstNode);
      }
    }
  }, [roleMenuData]);

  // 상태 변경 시 API 그리드 데이터 업데이트
  // useEffect(() => {
  //   if (selectedRoleMenu) {
  //   }
  // }, [selectedRoleMenu]);

  useEffect(() => {
    if (roleMenuApiData) {
      console.log('roleMenuApiList', roleMenuApiData.roleMenuApiList);
      setApiGridData(roleMenuApiData.apiMappingMenuList);
      setApiOriginalSelected(roleMenuApiData.roleMenuApiList);
    }
  }, [roleMenuApiData]);

  useEffect(() => {
    if (tableInstance && apiOriginalSelected) {
      console.log('apiOriginalSelected', apiOriginalSelected);
      const targets = apiGridData.filter((item) => {
        return apiOriginalSelected?.includes(item.apiId);
      });
      const newSelection = getRowSelectionByList(tableInstance, targets, 'apiId');
      tableInstance.setRowSelection(newSelection);
    }
  }, [tableInstance, apiOriginalSelected]);

  const renderMenuButtons = (onChange: any, menuSelectionType: any) => {
    if (roleInfo)
      return (
        <Button
          label={'메뉴선택'}
          variant={'gray2'}
          size={'sm'}
          onClick={handleRoleMenuMapping}
          disabled={!selectedRole}
        />
      );
    return <Button></Button>;
  };

  return (
    <SectionLayout contentsRatio={'third_children'}>
      <TreeBox
        type={'SHUTTLE_LIST'}
        title={'역할 목록'}
        data={roleTree}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        handleSelectedNodeChange={handleRoleSelect}
      />
      <TreeBox
        data={roleMenuTree}
        initLevel={2}
        treeId={'2'}
        title={'메뉴 설정'}
        type={'SHUTTLE_LIST'}
        selectedNode={selectedRoleMenu}
        handleSelectedNodeChange={(node: any) => handleMenuSelect(node)}
        customButtonNode={renderMenuButtons(handleMenuSelectionTypeChange, menuSelectionType)}
      />
      <GridBox
        data={apiGridData}
        columns={columns}
        showTotalCount={true}
        title={t('API')}
        customButtonNode={
          <Button
            variant="text"
            onClick={handleSaveClick}
            disabled={!apiGridData || apiGridData.length === 0}
          >
            저장
          </Button>
        }
        multiple={true} // 체크박스로 직접 관리하므로 multiple 옵션 비활성화
        onRowSelect={handleRightGridRowSelect}
        onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
      />
    </SectionLayout>
  );
};

export const TenantDetailLearningRoleMenu = forwardRef(TenantDetailLearningRoleMenuComponent);
