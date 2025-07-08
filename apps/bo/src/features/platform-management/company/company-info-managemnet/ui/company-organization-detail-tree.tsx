import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { TreeBox, TreeNode, Button, TreeContainer } from '@learnway/ui';
import { transformUserGroupOrganizationApiDataToTreeData } from '@features/platform-management/company';
import { useGetCompanyOrganizationTree } from '@entities/user-group/service/user-group-company.hook';

interface CompanyOrganizationDetailTreeProps {
  title: string;
  onSelect: (selectedNode: any) => void;
}

const CompanyOrganizationDetailTreeComponent = ({
  title,
  onSelect,
}: CompanyOrganizationDetailTreeProps) => {
  const routerState = useRouterState();
  const companyId = routerState.location.state?.companyId;

  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const { data, refetch } = useGetCompanyOrganizationTree(companyId);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if (level === 0) return;
    return (
      <div className={'gap-10px flex'}>
        <div className={'flex items-center'}>
          <Button
            onClick={(e) => {
              handleNodeCustomButton(node, level);
            }}
            variant={node?.key === selectedNode?.key ? 'primary' : 'gray2'}
            size="xs"
            type="button"
            label={t('선택')}
          />
        </div>
      </div>
    );
  };

  const handleNodeCustomButton = (node: TreeNode, level: number) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    if (data) {
      const transformedData = transformUserGroupOrganizationApiDataToTreeData(
        [data],
        t('러닝웨이 - 조직'),
      );
      setTreeData(transformedData);
      if (transformedData?.length > 0) {
        const root = transformedData[0];
        const companyNode = root?.children[0];
        setSelectedNode(companyNode);
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedNode) onSelect(selectedNode);
  }, [selectedNode]);

  return (
    <TreeContainer>
      <TreeBox
        data={treeData}
        type="SHUTTLE_LIST"
        treeId="1"
        showSearchKeyword
        title={title}
        selectedNode={selectedNode}
        renderNodeButtons={renderNodeButtons}
      />
    </TreeContainer>
  );
};

export const CompanyOrganizationDetailTree = CompanyOrganizationDetailTreeComponent;
