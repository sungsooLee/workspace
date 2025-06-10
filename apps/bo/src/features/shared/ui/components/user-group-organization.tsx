import { findNodesByKeys, ShuttleTreeToChips, TreeNode } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useState } from 'react';
import { useFetchPrograms } from '../../../../entities/program/service/program-manage.hook';
import { cn } from '@learnway/shared';
import { transformApiDataToApiTreeData } from '@features/platform/menu/service/menu.service';

const UserGroupOrganizationComponent = ({ menuScopeCode, selectedApiKeys }: any) => {
  const [treeData, setTreeData] = useState([]);
  const { data } = useFetchPrograms(menuScopeCode);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      const transformedData = transformApiDataToApiTreeData(data);
      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
      if (selectedApiKeys && selectedApiKeys.length > 0) {
        console.log(selectedApiKeys);
        const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
        setSelectedItems(selectedNodes);
      }
    }
  }, [data, selectedApiKeys]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
  };

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChips
          showConditionSettings
          treeId="user-group-list-tree"
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          sourceData={treeData as TreeNode[]}
          selectedItems={selectedItems}
          onItemsChange={handleSelectedItemsChange}
        />
      </div>
    </div>
  );
};

export const UserGroupOrganization = UserGroupOrganizationComponent;
