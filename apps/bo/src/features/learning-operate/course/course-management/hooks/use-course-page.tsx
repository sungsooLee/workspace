import { useCopyCourse, useUpdateFavorite } from '@entities/course';
import {
  CourseTypeOptionCardModal,
  useCourseListGridConfig,
} from '@features/learning-operate/course/course-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useGridBox, useModal } from '@learnway/ui';
import { useRouter } from '@tanstack/react-router';
import { CourseListItem } from '@types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CourseButtonState,
  CourseManagementHookResult,
  CourseSearchFormData,
  CourseType,
} from '../types/type';

export const useCoursePage = (): CourseManagementHookResult => {
  const router = useRouter();
  const { openModal, alert, confirm } = useModal();
  const { t } = useTranslation();
  const { provider, getValues, onSubmit } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit', // 서브밋할 때만 validation 실행
    reValidateMode: 'onChange', // 에러 발생 후에는 값 변경시 즉시 재검증
  });
  const gridConfig = useCourseListGridConfig();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

  // 과정 복사 뮤테이션
  const { mutate: copyCourse } = useCopyCourse({
    onSuccess: async (response: any) => {
      console.log('useUpdateCourse :: onSuccess', response);
      await alert(t('복사가 완료되었습니다.'));
      gridFetch(getValues());
    },
  });

  // 과정 찜 뮤테이션
  const { mutate: updateFavorite } = useUpdateFavorite({
    onSuccess: async (response: any) => {
      console.log('useUpdateFavorite :: onSuccess', response);
      await alert(t('찜 수정이 완료되었습니다.'));
    },
  });
  // 버튼 활성화/비활성화 상태 관리
  const buttonState: CourseButtonState = useMemo(() => {
    return {
      copy: selectedRows?.length === 1,
      share: selectedRows?.length === 1,
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
   * 그리드 키리보기 컬럼 > 클릭 핸들러
   */
  const handlePreviewClick = useCallback((courseId: number) => {
    console.log('handlePreviewClick.courseId => ', courseId);
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
        to: '/learning/course/create',
        state: {
          courseType: value as CourseType,
        },
      });
    } catch (error) {
      console.error('과정 개설 중 오류 발생:', error);
    }
  }, [openModal, router]);

  /**
   * 과정 복사 핸들러
   */
  const handleCopyClick = useCallback(async () => {
    if (await confirm(t('복사하시겠습니까?'))) {
      copyCourse(selectedRows[0].courseId);
    }
  }, [selectedRows]);

  /**
   * 과정 공유 핸들러
   */
  const handleShareClick = useCallback(() => {
    console.log('handleShareClick');
  }, []);

  return {
    provider,
    getValues,
    onSubmit,
    gConfig,
    selectedRows,
    buttonState,
    handleCopyClick,
    handleShareClick,
    handleOnSearch,
    handleGridRowsSelect,
    handleBatchUploadClick,
    handleCourseOpenClick,
  };
};
