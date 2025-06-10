import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, RadioGroupFormField, TreeView, TreeNode } from '@learnway/ui';
/* style */
import styles from './role-list-search.module.css';

// tree
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
              { key: '1-1-1-1', title: 'Grandchild 1', isUsed: true },
              { key: '1-1-1-2', title: 'Grandchild 2', isUsed: false },
              { key: '1-1-1-3', title: 'Grandchild 3', isUsed: false },
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

const MenuSettingComponent: FC<{}> = ({}) => {
  // tree
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'메뉴 설정'}
        actionNode={<Button label={'메뉴선택'} variant={'text'} size={'sm'} />}
        lineType={'light'}
      />
      <div className={styles.contents_wrap}>
        <TreeView treeId="source" data={sourceData} />
      </div>
    </div>
  );
};

MenuSettingComponent.displayName = 'MenuSetting';
export const MenuSetting = MenuSettingComponent;
