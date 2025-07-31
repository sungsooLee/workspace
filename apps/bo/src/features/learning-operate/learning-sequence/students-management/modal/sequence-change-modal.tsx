import { useUpdateStudentsSequence } from '@entities/learning-sequence/service/learning-sequence.hook';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  GridBox,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

/**
 * NLP_BO_LMS_0052 : 차수변경 팝업
 * @returns
 */
export interface SequenceChangeModalComponentProps {
  courseId: number;
  courseSequenceName: string;
  isUsed: boolean;
  openingYear: number;
  studentId: number;
}

const gridConfig: useGridBoxConfig = {
  query: queryOptions.sequenceList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const SequenceChangeModalComponent = ({
  courseId: courseIdProps,
  courseSequenceName: courseSequenceNameProps,
  isUsed: isUsedProps,
  openingYear: openingYearProps,
  studentId: studentIdProps,
}: SequenceChangeModalComponentProps) => {
  const [selectedItem, setSelectedItem] = useState() as any;
  const [param, setParam] = useState() as any;
  const [columns, setColumns] = useState() as any;
  const { closeModal, confirm: openConfirm, showSaveComplete } = useModal();
  const searchParam = () => {
    const searchData = {
      ...param,
    };
    return searchData;
  };
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, searchParam);
  const { updateStudentsSequence } = useUpdateStudentsSequence({});

  useEffect(() => {
    const columns = [
      columnHelper.accessor('courseSequenceName', {
        header: t('차수명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 425,
      }),
      columnHelper.accessor('courseSequenceStartDate', {
        header: t('학습 시작일'),
        cell: (info) => {
          if (info.row.original.learningStartType === 'DAYS_AFTER_ENROLL')
            return t('수강신청 승인일로 부터');
          else
            return getDateToString(
              info.row.original.courseSequenceStartDateTime,
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
        },
        enableGrouping: false,
        size: 169,
      }),
      columnHelper.accessor('courseSequenceEndDateTimeMerge', {
        header: t('학습 종료일'),
        cell: (info) => {
          if (info.row.original.learningStartType === 'DAYS_AFTER_ENROLL')
            return info.row.original.learningStartDays;
          else
            return getDateToString(
              info.row.original.courseSequenceEndDateTimeMerge,
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
        },
        enableGrouping: false,
        size: 158,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    handleOnSearch();
  }, []);

  const handleOnSearch = useCallback(() => {
    const payload = {
      courseId: courseIdProps,
      courseSequenceName: courseSequenceNameProps,
      isUsed: isUsedProps,
      openingYear: openingYearProps,
    };
    setParam(payload);
    gridFetch(payload);
  }, []);

  const handleOnSave = async () => {
    console.log('selectedItme=>', selectedItem);
    if (selectedItem.length === 0) return;
    const confirm = await openConfirm({
      title: t('차수변경을 하시겠습니까?'),
      content: t('선택하신 대상에 차수변경 하시겠습니까?'),
    });
    if (!confirm) return;

    const payload = {
      studentId: studentIdProps,
      courseSequenceId: selectedItem.courseSequenceId,
    };
    console.log('payload=>', payload);
    await updateStudentsSequence(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        closeModal(true);
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('차수변경')}</ModalTitle>
      <ModalBody>
        <GridBox
          config={gConfig}
          columns={columns}
          showNumberingColumn={false}
          clientSideSorting={true}
          title={t('차수 목록')}
          onRowSelect={(value: any) => {
            setSelectedItem(value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
        <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnSave} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const SequenceChangeModal = SequenceChangeModalComponent;
