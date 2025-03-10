import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  findNodePath,
  Input,
  Switch,
  TreeEventPayload,
  TreeNode,
  updateNodeByKey,
} from '@learnway/ui';
import { TreeView } from '@learnway/ui';
import { NodeDetail } from '@learnway/ui';
import { TreeContainer } from '@learnway/ui';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드래그앤드롭이 가능한 트리 컴포넌트.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

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
          { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
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

export const Basic: Story = {
  args: {
    type: 'default',
    expandTrigger: false,
  },

  decorators: [
    (Story) => {
      const [treeData, setTreeData] = useState<TreeNode[]>(sampleData);
      const [expandSource, setExpandSource] = useState<boolean>(false);
      const [searchKeyword, setSearchKeyword] = useState('');

      const handleAction = (payload: TreeEventPayload) => {
        console.log(payload);
        switch (payload.type) {
          case 'NODE_SELECT':
            break;
          case 'NODE_MOVE':
            break;
          case 'NODE_COPY':
            break;
        }
      };

      const handleExpandAll = () => {
        setExpandSource(true);
      };

      const handleCollapseAll = () => {
        setExpandSource(false);
      };

      const handleToggleUsed = (node: TreeNode, isUsed: boolean) => {
        console.log('스위치' + node.title);
        // const updatedData = updateNodeByKey(treeData, node.key, { isUsed });
        // setTreeData(updatedData);
      };

      const renderNodeButtons = (node: TreeNode, level: number) => (
        <>
          <Button onClick={() => console.log(node.title + '삭제')} variant="danger">
            삭제
          </Button>
          {level <= 1 && (
            <Button onClick={() => console.log(node.title + '하위 메뉴 추가')} variant="default">
              + 하위 메뉴 추가
            </Button>
          )}
          <Button onClick={() => console.log(node.title + '수정')} variant="default">
            수정
          </Button>
          <Switch
            onClick={(e) => e.preventDefault()}
            checked={node.isUsed}
            onCheckedChange={(checked) => handleToggleUsed(node, checked)}
          />
        </>
      );

      return (
        <div className="flex gap-4">
          <div>
            <Story
              args={{
                data: treeData,
                treeId: '1',
                onAction: handleAction,
                expandTrigger: expandSource,
                nodeButtons: renderNodeButtons,
                // type: 'advanced',
                searchKeyword: searchKeyword,
              }}
            />
            <Button
              onClick={() => {
                console.log(treeData);
              }}>
              저장
            </Button>
          </div>
          <div>
            <Input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="트리 검색..."
            />
            <NodeDetail expandAll={handleExpandAll} collapseAll={handleCollapseAll} />
          </div>
        </div>
      );
    },
  ],
};

export const DualTree: Story = {
  decorators: [
    (Story, context) => {
      const initialTargetData = [
        {
          key: 'target-1',
          title: '타겟 루트 1',

          children: [
            {
              key: 'target-1-1',
              title: '타겟 자식 1',
              children: [
                { key: 'target-1-1-1', title: '타겟 손자 1' },
                { key: 'target-1-1-2', title: '타겟 손자 2' },
              ],
            },
            { key: 'target-1-2', title: '타겟 자식 2' },
          ],
        },
        {
          key: 'target-2',
          title: '타겟 루트 2',
          children: [
            { key: 'target-2-1', title: '타겟 자식 3' },
            { key: 'target-2-2', title: '타겟 자식 4' },
          ],
        },
      ];
      const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
      const [targetData, setTargetData] = useState<TreeNode[]>(initialTargetData);
      const handleAction = (payload: TreeEventPayload) => {
        switch (payload.type) {
          case 'NODE_SELECT':
            break;
          case 'NODE_MOVE':
            break;
          case 'NODE_COPY':
            break;
        }
      };
      return (
        <div className="flex gap-8 p-4">
          <TreeContainer>
            <div className="flex-1">
              <h3 className="mb-2 font-semibold">소스 트리</h3>
              <TreeView treeId="source" data={sourceData} onAction={handleAction} />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-semibold">타겟 트리</h3>
              <TreeView treeId="target" data={targetData} onAction={handleAction} />
            </div>
          </TreeContainer>
        </div>
      );
    },
  ],
  args: {
    data: [
      {
        key: 'source-1',
        title: '소스 루트',
        children: [
          {
            key: 'source-1-1',
            title: '드래그 가능 노드',
            children: [
              { key: 'source-1-1-1', title: '일반 노드 1' },
              { key: 'source-1-1-2', title: '일반 노드 2' },
            ],
          },
          {
            key: 'source-1-2',
            title: '드래그 불가 노드',
            constraints: {
              drag: false,
            },
          },
          {
            key: 'source-1-3',
            title: '드롭 불가 노드',
            constraints: {
              drop: false,
            },
          },
        ],
      },
    ],
  },
};
