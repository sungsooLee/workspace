import { CourseListItem, useCopyCourse, useUpdateFavorite } from '@entities/course';
import { useCourseShare } from '@entities/course-shared/service/course-shared.hook';
import {
  CourseShareModal,
  CourseTypeOptionCardModal,
  useCourseListGridConfig,
} from '@features/learning-operate/course/course-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { getCurrentAuthUser } from '@shared/lib/util/query-utils';
import { CourseType } from '@shared/types';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseButtonState, CourseManagementHookResult, CourseSearchFormData } from '../types/type';

export const useCoursePage = (): CourseManagementHookResult => {
  const router = useRouter();
  const { openModal, alert, confirm } = useModal();
  const { t } = useTranslation();
  const { provider, getValues, onSubmit, onReset } = useDynamicForm2();
  const gridConfig = useCourseListGridConfig();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

  // 과정 공유 뮤테이션
  const { courseShare } = useCourseShare({
    onSuccess: async (response: any) => {
      console.log('courseShare :: onSuccess', response);
      await alert(t('과정이 공유 되었습니다.'));
      gridFetch(getValues());
    },
  });

  // 과정 복사 뮤테이션
  const { mutate: copyCourse } = useCopyCourse({
    onSuccess: async (response: any) => {
      console.log('useUpdateCourse :: onSuccess', response);
      await alert(t('과정이 복사 되었습니다.'));
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
    const list = selectedRows?.filter((d) => d.isUsed) ?? []; // 사용 중인 과정만 필터링
    return {
      copy: list.length === 1,
      share: list.length === 1,
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
   * 그리드 미리보기 컬럼 > 클릭 핸들러
   */
  const handlePreviewClick = useCallback((courseId: number) => {
    console.log('handlePreviewClick.courseId => ', courseId);
  }, []);

  /**
   * 과정 개설 핸들러
   */
  const handleCourseOpenClick = useCallback(async () => {
    const data = await openModal({
      content: <CourseTypeOptionCardModal />,
    });
    const courseType = data?.value;
    // 팝업에서 선택한 과정 없으면 종료
    if (!courseType) return;
    // 과정 개설 페이지 이동
    router.navigate({
      to: '/learning/course/create',
      state: {
        courseType: courseType as CourseType,
      },
    });
  }, [openModal, router]);

  /**
   * 과정 복사 핸들러
   */
  const handleCopyClick = useCallback(async () => {
    const isConfirmed = await confirm(t('복사하시겠습니까?'));
    // 취소 버튼 클릭시 종료
    if (!isConfirmed) return;
    // 과정 복사 실행
    const payload = {
      courseId: selectedRows?.[0]?.courseId ?? -1,
      tenantId: getCurrentAuthUser()?.lastVisitedBoTenantId ?? -1, // null 또는 undefined일 때 -1로 처리
    };
    copyCourse(payload);
  }, [selectedRows, copyCourse, confirm, t]);

  /**
   * 과정 공유 핸들러
   */
  const handleShareClick = useCallback(async () => {
    const data = await openModal({
      content: <CourseShareModal />,
    });
    // 팝업에서 선택한 과정 없으면 종료
    if (!data) return;
    // 과정 공유 실행
    const targetChannelList = data.map((x: any) => x.channelUuid);
    const payload = {
      courseId: selectedRows?.[0]?.courseId ?? -1,
      originChannelUuid: selectedRows?.[0]?.channelUuid ?? '',
      targetChannelList,
    };
    courseShare(payload);
  }, [openModal, selectedRows, courseShare]);

  return {
    provider,
    getValues,
    onSubmit,
    onReset,
    gConfig,
    selectedRows,
    buttonState,
    handleCopyClick,
    handleShareClick,
    handleOnSearch,
    handleGridRowsSelect,
    handleCourseOpenClick,
  };
};
