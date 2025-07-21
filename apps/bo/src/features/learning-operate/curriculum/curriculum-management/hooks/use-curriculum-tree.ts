import { useState, useCallback, useRef, useEffect } from 'react';
import { TreeNode } from '@learnway/ui';
import { CurriculumResponse, MAPPING_CURRICULUM_TYPE, MODULE_TYPE } from '@types';
import { buildTreeFromCurriculumData, findParentNode } from '../services';
import { FormState } from '../types/form.types';

interface UseCurriculumTreeProps {
  curriculumDetail: CurriculumResponse | undefined;
  onNodeSelect: (node: TreeNode, treeData: TreeNode[]) => void;
  formState: FormState;
}

export const useCurriculumTree = ({
  curriculumDetail,
  onNodeSelect,
  formState,
}: UseCurriculumTreeProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const prevSelectedNodeRef = useRef<TreeNode | null>(null);

  useEffect(() => {
    if (curriculumDetail) {
      const treeNodes = buildTreeFromCurriculumData(curriculumDetail);
      setTreeData(treeNodes);
    }
  }, [curriculumDetail]);

  const expandParentNodes = useCallback(
    (parentNode: TreeNode | null) => {
      if (!parentNode) return;

      const getParentKeys = (node: TreeNode | null): string[] => {
        if (!node) return [];
        const parentKeys = getParentKeys(findParentNode(treeData, node.parentId));
        return [...parentKeys, node.key];
      };

      const parentKeys = getParentKeys(parentNode);
      setExpandedKeys((prevKeys) => {
        const newKeys = [...new Set([...prevKeys, ...parentKeys])];
        return newKeys;
      });
    },
    [treeData],
  );

  const handleNodeSelect = useCallback(
    (node: TreeNode, forceRefresh = false) => {
      if (!forceRefresh && prevSelectedNodeRef.current?.id === node.id) {
        return;
      }

      prevSelectedNodeRef.current = node;
      onNodeSelect(node, treeData);
    },
    [onNodeSelect, treeData],
  );

  const customDropValidator = useCallback<any>(
    ({ sourceNode, targetNode, dropPosition }: any) => {
      // FIXED 모듈 하위 레슨은 이동 불가
      const sourceParent = findParentNode(treeData, sourceNode.parentId);
      if (
        sourceParent?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
        sourceParent?.data?.moduleType === MODULE_TYPE.FIXED
      ) {
        return false;
      }

      if (dropPosition === 'INSIDE') {
        // 커리큘럼 안으로는 레슨과 모듈 모두 가능 (항상 허용)
        if (targetNode.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
          return true;
        }

        // FIXED 모듈 안으로는 아무것도 올 수 없음
        if (
          targetNode.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetNode.data?.moduleType === MODULE_TYPE.FIXED
        ) {
          return false;
        }
        // GENERAL 모듈 안으로는 레슨만 가능
        if (
          targetNode.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetNode.data?.moduleType === MODULE_TYPE.GENERAL
        ) {
          return sourceNode.type === MAPPING_CURRICULUM_TYPE.LESSON;
        }

        // 레슨 안으로는 아무것도 올 수 없음
        if (targetNode.type === MAPPING_CURRICULUM_TYPE.LESSON) {
          return false;
        }
      }

      // BEFORE/AFTER 드롭의 경우
      const targetParent = findParentNode(treeData, targetNode.parentId);

      // 레슨은 커리큘럼 하위 또는 GENERAL 모듈 하위로만 이동 가능
      if (sourceNode.type === MAPPING_CURRICULUM_TYPE.LESSON) {
        if (!targetParent) return false;

        if (targetParent.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
          return true;
        }

        if (
          targetParent.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetParent.data?.moduleType === MODULE_TYPE.GENERAL
        ) {
          return true;
        }

        return false;
      }

      // 모듈은 커리큘럼 하위로만 이동 가능
      if (sourceNode.type === MAPPING_CURRICULUM_TYPE.MODULE) {
        return targetParent?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
      }

      return false;
    },
    [treeData],
  );

  const renderNodeDragHandle = useCallback(
    (node: TreeNode) => {
      // FIXED 모듈 하위 레슨은 드래그 핸들 숨김
      const parentNode = findParentNode(treeData, node.parentId);
      if (
        parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
        parentNode?.data?.moduleType === MODULE_TYPE.FIXED &&
        node.type === MAPPING_CURRICULUM_TYPE.LESSON
      ) {
        return false;
      }
      return true;
    },
    [treeData],
  );

  return {
    treeData,
    setTreeData,
    expandedKeys,
    setExpandedKeys,
    expandParentNodes,
    handleNodeSelect,
    customDropValidator,
    renderNodeDragHandle,
  };
};
