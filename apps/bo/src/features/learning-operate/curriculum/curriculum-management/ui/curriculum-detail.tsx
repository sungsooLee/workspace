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
  useCreateLessonByCurriculum,
  useCreateLessonByModule,
  useGetCurriculumDetail,
  useUpdateCurriculum,
  useUpdateFixedModule,
  useUpdateGeneralModule,
} from '@entities/curriculum';
import { useDynamicForm3 } from '@learnway/hooks';
import {
  CurriculumResponse,
  FixedModuleSaveParams,
  FixedModuleUpdateParams,
  GeneralModuleSaveParams,
  GeneralModuleUpdateParams,
  LESSON_TYPE,
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
import { getTimeValueFromHour } from '@learnway/shared';
import { verify } from 'crypto';
import { update } from 'lodash';

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
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  const shouldFetchDetail = mode === FORM_MODE.detail && curriculumId > 0;
  const { data: curriculumDetail, isLoading: isLoadingDetail } = useGetCurriculumDetail(
    shouldFetchDetail ? curriculumId : 0,
  );

  const { create: createCurriculum } = useCreateCurriculum({});
  const { update: updateCurriculum } = useUpdateCurriculum({});
  const { create: createCurriculumFixedModule } = useCreateFixedModule({});
  const { create: createCurriculumGeneralModule } = useCreateGeneralModule({});
  const { create: createLessonByCurriculum } = useCreateLessonByCurriculum({});
  const { create: createLessonByModule } = useCreateLessonByModule({});
  const { update: updateCurriculumFixedModule } = useUpdateFixedModule({});
  const { update: updateCurriculumGeneralModule } = useUpdateGeneralModule({});

  const {
    getValues,
    onSubmit,
    autoFormContext,
    handleSubmit,
    watch,
    setValue,
    loadFormData,
    clearFormFields,
    switchFormType,
  } = useDynamicForm3();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    data: selectedNodeData,
    isLoading: isNodeDataLoading,
    error: nodeDataError,
  } = useNodeData({
    selectedNode: formState.selectedNode,
    curriculumId,
    isEditing: formState.isEditing,
  });

  // 커리큘럼 데이터가 변경될 때마다 트리 데이터 업데이트
  useEffect(() => {
    if (curriculumDetail) {
      const treeNodes = buildTreeFromCurriculumData(curriculumDetail);
      setTreeData(treeNodes);

      // if (treeNodes.length > 0) {
      //   setExpandedKeys([treeNodes[0].key]);
      // }
    } else if (mode === FORM_MODE.create) {
      setTreeData([]);
      setExpandedKeys([]);
    }
  }, [curriculumDetail, mode]);

  const expandParentNodes = (parentNode: TreeNode | null) => {
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
  };

  // 모듈 생성 전략 (GENERAL, FIXED 모듈에 따라 다르게 처리)
  const moduleCreateStrategy = {
    [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
      return createCurriculumGeneralModule(
        {
          ...data,
          curriculumId,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
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
    [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
      const updateData: GeneralModuleUpdateParams = {
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        description: data.description,
      };
      return updateCurriculumGeneralModule(
        {
          ...updateData,
        },
        { onSuccess },
      );
    },
    [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
      const updateData: FixedModuleUpdateParams = {
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        description: data.description,
        totalTime: getTimeValueFromHour(data.contentDuration),
      };
      return updateCurriculumFixedModule(
        {
          ...updateData,
        },
        { onSuccess },
      );
    },
  };

  const handleAddNode = (nodeType: MAPPING_CURRICULUM_TYPE, parentNode: TreeNode | null) => {
    clearFormFields({ clearAll: true });

    // 약간의 지연을 두고 폼 상태 설정
    setTimeout(() => {
      setFormState({
        activeFormType: nodeType,
        selectedNode: parentNode,
        parentNode,
        isEditing: false,
      });
      setFormStatus(FROM_STATUS.CREATE);
    }, 0);
  };

  const handleFormSubmit = (data: any) => {
    const { activeFormType, parentNode, isEditing } = formState;
    switch (activeFormType) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM: {
        const curriculumData = {
          tenantId: loginUser?.activeTenant?.tenantId,
          channelUuid: data.channelUuid,
          curriculumType: data.curriculumType,
          languageCountryCode: data.languageCountryCode,
          curriculumName: data.curriculumName,
          curriculumDescription: data.curriculumDescription,
          coordinatorName: data.coordinatorName,
          coordinatorUuid: data.coordinatorUuid,
          coordinatorTelCountryCode: data.coordinatorTelNo.nationCode,
          coordinatorTelNo: data.coordinatorTelNo.number,
          isVendored: data.isVendored,
          ...(data.isVendored && {
            vendorCode: data.vendorCode,
            vendorName: data.vendorName,
            vendorTelCountryCode: data.vendorTelNo.nationCode,
            vendorTelNo: data.vendorTelNo.number,
            vendorCoordinatorUuid: data.vendorCoordinatorUuid,
            vendorCoordinatorName: data.vendorCoordinatorName,
          }),
        };
        if (isEditing && formState.selectedNode && curriculumDetail) {
          const updateData = {
            ...curriculumData,
            curriculumId: curriculumDetail.curriculumId,
          };
          updateCurriculum(updateData, {
            onSuccess: (updatedCurriculum: CurriculumResponse) => {
              const newNode: TreeNode = {
                id: updatedCurriculum.curriculumId,
                key: `curriculum-${updatedCurriculum.curriculumId}`,
                name: updatedCurriculum.curriculumName || data.curriculumName,
                type: MAPPING_CURRICULUM_TYPE.CURRICULUM,
                parentId: parentNode?.id || null,
                children: [],
                data: updatedCurriculum,
              };
              handleNodeSelect(newNode);
            },
          });
        } else {
          createCurriculum(curriculumData, {
            onSuccess: (createdCurriculum: CurriculumResponse) => {
              clearFormFields({ clearAll: true });

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
      }
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
          const moduleData = {
            moduleName: data.moduleName,
            moduleType: data.moduleType,
            description: data.description,
            curriculumId,
            ...(data.moduleType === MODULE_TYPE.FIXED && {
              contentUuid: data.contentUuid,
              contentDuration: data.contentDuration,
            }),
          };

          const createModuleFn = moduleCreateStrategy[moduleType as MODULE_TYPE];
          if (createModuleFn) {
            createModuleFn(moduleData, (createdModuleId: number) => {
              clearFormFields({ clearAll: true });

              // 새로운 모듈 노드 생성
              const newNode: TreeNode = {
                id: createdModuleId,
                key: `module-${createdModuleId}`,
                name: data.moduleName,
                type: MAPPING_CURRICULUM_TYPE.MODULE,
                parentId: parentNode?.id || null,
                children: [],
                data: {
                  moduleId: createdModuleId,
                  moduleName: data.moduleName,
                  moduleType: data.moduleType,
                  description: data.description,
                },
              };

              expandParentNodes(parentNode);

              handleNodeSelect(newNode);
            });
          }
        }
        break;
      }
      case MAPPING_CURRICULUM_TYPE.LESSON:
        if (isEditing && formState.selectedNode) {
          //PARENT NODE가 CURRICULUM, GENERAL MODULE 이면 GENERAL UPDATE
          //PARENT NODE가 FIXED MODULE 이면 FIXED UPDATE
          const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
          const isParentFixedModule =
            parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
            parentNode?.data.moduleType === MODULE_TYPE.FIXED;
          const isParentGeneralModule =
            parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
            parentNode?.data.moduleType === MODULE_TYPE.GENERAL;

          if (isParentCurriculum || isParentGeneralModule) {
            console.log('general update');
          } else if (isParentFixedModule) {
            console.log('fixed update');
          }
        } else {
          console.log(data);
          const lessonData = {
            curriculumId: curriculumDetail?.curriculumId,
            lessonName: data.lessonName,
            description: data.description,
            lessonType: data.lessonType || 'GENERAL',
            learningTime: getTimeValueFromHour(
              data.learningTime as {
                hour: number;
                minute: number;
                second: number;
              },
            ),
          };

          const lessonDataCurriculum = {
            ...lessonData,
            contentUuid: data.contentUuid,
            contentName: data.contentName,
          };

          const saveLessonData =
            data.lessonType === LESSON_TYPE.GENERAL ? lessonData : lessonDataCurriculum;

          // 부모 노드 타입에 따라 다른 API 호출
          const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;

          if (isParentCurriculum) {
            // 커리큘럼에 레슨 추가
            createLessonByCurriculum(
              {
                ...saveLessonData,
                curriculumId,
              },
              {
                onSuccess: (createdLessonId: any) => {
                  clearFormFields({ clearAll: true });

                  // 새로운 레슨 노드 생성
                  const newNode: TreeNode = {
                    id: createdLessonId,
                    key: `lesson-${createdLessonId}`,
                    name: data.lessonName,
                    type: MAPPING_CURRICULUM_TYPE.LESSON,
                    parentId: parentNode?.id || null,
                    children: [],
                    data: {
                      lessonId: createdLessonId,
                      lessonName: data.lessonName,
                      lessonType: data.lessonType || 'TOC',
                      description: data.description,
                      learningTime: getTimeValueFromHour(data.learningTime),
                    },
                  };

                  // 부모 노드들을 펼치기
                  expandParentNodes(parentNode);

                  handleNodeSelect(newNode);
                },
              },
            );
          } else {
            // 모듈에 레슨 추가
            createLessonByModule(
              {
                ...saveLessonData,
                moduleId: parentNode?.data.moduleId,
              },
              {
                onSuccess: (createdLessonId: number) => {
                  clearFormFields({ clearAll: true });

                  // 새로운 레슨 노드 생성
                  const newNode: TreeNode = {
                    id: createdLessonId,
                    key: `lesson-${createdLessonId}`,
                    name: data.lessonName,
                    type: MAPPING_CURRICULUM_TYPE.LESSON,
                    parentId: parentNode?.id || null,
                    children: [],
                    data: {
                      lessonId: createdLessonId,
                      lessonName: data.lessonName,
                      lessonType: data.lessonType || 'TOC',
                      description: data.description,
                      learningTime: getTimeValueFromHour(data.learningTime),
                      moduleId: parentNode?.data.moduleId,
                    },
                  };

                  // 트리 데이터 업데이트
                  setTreeData((prevTreeData) => {
                    const updateTree = (nodes: TreeNode[]): TreeNode[] => {
                      return nodes.map((node) => {
                        if (node.id === parentNode?.id) {
                          return {
                            ...node,
                            children: [...(node.children || []), newNode],
                          };
                        }
                        if (node.children) {
                          return {
                            ...node,
                            children: updateTree(node.children),
                          };
                        }
                        return node;
                      });
                    };

                    return updateTree(prevTreeData);
                  });

                  expandParentNodes(parentNode);

                  handleNodeSelect(newNode);
                },
              },
            );
          }
        }
        break;
    }
  };

  const handleFormCancel = () => {
    clearFormFields({ clearAll: true });

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

    // 같은 노드를 다시 클릭한 경우 초기화하지 않음
    const isSameNode =
      formState.selectedNode?.id === node.id && formState.selectedNode?.type === node.type;

    if (!isSameNode) {
      clearFormFields({ clearAll: true });
    }

    setTimeout(() => {
      setFormState({
        activeFormType: node.type as MAPPING_CURRICULUM_TYPE,
        selectedNode: node,
        parentNode: findParentNode(treeData, node.parentId),
        isEditing: true,
      });
      setFormStatus(FROM_STATUS.EDIT);
    }, 0);
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
          expandedKeys={expandedKeys}
          onExpandedKeysChange={setExpandedKeys}
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
