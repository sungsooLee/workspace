import { getTimeValueFromHour } from '@learnway/shared';
import { TreeNode } from '@learnway/ui/tree-view';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { CurriculumResponse, LESSON_TYPE, MAPPING_CURRICULUM_TYPE, MODULE_TYPE } from '@types';
import { useCallback } from 'react';
import { buildTreeFromCurriculumData, findParentNode } from '../services';

interface UseCurriculumActionsProps {
  curriculumId: number;
  curriculumDetail: CurriculumResponse | undefined;
  loginUser: any;
  api: any;
  onFormChange: () => void;
  onCurriculumCreated?: (curriculumId: number) => void;
  handleNodeSelect: (node: TreeNode | null, forceRefresh?: boolean) => void;
  expandParentNodes: (parentNode: TreeNode | null) => void;
  setFormState: any;
  clearAllValidators: () => void;
  setFormKey: any;
  treeData: TreeNode[];
  refetchCurriculumDetail: () => Promise<any>;
  formState: any;
  router: ReturnType<typeof useRouter>;
  resetFormState?: any;
  expandedKeys: string[];
  setExpandedKeys: (keys: string[]) => void;
}

export const useCurriculumActions = ({
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
  resetFormState,
  expandedKeys,
  setExpandedKeys,
}: UseCurriculumActionsProps) => {
  const queryClient = useQueryClient();

  const handleFormSubmit = useCallback(
    (data: any, formState: any) => {
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
            api.updateCurriculum(updateData, {
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
            api.createCurriculum(curriculumData, {
              onSuccess: (createdCurriculum: CurriculumResponse) => {
                onFormChange();

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
            const updateModuleFn = api.moduleUpdateStrategy(moduleType as MODULE_TYPE);
            if (updateModuleFn) {
              updateModuleFn(data, async (updateModule: any) => {
                const updatedNode: TreeNode = {
                  id: updateModule.moduleId,
                  key: `module-${updateModule.moduleId}`,
                  name: updateModule.moduleName,
                  type: MAPPING_CURRICULUM_TYPE.MODULE,
                  parentId: parentNode?.id || null,
                  children: [],
                  data: {
                    moduleId: updateModule.moduleId,
                    ...updateModule,
                  },
                };
                clearAllValidators();
                handleNodeSelect(updatedNode, true);
              });
            }
          } else {
            const moduleData = {
              moduleName: data.moduleName,
              moduleType: data.moduleType,
              moduleDescription: data.moduleDescription,
              curriculumId,
              ...(data.moduleType === MODULE_TYPE.FIXED && {
                orgnId: data.orgnId,
                contentUuid: data.contentUuid,
                contentDuration: data.contentDuration,
              }),
            };

            const createModuleFn = api.moduleCreateStrategy(moduleType as MODULE_TYPE);
            if (createModuleFn) {
              createModuleFn(moduleData, async (createdModuleId: number) => {
                onFormChange();

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
                    moduleDescription: data.moduleDescription,
                  },
                };

                expandParentNodes(parentNode);
                handleNodeSelect(newNode, true);
              });
            }
          }
          break;
        }

        case MAPPING_CURRICULUM_TYPE.LESSON:
          handleLessonSubmit(data, formState, parentNode);
          break;
      }
    },
    [
      api,
      clearAllValidators,
      curriculumDetail,
      curriculumId,
      expandParentNodes,
      handleNodeSelect,
      loginUser,
      onCurriculumCreated,
      onFormChange,
    ],
  );

  const handleLessonSubmit = useCallback(
    (data: any, formState: any, parentNode: TreeNode | null) => {
      if (formState.isEditing && formState.selectedNode) {
        const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
        const isParentFixedModule =
          parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          parentNode?.data.moduleType === MODULE_TYPE.FIXED;
        const isParentGeneralModule =
          parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          parentNode?.data.moduleType === MODULE_TYPE.GENERAL;

        const extractedLessonId = formState.selectedNode?.id
          ? typeof formState.selectedNode.id === 'string'
            ? parseInt(formState.selectedNode.id.replace('lesson-', ''))
            : formState.selectedNode.id
          : data.lessonId;

        const lessonData = {
          lessonId: extractedLessonId,
          lessonName: data.lessonName,
          lessonDescription: data.lessonDescription,
          learningTime: getTimeValueFromHour(data.learningTime),
        };

        if (isParentCurriculum || isParentGeneralModule) {
          api.updateLessonByGeneral(lessonData, {
            onSuccess: async (updatedLessonId: number) => {
              onFormChange();

              const refreshedData = await refetchCurriculumDetail();
              const updatedCurriculumDetail = refreshedData.data;

              if (updatedCurriculumDetail) {
                const updatedTreeData = buildTreeFromCurriculumData(updatedCurriculumDetail);

                // 수정된 레슨 찾기
                const findUpdatedLesson = (nodes: TreeNode[]): TreeNode | null => {
                  for (const node of nodes) {
                    if (
                      node.type === MAPPING_CURRICULUM_TYPE.LESSON &&
                      api.extractIdFromNodeId(node.id) === updatedLessonId
                    ) {
                      return node;
                    }
                    if (node.children) {
                      const found = findUpdatedLesson(node.children);
                      if (found) return found;
                    }
                  }
                  return null;
                };

                const updatedLessonNode = findUpdatedLesson(updatedTreeData);

                if (updatedLessonNode) {
                  expandParentNodes(findParentNode(updatedTreeData, updatedLessonNode.parentId));
                  handleNodeSelect(updatedLessonNode, true);
                }
              }
            },
          });
        } else if (isParentFixedModule) {
          api.updateLessonByFixed(
            { lessonId: extractedLessonId, lessonName: data.lessonName },
            {
              onSuccess: async (updatedLessonId: number) => {
                onFormChange();

                // 레슨 상세 정보 캐시 무효화
                await queryClient.invalidateQueries({
                  queryKey: [
                    'curriculum-all',
                    'lesson',
                    extractedLessonId,
                    parentNode?.data.moduleId,
                  ],
                });

                const updatedNode: TreeNode = {
                  id: updatedLessonId,
                  key: `lesson-${updatedLessonId}`,
                  name: data.lessonName,
                  type: MAPPING_CURRICULUM_TYPE.LESSON,
                  parentId: parentNode?.id || null,
                  children: [],
                  data: {
                    lessonId: updatedLessonId,
                    lessonName: data.lessonName,
                    lessonType: data.lessonType || 'TOC',
                    lessonDescription: data.lessonDescription,
                    learningTime: getTimeValueFromHour(data.learningTime),
                    moduleId: parentNode?.data.moduleId,
                  },
                };
                expandParentNodes(parentNode);
                handleNodeSelect(updatedNode, true);
              },
            },
          );
        }
      } else {
        const lessonData = {
          curriculumId: curriculumDetail?.curriculumId,
          lessonName: data.lessonName,
          lessonDescription: data.lessonDescription,
          lessonType: data.lessonType || 'GENERAL',
          learningTime: getTimeValueFromHour(data.learningTime),
        };

        const lessonDataCurriculum = {
          ...lessonData,
          contentUuid: data.contentUuid,
          contentName: data.contentName,
        };

        const saveLessonData =
          data.lessonType === LESSON_TYPE.GENERAL ? lessonData : lessonDataCurriculum;

        const isParentCurriculum = parentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;

        if (isParentCurriculum) {
          api.createLessonByCurriculum(
            {
              ...saveLessonData,
              curriculumId,
            },
            {
              onSuccess: async (createdLessonResponse: any) => {
                onFormChange();

                const lessonId =
                  typeof createdLessonResponse === 'object'
                    ? createdLessonResponse.lessonId || createdLessonResponse.id
                    : createdLessonResponse;

                const refreshedData = await refetchCurriculumDetail();
                const updatedCurriculumDetail = refreshedData.data;

                if (updatedCurriculumDetail) {
                  // 새로 조회된 데이터로 트리 빌드
                  const updatedTreeData = buildTreeFromCurriculumData(updatedCurriculumDetail);

                  // 새로 생성된 레슨 찾기
                  const findCreatedLesson = (nodes: TreeNode[]): TreeNode | null => {
                    for (const node of nodes) {
                      if (
                        node.type === MAPPING_CURRICULUM_TYPE.LESSON &&
                        api.extractIdFromNodeId(node.id) === lessonId
                      ) {
                        return node;
                      }
                      if (node.children) {
                        const found = findCreatedLesson(node.children);
                        if (found) return found;
                      }
                    }
                    return null;
                  };

                  const createdLessonNode = findCreatedLesson(updatedTreeData);

                  if (createdLessonNode) {
                    expandParentNodes(findParentNode(updatedTreeData, createdLessonNode.parentId));
                    handleNodeSelect(createdLessonNode, true);
                  }
                }
              },
            },
          );
        } else {
          api.createLessonByModule(
            {
              ...saveLessonData,
              moduleId: parentNode?.data.moduleId,
            },
            {
              onSuccess: async (createdLessonId: number) => {
                onFormChange();

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
                    lessonDescription: data.lessonDescription,
                    learningTime: getTimeValueFromHour(data.learningTime),
                    moduleId: parentNode?.data.moduleId,
                  },
                };

                expandParentNodes(parentNode);
                handleNodeSelect(newNode, true);
              },
            },
          );
        }
      }
    },
    [api, curriculumDetail, curriculumId, expandParentNodes, handleNodeSelect, onFormChange],
  );

  const handleDeleteNode = useCallback(
    ({
      selectedNode: node,
      parentNode,
    }: {
      selectedNode: TreeNode | null;
      parentNode: TreeNode | null;
    }) => {
      if (!node) return;

      if (
        (node.type === MAPPING_CURRICULUM_TYPE.LESSON && node.level === 1) ||
        node.type === MAPPING_CURRICULUM_TYPE.MODULE
      ) {
        const moduleId =
          node.type === MAPPING_CURRICULUM_TYPE.LESSON
            ? node.moduleId
            : api.extractIdFromNodeId(node.id);
        handleNodeSelect(null);

        api.deleteCurriculumModule(
          { curriculumId, moduleId },
          {
            onSuccess: () => {
              const rootNode = treeData.find(
                (node) => node.parentId === null || node.parentId === undefined,
              );
              if (rootNode) {
                handleNodeSelect(rootNode);
              }
            },
          },
        );
      } else if (node.type === MAPPING_CURRICULUM_TYPE.LESSON && node.level === 2) {
        if (!parentNode) return;
        const lessonId = api.extractIdFromNodeId(node.id);
        const moduleId = api.extractIdFromNodeId(parentNode.id);
        handleNodeSelect(null);

        api.deleteCurriculumLesson(
          { moduleId, lessonId },
          {
            onSuccess: () => {
              const rootNode = treeData.find(
                (node) => node.parentId === null || node.parentId === undefined,
              );
              if (rootNode) {
                handleNodeSelect(rootNode);
              }
            },
          },
        );
      } else if (node.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
        const curriculumId = api.extractIdFromNodeId(node.id);
        api.deleteCurriculum(
          { curriculumId },
          {
            onSuccess: () => {
              if (router)
                router.navigate({
                  to: '/learning-operate/curriculum',
                });
            },
          },
        );
      }
    },
    [api, clearAllValidators, curriculumId, setFormState, router, treeData, handleNodeSelect],
  );

  const handleTreeAction = useCallback(
    (event: any) => {
      if (event.type === 'NODE_MOVE') {
        const { sourceNode, targetNode, position } = event;

        // DnD 시작 시 현재 확장 상태 저장
        // const savedExpandedKeys = [...expandedKeys];

        // DnD 시작 시 선택 해제 (폼 비우기)
        handleNodeSelect(null);

        const sortOrder = api.calculateSortOrder({ sourceNode, targetNode, position });

        let toParentMappingType: string;
        let toParentMappingId: number;

        if (position === 'INSIDE') {
          toParentMappingType = targetNode.type;
          toParentMappingId = api.extractIdFromNodeId(targetNode.id);
        } else {
          const targetParent = findParentNode(treeData, targetNode.parentId);
          if (targetParent) {
            toParentMappingType = targetParent.type;
            toParentMappingId = api.extractIdFromNodeId(targetParent.id);
          } else {
            toParentMappingType = MAPPING_CURRICULUM_TYPE.CURRICULUM;
            toParentMappingId = curriculumId;
          }
        }

        const payload = {
          fromMappingType: sourceNode.type,
          fromMappingId: api.extractIdFromNodeId(sourceNode.id),
          toParentMappingType,
          toParentMappingId,
          sortOrder,
        };
        api.dndCurriculumMutation.mutate(payload, {
          onSuccess: async (data: any) => {
            const refreshedData = await refetchCurriculumDetail();
            const updatedCurriculumDetail = refreshedData.data;

            if (updatedCurriculumDetail) {
              const updatedTreeData = buildTreeFromCurriculumData(updatedCurriculumDetail);

              const findMovedNode = (
                nodes: TreeNode[],
                nodeId: number,
                nodeType: string,
              ): TreeNode | null => {
                for (const node of nodes) {
                  if (node.type === nodeType && api.extractIdFromNodeId(node.id) === nodeId) {
                    return node;
                  }
                  if (node.children) {
                    const found = findMovedNode(node.children, nodeId, nodeType);
                    if (found) return found;
                  }
                }
                return null;
              };

              const movedNodeId = api.extractIdFromNodeId(sourceNode.id);
              const movedNode = findMovedNode(updatedTreeData, movedNodeId, sourceNode.type);

              if (movedNode) {
                const newParentNode = findParentNode(updatedTreeData, movedNode.parentId);
                if (newParentNode) {
                  expandParentNodes(newParentNode);
                }

                handleNodeSelect(movedNode, true);
              }
            }
          },
        });
      }
    },
    [api, curriculumId, onFormChange, handleNodeSelect, treeData, expandedKeys, setExpandedKeys],
  );

  return {
    handleFormSubmit,
    handleDeleteNode,
    handleTreeAction,
  };
};
