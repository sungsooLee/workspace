import { CourseTypeOptionCardModal } from '@features/learning-operate/course/course-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useGridBox, useModal } from '@learnway/ui';
import { useRouter } from '@tanstack/react-router';
import { CourseListItem } from '@types';
import React, { useCallback, useMemo, useState } from 'react';
import {
  CourseButtonState,
  CourseManagementHookResult,
  CourseSearchFormData,
  CourseType,
} from '../-common/type';
import { createGridConfig } from '../-common/grid-config';

export const useCourseManagement = (): CourseManagementHookResult => {
  const router = useRouter();
  const { open: openModal } = useModal();
  const { provider, getValues, onSubmit } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit', // 서브밋할 때만 validation 실행
    reValidateMode: 'onChange', // 에러 발생 후에는 값 변경시 즉시 재검증
  });
  const { config: gConfig, gridFetch } = useGridBox(createGridConfig(), getValues);
  const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

  // 버튼 활성화/비활성화 상태 관리
  const buttonState: CourseButtonState = useMemo(() => {
    const hasSelection = selectedRows.length > 0;
    return {
      copy: hasSelection,
      share: hasSelection,
    };
  }, [selectedRows]);

  /**
   * 검색 실행 핸들러
   */
  const handleOnSearch = useCallback(
    (data: CourseSearchFormData) => {
      console.log('handleOnSearch.data => ', data);
      gridFetch(data);
    },
    [gridFetch],
  );

  /**
   * 그리드 행 선택 핸들러
   */
  const handleGridRowsSelect = useCallback((rows: CourseListItem[]) => {
    console.log('handleGridRowsSelect.rows => ', rows);
    setSelectedRows(rows);
  }, []);

  /**
   * 과정 일괄업로드 핸들러
   */
  const handleBatchUploadClick = useCallback(() => {
    console.log('handleBatchUploadClick');
    // TODO: 일괄업로드 로직 구현
  }, []);

  /**
   * 과정 개설 핸들러
   */
  const handleCourseOpenClick = useCallback(async () => {
    try {
      const { value } = await openModal({
        content: <CourseTypeOptionCardModal />,
        width: 'md',
      });

      router.navigate({
        to: '/learning/course/create/view',
        state: {
          courseType: value as CourseType,
        },
      });
    } catch (error) {
      console.error('과정 개설 중 오류 발생:', error);
    }
  }, [openModal, router]);

  return {
    provider,
    getValues,
    onSubmit,
    gConfig,
    selectedRows,
    buttonState,
    handleOnSearch,
    handleGridRowsSelect,
    handleBatchUploadClick,
    handleCourseOpenClick,
  };
};
