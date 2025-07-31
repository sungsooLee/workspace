import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { queryOptions as departmentQueryOptions } from '@entities/department';
import {
  useDeleteStudentsInfo,
  useUpdateStudentsCertification,
  useUpdateStudentsCompletion,
  useUpdateStudentsInfo,
  useUpdateStudentsList,
} from '@entities/learning-sequence/service/learning-sequence.hook';
import { queryOptions as sequenceQueryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { LMSApiPrefix } from '@learnway/config';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, generateYears, getDateToString } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { Divider, SplitPanel, StatsSummary, StatsSummaryData } from '@learnway/ui/elements';
import {
  EditDropdownCell,
  EditInputCell,
  GridBox,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import {
  GridExcelDownloadButton,
  GridExcelUploadButton,
  SearchBox,
  UserShuttleModal,
} from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { getStudentsStatusName } from './constants/students-status';
import { SequenceChangeModal } from './modal/sequence-change-modal';
import { StudentsBookDeliveryModal } from './modal/students-book-delivery-modal';
import { StudentsEnrollmentTypeHistoryModal } from './modal/students-enrollment-type-history-modal';
import { StudentsHistoryModal } from './modal/students-history-modal';
import { StudentsLevelTestModal } from './modal/students-level-test-modal';
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
  const { openModal, confirm: openConfirm, alert: openAlert, showSaveComplete } = useModal();
  const courseIdKey = routerState.location.state?.courseId; // 과정ID
  const courseSequenceIdKey = routerState.location.state?.courseSequenceId; // 차수ID(있는경우 검색조건 값 선택)
  console.log('## courseIdKey =>', courseIdKey);
  console.log('## courseSequenceIdKey =>', courseSequenceIdKey);
  const queryClient = useQueryClient();
  const [statsLeftCount, setStatsLeftCount] = useState<Array<StatsSummaryData>>([]);
  const [statsRightCount, setStatsRightCount] = useState<Array<StatsSummaryData>>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [params, setParams] = useState<Record<string, any>>({});

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [didSearch, setDidSearch] = useState(false); // 조회 완료 플래그

  const { updateStudentsInfo } = useUpdateStudentsInfo({});
  const { deleteStudentsInfo } = useDeleteStudentsInfo({});
  const { updateStudentsCertification } = useUpdateStudentsCertification({});
  const { updateStudentsCompletion } = useUpdateStudentsCompletion({});
  const { updateStudentsList } = useUpdateStudentsList({});

  // 교재
  _global.linkClickBook = (payload: any) => {
    openModal({
      width: 'sm',
      content: (
        <StudentsBookDeliveryModal
          courseSequenceId={payload.courseSequenceId}
          userId={payload.userId}
        />
      ),
    });
  };

  // 사전레벨
  _global.linkClickPreLevel = (payload: any) => {
    openModal({
      width: 'md',
      content: (
        <StudentsLevelTestModal
          courseSequenceId={payload.courseSequenceId}
          userId={payload.userId}
        />
      ),
    });
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
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;
  const companyId = useWatch({ control: searchProvider.control, name: 'companyId' });
  const openingYear = useWatch({ control: searchProvider.control, name: 'openingYear' });

  useEffect(() => {
    if (didSearch && gridData) {
      setOriginalData(gridData.content); // ✅ 최초 조회만 저장
      setDidSearch(false);
    }
  }, [didSearch, gridData]);

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
          const totalScore = statsRightCount[0].value;
          const rowTotalScore =
            parseInt(original.attendanceScore) +
            parseInt(original.progressScore) +
            parseInt(original.examScore) +
            parseInt(original.asgmtScore);
          if (totalScore > rowTotalScore) {
            return <span className="text_error">{rowTotalScore}</span>;
          } else {
            return rowTotalScore;
          }
        },
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('attendanceScore', {
        header: t('출석'),
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
    //   completionStatus: data.completionStatus,
    //   learningStartDate: data.learningRange?.from
    //     ? getDateToString(data.learningRange?.from, DATE_TIME_FORMAT.DATE)
    //     : '',
    //   learningEndDate: data.learningRange?.to
    //     ? getDateToString(data.learningRange?.to, DATE_TIME_FORMAT.DATE)
    //     : '',
    //   companyId: data.company || '',
    //   deptId: data.deptId || '',
    //   employeeNumber: data.employeeNumber || '',
    //   name: data.name || '',
    // };

    setParams({
      ...payload,
    });

    setStatsLeft(payload);
    setStatsRight(payload);
    gridFetch(payload);
    setDidSearch(true);
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

    const confirmRes = await openConfirm({
      title: t('삭제를 진행 하시겠습니까?'),
      content: (
        <p>
          {t('삭제 후에는 복구할 수 없습니다.')}
          <br />
          {t('신중하게 처리해 주세요.')}
        </p>
      ),
    });
    if (!confirmRes) return;

    const payload = {
      studentId: selectedItems.map((x: any) => x.studentId),
    };
    console.log('##payload: ', payload);
    await deleteStudentsInfo(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        handleOnRefresh();
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  const isEdited = (original: any, current: any) => {
    if (original.attendanceScore !== current.attendanceScore) {
      return true;
    }
    if (original.progressScore !== current.progressScore) {
      return true;
    }
    if (original.examScore !== current.examScore) {
      return true;
    }
    if (original.asgmtScore !== current.asgmtScore) {
      return true;
    }
    if (original.isCertified !== current.isCertified) {
      return true;
    }

    return false;
  };

  const handleSaveClick = async () => {
    // 변경된 행만 추출
    const editedRows = gConfig.gridData?.content.filter((current, index) => {
      const original = originalData.find((x) => x.studentId === current.studentId);
      return isEdited(original, current);
    });

    if (editedRows && editedRows.length === 0) {
      openAlert(t('변경된 항목이 없습니다.'));
      return;
    }

    console.log('## editedRows=>', editedRows);

    const list = editedRows?.map((x: any) => {
      return {
        studentId: x.studentId,
        progressScore: parseInt(x.progressScore),
        examScore: parseInt(x.examScore),
        asgmtScore: parseInt(x.asgmtScore),
        attendanceScore: parseInt(x.attendanceScore),
        isCertified: x.isCertified,
      };
    });

    const payload = {
      courseSequenceId: editedRows?.[0]?.courseSequenceId,
      list,
    };

    console.log('## payload=>', payload);
    await updateStudentsInfo(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        handleOnRefresh();
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  const handleCertification = async () => {
    console.log('selectedItems=>', selectedItems);
    if (selectedItems.length === 0) return;

    const confirmRes = await openConfirm({
      title: t('수료판단을 하시겠습니까?'),
      content: t('선택하신 수료판단 대상에 승인하시겠습니까?'),
    });
    if (!confirmRes) return;

    const payload = {
      studentId: selectedItems.map((x: any) => x.studentId),
      courseSequenceId: selectedItems[0]?.courseSequenceId,
    };
    console.log('##payload: ', payload);
    await updateStudentsCertification(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        handleOnRefresh();
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  const handleCompletion = async (param: boolean) => {
    if (selectedItems.length === 0) return;

    const confirmRes = await openConfirm({
      title: param ? t('이수확정 하시겠습니까?') : t('확정취소를 하시겠습니까?'),
      content: param
        ? t('선택하신 대상에 이수확정 하시겠습니까?')
        : t('선택하신 대상에 확정취소하시겠습니까?'),
    });
    if (!confirmRes) return;

    const payload = {
      studentId: selectedItems.map((x: any) => x.studentId),
      status: param,
      courseSequenceId: selectedItems[0]?.courseSequenceId,
    };

    await updateStudentsCompletion(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        handleOnRefresh();
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  const handleSequenceChange = async () => {
    if (selectedItems.length !== 1) return;

    openModal({
      width: 'lg',
      content: (
        <SequenceChangeModal
          courseId={courseIdKey}
          openingYear={selectedItems[0].openingYear}
          isUsed={true}
          courseSequenceName={selectedItems[0].courseSequenceName}
          studentId={selectedItems[0].studentId}
        />
      ),
      onClose(data) {
        if (data) {
          handleOnRefresh();
        }
      },
    });
  };

  const handleStudentsUpdateList = async (param: any) => {
    console.log('param=>', param);
    const searchData = getValues();
    const payload = {
      courseSequenceId: searchData.courseSequenceId,
      userList: param,
    };
    // TODO: API연동
    // await updateStudentsList(payload, {
    //   onSuccess: async (data: any, variables: any, context: any) => {
    //     console.log('onSuccess:', data);
    //     await showSaveComplete();
    //     handleOnRefresh();
    //   },
    //   onError: (data: any, variables: any, context: any) => {
    //     console.log('onError:', data);
    //   },
    // });
  };

  const handleStudentAdd = async () => {
    const searchData = getValues();
    console.log('searchData:', searchData);
    // return;
    openModal({
      width: 'xl',
      content: <UserShuttleModal />,
      onClose(data) {
        if (data) {
          handleStudentsUpdateList(data);
        }
      },
    });
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <SplitPanel gap={24}>
        <>
          <FormSubTitle label={'현황'} noLine={true} />
          <StatsSummary data={statsLeftCount} />
        </>
        <>
          <FormSubTitle label={'이수기준'} noLine={true} />
          <StatsSummary data={statsRightCount} />
        </>
      </SplitPanel>
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

            <Button
              variant="text"
              label={t('수료판단')}
              onClick={handleCertification}
              disabled={selectedItems.length === 0}
            />
            <Button
              variant="text"
              label={t('이수확정')}
              onClick={(e) => handleCompletion(true)}
              disabled={selectedItems.length === 0}
            />
            <Button
              variant="text"
              label={t('확정취소')}
              onClick={(e) => handleCompletion(false)}
              disabled={selectedItems.length === 0}
            />
            <Button
              variant="text"
              label={t('차수변경')}
              onClick={handleSequenceChange}
              disabled={selectedItems.length !== 1}
            />
            <Button variant="text" label={t('수강생등록')} onClick={handleStudentAdd} />
          </>
        }
        excelButtons={
          <>
            <GridExcelUploadButton validateUrl="/multilingual/excelUploadValidation" />
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/students/list/excel`}
              params={params}
              dataCount={gridData?.totalElements}
              disabled={!gridData?.totalElements}
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
