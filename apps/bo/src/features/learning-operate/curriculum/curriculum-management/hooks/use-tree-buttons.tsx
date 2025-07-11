import React from 'react';
import { TreeNode, Button } from '@learnway/ui';
import { NODE_TYPE } from '../types/form.types';
import { IcoPlus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

interface UseTreeButtonsProps {
  onAddNode: (nodeType: NODE_TYPE, parentNode: TreeNode | null) => void;
}

export const useTreeButtons = ({ onAddNode }: UseTreeButtonsProps) => {
  const renderNodeButtons = (node: TreeNode, level: number): React.ReactNode => {
    const nodeType = node.apiNodeType;

    switch (nodeType) {
      case NODE_TYPE.CURRICULUM:
        return (
          <>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={(e) => {
                e.stopPropagation();
                onAddNode(NODE_TYPE.MODULE, node);
              }}
              icon={<IcoPlus width={16} height={16} stroke="#131C30" />}
            >
              모듈추가
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={(e) => {
                e.stopPropagation();
                onAddNode(NODE_TYPE.LESSON, node);
              }}
              icon={<IcoPlus width={16} height={16} stroke="#131C30" />}
            >
              레슨추가
            </Button>
          </>
        );

      case NODE_TYPE.MODULE:
        return (
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            onClick={(e) => {
              e.stopPropagation();
              onAddNode(NODE_TYPE.LESSON, node);
            }}
            icon={<IcoPlus width={16} height={16} stroke="#131C30" />}
          >
            레슨추가
          </Button>
        );

      case NODE_TYPE.LESSON:
        return null; // 레슨은 하위 노드 생성 불가

      default:
        return null;
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