import { SearchBoxProvider } from '@learnway/hooks';
import {
  Button,
  Divider,
  GridBox,
  StatsSummary,
  StatsSummaryData,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { GridExcelDownloadButton, SearchBox } from '@shared/ui';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useCallback, useEffect, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { LMSApiPrefix } from '@learnway/config';
import { FieldValues, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import { useRouter } from '@tanstack/react-router';
import { Mode } from '@pages/_layout/learning/learning-sequence/-common/type';
import { RegistPaymentModal } from '../modal/regist-payment-modal';
import { ForceApprovalModal } from '../modal/force-approval-modal';
import { useQueryClient } from '@tanstack/react-query';
import { getEnrollStatusName } from '../constants/enroll-status';

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
 * NLP_BO_LMS_0035 : 수강신청
 * @returns
 */
type EnrollmentRegistComponentProps = {
  courseId?: number;
  courseSequenceId?: number;
  searchProvider: SearchBoxProvider;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setOptions: (name: string, options: SelectOption[]) => void;
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.enrollmentRegistList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const EnrollmentRegistComponent = ({
  courseSequenceId,
  searchProvider,
  getValues,
  setValue,
  setOptions,
}: EnrollmentRegistComponentProps) => {
  console.log('## courseSequenceId:', courseSequenceId);
  const router = useRouter();
  const { openModal, confirm: openConfirm, alert } = useModal();
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;
  const [selectedRows, setSelectedRows] = useState<any[]>();
  const [statsCount, setStatsCount] = useState<Array<StatsSummaryData>>([]);
  const [params, setParams] = useState<Record<string, any>>({});
  const [valuesWithLabel, setValuesWithLabel] = useState<Record<string, SelectOption>>({});
  const queryClient = useQueryClient();

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

  _global.linkClickEduHistory = (payload: any) => {
    console.log('##payload', payload);
  };

  _global.linkClickPayment = (payload: any) => {
    openModal({
      width: 'md',
      content: <RegistPaymentModal selectedItem={payload} />,
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
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 207,
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
      columnHelper.accessor('enrollStatusType', {
        header: t('상태'),
        cell: (info) => getEnrollStatusName(info.getValue()),
        enableGrouping: false,
        size: 120,
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
      columnHelper.accessor('createdDate', {
        header: t('수강신청 신청일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
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
      columnHelper.accessor('payment', {
        header: t('결제조회'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickPayment(info.row.original as any);
            }}
            label={t('결재이력')}
          />
        ),
        enableGrouping: false,
        size: 80,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    // gridFetch();
  }, []);

  const setStats = async (payload: any) => {
    const result = await queryClient.fetchQuery(queryOptions.enrollmentRegistCount(payload));
    console.log('## result =>', result);
    if (result) {
      const statsCount = result.countInfo.map((x: any) => {
        return { label: getEnrollStatusName(x.enrollStstusType), value: x.count };
      });
      setStatsCount(statsCount);
    }
  };

  const handleOnSearch = useCallback((data: any) => {
    // const payload = {
    //   openingYear: 2025,
    //   courseSequenceId: 2,
    //   enrollStatusType: data.enrollStatusType || '',
    //   learningStartDate: '2025-06-22',
    //   learningEndDate: '2025-08-22',
    //   companyId: 54,
    //   deptId: 1,
    //   employeeNumber: data.employeeNumber || '',
    //   name: data.name || '',
    // };

    const payload = {
      openingYear: data.openingYear || null,
      courseSequenceId: data.courseSequenceId || null,
      enrollStatusType: data.enrollStatusType || '',
      learningStartDate: data.learningRange?.from
        ? getDateToString(data.learningRange?.from, DATE_TIME_FORMAT.DATE)
        : null,
      learningEndDate: data.learningRange?.to
        ? getDateToString(data.learningRange?.to, DATE_TIME_FORMAT.DATE)
        : null,
      companyId: data.company || null,
      deptId: data.deptId || null,
      employeeNumber: data.employeeNumber || '',
      name: data.name || '',
    };

    setParams({
      ...payload,
    });
    // setValuesWithLabel(getValuesWithLabel());

    console.log('## payload=>', payload);
    setStats(payload);
    console.log('setStats completed');
    gridFetch(payload);
    console.log('gridFetch completed');
  }, []);

  const handleBulkApproval = async () => {
    console.log('handleBulkApproval');
  };

  const handleForcedApproval = async () => {
    console.log('handleForcedApproval', selectedRows);
    if (selectedRows?.length === 0) return;
    openModal({
      width: 'sm',
      content: <ForceApprovalModal />,
      async onClose(payload: any) {
        console.log('## handleCloseForcedApproval :', payload);
        if (!payload) return;
      },
    });
  };

  const handleCloseForcedApproval = async (payload: any) => {
    console.log('## handleCloseForcedApproval :', payload);
    if (!payload) return;
  };

  const handleRejection = async () => {
    console.log('handleRejection');
  };

  const handleApproval = async () => {
    console.log('handleApproval');
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      {/* <StatsSummary data={getStats()} /> */}
      <StatsSummary data={statsCount} />
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        disabledSelectionToggle
        title={t('수강신청 목록')}
        onRowsSelect={(rows: any) => {
          setSelectedRows(rows);
        }}
        customButtonNode={
          <>
            <Button
              variant="text"
              label={t('전체 메시지발송')}
              onClick={(e) => console.log('test')}
            />
            <Button variant="text" label={t('메시지발송')} onClick={(e) => console.log('test')} />

            <Button variant="text" label={t('일괄승인')} onClick={handleBulkApproval} />
            <Button variant="text" label={t('강제승인')} onClick={handleForcedApproval} />
            <Button variant="text" label={t('반려')} onClick={handleRejection} />
            <Button variant="text" label={t('승인')} onClick={handleApproval} />
          </>
        }
        excelButtons={
          <>
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/enrolls/excel`}
              params={params}
              dataCount={data?.totalElements}
              disabled={!data?.totalElements}
            />
          </>
        }
      />
    </>
  );
};

export const EnrollmentRegist = EnrollmentRegistComponent;
