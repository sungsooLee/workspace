import React from 'react';
import { cn } from '@learnway/shared';
import styles from './tree.module.css';

interface TreeSkeletonProps {
  nodeCount?: number;
  showNestedItems?: boolean;
}

const SkeletonNode: React.FC<{ level: number; hasChildren?: boolean }> = ({
  level,
  hasChildren = false,
}) => (
  <div className="mb-1">
    <div
      className={cn(styles.tree_inner, 'animate-pulse border-2 border-transparent')}
      style={{
        paddingLeft: `${level * 28}px`,
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        margin: '2px 0',
        borderRadius: '6px',
      }}
    >
      {/* 확장/접기 아이콘 스켈레톤 */}
      {hasChildren && <div className="mr-2 h-5 w-5 animate-pulse rounded bg-gray-300"></div>}

      {/* 폴더/파일 아이콘 스켈레톤 */}
      {level > 0 && <div className="mr-2 h-4 w-4 animate-pulse rounded bg-gray-300"></div>}

      {/* 노드 제목 스켈레톤 */}
      <div className="mr-4 flex-1">
        <div
          className="h-4 animate-pulse rounded bg-gray-300"
          style={{
            width: `${Math.random() * 40 + 60}%`, // 60-100% 랜덤 너비
          }}
        ></div>
      </div>
    </div>
  </div>
);

export const TreeSkeleton: React.FC<TreeSkeletonProps> = ({
  nodeCount = 5,
  showNestedItems = true,
}) => {
  const generateSkeletonNodes = () => {
    const nodes = [];

    nodes.push(<SkeletonNode key="root" level={0} hasChildren={showNestedItems} />);

    if (showNestedItems) {
      for (let i = 0; i < Math.min(nodeCount - 1, 3); i++) {
        const hasChildren = Math.random() > 0.5;
        nodes.push(<SkeletonNode key={`level1-${i}`} level={1} hasChildren={hasChildren} />);

        if (hasChildren && i < 2) {
          for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
            nodes.push(<SkeletonNode key={`level2-${i}-${j}`} level={2} hasChildren={false} />);
          }
        }
      }
    } else {
      for (let i = 1; i < nodeCount; i++) {
        nodes.push(<SkeletonNode key={`flat-${i}`} level={1} hasChildren={false} />);
      }
    }

    return nodes;
  };

  return (
    <div className={cn(styles.tree_wrap, 'tree_wrap')}>
      <div className={styles.tree}>
        <div className="relative">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
            </div>
          </div>
          <div className="opacity-60">{generateSkeletonNodes()}</div>
        </div>
      </div>
    </div>
  );
};
