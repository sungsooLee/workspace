import { cn } from '@learnway/shared';
import { TreeBox } from './tree-box';
import { TreeNode } from './type';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { flattenNodeWithChildren } from './tree.service';
import { useEffect, useState } from 'react';

export interface TreeToTreeProps {
  sourceTreeId: string;
  targetTreeId: string;
  sourceData: TreeNode[];
  targetData: TreeNode[];
  selectedItems: string[]; // 선택된 아이템들의 키 배열
  onItemsChange: (selectedKeys: string[]) => void;
  sourceTitle?: string;
  targetTitle?: string;
  initLevel?: number;
}

export const TreeToTree = ({
  sourceTreeId,
  targetTreeId,
  sourceData,
  targetData,
  selectedItems,
  onItemsChange,
  sourceTitle = '소스',
  targetTitle = '타겟',
  initLevel = 2,
}: TreeToTreeProps) => {
  const handleSourceAction = (event: any) => {
    console.log(event);
  };
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [selectedItems]);

  const handleTargetAction = (event: any) => {
    if (event.type === 'NODE_COPY') {
      if (event.sourceTreeId === sourceTreeId) {
        if (!selectedItems.includes(event.sourceNode.key)) {
          const allNodes = flattenNodeWithChildren(event.sourceNode);
          const allKeys = allNodes.map((node) => node.key);
          const newKeys = allKeys.filter((key) => !selectedItems.includes(key));

          if (newKeys.length > 0) {
            const newSelectedItems = [...selectedItems, ...newKeys];
            console.log('Adding to selected (with children):', {
              parentKey: event.sourceNode.key,
              allKeys: allKeys,
              newSelectedItems: newSelectedItems,
            });
            onItemsChange(newSelectedItems);
          }
        }
      }
    }
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.pop_layout)}>
      <div className={layoutStyles.inner}>
        <TreeBox
          key={`source-${renderKey}`}
          treeId={sourceTreeId}
          data={sourceData}
          type="TREE_TO_TREE"
          title={sourceTitle}
          onAction={handleSourceAction}
          selectedItems={selectedItems}
          sourceTreeId={sourceTreeId}
          initLevel={initLevel}
        />
      </div>
      <div className={layoutStyles.transfer_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#C8d2e5'} />
      </div>
      <div className={layoutStyles.inner}>
        <TreeBox
          treeId={targetTreeId}
          data={targetData}
          type="TREE_TO_TREE"
          title={targetTitle}
          onAction={handleTargetAction}
          selectedItems={selectedItems}
          clientTree
          sourceTreeId={sourceTreeId}
          initLevel={initLevel}
        />
      </div>
    </div>
  );
};
