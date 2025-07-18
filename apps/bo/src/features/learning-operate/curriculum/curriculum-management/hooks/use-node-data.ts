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
  const rawLessonId = shouldFetchLesson ? selectedNode?.data?.lessonId || selectedNode?.id : 0;
  const lessonId = shouldFetchLesson 
    ? typeof rawLessonId === 'string' 
      ? parseInt(rawLessonId.toString().replace('lesson-', ''))
      : rawLessonId
    : 0;
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

  // 커리큘럼 데이터 처리
  useEffect(() => {
    if (selectedNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM && isEditing) {
      console.log('useNodeData - Setting curriculum data:', curriculumData);
      setCurrentData(curriculumData);
      setIsLoading(isCurriculumLoading);
      setError(curriculumError ? '커리큘럼 데이터 로드 실패' : null);
    }
  }, [curriculumData, isCurriculumLoading, curriculumError, selectedNode?.type, isEditing]);

  // 모듈 데이터 처리
  useEffect(() => {
    if (selectedNode?.type === MAPPING_CURRICULUM_TYPE.MODULE && isEditing) {
      console.log('useNodeData - Setting module data:', moduleData, 'moduleId:', moduleId);
      setCurrentData(moduleData);
      setIsLoading(isModuleLoading);
      setError(moduleError ? '모듈 데이터 로드 실패' : null);
    }
  }, [moduleData, isModuleLoading, moduleError, selectedNode?.type, isEditing]);

  // 레슨 데이터 처리
  useEffect(() => {
    if (selectedNode?.type === MAPPING_CURRICULUM_TYPE.LESSON && isEditing) {
      console.log('useNodeData - Setting lesson data:', lessonData);
      console.log('useNodeData - lessonId:', lessonId, 'moduleId:', tmpModuleId);
      console.log('useNodeData - shouldCallLessonDetail:', shouldCallLessonDetail);
      setCurrentData(lessonData);
      setIsLoading(isLessonLoading);
      setError(lessonError ? '레슨 데이터 로드 실패' : null);
    }
  }, [lessonData, isLessonLoading, lessonError, selectedNode?.type, isEditing]);

  // 노드 선택이 없거나 생성 모드일 때 초기화
  useEffect(() => {
    if (!selectedNode || !isEditing) {
      setCurrentData(null);
      setIsLoading(false);
      setError(null);
    }
  }, [selectedNode, isEditing]);

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
