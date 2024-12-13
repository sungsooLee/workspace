import type { Meta, StoryObj } from '@storybook/react';
import { TreeNode } from './type';
import { TreeView } from './tree';
import { useTreeView } from './tree.hook';
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
      const {
        treeData,
        selectedNode,
        expandedKeys,
        setExpandedKeys,
        handleNodeClick,
        handleTreeChange,
      } = useTreeView({ initialData: sampleData });

      return (
        <div className="flex gap-4">
          <Story
            args={{
              data: treeData,
              selectedKey: selectedNode?.key,
              onNodeClick: handleNodeClick,
              onDataChange: handleTreeChange,
              expandedKeys,
              setExpandedKeys,
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
        handleNodeClick,
        handleAddNode,
        handleDeleteNode,
        handleTreeChange,
        handleExpandAll,
        handleCollapseAll,
      } = useTreeView({ initialData: sampleData });

      return (
        <div className="flex gap-4">
          <Story
            args={{
              data: treeData,
              selectedKey: selectedNode?.key,
              onNodeClick: handleNodeClick,
              onDataChange: handleTreeChange,
              expandedKeys,
              setExpandedKeys,
            }}
          />
          <NodeDetail
            selectedNode={selectedNode}
            onAdd={handleAddNode}
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
        handleNodeClick,
        handleAddNode,
        handleDeleteNode,
        handleTreeChange,
        handleExpandAll,
        handleCollapseAll,
      } = useTreeView({ initialData: context.args.data });

      return (
        <div className="flex gap-4">
          <TreeView
            data={treeData}
            selectedKey={selectedNode?.key}
            onNodeClick={handleNodeClick}
            onDataChange={handleTreeChange}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
          />
          <NodeDetail
            selectedNode={selectedNode}
            onAdd={handleAddNode}
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
