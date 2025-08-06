import { MAPPING_CURRICULUM_TYPE } from '@entities/curriculum';
import { TreeBox, TreeContainer, TreeNode } from '@learnway/ui/tree-view';
import { FORM_MODE } from '@shared/const';
import React from 'react';
import { useTreeButtons } from '../hooks/use-tree-buttons';
import { FormState } from '../types/form.types';

interface CurriculumTreeProps {
  mode: FORM_MODE;
  curriculumId: number;
  treeData: TreeNode[];
  selectedNode: TreeNode | null;
  expandedKeys: string[];
  formState: FormState;
  isLoadingDetail?: boolean;
  onExpandedKeysChange: (keys: string[]) => void;
  onNodeSelect: (node: TreeNode) => void;
  onAddNode: (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => void;
  onTreeAction: (event: any) => void;
  customDropValidator: (params: any) => boolean;
  renderNodeDragHandle: (node: TreeNode) => boolean;
  curriculumDetail?: any;
  onCurriculumLoad?: (curriculumId: number) => void;
}

export const CurriculumTree: React.FC<CurriculumTreeProps> = ({
  mode,
  curriculumId,
  treeData,
  selectedNode,
  expandedKeys,
  formState,
  isLoadingDetail = false,
  onExpandedKeysChange,
  onNodeSelect,
  onAddNode,
  onTreeAction,
  customDropValidator,
  renderNodeDragHandle,
  curriculumDetail,
  onCurriculumLoad,
}) => {
  const { renderNodeButtons, renderCustomTreeButtons } = useTreeButtons({
    onAddNode,
    formState,
    curriculumDetail,
    onCurriculumLoad,
  });

  const customTreeRenderButton = () => {
    if (mode === FORM_MODE.create) {
      return renderCustomTreeButtons(() => onAddNode(MAPPING_CURRICULUM_TYPE.CURRICULUM, null));
    } else if (mode === FORM_MODE.detail && curriculumId > 0) {
      // curriculumId가 있는 경우 불러오기 버튼만 표시
      return renderCustomTreeButtons(
        () => onAddNode(MAPPING_CURRICULUM_TYPE.CURRICULUM, null),
        true,
      );
    }
  };

  return (
    <TreeContainer>
      <TreeBox
        treeId={'curriculum-tree'}
        data={treeData}
        selectedNode={selectedNode}
        customButtonNode={customTreeRenderButton()}
        renderNodeButtons={renderNodeButtons}
        handleSelectedNodeChange={onNodeSelect}
        type="DRAG_DROP"
        title="목차"
        initLevel={1}
        expandedKeys={expandedKeys}
        onExpandedKeysChange={onExpandedKeysChange}
        onAction={onTreeAction}
        customDropValidator={customDropValidator}
        renderNodeDragHandle={renderNodeDragHandle}
        emptyMessage={
          mode === FORM_MODE.create
            ? "'신규등록'버튼을 클릭하여 커리큘럼을 추가해주세요."
            : isLoadingDetail
              ? '로딩 중...'
              : '데이터가 없습니다.'
        }
        isBasicInfo={mode === FORM_MODE.detail}
      />
    </TreeContainer>
  );
};
