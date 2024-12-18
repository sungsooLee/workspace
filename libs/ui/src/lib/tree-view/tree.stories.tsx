import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TreeNode } from './type';
import { TreeView } from './tree';
import { useTree } from './tree.hook';
import { NodeDetail } from './node-detail';

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
    children: [
      {
        key: '1-1',
        title: 'Child 1',
        children: [
          { key: '1-1-1', title: 'Grandchild 1' },
          { key: '1-1-2', title: 'Grandchild 2' },
        ],
      },
      { key: '1-2', title: 'Child 2' },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    children: [
      { key: '2-1', title: 'Child 3' },
      { key: '2-2', title: 'Child 4' },
    ],
  },
];

export const Basic: Story = {
  decorators: [
    (Story) => {
      const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
      const { treeData, selectedNode, expandedKeys, setExpandedKeys, handleAction } = useTree({
        initialData: sampleData,
        treeId: '1',
      });

      return (
        <div className="flex gap-4">
          <Story
            args={{
              data: treeData,
              selectedKey: selectedNode?.key,
              expandedKeys,
              setExpandedKeys,
              draggedNode,
              setDraggedNode,
              onAction: handleAction,
              treeId: '1',
            }}
          />
        </div>
      );
    },
  ],
};

export const WithNodeDetail: Story = {
  decorators: [
    (Story) => {
      const {
        treeData,
        selectedNode,
        expandedKeys,
        setExpandedKeys,
        handleExpandAll,
        handleCollapseAll,
        handleAction,
      } = useTree({ initialData: sampleData, treeId: '1' });
      const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);

      const handleNode = (title: string) => {
        if (title) {
          handleAction({
            type: 'ADD',
            payload: {
              type: 'ADD',
              parentNode: selectedNode || null,
              newNode: {
                title: title,
                treeId: '1',
              },
              treeId: '1',
            },
          });
        }
      };

      const handleDeleteNode = (data: any) => {
        if (data) {
          handleAction({
            type: 'DELETE',
            payload: {
              type: 'DELETE',
              nodeToDelete: data,
              treeId: '1',
            },
          });
        }
      };

      return (
        <div className="flex gap-4">
          <Story
            args={{
              data: treeData,
              selectedKey: selectedNode?.key,
              expandedKeys,
              setExpandedKeys,
              draggedNode,
              setDraggedNode,
              onAction: handleAction,
              treeId: '1',
            }}
          />
          <NodeDetail
            selectedNode={selectedNode}
            onAdd={handleNode}
            onDelete={handleDeleteNode}
            expandAll={handleExpandAll}
            collapseAll={handleCollapseAll}
          />
        </div>
      );
    },
  ],
};

export const constraintsTree: Story = {
  decorators: [
    (Story, context) => {
      const {
        treeData,
        selectedNode,
        expandedKeys,
        setExpandedKeys,
        handleExpandAll,
        handleCollapseAll,
        handleAction,
      } = useTree({
        initialData: context.args.data,
        treeId: '1',
      });
      const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);

      const handleDeleteNode = (selectNode: TreeNode) => {
        if (selectNode) {
          handleAction({
            type: 'DELETE',
            payload: {
              type: 'DELETE',
              nodeToDelete: selectNode,
              treeId: selectNode.treeId as string,
            },
          });
        }
      };

      const handleNode = (title: string) => {
        if (title) {
          handleAction({
            type: 'ADD',
            payload: {
              type: 'ADD',
              parentNode: selectedNode || null,
              newNode: {
                title: title,
                treeId: '1',
              },
              treeId: '1',
            },
          });
        }
      };

      return (
        <div className="flex gap-4">
          <TreeView
            treeId="1"
            data={treeData}
            selectedKey={selectedNode?.key}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            draggedNode={draggedNode}
            setDraggedNode={setDraggedNode}
            onAction={handleAction}
          />
          <NodeDetail
            selectedNode={selectedNode}
            onAdd={handleNode}
            onDelete={handleDeleteNode}
            expandAll={handleExpandAll}
            collapseAll={handleCollapseAll}
          />
        </div>
      );
    },
  ],
  args: {
    data: [
      {
        key: '1',
        title: '일반 노드',
        children: [
          {
            key: '1-1',
            title: '드래그 불가 노드',
            constraints: {
              drag: false,
            },
          },
          {
            key: '1-2',
            title: '드롭 불가 노드',
            constraints: {
              drop: false,
            },
          },
          {
            key: '1-3',
            title: '드래그/드롭 모두 불가',
            constraints: {
              drag: false,
              drop: false,
            },
          },
        ],
      },
    ],
  },
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
      const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);

      const {
        treeData: sourceData,
        selectedNode: sourceSelectedNode,
        expandedKeys: sourceExpandedKeys,
        setExpandedKeys: sourceSetExpandedKeys,
        handleAction: sourceHandleAction,
      } = useTree({ initialData: context.args.data, treeId: 'source' });

      const {
        treeData: targetData,
        selectedNode: targetSelectedNode,
        expandedKeys: targetExpandedKeys,
        setExpandedKeys: targetSetExpandedKeys,
        handleAction: targetHandleAction,
      } = useTree({ initialData: initialTargetData, treeId: 'target' });

      return (
        <div className="flex gap-8 p-4">
          <div className="flex-1">
            <h3 className="mb-2 font-semibold">소스 트리</h3>
            <TreeView
              treeId="source"
              data={sourceData}
              selectedKey={sourceSelectedNode?.key}
              expandedKeys={sourceExpandedKeys}
              setExpandedKeys={sourceSetExpandedKeys}
              draggedNode={draggedNode}
              setDraggedNode={setDraggedNode}
              onAction={sourceHandleAction}
            />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 font-semibold">타겟 트리</h3>
            <TreeView
              treeId="target"
              data={targetData}
              selectedKey={targetSelectedNode?.key}
              expandedKeys={targetExpandedKeys}
              setExpandedKeys={targetSetExpandedKeys}
              draggedNode={draggedNode}
              setDraggedNode={setDraggedNode}
              onAction={targetHandleAction}
            />
          </div>
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
  parameters: {
    docs: {
      description: {
        story:
          '두 개의 트리 컴포넌트 간의 드래그앤드롭을 보여줍니다. 왼쪽 트리에서 오른쪽 트리로 노드를 드래그하면 복사됩니다.',
      },
    },
    controls: {
      exclude: ['onNodeCopy', 'onDataChange', 'expandedKeys', 'setExpandedKeys'],
    },
  },
};

export const WithCustomEvent: Story = {
  decorators: [
    (Story) => {
      const [actionType, setActionType] = useState('');
      const { treeData, selectedNode, expandedKeys, setExpandedKeys, handleAction } = useTree({
        initialData: sampleData,
        treeId: '1',
        onMove: async (
          sourceNode: TreeNode,
          targetNode: TreeNode | null,
          position: string,
          targetIndex?: number,
        ) => {
          setActionType('MOVE!!');
        },
        onCopy: async (sourceNode: TreeNode, targetNode: TreeNode | null, position?: string) => {
          setActionType('COPY!!');
        },
      });
      const {
        treeData: targetData,
        selectedNode: targetSelectedNode,
        expandedKeys: targetExpandedKeys,
        setExpandedKeys: targetSetExpandedKeys,
        handleAction: targetHandleAction,
      } = useTree({
        initialData: [],
        onCopy: async (sourceNode: TreeNode, targetNode: TreeNode | null, position?: string) => {
          setActionType('COPY!!');
        },
        treeId: '2',
      });

      const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);

      return (
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Story
              args={{
                data: treeData,
                selectedKey: selectedNode?.key,
                expandedKeys,
                setExpandedKeys,
                draggedNode,
                setDraggedNode,
                onAction: handleAction,
                treeId: '1',
              }}
            />
            <Story
              args={{
                data: targetData,
                selectedKey: targetSelectedNode?.key,
                expandedKeys: targetExpandedKeys,
                setExpandedKeys: targetSetExpandedKeys,
                draggedNode,
                setDraggedNode,
                onAction: targetHandleAction,
                treeId: '2',
              }}
            />
          </div>
          <div>CUSTOM EVENT !! {actionType}</div>
        </div>
      );
    },
  ],
};
