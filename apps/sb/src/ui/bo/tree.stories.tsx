import { Button } from '@learnway/ui/button';
import { TreeBox, TreeContainer, TreeNode } from '@learnway/ui/tree-view';
import type { Meta, StoryObj } from '@storybook/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18n.init({
  lng: 'ko',
  fallbackLng: 'ko',
  resources: {
    ko: {
      translation: {
        'LABEL.tree.expand': '전체펼침',
        'LABEL.tree.closed': '전체닫기',
      },
    },
    en: {
      translation: {
        'LABEL.tree.expand': 'Expand All',
        'LABEL.tree.closed': 'Collapse All',
      },
    },
  },
});

const meta: Meta<typeof TreeBox> = {
  title: 'Bo-Components/TreeView',
  component: TreeBox,
  parameters: {
    // layout: 'centered',
    docs: {
      description: {
        component: '드래그앤드롭이 가능한 트리 컴포넌트.',
      },
      // container: ({ children }: { children: React.ReactNode }) => (
      //   <div style={{ minWidth: '800px', padding: '20px' }}>{children}</div>
      // ),
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div style={{ minWidth: '800px', width: '100%', padding: '20px' }}>
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TreeBox>;

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
      {
        key: '1-2',
        title: 'Child 2',
        isUsed: true,
        children: [
          { key: '2-1', title: 'Child 3', isUsed: false },
          { key: '2-2', title: 'Child 4', isUsed: false },
        ],
      },
    ],
  },
];
const sampleData2: TreeNode[] = [
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
      {
        key: '1-2',
        title: 'Child 2',
        isUsed: true,
        children: [
          { key: '2-1', title: 'Child 3', isUsed: false },
          { key: '2-2', title: 'Child 4', isUsed: false },
        ],
      },
    ],
  },
];

const sampleData3: TreeNode[] = [
  {
    key: '11',
    title: 'Root Node 1',
    isUsed: false,
    children: [
      {
        key: '12',
        title: 'Child 1',
        isUsed: true,
        children: [
          { key: '1-1-13', title: 'Grandchild 1', isUsed: true },
          { key: '1-1-24', title: 'Grandchild 2', isUsed: false },
        ],
      },
      {
        key: '1-25',
        title: 'Child 2',
        isUsed: true,
        children: [
          { key: '2-16', title: 'Child 3', isUsed: false },
          { key: '2-2', title: 'Child 4', isUsed: false },
        ],
      },
    ],
  },
];

const TreeComponent: React.FC<any> = (args) => {
  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="gray2"
          size={'xs'}
          type={'button'}
        >
          BTN
        </Button>
      </div>
    </div>
  );
  return (
    <div className="flex w-full">
      <TreeContainer>
        <TreeBox
          data={sampleData}
          treeId={'menu-tree'}
          renderNodeButtons={renderNodeButtons}
          {...args}
          clientTree
        />
        <TreeBox
          data={sampleData3}
          treeId={'test2'}
          renderNodeButtons={renderNodeButtons}
          {...args}
          clientTree
        />
      </TreeContainer>
    </div>
  );
};

export const TreeComponentStory: Story = {
  args: {
    title: '트리 컴포넌트',
    type: 'DRAG_DROP',
    clientTree: true,
    showSearchKeyword: true,
    initLevel: 2,
  },
  render: (args) => <TreeComponent {...args} />,
};
