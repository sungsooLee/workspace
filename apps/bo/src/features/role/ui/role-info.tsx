import { TreeBox, TreeNode } from '@learnway/ui';

const sampleData: TreeNode[] = [
  {
    key: '1',
    title: 'Root Node 1',
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
            children: [{ key: '1-1-1-1', title: 'Grandchild 1-1', isUsed: false }],
          },
          { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
        ],
      },
      { key: '1-2', title: 'Child 2', isUsed: true },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    isUsed: false,
    children: [
      { key: '2-1', title: 'Child 3', isUsed: false },
      { key: '2-2', title: 'Child 4', isUsed: false },
    ],
  },
];
const RoleInfoComponent = () => {
  return (
    <>
      <TreeBox data={sampleData} showSearchKeyword initLevel={1} closeLevel={1} />
    </>
  );
};

export const RoleInfo = RoleInfoComponent;
