import {
  Button,
  findNodeByKey,
  Switch,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  TreeView2,
} from '@learnway/ui';
import React, { FC, useEffect, useState } from 'react';
import { IcoMinus, IcoPlus } from '../../../../../../libs/icons/src';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

const handleExpandAll = (treeData: TreeNode[]) => {
  const getAllKeys = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllKeys(node.children));
      }

      return keys;
    }, []);
  };
  return getAllKeys(treeData);
};

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
      case 'NODE_MOVE':
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
  };

  const selectedNode = selectedKey ? findNodeByKey(treeData, selectedKey) : null;
  return (
    <div className={layoutStyles.inner}>
      <div className={titleStyles.title_wrap}>
        <h3 className={titleStyles.title}>{'목록'}</h3>
        <div className={layoutStyles.btn_wrap}>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={() => {
              const allKeys = handleExpandAll(treeData);
              onExpandChange(allKeys);
            }}
          >
            {'전체펼침'}
          </Button>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={() => onExpandChange([])}
          >
            {'전체닫기'}
          </Button>
        </div>
      </div>
      <div className={layoutStyles.inner_contents}>
        <TreeContainer>
          <TreeView2
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

export const MenuTree = MenuTreeComponent;
