import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import {
  Button,
  findNodeByKey,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  TreeView,
  useModal,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { TenantDetailCategoryMappingModal } from './tenant-detail-category-mapping-modal';

const TenantCategoryTreeComponent: FC<any> = ({
  treeData,
  onNodeClick,
  onNodeMove,
  onNodeChange,
  expandedKeys,
  onExpandChange,
  selectedKey,
  useCommonMapping,
  useTenantMapping,
  isTenantManager,
  onNodeAdd,
}) => {
  const routerState = useRouterState();
  const { open: openModal, confirm: openConfirm } = useModal();
  const tenantId = routerState.location.state?.tenantId || '1';

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

  const handleSelectedNodeChange = (node: TreeNode | null) => {
    if (node) onNodeClick(node);
  };

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_SELECT':
        if (event.node.depth > 0) {
          onNodeClick(event.node);
        }
        break;
      case 'NODE_MOVE': {
        const nodeInfo = event;
        console.log('### event', event);
        const targetDepth =
          nodeInfo.position === 'INSIDE'
            ? nodeInfo.targetNode?.depth + 1
            : nodeInfo.targetNode?.depth;
        const parentKey =
          nodeInfo.position === 'INSIDE'
            ? nodeInfo.targetNode?.key
            : nodeInfo.targetNode?.parentKey;
        if (nodeInfo.sourceNode.depth !== targetDepth) {
          alert(
            '동일한 레벨 내에서만 매핑 및 이동이 가능합니다. src:' +
              nodeInfo.sourceNode.depth +
              '/dest:' +
              targetDepth,
          );
          return false;
        }
        if (nodeInfo.sourceNode.parentKey !== parentKey) {
          alert(
            '동일한 부모 카테고리에만 매핑 및 이동이 가능합니다. src:' +
              nodeInfo.sourceNode.parentKey +
              '/dest:' +
              parentKey,
          );
          return false;
        }
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

  const handleTenantDetailCategoryMapping = async () => {
    const modalTenantId = tenantId;
    await openModal({
      content: (
        <TenantDetailCategoryMappingModal
          tenantId={modalTenantId}
          onNodeChange={() => {
            if (onNodeChange) onNodeChange();
          }}
        />
      ),
      width: 'xl',
    });
  };

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if ((node.depth === 0 || node.categoryType === 'TENANT') && isTenantManager && useTenantMapping)
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNodeAdd(node);
              }}
              variant="gray2"
              size={'xs'}
              type={'button'}
              disabled={level === 5}
            >
              {node.depth === 0 ? t('테넌트 카테고리 추가') : t('하위 테넌트 카테고리 추가')}
            </Button>
          </div>
        </div>
      );
  };

  const selectedNode = selectedKey ? findNodeByKey(treeData, selectedKey) : null;

  return (
    <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
      <div className={titleStyles.title_wrap}>
        <h3 className={titleStyles.title}>{'테넌트 카테고리 목록'}</h3>
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
          {!isTenantManager && (
            <Button
              variant="save"
              size="sm"
              onClick={() => handleTenantDetailCategoryMapping()}
              disabled={!useCommonMapping}
            >
              {'카테고리 매핑'}
            </Button>
          )}
        </div>
      </div>
      <div className={layoutStyles.inner_contents}>
        <TreeContainer>
          <TreeView
            data={treeData}
            treeId={'1'}
            expandedKeys={expandedKeys} // 외부에서 제어되는 확장된 키
            onExpandedKeysChange={onExpandChange} // 확장된 키 변경 콜백
            onAction={handleTreeAction}
            type={'SAME_LEVEL_ONLY'}
            selectedNode={selectedNode}
            nodeButtons={renderNodeButtons}
            //onSelectedNodeChange={handleSelectedNodeChange}
          />
        </TreeContainer>
      </div>
    </div>
  );
};

export const TenantCategoryTree = TenantCategoryTreeComponent;
