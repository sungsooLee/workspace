import { useState, useCallback, useRef } from 'react';
import { TreeNode } from '@learnway/ui';
import { FormState, NODE_CHILDREN_MAP } from '../types/form.types';
import { FROM_STATUS } from '@shared/const';
import { MAPPING_CURRICULUM_TYPE } from '@types';
import { findParentNode } from '../services';

interface UseCurriculumFormProps {
  clearAllValidators: () => void;
  setFormKey: React.Dispatch<React.SetStateAction<number>>;
}

export const useCurriculumForm = ({ clearAllValidators, setFormKey }: UseCurriculumFormProps) => {
  const [formStatus, setFormStatus] = useState<FROM_STATUS>(FROM_STATUS.NONE);
  const [isDndActive, setIsDndActive] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleAddNode = useCallback(
    (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => {
      // 폼을 언마운트
      setFormState({
        activeFormType: null,
        selectedNode: null,
        parentNode: null,
        isEditing: false,
      });
      setFormStatus(FROM_STATUS.NONE);

      clearAllValidators();

      setFormState({
        activeFormType: nodeType,
        selectedNode: parentNode,
        parentNode,
        isEditing: false,
      });
      setFormStatus(FROM_STATUS.CREATE);
      setFormKey((prev) => prev + 1);
    },
    [clearAllValidators, setFormKey],
  );

  const handleFormCancel = useCallback(() => {
    clearAllValidators();

    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.NONE);
    setFormKey((prev) => prev + 1);
  }, [clearAllValidators, setFormKey]);

  const updateFormStateForNode = useCallback(
    (node: TreeNode | null, treeData: TreeNode[]) => {
      clearAllValidators();

      if (!node) {
        setFormState({
          activeFormType: null,
          selectedNode: null,
          parentNode: null,
          isEditing: false,
        });
        setFormStatus(FROM_STATUS.NONE);
        setFormKey((prev) => prev + 1);
        return;
      }

      setFormState({
        activeFormType: node.type as MAPPING_CURRICULUM_TYPE,
        selectedNode: node,
        parentNode: findParentNode(treeData, node.parentId),
        isEditing: true,
      });
      setFormStatus(FROM_STATUS.EDIT);
      setFormKey((prev) => prev + 1);
    },
    [clearAllValidators, setFormKey],
  );

  const resetFormState = useCallback(() => {
    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    clearAllValidators();
    setFormStatus(FROM_STATUS.NONE);
  }, [clearAllValidators]);

  return {
    formStatus,
    setFormStatus,
    formState,
    setFormState,
    formRef,
    handleAddNode,
    handleFormCancel,
    updateFormStateForNode,
    resetFormState,
    isDndActive,
    setIsDndActive,
  };
};
