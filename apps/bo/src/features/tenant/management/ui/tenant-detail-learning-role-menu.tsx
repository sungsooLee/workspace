import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';

import { TenantDetailLearningRoleMenuMappingModal } from './tenant-detail-learning-role-menu-mapping-modal';
import { useFetchRoleTree, useFetchRoleMenus } from '@entities/role/service/role-manage.hook';

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

export const TenantDetailLearningRoleMenuComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();

  const [roleTree, setRoleTree] = useState<any>(null);
  const [roleTreeExpandedKeys, setRoleTreeExpandedKeys] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleMenuTree, setRoleMenuTree] = useState<TreeNode[]>([]);
  const [roleMenuTreeExpandedKeys, setRoleMenuTreeExpandedKeys] = useState<string[]>([]);
  const [selectedRoleMenu, setSelectedRoleMenu] = useState<any>(null);

  const [menuSelectionType, setMenuSelectionType] = useState<'all' | 'custom'>('all');
  const [apiGridData, setApiGridData] = useState<any[]>([]);
  const [apiUsageState, setApiUsageState] = useState<{ [apiId: string]: boolean }>({});
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
  useImperativeHandle(ref, () => ({
    showAlertModify: () => {
      console.log('menu ' + siteScope);
      return true;
    },
  }));

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

  // 역할의 API 사용 여부 데이터 가져오기
  const getRoleApiUsage = (roleId: string) => {
    return {};
  };

  const handleRoleSelect = (node: TreeNode) => {
    setSelectedRole(node);
    setSelectedRoleMenu(null);
    setIsDataModified(false);
  };

  const handleMenuSelect = (menuId: string) => {
    setSelectedRoleMenu(menuId);
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

  // API 사용 여부 체크박스 변경 핸들러
  const handleApiUsageChange = (apiId: string, isChecked: boolean) => {
    // API 사용 여부 상태 업데이트
    setApiUsageState((prev) => ({
      ...prev,
      [apiId]: isChecked,
    }));

    // 변경 사항 플래그 설정
    setIsDataModified(true);

    // 그리드 데이터 업데이트 (체크박스 상태 반영)
    setApiGridData((prev) =>
      prev.map((api) => (api.apiId === apiId ? { ...api, isUsed: isChecked } : api)),
    );
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    if (!selectedRole) {
      alert('역할을 선택해주세요.');
      return;
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
      if (transformedData && transformedData.length > 0 && roleTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setRoleTreeExpandedKeys(firstLevelKeys);
      }
    }
  }, [roleData]);

  useEffect(() => {
    if (roleMenuData) {
      console.log('roleMenuData', roleMenuData);
      const transformedData = transformMenuApiDataToTreeData(roleMenuData);
      setRoleMenuTree(transformedData);
      if (transformedData && transformedData.length > 0 && roleMenuTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setRoleMenuTreeExpandedKeys(firstLevelKeys);
      }
    }
  }, [roleMenuData]);

  // 상태 변경 시 API 그리드 데이터 업데이트
  useEffect(() => {
    if (selectedRole) {
      setApiGridData([]);
    }
  }, [selectedRole, selectedRoleMenu, menuSelectionType, apiUsageState]);
  console.log('1234', roleInfo);
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
        data={roleTree}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        type={'SHUTTLE_LIST'}
        title={'역할 목록'}
        handleSelectedNodeChange={handleRoleSelect}
      />
      <TreeBox
        data={roleMenuTree}
        initLevel={2}
        treeId={'2'}
        title={'메뉴 설정'}
        type={'SHUTTLE_LIST'}
        handleSelectedNodeChange={(node: any) => handleMenuSelect(node.key)}
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
            disabled={!selectedRole || !isDataModified}
          >
            저장
          </Button>
        }
        multiple={true} // 체크박스로 직접 관리하므로 multiple 옵션 비활성화
      />
    </SectionLayout>
  );
};

export const TenantDetailLearningRoleMenu = forwardRef(TenantDetailLearningRoleMenuComponent);
