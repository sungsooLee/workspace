import { Button, Switch, TreeEventPayload, TreeNode, TreeView } from '@learnway/ui';
import React, { FC, useEffect, useState } from 'react';
import { IcoMinus, IcoPlus } from '../../../../../../libs/icons/src';

// MenuTreeComponent 컴포넌트 정의
const MenuTreeComponent: FC<any> = ({ treeData, onNodeClick, onAddSubMenu, onDeleteNode }) => {
  // 확장/축소 상태를 관리하는 상태값
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteNode(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}>
          삭제
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddSubMenu(node);
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}>
          + 하위 메뉴 추가
        </Button>
      </div>
    </div>
  );

  const handleTreeAction = (event: TreeEventPayload) => {
    switch (event.type) {
      case 'NODE_SELECT':
        onNodeClick(event.node);
        break;
    }
  };

  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      {/* 상단 제목 및 버튼 */}
      <Title title={'목록'}>
        <Button
          type="button"
          variant="text"
          size="sm"
          iconAlign="left"
          onClick={() => setExpandAll(true)}>
          <IcoPlus width={13} height={13} stroke="#3e4550" />
          전체펼침
        </Button>
        <Button
          type="button"
          variant="text"
          size="sm"
          iconAlign="left"
          onClick={() => setExpandAll(false)}>
          <IcoMinus width={13} height={13} stroke="#3e4550" />
          전체닫기
        </Button>
      </Title>

      {/* 트리 뷰 렌더링 */}
      <TreeView
        data={treeData}
        treeId={'1'}
        expandTrigger={expandAll}
        nodeButtons={renderNodeButtons}
        onAction={handleTreeAction}
        type={'advanced'}
      />
    </div>
  );
};

export const MenuTree = MenuTreeComponent;

const Title: FC<any> = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center space-x-2">{children}</div>
      </div>
      <hr className="mt-2 w-full border-t-2 border-gray-900" />
    </div>
  );
};
