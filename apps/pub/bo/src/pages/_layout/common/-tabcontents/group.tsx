import { FC } from 'react';
import { useEffect, useState } from 'react';
import { ShuttleTreeToChips, TreeNode } from '@learnway/ui';

const UserGroupComponent: FC<{}> = ({}) => {
  const sampleData: TreeNode[] = [
    {
      key: '1',
      title: '러닝웨이 1',
      isUsed: false,
      children: [
        {
          key: '1-1',
          title: 'Child 1',
          isUsed: true,
          children: [
            {
              key: '1-1-1',
              title: 'Grandchild 1',
              isUsed: true,
              children: [
                { key: '2-1-1', title: 'Grandchild-1', isUsed: true },
                { key: '2-1-2', title: 'Grandchild-2', isUsed: false },
                {
                  key: '2-1-3',
                  title: 'Grandchild-3',
                  isUsed: false,
                  children: [
                    { key: '3-1-1', title: 'Grandchild-1-1', isUsed: true },
                    { key: '3-1-2', title: 'Grandchild-1-2', isUsed: false },
                    {
                      key: '3-1-3',
                      title: 'Grandchild-1-3',
                      isUsed: false,
                      children: [
                        { key: '4-1-1', title: 'Grandchild-1-1-1', isUsed: true },
                        { key: '4-1-2', title: 'Grandchild-1-2-2', isUsed: false },
                        { key: '4-1-3', title: 'Grandchild-1-3-3', isUsed: false },
                      ],
                    },
                  ],
                },
              ],
            },
            { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
          ],
        },
        { key: '1-2', title: 'Child 2', isUsed: true },
      ],
    },
    {
      key: '2',
      title: '러닝웨이 2',
      isUsed: false,
      children: [
        { key: '2-1', title: 'Child 3', isUsed: false },
        { key: '2-2', title: 'Child 4', isUsed: false },
      ],
    },
    {
      key: '3',
      title: '러닝웨이 3',
      isUsed: false,
      children: [
        { key: '3-1', title: 'Child 5', isUsed: false },
        { key: '3-2', title: 'Child 6', isUsed: false },
      ],
    },
    {
      key: '4',
      title: '러닝웨이 4',
      isUsed: false,
      children: [
        { key: '4-1', title: 'Child 7', isUsed: false },
        { key: '4-2', title: 'Child 8', isUsed: false },
      ],
    },
  ];
  const [treeData, setTreeData] = useState<TreeNode[]>(sampleData);

  const [selectedItems, setSelectedItems] = useState<{ key: string; fullPath: string }[]>([]);

  return (
    <ShuttleTreeToChips
      treeId="tree"
      sourceData={treeData}
      selectedItems={selectedItems}
      onItemsChange={setSelectedItems}
      title={'타이틀'}
    />
  );
};

UserGroupComponent.displayName = 'UserGroup';
export const UserGroup = UserGroupComponent;
