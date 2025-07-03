import { cn } from '@learnway/shared';
import { TreeBox } from './tree-box';
import { TreeNode } from './type';
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { flattenNodeWithChildren } from './tree.service';
import { useEffect, useState } from 'react';
import styles from './tree-to-tree.module.css';
import { TreeContainer } from './tree.context';

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
    <div className={cn(styles.start, styles.wrap)}>
      <TreeContainer>
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
        <div className={styles.transfer_arrow}>
          <span className={styles.guide_text}>
            <IcoNarrowRight width={24} height={24} stroke={'#C8d2e5'} />
            Drag
            <br />
            &amp; Drop
          </span>
        </div>
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
      </TreeContainer>
    </div>
  );
};
