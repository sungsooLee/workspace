import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { getStudentCourseTypeName } from '../constants/students-status';

/**
 * NLP_BO_LMS_0046 : 학습 이력 팝업
 * @returns
 */
export interface StudentsHistoryModalComponentProps {
  userId: number;
  courseId: number;
}

const gridConfig: useGridBoxConfig = {
  query: queryOptions.studentsHistory,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const StudentsHistoryModalComponent = ({
  userId: userIdProps,
  courseId: courseIdProps,
}: StudentsHistoryModalComponentProps) => {
  const [columns, setColumns] = useState() as any;
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig);

  useEffect(() => {
    const columns = [
      columnHelper.accessor('courseType', {
        header: t('학습유형'),
        cell: (info) => getStudentCourseTypeName(info.getValue()),
        enableGrouping: false,
        size: 71,
      }),
      columnHelper.accessor('courseName', {
        header: t('과정명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 350,
      }),
      columnHelper.accessor('courseSequenceName', {
        header: t('과정차수'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('learningRange', {
        header: t('교육기간'),
        cell: (info) => {
          const original = info.row.original;
          if (original.learningStartDate && original.learningEndDate) {
            const learningStartDate = getDateToString(
              original.learningStartDate,
              DATE_TIME_FORMAT.DATE,
            );
            const learningEndDate = getDateToString(
              original.learningEndDate,
              DATE_TIME_FORMAT.DATE,
            );
            return `${learningStartDate} ~ ${learningEndDate}`;
          } else {
            return '';
          }
        },
        enableGrouping: false,
        size: 265,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    handleOnSearch();
  }, []);

  const handleOnSearch = useCallback(() => {
    const payload = {
      userId: userIdProps,
      courseId: courseIdProps,
    };
    gridFetch(payload);
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('학습 이력 정보')}</ModalTitle>
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

export const StudentsHistoryModal = StudentsHistoryModalComponent;
