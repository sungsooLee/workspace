import { t } from 'i18next';
import { useRef, useState, useEffect } from 'react';
import { FormState } from '../types/form.types';
import { NodeFormRenderer } from '../components/node-form-renderer';
import { useNodeData } from '../hooks/use-node-data';
import { useTreeButtons } from '../hooks/use-tree-buttons';
import {
  useCreateCurriculum,
  useCreateFixedModule,
  useCreateGeneralModule,
  useGetCurriculumDetail,
  useUpdateFixedModule,
  useUpdateGeneralModule,
} from '@entities/curriculum';
import { useDynamicForm3 } from '@learnway/hooks';
import {
  CurriculumResponse,
  FixedModuleSaveParams,
  GeneralModuleSaveParams,
  MAPPING_CURRICULUM_TYPE,
  MODULE_TYPE,
} from '@types';
import { buildTreeFromCurriculumData, findParentNode } from '../services';
import { FORM_MODE, FROM_STATUS } from '@shared/const';
import { Button, FormSubTitle, TreeBox, TreeContainer, TreeNode } from '@learnway/ui';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { IcoMinus } from '@learnway/icons';
import { SectionLayout } from '@shared/ui';
import { DndContext } from '@dnd-kit/core';
import { useFetchAuthUser } from '@learnway/auth/entities';

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
  const [formStatus, setFormStatus] = useState<FROM_STATUS>(FROM_STATUS.NONE);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  // 커리큘럼 상세 조회 (mode가 detail이고 curriculumId가 유효할 때만)
  const shouldFetchDetail = mode === FORM_MODE.detail && curriculumId > 0;
  const { data: curriculumDetail, isLoading: isLoadingDetail } = useGetCurriculumDetail(
    shouldFetchDetail ? curriculumId : 0,
  );

  const { create: createCurriculum } = useCreateCurriculum({});
  const { create: createCurriculumFixedModule } = useCreateFixedModule({});
  const { create: createCurriculumGeneralModule } = useCreateGeneralModule({});
  const { update: updateCurriculumFixedModule } = useUpdateFixedModule({});
  const { update: updateCurriculumGeneralModule } = useUpdateGeneralModule({});

  const { getValues, onSubmit, autoFormContext, handleSubmit, watch, setValue, loadFormData } =
    useDynamicForm3();
  const formRef = useRef<HTMLFormElement>(null);

  // 선택된 노드의 상세 데이터 조회
  const {
    data: selectedNodeData,
    isLoading: isNodeDataLoading,
    error: nodeDataError,
  } = useNodeData({
    selectedNode: formState.selectedNode,
    curriculumId,
  });

  // 커리큘럼 데이터가 변경될 때마다 트리 데이터 업데이트
  useEffect(() => {
    if (curriculumDetail) {
      const treeNodes = buildTreeFromCurriculumData(curriculumDetail);
      setTreeData(treeNodes);
    } else if (mode === FORM_MODE.create) {
      // 생성 모드일 때는 빈 트리
      setTreeData([]);
    }
  }, [curriculumDetail, mode]);

  // 모듈 생성 전략 (GENERAL, FIXED 모듈에 따라 다르게 처리)
  const moduleCreateStrategy = {
    [MODULE_TYPE.GENERAL]: (data: GeneralModuleSaveParams, onSuccess: (response: any) => void) => {
      return createCurriculumGeneralModule(
        {
          ...data,
          curriculumId,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: FixedModuleSaveParams, onSuccess: (response: any) => void) => {
      return createCurriculumFixedModule(
        {
          ...data,
          curriculumId,
        },
        { onSuccess },
      );
    },
  };
  // 모듈 업데이트
  const moduleUpdateStrategy = {
    [MODULE_TYPE.GENERAL]: (data: GeneralModuleSaveParams, onSuccess: (response: any) => void) => {
      return updateCurriculumGeneralModule(
        {
          ...data,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: FixedModuleSaveParams, onSuccess: (response: any) => void) => {
      return updateCurriculumFixedModule(
        {
          ...data,
        },
        { onSuccess },
      );
    },
  };

  const handleAddNode = (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => {
    setFormState({
      activeFormType: nodeType,
      selectedNode: parentNode,
      parentNode,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.CREATE);
  };

  const handleFormSubmit = (data: any) => {
    const { activeFormType, parentNode, isEditing } = formState;
    console.log(data);
    console.log(loginUser);
    // console.log()
    const curriculumData = {
      ...data,
      // channelUuid: '1', // TODO: 실제 채널 UUID로 교체
      // tenantId: 1, // TODO: 실제 테넌트 ID로 교체
      channelUuid: data.channelUuid,
      tenantId: loginUser?.activeTenant?.tenantId,
    };
    switch (activeFormType) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM:
        if (isEditing && formState.selectedNode) {
          console.log('수정 로직!');
          // 수정 로직
        } else {
          createCurriculum(curriculumData, {
            onSuccess: (createdCurriculum: CurriculumResponse) => {
              if (createdCurriculum.curriculumId && onCurriculumCreated) {
                onCurriculumCreated(createdCurriculum.curriculumId);
              }
              const newNode: TreeNode = {
                id: createdCurriculum.curriculumId,
                key: `curriculum-${createdCurriculum.curriculumId}`,
                name: createdCurriculum.curriculumName || data.curriculumName,
                type: MAPPING_CURRICULUM_TYPE.CURRICULUM,
                parentId: parentNode?.id || null,
                children: [],
                data: createdCurriculum,
              };
              handleNodeSelect(newNode);
            },
          });
        }
        break;

      case MAPPING_CURRICULUM_TYPE.MODULE: {
        const moduleType = data.moduleType;
        if (isEditing && formState.selectedNode) {
          const updateModuleFn = moduleUpdateStrategy[moduleType as MODULE_TYPE];
          if (updateModuleFn) {
            updateModuleFn(data, (updateModule: any) => {
              const updatedNode: TreeNode = {
                id: updateModule.moduleId,
                key: `module-${updateModule.moduleId}`,
                type: MAPPING_CURRICULUM_TYPE.MODULE,
                parentId: parentNode?.id || null,
                children: [],
              };

              handleNodeSelect(updatedNode);
            });
          }
        } else {
          const createModuleFn = moduleCreateStrategy[moduleType as MODULE_TYPE];
          if (createModuleFn) {
            createModuleFn(data, (createdModuleId: number) => {
              const newNode: TreeNode = {
                id: createdModuleId,
                key: `module-${createdModuleId}`,
                type: MAPPING_CURRICULUM_TYPE.MODULE,
                parentId: parentNode?.id || null,
                children: [],
              };

              handleNodeSelect(newNode);
            });
          }
        }
        break;
      }
      case MAPPING_CURRICULUM_TYPE.LESSON:
        if (isEditing && formState.selectedNode) {
          console.log('레슨 수정 로직!');
        } else {
          console.log('레슨 생성 로직!');
        }
        break;
    }
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

  // 트리 노드 선택 핸들러
  const handleNodeSelect = (node: TreeNode) => {
    console.log(node);
    setFormState({
      activeFormType: node.type as MAPPING_CURRICULUM_TYPE,
      selectedNode: node,
      parentNode: findParentNode(treeData, node.parentId),
      isEditing: true,
    });
    setFormStatus(FROM_STATUS.EDIT);
  };

  const { renderNodeButtons, renderCustomTreeButtons } = useTreeButtons({
    onAddNode: handleAddNode,
    formState,
  });

  const customTreeRenderButton = () => {
    if (mode === FORM_MODE.create) {
      return renderCustomTreeButtons(() => handleAddNode(MAPPING_CURRICULUM_TYPE.CURRICULUM, null));
    }
  };

  const customFormActionButton = () => {
    if (
      formStatus !== FROM_STATUS.NONE &&
      (mode === FORM_MODE.create || mode === FORM_MODE.detail)
    ) {
      return (
        <>
          <Button
            variant="text"
            size="sm"
            className={layoutStyles.btn_text}
            icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
          >
            {t('LABEL.button.delete')}
          </Button>
          <Button
            type="button"
            variant="save"
            size="sm"
            onClick={() => {
              handleSubmit(handleFormSubmit)();
            }}
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
      <TreeContainer>
        <TreeBox
          treeId={'curriculum-tree'}
          data={treeData}
          selectedNode={formState.selectedNode}
          customButtonNode={customTreeRenderButton()}
          renderNodeButtons={renderNodeButtons}
          handleSelectedNodeChange={handleNodeSelect}
          type="DRAG_DROP"
          title="목차"
          emptyMessage={
            mode === FORM_MODE.create
              ? "'신규등록'버튼을 클릭하여 커리큘럼을 추가해주세요."
              : isLoadingDetail
                ? '로딩 중...'
                : '데이터가 없습니다.'
          }
        />
      </TreeContainer>
      <div className={layoutStyles.inner}>
        <FormSubTitle label={'상세 정보'} lineType="dark" actionNode={customFormActionButton()} />
        <form ref={formRef} onSubmit={onSubmit(handleFormSubmit)}>
          <NodeFormRenderer
            formState={formState}
            onFormSubmit={handleFormSubmit}
            onFormCancel={handleFormCancel}
            autoFormContext={autoFormContext}
            setValue={setValue}
            watch={watch}
            loadFormData={loadFormData}
            selectedNodeData={selectedNodeData}
            isLoading={isNodeDataLoading}
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
