import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { queryOptions as departmentQueryOptions } from '@entities/department';
import { queryOptions as sequenceQueryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { LMSApiPrefix } from '@learnway/config';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, generateYears, getDateToString } from '@learnway/shared';
import {
  Button,
  Divider,
  EditDropdownCell,
  EditInputCell,
  GridBox,
  SplitPanel,
  StatsSummary,
  StatsSummaryData,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { GridExcelDownloadButton, GridExcelUploadButton, SearchBox } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { getStudentsStatusName } from './constants/students-status';
import { StudentsEnrollmentTypeHistoryModal } from './modal/students-enrollment-type-history-modal';
import { StudentsHistoryModal } from './modal/students-history-modal';
import { StudentsReasonModal } from './modal/students-reason-modal';

// type StudentsManagementComponentProps = {

// };

const _global = {
  linkClickBook: (payload: any) => {
    return;
  },
  linkClickPreLevel: (payload: any) => {
    return;
  },
  linkClickEnrollmentTypeHistory: (payload: any) => {
    return;
  },
  linkClickReason: (payload: any) => {
    return;
  },
  linkClickHistory: (payload: any) => {
    return;
  },
};

const gridConfig: useGridBoxConfig = {
  query: sequenceQueryOptions.studentsList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

/**
 * NLP_BO_LMS_0045 : 수강생관리
 * @returns
 */
const StudentsManagementComponent = () => {
  const { data: loginUser } = useFetchAuthUser();
  const router = useRouter();
  const routerState = useRouterState();
  const { openModal, confirm: openConfirm, alert } = useModal();
  const courseIdKey = routerState.location.state?.courseId; // 과정ID
  const courseSequenceIdKey = routerState.location.state?.courseSequenceId; // 차수ID(있는경우 검색조건 값 선택)
  console.log('## courseIdKey =>', courseIdKey);
  console.log('## courseSequenceIdKey =>', courseSequenceIdKey);
  const queryClient = useQueryClient();
  const [statsLeftCount, setStatsLeftCount] = useState<Array<StatsSummaryData>>([]);
  const [statsRightCount, setStatsRightCount] = useState<Array<StatsSummaryData>>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [params, setParams] = useState<Record<string, any>>({});

  // 교재
  _global.linkClickBook = (payload: any) => {
    console.log('payload:', payload);
  };

  // 사전레벨
  _global.linkClickPreLevel = (payload: any) => {
    console.log('##payload', payload);
  };

  // 입과방식
  _global.linkClickEnrollmentTypeHistory = (payload: any) => {
    openModal({
      width: 'md',
      content: <StudentsEnrollmentTypeHistoryModal selectedItem={payload} />,
    });
  };

  // 사유
  _global.linkClickReason = (payload: any) => {
    openModal({
      width: 'md',
      content: <StudentsReasonModal selectedItem={payload} />,
      onClose(data: any) {
        if (data) {
          handleOnRefresh();
        }
      },
    });
  };

  // 접속이력
  _global.linkClickHistory = (payload: any) => {
    openModal({
      width: 'md',
      content: <StudentsHistoryModal userId={payload.userId} courseId={courseIdKey} />,
    });
  };

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'openingYear',
          type: 'dropdown',
          label: t('LABEL.form.label.openingYear', '개설연도'),
          value: dayjs().year(),
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: generateYears(10),
        },
        {
          name: 'courseSequenceId',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '차수'),
          format: 'number',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'completionStatus',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '상태'),
          value: null,
          presetOptionLabel: t('전체'),
          options: [
            // { label: t('승인대기'), value: '1' },
            // { label: t('조직장결재완료'), value: '2' },
            // { label: t('운영자승인완료'), value: '3' },
            // { label: t('결재'), value: '4' },
            // { label: t('승인 완료'), value: '5' },
            { label: t('이수'), value: true },
            { label: t('미이수'), value: false },
          ],
        },
        {
          name: 'learningRange', // learningStartDate, learningEndDate
          type: 'date-range',
          label: t('학습 기간'),
          value: {
            from: new Date(),
            to: new Date(),
          },
        },
      ],
      [
        {
          name: 'companyId',
          type: 'dropdown',
          label: t('LABEL.form.label.companyId', '회사'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'deptId',
          type: 'dropdown',
          label: t('LABEL.form.label.deptId', '부서'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'employeeNumber',
          type: 'dropdown',
          label: t('LABEL.form.label.employeeNumber', '사번'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'name',
          type: 'text',
          label: t('이름'),
          value: '',
          placeholder: '',
        },
      ],
    ],
    validator: {
      openingYear: true,
      courseSequenceId: true,
    },
  };
  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;
  const companyId = useWatch({ control: searchProvider.control, name: 'companyId' });
  const openingYear = useWatch({ control: searchProvider.control, name: 'openingYear' });

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant?.tenantId) {
      setCompanyOption(loginUser.activeTenant?.tenantId);
    }
  }, [loginUser]);

  useEffect(() => {
    setSequenceOption();
  }, [openingYear]);

  const setSequenceOption = async () => {
    console.log('### setSequenceOption');
    const searchValues = getValues();
    const payload = {
      openingYear: searchValues.openingYear,
      courseId: courseIdKey,
    };
    console.log('payload=>', payload);
    const result = await queryClient.fetchQuery(
      sequenceQueryOptions.enrollmentSequenceCombo(payload),
    );

    if (result) {
      console.log('result=>', result);
      const sequenceIdOptions = result.map((item: any) => ({
        label: item.courseSequenceName,
        value: item.courseSequenceId,
      }));
      setOptions('courseSequenceId', sequenceIdOptions);
    }
  };

  useEffect(() => {
    setValue('deptId', '');
    if (!companyId && companyId !== 0) return;

    (async () => {
      const { content } = await queryClient.fetchQuery(departmentQueryOptions.list({ companyId }));
      if (content)
        setOptions(
          'deptId',
          content.map((_: any) => ({ value: _.deptId, label: _.deptName })),
        );
    })();
  }, [companyId]);

  const setCompanyOption = async (tenantId: number) => {
    console.log('### setCompanyOption');
    const companys = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(tenantId));
    const companyIdOptions = companys.map((item) => ({
      label: item.name,
      value: item.companyId,
    }));
    setOptions('companyId', companyIdOptions);
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
      columnHelper.accessor('companyName', {
        header: t('회사'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 120,
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
      columnHelper.accessor('book', {
        header: t('교재'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickBook(info.row.original as any);
            }}
            label={t('배송주소')}
          />
        ),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('preLevel', {
        header: t('사전레벨'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickPreLevel(info.row.original as any);
            }}
            label={t('신청일')}
          />
        ),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('enrollmentType', {
        header: t('입과방식'),
        // cell: (info) => info.getValue(),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickEnrollmentTypeHistory(info.row.original as any);
            }}
            label={t('입과방식')}
          />
        ),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('totalScore', {
        header: t('총점'),
        cell: (info) => {
          const original = info.row.original;
          return (
            <span>
              {parseInt(original.attendanceScore) +
                parseInt(original.progressScore) +
                parseInt(original.examScore) +
                parseInt(original.asgmtScore)}
            </span>
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('attendanceScore', {
        header: t('출석'),
        // cell: (info) => info.getValue(),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditInputCell
              info={info}
              input={{
                type: 'number',
              }}
            />
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('progressScore', {
        header: t('진도'),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditInputCell
              info={info}
              input={{
                type: 'number',
              }}
            />
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('examScore', {
        header: t('평가'),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditInputCell
              info={info}
              input={{
                type: 'number',
              }}
            />
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('asgmtScore', {
        header: t('과제'),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditInputCell
              info={info}
              input={{
                type: 'number',
              }}
            />
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('isCertified', {
        header: t('수료여부'),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditDropdownCell
              info={info}
              dropdown={{
                options: [
                  { label: t('미이수'), value: false },
                  { label: t('이수'), value: true },
                ],
              }}
            />
          );
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('completedDate', {
        header: t('이수확정 일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 160,
      }),
      columnHelper.accessor('reason', {
        header: t('미이수사유'),
        cell: (info) => {
          if (info.row.original.isCertified) return '';
          let title = '';
          if (info.row.original.reason === null) {
            title = t('사유입력');
          } else {
            title = t('사유보기');
          }
          return (
            <Button
              className="link"
              onClick={() => {
                _global.linkClickReason(info.row.original as any);
              }}
              label={title}
            />
          );
        },
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('history', {
        header: t('접속이력'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClickHistory(info.row.original as any);
            }}
            label={t('이력보기')}
          />
        ),
        enableGrouping: false,
        size: 70,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
  }, []);

  const setStatsLeft = async (payload: any) => {
    const result = await queryClient.fetchQuery(
      sequenceQueryOptions.studentsListLeftCount(payload),
    );
    if (result) {
      const statsCount = result.countInfo.map((x: any) => {
        return {
          label: getStudentsStatusName(x.learningStstusType),
          value: x.count,
          unit: t('명'),
        };
      });
      setStatsLeftCount(statsCount);
    }
  };

  const setStatsRight = async (payload: any) => {
    const result = await queryClient.fetchQuery(
      sequenceQueryOptions.studentsListRightCount(payload),
    );
    if (result) {
      const statsCount = [
        { label: t('총점'), value: result.totalMinPassScore, unit: t('점'), percentage: 100 },
        {
          label: t('출석'),
          value: result.attendanceMinPassScore,
          unit: t('점'),
          percentage: result.attendanceWeights,
        },
        {
          label: t('진도'),
          value: result.progressMinPassScore,
          unit: '%',
          percentage: result.progressWeights,
        },
        {
          label: t('평가'),
          value: result.examMinPassScore,
          unit: t('점'),
          percentage: result.examWeights,
        },
        {
          label: t('과제'),
          value: result.asgmtMinPassScore,
          unit: t('점'),
          percentage: result.asgmtWeights,
        },
      ];
      setStatsRightCount(statsCount);
    }
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('## handleOnSearch', data);
    const payload = {
      openingYear: 2025,
      courseSequenceId: 40,
      completionStatus: false,
      learningStartDate: '',
      learningEndDate: '',
      companyId: '',
      deptId: '',
      employeeNumber: data.employeeNumber || '',
      name: data.name || '',
    };

    // const payload = {
    //   openingYear: data.openingYear || null,
    //   courseSequenceId: data.courseSequenceId || null,
    //   // completionStatus: data.completionStatus || '',
    //   completionStatus: true,
    //   learningStartDate: data.learningRange?.from
    //     ? getDateToString(data.learningRange?.from, DATE_TIME_FORMAT.DATE)
    //     : null,
    //   learningEndDate: data.learningRange?.to
    //     ? getDateToString(data.learningRange?.to, DATE_TIME_FORMAT.DATE)
    //     : null,
    //   companyId: data.company || null,
    //   deptId: data.deptId || null,
    //   employeeNumber: data.employeeNumber || '',
    //   name: data.name || '',
    // };

    setParams({
      ...payload,
    });

    setStatsLeft(payload);
    setStatsRight(payload);
    gridFetch(payload);
  }, []);

  const handleOnRefresh = () => {
    console.log('### handleOnRefresh');
    const searchValues = getValues();
    handleOnSearch(searchValues);
  };

  const handleRowsSelect = useCallback((rows: any[]) => {
    setSelectedItems(rows);
  }, []);

  const handleRemoveRows = async () => {
    console.log('selectedItems=>', selectedItems);
    if (selectedItems.length === 0) return;
  };

  const handleSaveClick = async () => {
    console.log('selectedItems=>', selectedItems);
    if (selectedItems.length === 0) return;
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <div>
        <SplitPanel gap={10}>
          <div>
            <div>현황</div>
            <StatsSummary data={statsLeftCount} />
          </div>
          <div>
            <div>이수기준</div>
            <StatsSummary data={statsRightCount} />
          </div>
        </SplitPanel>
      </div>
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        disabledSelectionToggle
        title={t('수강생 목록')}
        onRowsSelect={handleRowsSelect}
        customButtonNode={
          <>
            <Button
              variant="text"
              label={t('전체 메시지발송')}
              onClick={(e) => console.log('test')}
            />
            <Button variant="text" label={t('메시지발송')} onClick={(e) => console.log('test')} />

            <Button variant="text" label={t('수료판단')} onClick={(e) => console.log('test')} />
            <Button variant="text" label={t('이수확정')} onClick={(e) => console.log('test')} />
            <Button variant="text" label={t('확정취소')} onClick={(e) => console.log('test')} />
            <Button variant="text" label={t('차수변경')} onClick={(e) => console.log('test')} />
            <Button variant="text" label={t('수강생등록')} onClick={(e) => console.log('test')} />
          </>
        }
        excelButtons={
          <>
            <GridExcelUploadButton validateUrl="/multilingual/excelUploadValidation" />
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/students/list/excel`}
              params={params}
              dataCount={data?.totalElements}
              disabled={!data?.totalElements}
            />
          </>
        }
        showRemove={true}
        onRemoveClick={handleRemoveRows}
        saveButton={{
          disabled: false,
          label: t('저장'),
          onClick: () => handleSaveClick?.(),
        }}
      />
    </>
  );
};

export const StudentsManagement = StudentsManagementComponent;
