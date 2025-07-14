import { IcoMinus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { Button, FormSubTitle, TreeBox, TreeNode } from '@learnway/ui';
import { FORM_MODE, FROM_STATUS } from '@shared/const';
import { SectionLayout } from '@shared/ui';
import { t } from 'i18next';
import { useState } from 'react';
import { FormRenderer } from '../components/form-renderer';
import { useCurriculumForm } from '../hooks/use-curriculum-form';
import { useTreeButtons } from '../hooks/use-tree-buttons';
import { FormState, NODE_TYPE } from '../types/form.types';

interface CurriculumDetailProps {
  mode: FORM_MODE;
  curriculumId: number;
}

const CurriculumDetailComponent = ({ mode, curriculumId }: CurriculumDetailProps) => {
  const [formStatus, setFormStatus] = useState<FROM_STATUS>(FROM_STATUS.NONE);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  const {
    provider,
    getValues,
    updateFormData,
    onSubmit,
    formState: hookFormState,
    watch,
  } = useCurriculumForm({
    onSuccess: (data, nodeType) => {
      console.log('Form submitted successfully:', data, nodeType);
      // 폼 초기화
      //   handleFormCancel();
    },
    onError: (error) => {
      console.error('Form submission failed:', error);
    },
  });

  const handleAddNode = (nodeType: NODE_TYPE, parentNode: TreeNode | null) => {
    setFormState({
      activeFormType: nodeType,
      selectedNode: null,
      parentNode,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.CREATE);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
  };

  const handleFormCancel = () => {
    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.NONE);
  };

  const { renderNodeButtons, renderCustomTreeButtons } = useTreeButtons({
    onAddNode: handleAddNode,
  });

  const customTreeRenderButton = () => {
    if (mode === FORM_MODE.create) {
      return renderCustomTreeButtons(() => handleAddNode(NODE_TYPE.CURRICULUM, null));
    }
  };

  const customFormActionButton = () => {
    if (formStatus !== FROM_STATUS.NONE && mode === FORM_MODE.create) {
      return (
        <>
          {/* <Button
            type="button"
            variant="text"
            size="sm"
          //   onClick={handleReset}
          //   disabled={formMode === FORM_MODE.NONE}
            className={layoutStyles.btn_text}
          >
            {t('LABEL.button.reset')}
          </Button> */}
          <Button
            variant="text"
            size="sm"
            //   disabled={formMode === FORM_MODE.NONE || formMode === FORM_MODE.ADD}
            //   onClick={handleDelete}
            className={layoutStyles.btn_text}
            icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
          >
            {t('LABEL.button.delete')}
          </Button>
          <Button
            type="submit"
            variant="save"
            size="sm"
            // onClick={onSubmit(handleFormSubmit)}
          >
            {t('LABEL.button.save')}
          </Button>
        </>
      );
    }
    return null;
  };
  return (
    <SectionLayout contentsRatio="half">
      <TreeBox
        treeId={'curriculum-tree'}
        data={treeData}
        customButtonNode={customTreeRenderButton()}
        renderNodeButtons={renderNodeButtons}
        title="목차"
        emptyMessage="'신규등록'버튼을 클릭하여 추가해주세요."
      />

      <div className={layoutStyles.inner}>
        <form onSubmit={onSubmit(handleFormSubmit)}>
          <FormSubTitle label={'상세 정보'} lineType="dark" actionNode={customFormActionButton()} />
          <FormRenderer
            formState={formState}
            formProvider={provider}
            onFormSubmit={handleFormSubmit}
            onFormCancel={handleFormCancel}
          />
        </form>
      </div>
    </SectionLayout>
  );
};

export const CurriculumDetail = CurriculumDetailComponent;
