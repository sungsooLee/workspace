import { SearchBoxConfig, SearchBoxProvider, useSearchBox } from '@learnway/hooks';
import {
  Button,
  Divider,
  GridBox,
  StatsSummary,
  StatsSummaryData,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { GridExcelDownloadButton, SearchBox } from '@shared/ui';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useCallback, useEffect, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { LMSApiPrefix } from '@learnway/config';
import { FieldValues, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import dayjs from 'dayjs';
import { useRouter } from '@tanstack/react-router';
import { Mode } from '@pages/_layout/learning/learning-sequence/-common/type';

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
  courseId?: number;
  courseSequenceId?: number;
  searchProvider: SearchBoxProvider;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setOptions: (name: string, options: SelectOption[]) => void;
};

const EnrollmentCancelComponent = ({
  courseSequenceId,
  searchProvider,
  getValues,
  setValue,
  setOptions,
}: EnrollmentCancelComponentProps) => {
  const router = useRouter();
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
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;

  _global.linkClickSequenceName = (payload: any) => {
    router.navigate({
      to: '/learning/learning-sequence/sequence-management',
      state: {
        setMode: Mode.DETAIL,
        courseId: 1,
        sequenceId: 1,
      },
    });
  };

  _global.linkClickReason = (payload: any) => {
    console.log('##', payload);
  };

  useEffect(() => {
    const columns = [
      columnHelper.accessor('openYear', {
        header: t('개설'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
      columnHelper.accessor('sequenceName', {
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
      columnHelper.accessor('eduStartDate', {
        header: t('학습 시작일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('eduEndDate', {
        header: t('학습 종료일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('company', {
        header: t('회사'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('department', {
        header: t('부서'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('employeeId', {
        header: t('사번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('employeeName', {
        header: t('이름'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('status', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('cancelDate', {
        header: t('취소/반려 일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('reason', {
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
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('#search:', data);
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
