import { t } from 'i18next';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FormState } from '../types/form.types';
import { NodeFormRenderer } from '../components/node-form-renderer';
import { useTreeButtons } from '../hooks/use-tree-buttons';
import {
  queryKeys,
  useCreateCurriculum,
  useCreateFixedModule,
  useCreateGeneralModule,
  useCreateLessonByCurriculum,
  useCreateLessonByModule,
  useDndCurriculumTree,
  useGetCurriculumDetail,
  useUpdateCurriculum,
  useUpdateFixedModule,
  useUpdateGeneralModule,
  useUpdateLessonByFixed,
  useUpdateLessonByGeneral,
} from '@entities/curriculum';
import { useDynamicForm2 } from '@learnway/hooks';
import {
  CurriculumResponse,
  FixedModuleUpdateParams,
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
import { useFetchAuthUser } from '@learnway/auth/entities';
import { getTimeValueFromHour } from '@learnway/shared';
import { useQueryClient } from '@tanstack/react-query';

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
  const [formKey, setFormKey] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    activeFormType: null,
    selectedNode: null,
    parentNode: null,
    isEditing: false,
  });

  // 이전 선택 노드 추적용 ref
  const prevSelectedNodeRef = useRef<TreeNode | null>(null);
  const queryClient = useQueryClient();

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
  const { update: updateLessonByGeneral } = useUpdateLessonByGeneral({});
  const { update: updateLessonByFixed } = useUpdateLessonByFixed({});

  const dndCurriculumMutation = useDndCurriculumTree(curriculumId, {});

  const {
    provider,
    getValues,
    onFormValid,
    updateFormData,
    onFormChange,
    watch,
    clearAllValidators,
  } = useDynamicForm2();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (curriculumDetail) {
      const treeNodes = buildTreeFromCurriculumData(curriculumDetail);
      setTreeData(treeNodes);
    }
  }, [curriculumDetail]);

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
        moduleDescription: data.moduleDescription,
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
        moduleDescription: data.moduleDescription,
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
    // 이전 폼을 언마운트
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
    setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
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
          const updateModuleFn = moduleUpdateStrategy[moduleType as MODULE_TYPE];
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
              handleNodeSelect(updatedNode, true); // 수정 완료 후 강제 새로고침
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

          const createModuleFn = moduleCreateStrategy[moduleType as MODULE_TYPE];
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
          // lessonId 추출 (formState.selectedNode.id가 "lesson-123" 형태일 수 있음)
          const extractedLessonId = formState.selectedNode?.id
            ? typeof formState.selectedNode.id === 'string'
              ? parseInt(formState.selectedNode.id.replace('lesson-', ''))
              : formState.selectedNode.id
            : data.lessonId;

          const lessonData = {
            lessonId: extractedLessonId,
            lessonName: data.lessonName,
            lessonDescription: data.lessonDescription,
            learningTime: getTimeValueFromHour(
              data.learningTime as {
                hour: number;
                minute: number;
                second: number;
              },
            ),
          };
          if (isParentCurriculum || isParentGeneralModule) {
            updateLessonByGeneral(lessonData, {
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
            updateLessonByFixed(
              { lessonId: extractedLessonId, lessonName: data.lessonName },
              {
                onSUccess: async (updatedLessonId: number) => {
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
                onSuccess: async (createdLessonId: any) => {
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
                      lessonType: data.lessonType || 'GENERAL',
                      lessonDescription: data.lessonDescription,
                      learningTime: getTimeValueFromHour(data.learningTime),
                    },
                  };

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
    clearAllValidators();
    onFormChange();

    setFormState({
      activeFormType: null,
      selectedNode: null,
      parentNode: null,
      isEditing: false,
    });
    setFormStatus(FROM_STATUS.NONE);
    setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
  };

  // 트리 노드 선택 핸들러
  const handleNodeSelect = (node: TreeNode, forceRefresh = false) => {
    if (!forceRefresh && prevSelectedNodeRef.current?.id === node.id) {
      return;
    }

    prevSelectedNodeRef.current = node;
    clearAllValidators();

    setFormState({
      activeFormType: node.type as MAPPING_CURRICULUM_TYPE,
      selectedNode: node,
      parentNode: findParentNode(treeData, node.parentId),
      isEditing: true,
    });
    setFormStatus(FROM_STATUS.EDIT);
    setFormKey((prev) => prev + 1); // 폼 리마운트를 위해 키 증가
  };

  // DND 드롭 유효성 검증
  const customDropValidator = useCallback<any>(
    ({ sourceNode, targetNode, dropPosition }: any) => {
      // FIXED 모듈 하위 레슨은 이동 불가
      const sourceParent = findParentNode(treeData, sourceNode.parentId);
      if (
        sourceParent?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
        sourceParent?.data?.moduleType === MODULE_TYPE.FIXED
      ) {
        return false;
      }

      if (dropPosition === 'INSIDE') {
        // 커리큘럼 안으로는 레슨과 모듈 모두 가능 (항상 허용)
        if (targetNode.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
          return true;
        }

        // FIXED 모듈 안으로는 아무것도 올 수 없음
        if (
          targetNode.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetNode.data?.moduleType === MODULE_TYPE.FIXED
        ) {
          return false;
        }

        // GENERAL 모듈 안으로는 레슨만 가능
        if (
          targetNode.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetNode.data?.moduleType === MODULE_TYPE.GENERAL
        ) {
          return sourceNode.type === MAPPING_CURRICULUM_TYPE.LESSON;
        }

        // 레슨 안으로는 아무것도 올 수 없음
        if (targetNode.type === MAPPING_CURRICULUM_TYPE.LESSON) {
          return false;
        }
      }

      // BEFORE/AFTER 드롭의 경우
      const targetParent = findParentNode(treeData, targetNode.parentId);

      // 레슨은 커리큘럼 하위 또는 GENERAL 모듈 하위로만 이동 가능
      if (sourceNode.type === MAPPING_CURRICULUM_TYPE.LESSON) {
        if (!targetParent) return false;

        if (targetParent.type === MAPPING_CURRICULUM_TYPE.CURRICULUM) {
          return true;
        }

        if (
          targetParent.type === MAPPING_CURRICULUM_TYPE.MODULE &&
          targetParent.data?.moduleType === MODULE_TYPE.GENERAL
        ) {
          return true;
        }

        return false;
      }

      // 모듈은 커리큘럼 하위로만 이동 가능
      if (sourceNode.type === MAPPING_CURRICULUM_TYPE.MODULE) {
        return targetParent?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
      }

      return false;
    },
    [treeData],
  );

  // ID에서 타입 prefix 제거
  const extractIdFromNodeId = (nodeId: string | number): number => {
    const idStr = nodeId.toString();
    if (idStr.includes('-')) {
      return parseInt(idStr.split('-')[1]);
    }
    return parseInt(idStr);
  };

  const calculateSortOrder = (nodeInfo: any) => {
    if (nodeInfo.position === 'INSIDE') {
      // 타겟 노드의 자식으로 이동 - 항상 첫 번째 자식이 되도록
      return 1;
    }

    const sourceNode = nodeInfo.sourceNode;
    const targetNode = nodeInfo.targetNode;

    if (!targetNode || !targetNode.sortOrder) {
      // targetNode의 sortOrder가 없으면 targetIndex 기반으로 계산
      return nodeInfo.position === 'BEFORE' ? nodeInfo.targetIndex + 1 : nodeInfo.targetIndex + 2;
    }

    // 같은 부모 내에서 이동하는 경우, 소스와 타겟의 sortOrder 관계를 고려
    const sourceSortOrder = sourceNode.sortOrder || 0;
    const targetSortOrder = targetNode.sortOrder;
    const sameParent = sourceNode.parentId === targetNode.parentId;

    if (nodeInfo.position === 'BEFORE') {
      // 타겟 노드 앞에 삽입
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 -1 보정
        return targetSortOrder - 1;
      }
      return targetSortOrder;
    } else {
      // 타겟 노드 뒤에 삽입 (AFTER)
      if (sameParent && sourceSortOrder < targetSortOrder) {
        // 낮은 순서 -> 높은 순서로 이동: 소스가 제거되므로 보정 없이 타겟 순서 사용
        return targetSortOrder;
      }
      return targetSortOrder + 1;
    }
  };

  const handleTreeAction = (event: any) => {
    if (event.type === 'NODE_MOVE') {
      const { sourceNode, targetNode, position } = event;

      const sortOrder = calculateSortOrder({ sourceNode, targetNode, position });

      let toParentMappingType: string;
      let toParentMappingId: number;

      if (position === 'INSIDE') {
        toParentMappingType = targetNode.type;
        toParentMappingId = extractIdFromNodeId(targetNode.id);
      } else {
        const targetParent = findParentNode(treeData, targetNode.parentId);
        if (targetParent) {
          toParentMappingType = targetParent.type;
          toParentMappingId = extractIdFromNodeId(targetParent.id);
        } else {
          toParentMappingType = MAPPING_CURRICULUM_TYPE.CURRICULUM;
          toParentMappingId = curriculumId;
        }
      }

      const payload = {
        fromMappingType: sourceNode.type,
        fromMappingId: extractIdFromNodeId(sourceNode.id),
        toParentMappingType,
        toParentMappingId,
        sortOrder,
        // position 정보는 useDndCurriculumTree에서 처리
      };

      // (중복 API 호출 방지)
      if (
        formState.selectedNode &&
        extractIdFromNodeId(formState.selectedNode.id) === payload.fromMappingId
      ) {
        setFormState({
          activeFormType: null,
          selectedNode: null,
          parentNode: null,
          isEditing: false,
        });
        clearAllValidators();
        setFormKey((prev) => prev + 1);
      }

      dndCurriculumMutation.mutate(payload, {
        onSuccess: async (data: any) => {
          onFormChange();

          if (payload.fromMappingType === 'MODULE') {
            const moduleId = extractIdFromNodeId(payload.fromMappingId);
            await queryClient.invalidateQueries({
              queryKey: queryKeys.moduleDetail(moduleId),
            });

            const updatedTreeData = buildTreeFromCurriculumData(data);
            const findModuleNode = (nodes: TreeNode[]): TreeNode | null => {
              for (const node of nodes) {
                if (
                  node.type === 'MODULE' &&
                  extractIdFromNodeId(node.id) === payload.fromMappingId
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
              setFormKey((prev) => prev + 1); // 폼 리마운트
            }
          }

          if (payload.fromMappingType === 'LESSON') {
            const updatedTreeData = buildTreeFromCurriculumData(data);
            const findLessonNode = (nodes: TreeNode[]): TreeNode | null => {
              for (const node of nodes) {
                if (
                  node.type === 'LESSON' &&
                  extractIdFromNodeId(node.id) === payload.fromMappingId
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
                newModuleId = newParentNode.data?.moduleId || extractIdFromNodeId(newParentNode.id);
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
              setFormKey((prev) => prev + 1); // 폼 리마운트
            }
          }
        },
      });
    }
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
            onClick={async () => {
              const isValid = await onFormValid();
              if (isValid) {
                const formData = watch();
                handleFormSubmit(formData);
              }
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
          onAction={handleTreeAction}
          customDropValidator={customDropValidator}
          clientTree={true}
          disableOptimisticUpdate={false}
          renderNodeDragHandle={(node: TreeNode) => {
            // FIXED 모듈 하위 레슨은 드래그 핸들 숨김
            const parentNode = findParentNode(treeData, node.parentId);
            if (
              parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE &&
              parentNode?.data?.moduleType === MODULE_TYPE.FIXED &&
              node.type === MAPPING_CURRICULUM_TYPE.LESSON
            ) {
              return false;
            }
            return true;
          }}
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
        <form ref={formRef}>
          <NodeFormRenderer
            key={`${formState.activeFormType}-${formState.isEditing ? 'edit' : 'create'}-${formState.selectedNode?.id || 'new'}-${formKey}`}
            formState={formState}
            onFormSubmit={handleFormSubmit}
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
