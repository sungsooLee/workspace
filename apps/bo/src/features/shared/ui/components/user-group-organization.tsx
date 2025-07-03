import { findNodesByKeys, ShuttleTreeToChipsV2, TreeNode } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useState } from 'react';
import { useFetchPrograms } from '../../../../entities/program/service/program-manage.hook';
import { cn } from '@learnway/shared';
import { transformApiDataToApiTreeData } from '@features/platform/menu/service/menu.service';
import { useQueryClient } from '@tanstack/react-query';
import { queryOptions } from '@entities/user-group';

type UserGroupOrganizationComponentProps = {
  tenantIds: number[];
  handleSetOption: (data: any) => void;
};

const UserGroupOrganizationComponent = ({
  tenantIds,
  handleSetOption,
}: UserGroupOrganizationComponentProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const handleOnSearch = async () => {
    const response = await queryClient.fetchQuery(queryOptions.organizationTree(tenantIds));
    // setTreeData(response);
  };

  useEffect(() => {
    handleOnSearch();
  }, []);
  // useEffect(() => {
  //   if (data) {
  //     const transformedData = transformApiDataToApiTreeData(data);
  //     setTreeData(transformedData);

  //     if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
  //       const firstLevelKeys = transformedData.map((node: any) => node.key);
  //       setExpandedKeys(firstLevelKeys);
  //     }
  //     if (selectedApiKeys && selectedApiKeys.length > 0) {
  //       console.log(selectedApiKeys);
  //       const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
  //       setSelectedItems(selectedNodes);
  //     }
  //   }
  // }, [data, selectedApiKeys]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
    // 테스트를 위해 임의로 삽입
    handleSetOption(items);
  };

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          treeData={treeData}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectedItemsChange}
        />
      </div>
    </div>
  );
};

export const UserGroupOrganization = UserGroupOrganizationComponent;
