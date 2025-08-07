import { CourseListItem } from '@entities/course';
import { useDynamicForm2 } from '@learnway/hooks';
import { useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoursePackageHookResult, CoursePackageSearchFormData } from '../types/type';
import { useCoursePackageListGridConfig } from './use-course-package-list-grid-config';

export const useCoursePackagePage = (): CoursePackageHookResult => {
  const router = useRouter();
  const { openModal, alert, confirm } = useModal();
  const { t } = useTranslation();
  const { provider, getValues, onSubmit, onReset } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit', // 서브밋할 때만 validation 실행
    reValidateMode: 'onChange', // 에러 발생 후에는 값 변경시 즉시 재검증
  });
  const gridConfig = useCoursePackageListGridConfig();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRows, setSelectedRows] = useState<CourseListItem[]>([]);

  /**
   * 검색
   */
  const handleOnSearch = useCallback(
    (data: CoursePackageSearchFormData) => {
      console.log('handleOnSearch.data => ', data);
      gridFetch(data);
    },
    [gridFetch],
  );

  /**
   * 패키지 등록 페이지 이동
   */
  const handleSavePackage = async () => {
    router.navigate({
      to: '/learning/course-package/detail',
      state: { meta: { title: t('패키지 상세') } },
    });
  };

  /**
   * 그리드 행 선택 핸들러
   */
  const handleGridRowsSelect = useCallback((rows: CourseListItem[]) => {
    console.log('handleGridRowsSelect.rows => ', rows);
    setSelectedRows(rows);
  }, []);

  return {
    provider,
    getValues,
    onSubmit,
    onReset,
    gConfig,
    // selectedRows,
    // buttonState,
    handleOnSearch,
    handleSavePackage,
    // handleGridRowsSelect,
  };
};
