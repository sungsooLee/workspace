import {
  Button,
  Checkbox,
  GridBox,
  RadioGroup,
  RadioGroupFormField,
  TreeBox,
  TreeNode,
} from '@learnway/ui';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { FormSubTitle } from '../../../../shared/ui';
import { useEffect, useState } from 'react';
import {
  roleTreeMockData,
  menuTreeMockData,
  apiListMockData,
  roleMenuMockData,
  menuApiMappingMockData,
  roleApiUsageMockData,
} from '../../../../entities/mock/role';

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

const renderMenuButtons = (onChange: any, menuSelectionType: any) => {
  return (
    <>
      <RadioGroupFormField
        options={[
          { value: 'option01', label: '모든 메뉴/API' },
          { value: 'option02', label: '직접 선택' },
        ]}
        onChange={onChange}
        value={menuSelectionType === 'all' ? 'option01' : 'option02'}
      />
      <Button label={'메뉴선택'} variant={'gray2'} size={'sm'} />
    </>
  );
};

export const RoleMenu = ({ type }: any) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [menuSelectionType, setMenuSelectionType] = useState<'all' | 'custom'>('all');
  const [roleMenuTree, setRoleMenuTree] = useState<TreeNode[]>([]);
  const [apiGridData, setApiGridData] = useState<any[]>([]);
  const [apiUsageState, setApiUsageState] = useState<{ [apiId: string]: boolean }>({});
  const [isDataModified, setIsDataModified] = useState<boolean>(false);

  const getRoles = () => roleTreeMockData;

  const handleMenuSelectionTypeChange = (type: string) => {
    setMenuSelectionType(type === 'option01' ? 'all' : 'custom');
  };

  // 선택된 역할에 할당된 메뉴 ID 목록 가져오기
  const getRoleMenuIds = (roleId: string) => {
    return roleMenuMockData[roleId] || [];
  };

  // 선택된 메뉴에 속한 API ID 목록 가져오기
  const getMenuApiIds = (menuId: string) => {
    return menuApiMappingMockData[menuId] || [];
  };

  // 역할의 API 사용 여부 데이터 가져오기
  const getRoleApiUsage = (roleId: string) => {
    return roleApiUsageMockData[roleId] || {};
  };

  const handleRoleSelect = (roleId: string) => {
    // 변경 사항이 있는 경우 확인 메시지 표시
    // if (isDataModified && !confirm('저장되지 않은 변경 사항이 있습니다. 계속 진행하시겠습니까?')) {
    //   return;
    // }

    setSelectedRoleId(roleId);
    setSelectedMenuId(null);
    setIsDataModified(false);

    // 역할에 할당된 메뉴 트리 생성
    const menuTree = generateRoleMenuTree(roleId);
    setRoleMenuTree(menuTree);

    // 역할의 API 사용 여부 상태 설정
    const roleApiUsage = getRoleApiUsage(roleId);
    setApiUsageState(roleApiUsage);
  };

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenuId(menuId);
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
    if (!selectedRoleId) {
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

    if (assignedMenuIds.length === 0) {
      return [];
    }

    // 할당된 메뉴만 포함하는 새로운 트리 생성
    const filterAndMarkAssignedMenus = (nodes: TreeNode[]): TreeNode[] => {
      const result: TreeNode[] = [];

      for (const node of nodes) {
        const isAssigned = assignedMenuIds.includes(node.key);

        const filteredChildren = node.children ? filterAndMarkAssignedMenus(node.children) : [];

        if (isAssigned || filteredChildren.length > 0) {
          result.push({
            ...node,
            isUsed: isAssigned,
            children: filteredChildren,
          });
        }
      }

      return result;
    };

    return filterAndMarkAssignedMenus(menuTreeMockData);
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

  const calculateApiGridData = () => {
    if (!selectedRoleId) {
      return [];
    }

    // 역할의 API 사용 여부 데이터
    const roleApiUsage = apiUsageState;

    if (menuSelectionType === 'all') {
      // '모든 메뉴/API' 선택 시 역할에 할당된 모든 메뉴의 API 표시
      const allApiIds = getAllMenuApiIdsForRole(selectedRoleId);

      return apiListMockData
        .filter((api: any) => allApiIds.includes(api.apiId))
        .map((api: any) => ({
          ...api,
          isUsed: roleApiUsage[api.apiId] || false,
        }));
    } else if (selectedMenuId) {
      // '직접 선택' 시 선택된 메뉴의 API만 표시
      const menuApiIds = getMenuApiIds(selectedMenuId);

      return apiListMockData
        .filter((api: any) => menuApiIds.includes(api.apiId))
        .map((api: any) => ({
          ...api,
          isUsed: roleApiUsage[api.apiId] || false,
        }));
    }

    return [];
  };

  // 상태 변경 시 API 그리드 데이터 업데이트
  useEffect(() => {
    if (selectedRoleId) {
      const newApiGridData = calculateApiGridData();
      setApiGridData(newApiGridData);
    }
  }, [selectedRoleId, selectedMenuId, menuSelectionType, apiUsageState]);

  return (
    <SectionLayout contentsRatio={'third_children'}>
      <TreeBox
        data={getRoles()}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        type={'DEFAULT'}
        title={'역할 목록'}
        handleSelectedNodeChange={(node: any) => handleRoleSelect(node.key)}
      />
      <TreeBox
        data={roleMenuTree}
        initLevel={2}
        treeId={'2'}
        showSearchKeyword
        title={'메뉴 설정'}
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
            disabled={!selectedRoleId || !isDataModified}
          >
            저장
          </Button>
        }
        multiple={true} // 체크박스로 직접 관리하므로 multiple 옵션 비활성화
      />
    </SectionLayout>
  );
};
