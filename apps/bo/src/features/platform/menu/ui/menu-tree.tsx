import { Button, findNodeByKey, TreeBox, TreeEventPayload, TreeNode } from '@learnway/ui';
import { t } from 'i18next';
import { FC } from 'react';

// MenuTreeComponent 컴포넌트 정의
const MenuTreeComponent: FC<any> = ({
  treeData,
  onNodeClick,
  onNodeMove,
  onAddSubMenu,
  onDeleteNode,
  expandedKeys,
  onExpandChange,
  selectedKey,
  menuScope,
}) => {
  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        {menuScope === 'FO' && level <= 2 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddSubMenu(node);
            }}
            variant="gray2"
            size={'xs'}
            type={'button'}
          >
            {level == 0 ? '메뉴추가' : '하위메뉴추가'}
          </Button>
        )}
        {menuScope === 'BO' && level <= 3 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddSubMenu(node);
            }}
            variant="gray2"
            size={'xs'}
            type={'button'}
          >
            {level == 0 ? '메뉴추가' : '하위메뉴추가'}
          </Button>
        )}
      </div>
    </div>
  );

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    if (node) onNodeClick(node);
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_SELECT':
        onNodeClick(event.node);
        break;
      case 'NODE_MOVE': {
        const nodeInfo = event;
        if (nodeInfo.position === 'INSIDE') {
          onNodeMove(nodeInfo.sourceNode.menuId, nodeInfo.targetNode?.menuId, 1, menuScope);
        } else {
          const targetIndex = nodeInfo.targetIndex!;
          onNodeMove(
            nodeInfo.sourceNode.menuId,
            nodeInfo.targetNode?.parentKey,
            targetIndex + 1,
            menuScope,
          );
        }

        break;
      }
    }
  };

  const selectedNode = selectedKey ? findNodeByKey(treeData, selectedKey) : null;
  return (
    <TreeBox
      data={treeData}
      treeId={'1'}
      expandedKeys={expandedKeys} // 외부에서 제어되는 확장된 키
      onExpandedKeysChange={onExpandChange} // 확장된 키 변경 콜백
      renderNodeButtons={renderNodeButtons}
      onAction={handleTreeAction}
      type={'SAME_LEVEL_ONLY'}
      title={t('목록')}
      selectedNode={selectedNode}
      onSelectedNodeChange={handleSelectedNodeChange}
      initLevel={1}
    />
  );
};

export const MenuTree = MenuTreeComponent;
