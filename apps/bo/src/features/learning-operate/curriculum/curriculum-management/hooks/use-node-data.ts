import { useState, useEffect } from 'react';
import { TreeNode } from '@learnway/ui';
import {
  useGetCurriculumDetail,
  // useGetModuleDetail,
  // useGetLessonDetail
} from '@entities/curriculum';
import { MAPPING_CURRICULUM_TYPE } from '@types';

interface UseNodeDataProps {
  selectedNode: TreeNode | null;
  curriculumId: number;
}

/**
 * 선택된 노드 타입에 따라 적절한 API를 호출하여 상세 데이터를 가져오는 Hook
 */
export const useNodeData = ({ selectedNode, curriculumId }: UseNodeDataProps) => {
  const [currentData, setCurrentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 각 타입별 API Hook들 (조건부 호출)
  const shouldFetchCurriculum = selectedNode?.type === MAPPING_CURRICULUM_TYPE.CURRICULUM;
  const shouldFetchModule = selectedNode?.type === MAPPING_CURRICULUM_TYPE.MODULE;
  const shouldFetchLesson = selectedNode?.type === MAPPING_CURRICULUM_TYPE.LESSON;

  // 커리큘럼 상세 조회
  const {
    data: curriculumData,
    isLoading: isCurriculumLoading,
    error: curriculumError,
  } = useGetCurriculumDetail(shouldFetchCurriculum ? curriculumId : 0);

  // 모듈 상세 조회
  // const moduleId = shouldFetchModule ? selectedNode?.data?.moduleId : 0;
  // const {
  //   data: moduleData,
  //   isLoading: isModuleLoading,
  //   error: moduleError
  // } = useGetModuleDetail(moduleId);

  // 레슨 상세 조회
  // const lessonId = shouldFetchLesson ? selectedNode?.data?.lessonId : 0;
  // const {
  //   data: lessonData,
  //   isLoading: isLessonLoading,
  //   error: lessonError
  // } = useGetLessonDetail(lessonId);

  // 선택된 노드에 따라 데이터와 로딩 상태 결정
  useEffect(() => {
    if (!selectedNode) {
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

      // case NODE_TYPE.MODULE:
      //   setCurrentData(moduleData);
      //   setIsLoading(isModuleLoading);
      //   setError(moduleError ? '모듈 데이터 로드 실패' : null);
      //   break;

      // case NODE_TYPE.LESSON:
      //   setCurrentData(lessonData);
      //   setIsLoading(isLessonLoading);
      //   setError(lessonError ? '레슨 데이터 로드 실패' : null);
      //   break;

      default:
        setCurrentData(null);
        setIsLoading(false);
        setError(null);
    }
  }, [
    selectedNode,
    curriculumData,
    isCurriculumLoading,
    curriculumError,
    // moduleData, isModuleLoading, moduleError,
    // lessonData, isLessonLoading, lessonError
  ]);

  return {
    data: currentData,
    isLoading,
    error,
    nodeType: selectedNode?.type || null,
  };
};

// 각 노드 타입별 생성/수정 Hook
export const useNodeActions = (nodeType: MAPPING_CURRICULUM_TYPE | null) => {
  // 타입별 액션 함수들 반환
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
