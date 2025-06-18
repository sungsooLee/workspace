import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { TreeBox, TreeNode, Button } from '@learnway/ui';
import { transformDepartmentApiDataToTreeData } from './service/company-detail-tree';
import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';

const CompanyOrganizationDetailTreeComponent = ({ title }: any) => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const [deptTreeData, setDeptTreeData] = useState([]);
  const [selectedDeptNode, setSelectedDeptNode] = useState<any>(null);

  const { data, refetch } = useGetCompanyDepartmentTree(companyCode);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    return '';
  };

  useEffect(() => {
    if (data) {
      console.log('#### companyCode', companyCode);
      console.log('#### data', data);

      const transformedData = transformDepartmentApiDataToTreeData(data);
      setDeptTreeData(transformedData);
    }
  }, [data]);

  return (
    <TreeContainer>
      <TreeBox
        data={deptTreeData}
        type="DEFAULT"
        treeId="1"
        showSearchKeyword
        title={title}
        selectedNode={selectedDeptNode}
        renderNodeButtons={renderNodeButtons}
      />
    </TreeContainer>
  );
};

export const CompanyOrganizationDetailTree = CompanyOrganizationDetailTreeComponent;
