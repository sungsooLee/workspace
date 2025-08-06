import { useGetCurriculumDetail } from '@entities/curriculum';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useDynamicForm2 } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { FormSubTitle } from '@learnway/ui/base-form';
import { FORM_MODE } from '@shared/const';
import { SectionLayout } from '@shared/ui/layout';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import { CurriculumTree } from '../components/curriculum-tree';
import { FormActionButtons } from '../components/form-action-buttons';
import { NodeFormRenderer } from '../components/node-form-renderer';

import { CurriculumDetailResponse, MAPPING_CURRICULUM_TYPE } from '@entities/curriculum';
import { useModal } from '@learnway/ui/modal';
import { useRouter } from '@tanstack/react-router';
import { useCurriculumActions } from '../hooks/use-curriculum-actions';
import { useCurriculumApi } from '../hooks/use-curriculum-api';
import { useCurriculumForm } from '../hooks/use-curriculum-form';
import { useCurriculumTree } from '../hooks/use-curriculum-tree';

interface CurriculumDetailProps {
  mode: FORM_MODE;
  curriculumId: number;
  onCurriculumCreated?: (curriculumId: number) => void;
}

const CurriculumDetailComponent = ({
  mode,
  curriculumId,
  onCurriculumCreated,
}: CurriculumDetailProps) => {
  const { data: loginUser } = useFetchAuthUser();
  const [formKey, setFormKey] = useState(0);
  const { confirm: openConfirm } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const prevCurriculumIdRef = useRef(0);
  // Dynamic Form Hook
  const {
    provider,
    getValues,
    onFormValid,
    updateFormData,
    onFormChange,
    watch,
    clearAllValidators,
  } = useDynamicForm2();

  // Curriculum Detail 조회
  const shouldFetchDetail = mode === FORM_MODE.detail && curriculumId > 0;
  const {
    data: curriculumDetail,
    isLoading: isLoadingDetail,
    refetch: refetchCurriculumDetail,
  } = useGetCurriculumDetail(shouldFetchDetail ? curriculumId : 0);

  // Custom 훅
  const {
    formStatus,
    formState,
    formRef,
    handleAddNode,
    handleFormCancel,
    updateFormStateForNode,
    resetFormState,
    setFormState,
  } = useCurriculumForm({ clearAllValidators, setFormKey });

  const {
    treeData,
    setTreeData,
    expandedKeys,
    setExpandedKeys,
    expandParentNodes,
    handleNodeSelect,
    customDropValidator,
    renderNodeDragHandle,
  } = useCurriculumTree({
    curriculumDetail,
    onNodeSelect: updateFormStateForNode,
    formState,
    curriculumId,
  });

  const api = useCurriculumApi({ curriculumId, onFormChange });

  const { handleFormSubmit, handleDeleteNode, handleTreeAction } = useCurriculumActions({
    curriculumId,
    curriculumDetail,
    loginUser,
    api,
    onFormChange,
    onCurriculumCreated,
    handleNodeSelect,
    expandParentNodes,
    setFormState,
    clearAllValidators,
    setFormKey,
    treeData,
    refetchCurriculumDetail,
    formState,
    router,
    expandedKeys,
    setExpandedKeys,
  });

  const handleSave = async () => {
    if (isSubmitting) return;

    const isValid = await onFormValid();
    if (isValid) {
      const formData = watch();
      setIsSubmitting(true);

      openConfirm({
        title: formState.isEditing
          ? t('LABEL.confirm.modify.title')
          : t('LABEL.confirm.save.title'),
        content: formState.isEditing
          ? t('LABEL.confirm.modify.message')
          : t('LABEL.confirm.save.message'),
        onClose: (value: boolean) => {
          if (value) {
            handleFormSubmit(formData, formState);
          }
          setIsSubmitting(false);
        },
      });
    }
  };

  const handleDelete = () => {
    if (formState.selectedNode) {
      const isCurriculum = formState.selectedNode.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;

      openConfirm({
        title: t('LABEL.confirm.delete.title'),
        content: isCurriculum
          ? t('삭제 후 목록으로 이동합니다.')
          : t('LABEL.confirm.delete.message', { type: t('레슨') }),
        onClose: (value: boolean) => {
          if (value) {
            handleDeleteNode(formState);
          }
        },
      });
    }
  };
  useEffect(() => {
    if (curriculumId > 0) {
      if (treeData.length > 0 && prevCurriculumIdRef.current !== curriculumId) {
        prevCurriculumIdRef.current = curriculumId;

        const rootNode = treeData.find(
          (node) => node.parentId === null || node.parentId === undefined,
        );

        if (rootNode && !formState.selectedNode) {
          // 트리 확장
          const keysToExpand: string[] = [rootNode.key];
          treeData.forEach((node) => {
            if (node.parentId === rootNode.id) {
              keysToExpand.push(node.key);
            }
          });
          setExpandedKeys(keysToExpand);

          handleNodeSelect(rootNode);
        }
      }
    }
  }, [curriculumId, treeData]);

  const handleCopyCurriculum = (curriculumId: number) => {
    if (curriculumId > 0) {
      api.copyCurriculum(
        { curriculumId },
        {
          onSuccess: (data: CurriculumDetailResponse) => {
            setTreeData([]);
            resetFormState();
            clearAllValidators();

            //응답받은 curriculumId로 상위로 올리기
            if (onCurriculumCreated) {
              onCurriculumCreated(data.curriculumId);
            }
          },
        },
      );
    }
  };

  return (
    <SectionLayout contentsRatio="half">
      <CurriculumTree
        mode={mode}
        curriculumId={curriculumId}
        treeData={treeData}
        selectedNode={formState.selectedNode}
        expandedKeys={expandedKeys}
        formState={formState}
        isLoadingDetail={isLoadingDetail}
        onExpandedKeysChange={setExpandedKeys}
        onNodeSelect={handleNodeSelect}
        onAddNode={handleAddNode}
        onTreeAction={handleTreeAction}
        customDropValidator={customDropValidator}
        renderNodeDragHandle={renderNodeDragHandle}
        curriculumDetail={curriculumDetail}
        onCurriculumLoad={(selectedCurriculumId: number) => {
          if (selectedCurriculumId) {
            setTimeout(() => {
              openConfirm({
                title: '불러오시겠습니까?',
                content: '목차는 불러온 목차로 새로 업데이트 됩니다.',
                onClose: (value: boolean) => {
                  if (value) {
                    handleCopyCurriculum(selectedCurriculumId);
                  }
                },
              });
            }, 100);
          }
        }}
      />

      <div className={layoutStyles.inner}>
        <FormSubTitle
          label={'상세 정보'}
          lineType="dark"
          actionNode={
            <FormActionButtons
              formStatus={formStatus}
              mode={mode}
              formState={formState}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          }
        />
        <form ref={formRef}>
          <NodeFormRenderer
            key={`${formState.activeFormType}-${formState.isEditing ? 'edit' : 'create'}-${formState.selectedNode?.id || 'new'}-${formKey}`}
            formState={formState}
            onFormSubmit={(data) => handleFormSubmit(data, formState)}
            onFormCancel={handleFormCancel}
            provider={provider}
            updateFormData={updateFormData}
            watch={watch}
            clearAllValidators={clearAllValidators}
            curriculumData={{
              tenantId: curriculumDetail?.tenantId || loginUser?.activeTenant?.tenantId,
              channelUuid: curriculumDetail?.channelUuid,
              contentType: undefined,
            }}
          />
        </form>
      </div>
    </SectionLayout>
  );
};

export const CurriculumDetail = CurriculumDetailComponent;
