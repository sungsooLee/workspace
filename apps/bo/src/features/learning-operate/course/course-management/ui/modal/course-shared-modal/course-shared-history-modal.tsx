import { queryOptions as courseSharedQueryOptions } from '@entities/course-shared/service/course-shared.queries';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
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
  courseShareId,
}: CourseSharedHistoryModalComponentProps) => {
  const [columns, setColumns] = useState() as any;
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig);

  const handleOnSearch = async () => {
    const payload = { courseShareId };
    console.log('payload=>', payload);
    gridFetch(payload);
  };

  useEffect(() => {
    console.log('##courseShareId=>', courseShareId);
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

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('가져간 이력보기')}</ModalTitle>
      <ModalBody>
        <GridBox
          config={gConfig}
          columns={columns}
          showNumberingColumn={false}
          clientSideSorting={true}
          title={t('이력정보 목록')}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const CourseSharedHistoryModal = CourseSharedHistoryModalComponent;
