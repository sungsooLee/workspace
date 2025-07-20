import { useState } from 'react';
import { FormSubTitle, useModal } from '@learnway/ui';
import { SectionLayout } from '@shared/ui';
import { FORM_MODE } from '@shared/const';
import { useGetCurriculumDetail } from '@entities/curriculum';
import { useDynamicForm2 } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { t } from 'i18next';

import { NodeFormRenderer } from '../components/node-form-renderer';
import { CurriculumTree } from '../components/curriculum-tree';
import { FormActionButtons } from '../components/form-action-buttons';

import { useCurriculumTree } from '../hooks/use-curriculum-tree';
import { useCurriculumForm } from '../hooks/use-curriculum-form';
import { useCurriculumApi } from '../hooks/use-curriculum-api';
import { useCurriculumActions } from '../hooks/use-curriculum-actions';

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
      openConfirm({
        title: t('LABEL.confirm.delete.title'),
        content: t('LABEL.confirm.delete.message', { type: t('LABEL.common.code.curriculum') }),
        onClose: (value: boolean) => {
          if (value) {
            handleDeleteNode(formState);
          }
        },
      });
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
        onCurriculumLoad={(selectedCurriculumId) => {
          console.log('선택된 커리큘럼:', selectedCurriculumId);
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
