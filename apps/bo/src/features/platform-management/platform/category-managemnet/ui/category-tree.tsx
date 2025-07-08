import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import {
  Button,
  DndTreeView,
  findNodeByKey,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  TreeView,
} from '@learnway/ui';

// 컴포넌트 정의
const CategoryTreeComponent: FC<any> = ({
  treeData,
  onNodeClick,
  onNodeMove,
  onAddSubMenu,
  onDeleteNode,
  expandedKeys,
  onExpandChange,
  selectedKey,
}) => {
  const { t } = useTranslation<'translation'>();

  // expandAll 토글 시 모든 키 확장/축소 처리
  const handleExpandAll = (expand: boolean) => {
    if (expand) {
      // 모든 노드 키 수집
      const getAllKeys = (nodes: TreeNode[]): string[] => {
        return nodes.reduce((keys: string[], node) => {
          keys.push(node.key);
          if (node.children?.length) {
            keys.push(...getAllKeys(node.children));
          }
          return keys;
        }, []);
      };

      const allKeys = getAllKeys(treeData);
      onExpandChange(allKeys);
    } else {
      // 모두 축소
      onExpandChange([]);
    }
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddSubMenu(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
          disabled={level === 5}
        >
          {/* '카테고리 추가' : '하위카테고리 추가' */}
          {level === 0
            ? t('LABEL.tree.add', { type: t('LABEL.common.code.category') })
            : t('LABEL.tree.depthAdd', { type: t('LABEL.common.code.category') })}
        </Button>
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
        console.log(event);
        if (nodeInfo.position === 'INSIDE') {
          onNodeMove(nodeInfo.sourceNode.menuId, nodeInfo.targetNode?.menuId, nodeInfo.targetIndex);
        }
        //BEFORE 혹은 AFTER 이면 부모 노드가 타겟 되어야함.
        else {
          onNodeMove(
            nodeInfo.sourceNode.menuId,
            nodeInfo.targetNode?.parentKey,
            nodeInfo.targetIndex,
          );
        }

        break;
      }
    }
  };

  const selectedNode = selectedKey ? findNodeByKey(treeData, selectedKey) : null;

  return (
    <div className={layoutStyles.inner}>
      <div className={titleStyles.title_wrap}>
        <h3 className={titleStyles.title}>{t('LABEL.page.category.title')}</h3>
        <div className={layoutStyles.btn_wrap}>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={() => handleExpandAll(true)}
          >
            {t('LABEL.tree.expand')}
          </Button>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={() => handleExpandAll(false)}
          >
            {t('LABEL.tree.closed')}
          </Button>
        </div>
      </div>
      <div className={layoutStyles.inner_contents}>
        <TreeContainer>
          <DndTreeView
            data={treeData}
            treeId={'1'}
            expandedKeys={expandedKeys} // 외부에서 제어되는 확장된 키
            onExpandedKeysChange={onExpandChange} // 확장된 키 변경 콜백
            nodeButtons={renderNodeButtons}
            onAction={handleTreeAction}
            type={'SAME_LEVEL_ONLY'}
            selectedNode={selectedNode}
            onSelectedNodeChange={handleSelectedNodeChange}
          />
        </TreeContainer>
      </div>
    </div>
  );
};

export const CategoryTree = CategoryTreeComponent;
