import { useState, useEffect } from 'react';
import { TreeNode } from '@learnway/ui';
import {
  useGetCurriculumDetail,
  useGetLessonDetail,
  useGetModuleDetail,
} from '@entities/curriculum';
import { MAPPING_CURRICULUM_TYPE } from '@types';

interface UseNodeDataProps {
  selectedNode: TreeNode | null;
  curriculumId: number;
  isEditing?: boolean;
}

/**
 * 선택된 노드 타입에 따라 적절한 API를 호출하여 상세 데이터를 가져오는 Hook
 */
export const useNodeData = ({ selectedNode, curriculumId, isEditing = true }: UseNodeDataProps) => {
  const [currentData, setCurrentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shouldFetchCurriculum =
    isEditing && selectedNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
  const shouldFetchModule = isEditing && selectedNode?.type === MAPPING_CURRICULUM_TYPE.MODULE;
  const shouldFetchLesson = isEditing && selectedNode?.type === MAPPING_CURRICULUM_TYPE.LESSON;

  // 커리큘럼 상세 조회
  const {
    data: curriculumData,
    isLoading: isCurriculumLoading,
    error: curriculumError,
  } = useGetCurriculumDetail(shouldFetchCurriculum ? curriculumId : 0);

  // 모듈 상세 조회
  const moduleId = shouldFetchModule ? selectedNode?.data?.moduleId : 0;
  const {
    data: moduleData,
    isLoading: isModuleLoading,
    error: moduleError,
  } = useGetModuleDetail(moduleId);

  // 레슨 상세 조회 (레슨이 선택되고 lessonId가 유효할 때만)
  const lessonId = shouldFetchLesson ? selectedNode?.data?.lessonId || selectedNode?.id : 0;
  const tmpModuleId = shouldFetchLesson
    ? Number(selectedNode?.parentId?.toString().split('-')[1]) || 0
    : 0;
  const shouldCallLessonDetail = shouldFetchLesson && lessonId > 0 && tmpModuleId > 0;

  const {
    data: lessonData,
    isLoading: isLessonLoading,
    error: lessonError,
  } = useGetLessonDetail(
    shouldCallLessonDetail ? { lessonId, moduleId: tmpModuleId } : { lessonId: 0, moduleId: 0 },
  );

  useEffect(() => {
    if (!selectedNode) {
      setCurrentData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 생성 모드일 때는 데이터를 로드하지 않음
    if (!isEditing) {
      setCurrentData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    switch (selectedNode.type) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM:
        setCurrentData(curriculumData);
        setIsLoading(isCurriculumLoading);
        setError(curriculumError ? '커리큘럼 데이터 로드 실패' : null);
        break;

      case MAPPING_CURRICULUM_TYPE.MODULE:
        setCurrentData(moduleData);
        setIsLoading(isModuleLoading);
        setError(moduleError ? '모듈 데이터 로드 실패' : null);
        break;

      case MAPPING_CURRICULUM_TYPE.LESSON:
        setCurrentData(lessonData);
        setIsLoading(isLessonLoading);
        setError(lessonError ? '레슨 데이터 로드 실패' : null);
        break;

      default:
        setCurrentData(null);
        setIsLoading(false);
        setError(null);
    }
  }, [
    selectedNode,
    isEditing,
    curriculumData,
    isCurriculumLoading,
    curriculumError,
    moduleData,
    isModuleLoading,
    moduleError,
    lessonData,
    isLessonLoading,
    lessonError,
  ]);

  return {
    data: currentData,
    isLoading,
    error,
    nodeType: selectedNode?.type || null,
  };
};

export const useNodeActions = (nodeType: MAPPING_CURRICULUM_TYPE | null) => {
  const getCreateAction = () => {
    switch (nodeType) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM:
        return 'createCurriculum';
      case MAPPING_CURRICULUM_TYPE.MODULE:
        return 'createModule';
      case MAPPING_CURRICULUM_TYPE.LESSON:
        return 'createLesson';
      default:
        return null;
    }
  };

  const getUpdateAction = () => {
    switch (nodeType) {
      case MAPPING_CURRICULUM_TYPE.CURRICULUM:
        return 'updateCurriculum';
      case MAPPING_CURRICULUM_TYPE.MODULE:
        return 'updateModule';
      case MAPPING_CURRICULUM_TYPE.LESSON:
        return 'updateLesson';
      default:
        return null;
    }
  };

  return {
    createAction: getCreateAction(),
    updateAction: getUpdateAction(),
  };
};
