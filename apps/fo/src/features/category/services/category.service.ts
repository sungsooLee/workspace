import { convertHierarchyToList } from '@learnway/shared';
import { useCreation } from 'ahooks';
import { useFetchCategories } from '../../../entities/category/service/category.hook';
import { t } from 'i18next';

export function useCategories() {
  const { data } = useFetchCategories();

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return [];
      }

      return convertHierarchyToList(data);
    }, [data]),
  };
}

export interface CategoryDetailComponentProps {
  categoryId: number
}

// 트리노드 찾아가는 함수
export const findNodeById = (tree: any[], targetId: number): any | null => {
  for (const node of tree) {
    if (node.id === targetId) return node;

    if (node.children) {
      const found = findNodeById(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
}

export const collectDepths = (treeNode: any): {
  depth4: { label: string; value: number }[];
  depth5: { parentId?: number; label: string; value: number }[];
} => {
  const depth4: { label: string; value: number }[] = [
    {label: t('대분류'), value: 0}
  ];
  const depth5: { parentId?: number; label: string; value: number }[] = [
    {label: t('소분류'), value: 0}
  ];

  if (!treeNode?.children) return { depth4, depth5 };

  for (const node4 of treeNode.children) {
    depth4.push({
      label: node4.name,
      value: node4.id,
    });

    if (node4.children) {
      for (const node5 of node4.children) {
        depth5.push({
          parentId: node4.id,
          label: node5.name,
          value: node5.id,
        });
      }
    }
  }

  return { depth4, depth5 };
}
