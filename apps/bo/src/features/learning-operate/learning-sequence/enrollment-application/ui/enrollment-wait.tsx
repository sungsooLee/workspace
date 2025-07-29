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
import { useEnrollmentStore } from '../store/use-enrollment-store';

const _global = {
  linkClickSequenceName: (payload: any) => {
    return;
  },
  linkClickEduHistory: (payload: any) => {
    return;
  },
  linkClickPayment: (payload: any) => {
    return;
  },
};

/**
 * NLP_BO_LMS_0040 : 수강신청 대기
 * @returns
 */
type EnrollmentWaitComponentProps = {
  searchProvider: SearchBoxProvider;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setOptions: (name: string, options: SelectOption[]) => void;
};

const EnrollmentWaitComponent = ({
  searchProvider,
  getValues,
  setValue,
  setOptions,
}: EnrollmentWaitComponentProps) => {
  const { enrollmentCreateInfo } = useEnrollmentStore();
  const router = useRouter();
  const gridConfig: useGridBoxConfig = {
    query: queryOptions.enrollmentWaitList,
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

  _global.linkClickEduHistory = (payload: any) => {
    console.log('##', payload);
  };

  _global.linkClickPayment = (payload: any) => {
    console.log('##', payload);
  };

  useEffect(() => {
    const columns = [
      columnHelper.accessor('number', {
        header: t('순번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
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
        size: 169,
      }),
      columnHelper.accessor('regEndDate', {
        header: t('수강신청 종료일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('regWaitDate', {
        header: t('수강신청 대기 신청일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('management', {
        header: t('관리모드'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 90,
      }),
      columnHelper.accessor('status', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 90,
      }),
      columnHelper.accessor('statusUpdateDate', {
        header: t('상태 업데이트 일시'),
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
      columnHelper.accessor('eduHistory', {
        header: t('학습이력'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickEduHistory(info.row.original as any);
            }}
            label={t('이력보기')}
          />
        ),
        enableGrouping: false,
        size: 80,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    gridFetch();
  }, []);

  const getStats = (): Array<StatsSummaryData> => [
    {
      label: t('수강대기신청'),
      value: 1000,
    },
    {
      label: t('수강신청 링크발송'),
      value: 1000,
    },
    {
      label: t('수강신청 대기중'),
      value: 1000,
    },
    {
      label: t('수강신청 링크만료'),
      value: 1000,
    },
    {
      label: t('수강신청 신청성공'),
      value: 1000,
    },
  ];

  const handleOnSearch = useCallback((data: any) => {
    console.log('#search:', data);
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <StatsSummary data={getStats()} />
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        disabledSelectionToggle
        title={t('수강신청 대기 목록')}
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

export const EnrollmentWait = EnrollmentWaitComponent;
