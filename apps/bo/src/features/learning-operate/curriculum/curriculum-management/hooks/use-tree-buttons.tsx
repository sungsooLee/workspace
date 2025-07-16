import React from 'react';
import { TreeNode, Button } from '@learnway/ui';
import { FormState, NODE_CHILDREN_MAP } from '../types/form.types';
import { IcoPlus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { MAPPING_CURRICULUM_TYPE } from '@types';

interface UseTreeButtonsProps {
  onAddNode: (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => void;
  formState: FormState;
}

export const useTreeButtons = ({ onAddNode, formState }: UseTreeButtonsProps) => {
  const renderNodeButtons = (node: TreeNode, level: number): React.ReactNode => {
    const nodeType = node.type as MAPPING_CURRICULUM_TYPE;
    const allowedChildren = NODE_CHILDREN_MAP[nodeType] || [];

    const isCurrentParentNode = formState.parentNode?.id === node.id;
    const isInCreateMode = !formState.isEditing;

    return (
      <div className="flex flex-row gap-2">
        {allowedChildren.map((childType) => (
          <Button
            key={childType}
            variant={
              isCurrentParentNode && isInCreateMode && formState.activeFormType === childType
                ? 'primary'
                : 'gray2'
            }
            size="xs"
            className={layoutStyles.btn_text}
            onClick={(e) => {
              e.stopPropagation();
              onAddNode(childType, node);
            }}
          >
            {getAddButtonLabel(childType)}
          </Button>
        ))}
      </div>
    );
  };

  // 버튼 라벨 생성 함수
  const getAddButtonLabel = (nodeType: MAPPING_CURRICULUM_TYPE): string => {
    switch (nodeType) {
      case MAPPING_CURRICULUM_TYPE.MODULE:
        return '모듈추가';
      case MAPPING_CURRICULUM_TYPE.LESSON:
        return '레슨추가';
      case MAPPING_CURRICULUM_TYPE.CURRICULUM:
        return '커리큘럼추가';
      default:
        return '추가';
    }
  };

  const renderCustomTreeButtons = (onAddCurriculum: () => void): React.ReactNode => {
    return (
      <>
        <Button
          variant="text"
          size="sm"
          className={layoutStyles.btn_text}
          onClick={() => {
            // 불러오기 기능 - 추후 구현
          }}
        >
          불러오기
        </Button>
        <Button
          variant="text"
          size="sm"
          className={layoutStyles.btn_text}
          onClick={onAddCurriculum}
          icon={<IcoPlus width={16} height={16} stroke="#131C30" />}
        >
          신규등록
        </Button>
      </>
    );
  };

  return {
    renderNodeButtons,
    renderCustomTreeButtons,
  };
};
