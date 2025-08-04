import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { LMSApiPrefix } from '@learnway/config';
import { SearchBoxProvider } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { Mode } from '@pages/_layout/learning/learning-sequence/-common/type';
import { GridExcelDownloadButton, SearchBox } from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { getEnrollStatusName } from '../constants/constants';
import { EnrollmentCancelReasonModal } from '../modal/enrollment-cancel-reason-modal';
import { useEnrollmentStore } from '../store/use-enrollment-store';

const _global = {
  linkClickSequenceName: (payload: any) => {
    return;
  },
  linkClickReason: (payload: any) => {
    return;
  },
};

/**
 * NLP_BO_LMS_0040 : 수강취소/반려 목록 조회
 * @returns
 */
type EnrollmentCancelComponentProps = {
  searchProvider: SearchBoxProvider;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setOptions: (name: string, options: SelectOption[]) => void;
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.enrollmentCancelList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const EnrollmentCancelComponent = ({
  searchProvider,
  getValues,
  setValue,
  setOptions,
}: EnrollmentCancelComponentProps) => {
  const { enrollmentCreateInfo } = useEnrollmentStore();
  const router = useRouter();
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;
  const { openModal } = useModal();

  _global.linkClickSequenceName = (payload: any) => {
    router.navigate({
      to: '/learning/learning-sequence/sequence-management',
      state: {
        pMode: Mode.DETAIL,
        // pCourseId: 1,
        pSequenceId: payload.courseSequenceId,
      },
    });
  };

  _global.linkClickReason = (payload: any) => {
    console.log('##', payload);
    openModal({
      width: 'sm',
      content: <EnrollmentCancelReasonModal reason={payload.approvalReason} />,
    });
  };

  useEffect(() => {
    const columns = [
      columnHelper.accessor('openingYear', {
        header: t('개설'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
      columnHelper.accessor('courseSequenceName', {
        header: t('차수명'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickSequenceName(info.row.original as any);
            }}
            label={info.getValue() as string}
          />
        ),
        enableGrouping: false,
        size: 339,
      }),
      columnHelper.accessor('learningStartDate', {
        header: t('학습 시작일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('learningEndDate', {
        header: t('학습 종료일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('companyName', {
        header: t('회사'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('departmentName', {
        header: t('부서'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('employeeNumber', {
        header: t('사번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('userName', {
        header: t('이름'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('enrollStatusType', {
        header: t('상태'),
        cell: (info) => getEnrollStatusName(info.getValue()),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('createdDate', {
        header: t('취소/반려 일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('approvalReason', {
        header: t('사유'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickReason(info.row.original as any);
            }}
            label={t('사유보기')}
          />
        ),
        enableGrouping: false,
        size: 80,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    const payload = {
      // openingYear: data.openingYear || null,
      // courseSequenceId: data.courseSequenceId || null,
      openingYear: 2025,
      courseSequenceId: 2,
      enrollStatusType: data.enrollStatusType || '',
      // learningStartDate: data.learningRange?.from
      //   ? getDateToString(data.learningRange?.from, DATE_TIME_FORMAT.DATE)
      //   : null,
      // learningEndDate: data.learningRange?.to
      //   ? getDateToString(data.learningRange?.to, DATE_TIME_FORMAT.DATE)
      //   : null,
      // companyId: data.company || null,
      // deptId: data.deptId || null,
      learningStartDate: '2025-06-22',
      learningEndDate: '2025-08-22',
      companyId: 54,
      deptId: 1,
      employeeNumber: data.employeeNumber || '',
      name: data.name || '',
    };

    console.log('## payload=>', payload);
    gridFetch(payload);
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        disabledSelectionToggle
        title={t('수강 취소/반려 목록')}
        // onRowsSelect={(rows: any) => {
        //   setSelectedRows(rows);
        // }}
        customButtonNode={
          <Button
            variant="text"
            label={t('수강신청 링크발송')}
            onClick={(e) => console.log('test')}
          />
        }
        excelButtons={
          <GridExcelDownloadButton
            url={`${LMSApiPrefix()}/multilingual/exportExcel`}
            params={getValues()}
          />
        }
      />
    </>
  );
};

export const EnrollmentCancel = EnrollmentCancelComponent;
