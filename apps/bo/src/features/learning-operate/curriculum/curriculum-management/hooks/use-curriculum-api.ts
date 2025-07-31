import { useCallback } from 'react';
import {
  useCopyCurriculum,
  useCreateCurriculum,
  useCreateFixedModule,
  useCreateGeneralModule,
  useCreateLessonByCurriculum,
  useCreateLessonByModule,
  useDeleteCurriculum,
  useDeleteCurriculumLesson,
  useDeleteCurriculumModule,
  useDndCurriculumTree,
  useUpdateCurriculum,
  useUpdateFixedModule,
  useUpdateGeneralModule,
  useUpdateLessonByFixed,
  useUpdateLessonByGeneral } from '@entities/curriculum';
import { MODULE_TYPE } from '@types';
import { getTimeValueFromHour } from '@learnway/shared';

interface UseCurriculumApiProps {
  curriculumId: number;
  onFormChange: () => void;
}

export const useCurriculumApi = ({ curriculumId, onFormChange }: UseCurriculumApiProps) => {
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
  const { delete: deleteCurriculum } = useDeleteCurriculum({});
  const { delete: deleteCurriculumModule } = useDeleteCurriculumModule({});
  const { delete: deleteCurriculumLesson } = useDeleteCurriculumLesson({});
  const { copy: copyCurriculum } = useCopyCurriculum({});

  const dndCurriculumMutation = useDndCurriculumTree(curriculumId, {});

  const moduleCreateStrategy = useCallback(
    (moduleType: MODULE_TYPE) => {
      const strategies = {
        [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
          return createCurriculumGeneralModule(
            {
              ...data,
              curriculumId },
            { onSuccess },
          );
        },
        [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
          return createCurriculumFixedModule(
            {
              ...data,
              curriculumId },
            { onSuccess },
          );
        } };
      return strategies[moduleType];
    },
    [createCurriculumGeneralModule, createCurriculumFixedModule, curriculumId],
  );

  const moduleUpdateStrategy = useCallback(
    (moduleType: MODULE_TYPE) => {
      const strategies = {
        [MODULE_TYPE.GENERAL]: (data: any, onSuccess: (response: any) => void) => {
          const updateData = {
            moduleId: data.moduleId,
            moduleName: data.moduleName,
            moduleDescription: data.moduleDescription };
          return updateCurriculumGeneralModule(updateData, { onSuccess });
        },
        [MODULE_TYPE.FIXED]: (data: any, onSuccess: (response: any) => void) => {
          const updateData = {
            moduleId: data.moduleId,
            moduleName: data.moduleName,
            moduleDescription: data.moduleDescription,
            totalTime: getTimeValueFromHour(data.contentDuration) };
          return updateCurriculumFixedModule(updateData, { onSuccess });
        } };
      return strategies[moduleType];
    },
    [updateCurriculumGeneralModule, updateCurriculumFixedModule],
  );

  const extractIdFromNodeId = useCallback((nodeId: string | number): number => {
    const idStr = nodeId.toString();
    if (idStr.includes('-')) {
      return parseInt(idStr.split('-')[1]);
    }
    return parseInt(idStr);
  }, []);

  const calculateSortOrder = useCallback((nodeInfo: any) => {
    if (nodeInfo.position === 'INSIDE') {
      return 1;
    }

    const sourceNode = nodeInfo.sourceNode;
    const targetNode = nodeInfo.targetNode;

    if (!targetNode || !targetNode.sortOrder) {
      return nodeInfo.position === 'BEFORE' ? nodeInfo.targetIndex + 1 : nodeInfo.targetIndex + 2;
    }

    const sourceSortOrder = sourceNode.sortOrder || 0;
    const targetSortOrder = targetNode.sortOrder;
    const sameParent = sourceNode.parentId === targetNode.parentId;

    if (nodeInfo.position === 'BEFORE') {
      // 타겟 노드 앞에 삽입
      if (sameParent && sourceSortOrder < targetSortOrder) {
        return targetSortOrder - 1;
      }
      return targetSortOrder;
    } else {
      // 타겟 노드 뒤에 삽입 (AFTER)
      if (sameParent && sourceSortOrder < targetSortOrder) {
        return targetSortOrder;
      }
      return targetSortOrder + 1;
    }
  }, []);

  return {
    // Curriculum API
    createCurriculum,
    updateCurriculum,
    copyCurriculum,

    // Module API
    createCurriculumFixedModule,
    createCurriculumGeneralModule,
    updateCurriculumFixedModule,
    updateCurriculumGeneralModule,
    moduleCreateStrategy,
    moduleUpdateStrategy,

    // Lesson API
    createLessonByCurriculum,
    createLessonByModule,
    updateLessonByGeneral,
    updateLessonByFixed,

    // Delete API
    deleteCurriculum,
    deleteCurriculumModule,
    deleteCurriculumLesson,

    // DND API
    dndCurriculumMutation,

    // 유틸리티 함수
    extractIdFromNodeId,
    calculateSortOrder };
};
