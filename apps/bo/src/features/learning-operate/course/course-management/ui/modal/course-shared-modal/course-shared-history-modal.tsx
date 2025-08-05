import { queryOptions as courseSharedQueryOptions } from '@entities/course-shared/service/course-shared.queries';
import { GridBox, GridBoxState, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

/**
 * NLP_BO_LMS_0057_1 : 가져오기_이력보기 팝업
 * @returns
 */
export interface CourseSharedHistoryModalComponentProps {
  courseShareId: number;
}

const gridConfig: useGridBoxConfig = {
  query: courseSharedQueryOptions.history,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 50,
    sort: [],
  },
};

const CourseSharedHistoryModalComponent = ({
  courseShareId: courseShareIdProps,
}: CourseSharedHistoryModalComponentProps) => {
  const [columns, setColumns] = useState() as any;
  const searchParam = () => {
    return { courseShareId: courseShareIdProps };
  };
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig);

  const handleOnSearch = async () => {
    gridFetch(searchParam());
  };

  useEffect(() => {
    const columns = [
      columnHelper.accessor('userNmae', {
        header: t('가져간 사람'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 276,
      }),
      columnHelper.accessor('copiedDateTime', {
        header: t('일시'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 276,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    handleOnSearch();
  }, []);

  // 페이지 변경이나 검색 시 플래그 리셋
  const handleStateChange = (newState: GridBoxState) => {
    gridFetch(searchParam(), newState);
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('가져간 이력보기')}</ModalTitle>
      <ModalBody>
        <GridBox
          columns={columns}
          gridData={gridData}
          showNumberingColumn={false}
          clientSideSorting={true}
          onStateChange={handleStateChange}
          title={t('이력정보 목록')}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const CourseSharedHistoryModal = CourseSharedHistoryModalComponent;
