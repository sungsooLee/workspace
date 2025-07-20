import { useCallback } from 'react';
import { TreeNode } from '@learnway/ui';
import { CurriculumResponse, MAPPING_CURRICULUM_TYPE, MODULE_TYPE, LESSON_TYPE } from '@types';
import { getTimeValueFromHour } from '@learnway/shared';
import { findParentNode, buildTreeFromCurriculumData } from '../services';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@entities/curriculum';

interface UseCurriculumActionsProps {
  curriculumId: number;
  curriculumDetail: CurriculumResponse | undefined;
  loginUser: any;
  api: any;
  onFormChange: () => void;
  onCurriculumCreated?: (curriculumId: number) => void;
  handleNodeSelect: (node: TreeNode, forceRefresh?: boolean) => void;
  expandParentNodes: (parentNode: TreeNode | null) => void;
  setFormState: any;
  clearAllValidators: () => void;
  setFormKey: any;
  treeData: TreeNode[];
  refetchCurriculumDetail: () => Promise<any>;
  formState: any;
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
                },
              };
              expandParentNodes(parentNode);
              handleNodeSelect(updatedNode, true);
            },
          });
        } else if (isParentFixedModule) {
          api.updateLessonByFixed(
            { lessonId: extractedLessonId, lessonName: data.lessonName },
            {
              onSuccess: async (updatedLessonId: number) => {
                onFormChange();
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

        setFormState({
          activeFormType: null,
          selectedNode: null,
          parentNode: null,
          isEditing: false,
        });
        clearAllValidators();
        api.deleteCurriculumModule({ curriculumId, moduleId });
      } else if (node.type === MAPPING_CURRICULUM_TYPE.LESSON && node.level === 2) {
        if (!parentNode) return;
        const lessonId = api.extractIdFromNodeId(node.id);
        const moduleId = api.extractIdFromNodeId(parentNode.id);

        setFormState({
          activeFormType: null,
          selectedNode: null,
          parentNode: null,
          isEditing: false,
        });
        clearAllValidators();
        api.deleteCurriculumLesson({ moduleId, lessonId });
      }
    },
    [api, clearAllValidators, curriculumId, setFormState],
  );

  const handleTreeAction = useCallback(
    (event: any) => {
      if (event.type === 'NODE_MOVE') {
        const { sourceNode, targetNode, position } = event;

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

        // 중복 API 호출 방지
        if (
          formState.selectedNode &&
          api.extractIdFromNodeId(formState.selectedNode.id) === payload.fromMappingId
        ) {
          setFormState({
            activeFormType: null,
            selectedNode: null,
            parentNode: null,
            isEditing: false,
          });
          clearAllValidators();
          setFormKey((prev: number) => prev + 1);
        }

        api.dndCurriculumMutation.mutate(payload, {
          onSuccess: async (data: any) => {
            onFormChange();

            // DND 후 이동된 노드의 부모 노드를 펼치기
            const updatedTreeData = buildTreeFromCurriculumData(data);
            let targetParentNode: TreeNode | null = null;
            
            if (position === 'INSIDE') {
              targetParentNode = targetNode;
            } else {
              targetParentNode = findParentNode(updatedTreeData, targetNode.parentId);
            }
            
            if (targetParentNode) {
              expandParentNodes(targetParentNode);
            }

            if (payload.fromMappingType === 'MODULE') {
              const moduleId = api.extractIdFromNodeId(payload.fromMappingId);
              await queryClient.invalidateQueries({
                queryKey: queryKeys.moduleDetail(moduleId),
              });

              const updatedTreeData = buildTreeFromCurriculumData(data);
              const findModuleNode = (nodes: TreeNode[]): TreeNode | null => {
                for (const node of nodes) {
                  if (
                    node.type === 'MODULE' &&
                    api.extractIdFromNodeId(node.id) === payload.fromMappingId
                  ) {
                    return node;
                  }
                  if (node.children) {
                    const found = findModuleNode(node.children);
                    if (found) return found;
                  }
                }
                return null;
              };

              const updatedModuleNode = findModuleNode(updatedTreeData);

              if (updatedModuleNode) {
                const newParentNode = findParentNode(updatedTreeData, updatedModuleNode.parentId);

                setFormState({
                  activeFormType: MAPPING_CURRICULUM_TYPE.MODULE,
                  selectedNode: updatedModuleNode,
                  parentNode: newParentNode,
                  isEditing: true,
                });
                setFormKey((prev: number) => prev + 1);
              }
            }

            if (payload.fromMappingType === 'LESSON') {
              const updatedTreeData = buildTreeFromCurriculumData(data);
              const findLessonNode = (nodes: TreeNode[]): TreeNode | null => {
                for (const node of nodes) {
                  if (
                    node.type === 'LESSON' &&
                    api.extractIdFromNodeId(node.id) === payload.fromMappingId
                  ) {
                    return node;
                  }
                  if (node.children) {
                    const found = findLessonNode(node.children);
                    if (found) return found;
                  }
                }
                return null;
              };

              const updatedLessonNode = findLessonNode(updatedTreeData);

              if (updatedLessonNode) {
                const newParentNode = findParentNode(updatedTreeData, updatedLessonNode.parentId);

                let newModuleId = 0;

                if (newParentNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
                  newModuleId = updatedLessonNode.data?.moduleId || updatedLessonNode.moduleId || 0;
                } else if (newParentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE) {
                  newModuleId =
                    newParentNode.data?.moduleId || api.extractIdFromNodeId(newParentNode.id);
                }

                const updatedLessonNodeWithModuleId = {
                  ...updatedLessonNode,
                  moduleId: newModuleId,
                  data: {
                    ...updatedLessonNode.data,
                    moduleId: newModuleId,
                  },
                };

                setFormState({
                  activeFormType: MAPPING_CURRICULUM_TYPE.LESSON,
                  selectedNode: updatedLessonNodeWithModuleId,
                  parentNode: newParentNode,
                  isEditing: true,
                });
                setFormKey((prev: number) => prev + 1);
              }
            }
          },
        });
      }
    },
    [api, curriculumId, onFormChange, queryClient, setFormKey, setFormState, treeData],
  );

  return {
    handleFormSubmit,
    handleDeleteNode,
    handleTreeAction,
  };
};
