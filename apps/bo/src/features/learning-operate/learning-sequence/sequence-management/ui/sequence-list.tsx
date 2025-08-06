import {
  useCopySequence,
  useCreateSequence,
  useDeleteSequenceList,
  useUpdateSequenceList,
} from '@entities/learning-sequence/service/learning-sequence.hook';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { SequenceBatchModal } from '@features/learning-operate/learning-sequence/sequence-management';
import { LMSApiPrefix } from '@learnway/config';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import {
  EditDatePickerCell,
  EditInputCell,
  GridBox,
  GridBoxState,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Mode } from '@pages/_layout/learning/learning-sequence/-common/type';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { CopyBatchButtons } from '../component/copy-batch-buttons';
import { CourseSequenceSearchForm } from '../component/course-sequence-search-form';
import { EditInputDateCell } from '../component/edit-input-date-cell';
import { SequenceSearchForm } from '../component/sequence-search-form';
import { getLeaningStatusTypeName } from '../constants/constants';

type SequenceListComponentProps = {
  setMode: (value: string) => void;
  setSequenceId: (value: number) => void;
  lastTriggered?: any;
  courseId?: number; // 과정key가 없다면 메뉴로 진입한 case
};

/**
 * NLP_BO_LMS_0031 : 차수관리 목록
 * @returns
 */
const _global = {
  linkClick: (payload: any) => {
    return;
  },
  checkedLength: 0,
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.sequenceList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 2000,
    sort: [],
  },
};

const SequenceListComponent = ({
  setMode,
  setSequenceId,
  courseId: courseIdProps,
}: SequenceListComponentProps) => {
  const router = useRouter();
  const { openModal, confirm: openConfirm, alert: openAlert, showSaveComplete } = useModal();
  const [columns, setColumns] = useState() as any;
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { createSequence } = useCreateSequence({});
  const { updateSequenceList } = useUpdateSequenceList({});
  const { deleteSequenceList } = useDeleteSequenceList({});
  const { copySequence } = useCopySequence({});
  const [changeData, setChangeData] = useState<any[]>([]);

  _global.linkClick = (payload: any) => {
    setMode(Mode.DETAIL);
    setSequenceId(payload.courseSequenceId);
  };

  const { provider, getValues, onSubmit } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit', // 서브밋할 때만 validation 실행
    reValidateMode: 'onChange', // 에러 발생 후에는 값 변경시 즉시 재검증
  });
  const { gridFetch, data: gridData, setGridData } = useGridBox(gridConfig);
  const [params, setParams] = useState<Record<string, any>>({});

  useEffect(() => {
    const openYearColumn = [
      columnHelper.accessor('openingYear', {
        header: t('개설연도'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
    ] as ColumnDef<any, unknown>[];

    const sequenceColumn = [
      columnHelper.accessor('courseSequenceNo', {
        header: t('순서'),
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
        size: 100,
      }),
    ] as ColumnDef<any, unknown>[];

    const courseColumn = [
      columnHelper.accessor('courseId', {
        header: t('과정코드'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('courseName', {
        header: t('과정명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 240,
      }),
    ] as ColumnDef<any, unknown>[];

    let columns = [
      columnHelper.accessor('courseSequenceId', {
        header: t('차수코드'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('courseSequenceName', {
        header: t('차수명'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClick(info.row.original as any);
            }}
            label={info.getValue() as string}
          />
        ),
        enableGrouping: false,
        size: 240,
      }),
      columnHelper.accessor('enrollStartDateTime', {
        header: t('수강신청 시작일'),
        cell: (info) => {
          return <EditDatePickerCell info={info} dateOptions={{ displayType: 'day-time-h' }} />;
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('enrollEndDateTime', {
        header: t('수강신청 종료일'),
        cell: (info) => {
          return <EditDatePickerCell info={info} dateOptions={{ displayType: 'day-time-h' }} />;
        },
        enableGrouping: false,
        size: 300,
        meta: {
          cellAlign: 'center',
          align: 'center',
        },
      }),
      columnHelper.accessor('learningStartDateTime', {
        header: t('학습 시작일'),
        cell: (info) => {
          if (info.row.original.learningStartType === 'DAYS_AFTER_ENROLL')
            return t('수강신청 승인일로 부터');
          else
            return <EditDatePickerCell info={info} dateOptions={{ displayType: 'day-time-h' }} />;
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('learningEndDateTimeTimeMerge', {
        header: t('학습 종료일'),
        cell: (info: CellContext<any, string>) => {
          return <EditInputDateCell info={info} input={{ suffixText: t('일') }} />;
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('learningStatusType', {
        header: t('상태'),
        cell: (info) => getLeaningStatusTypeName(info.getValue()),
        enableGrouping: false,
        size: 88,
      }),
      columnHelper.accessor('isUsed', {
        header: t('사용'),
        cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('maxEnrollQuota', {
        header: t('정원'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('currentEnrollCount', {
        header: t('신청'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('enrolledStudentCount', {
        header: t('수강생'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('graduatedStudentCount', {
        header: t('수료생'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
    ] as ColumnDef<any, unknown>[];

    if (!courseIdProps) {
      columns = [...openYearColumn, ...courseColumn, ...columns];
    } else {
      columns = [...openYearColumn, ...sequenceColumn, ...columns];
    }

    setColumns(columns);
  }, []);

  const handleOnRefresh = () => {
    console.log('### handleOnRefresh');
    handleOnSearch();
  };

  const getSearchParam = () => {
    const param = getValues();
    if (!courseIdProps) {
      // 메뉴 진입
      return {
        tenantId: param.tenantId,
        channelUuid: param.channelUuid,
        openingYear: parseInt(param.openingYear),
        courseType: param.courseType,
        courseName: param.courseName,
        courseSequenceName: param.courseSequenceName,
        learningStatusType: param.learningStatusType,
        courseSequenceStartDateTime: param.courseSequenceRange.from,
        courseSequenceEndDateTime: param.courseSequenceRange.to,
      };
    } else {
      // 탭 진입
      return {
        courseId: courseIdProps,
        openingYear: parseInt(param.openingYear),
        isUsed: param.isUsed === 'true',
        courseSequenceName: param.courseSequenceName,
      };
    }
  };

  // 페이지 변경이나 검색 시 플래그 리셋
  const handleStateChange = (newState: GridBoxState) => {
    gridFetch(getSearchParam(), { page: 0, size: 2000, sort: newState.sort });
  };

  const handleOnSearch = useCallback(() => {
    console.log('## handleOnSearch');
    const payload = getSearchParam();
    setParams({
      ...payload,
    });

    console.log('##payload:', payload);
    gridFetch(payload);
    setChangeData([]);
  }, []);

  const handleRowsSelect = useCallback((rows: any[]) => {
    setSelectedItems(rows);
  }, []);

  const [inputAdd, setInputAdd] = useState<number>();
  const [inputCopy, setInputCopy] = useState<number>();
  const onAddRow = async () => {
    if (!inputAdd || inputAdd <= 0) return;
    const confirmRes = await openConfirm({
      title: t('차수를 추가 하시겠습니까?'),
      content: t('요청하신 개수로 차수가 추가됩니다.'),
    });
    if (!confirmRes) return;
    const payload = {
      courseId: courseIdProps,
      addQuantity: inputAdd,
    };
    await createSequence(payload, {
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

  const onCopyRow = async () => {
    if (!inputCopy || inputCopy <= 0 || selectedItems.length !== 1) return;
    const confirmRes = await openConfirm({
      title: t('선택한 과정을 복사 하시겠습니까?'),
      content: t('선택하신 차수로 복사됩니다.'),
    });

    if (!confirmRes) return;
    const payload = {
      sequenceId: selectedItems[0].courseSequenceId,
      addQuantity: inputCopy,
    };
    await copySequence(payload, {
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

  const onBatch = async () => {
    openModal({
      width: 'lg',
      content: <SequenceBatchModal courseId={courseIdProps} selectedItems={selectedItems} />,
      onClose(data: any) {
        console.log('### selectedUserGroups', data);
        if (data) {
          handleOnRefresh();
        }
      },
    });
  };

  const handleRemoveRows = async () => {
    const validate = [
      'ENROLLMENT_IN_PROGRESS',
      'LEARNING_NOT_STARTED',
      'LEARNING_IN_PROGRESS',
      'LEARNING_COMPLETED',
    ];
    console.log('selectedItems=>', selectedItems);
    if (selectedItems.length === 0) return;

    //  수강신청중 부터 이후 시점부터 삭제 불가하도록 수정
    const hasActiveEnrollment = selectedItems.some((item) =>
      validate.includes(item.learningStatusType),
    );

    if (hasActiveEnrollment) {
      openAlert({
        title: t('차수를 삭제 할 수 없습니다.'),
        content: t(
          '차수에 사용 중인 학습자가 있습니다.\n차수를 사용중인 학습자가 있을 경우 삭제를 할 수 없습니다.',
        ),
      });
      return;
    }

    const confirmRes = await openConfirm({
      title: t('차수를 삭제하시겠습니까?'),
      content: t('해당 차수를 삭제하시겠습니까?'),
    });
    if (!confirmRes) return;

    const payload = selectedItems.map((x: any) => {
      return { courseSequenceId: x.courseSequenceId };
    });
    console.log('##payload: ', payload);
    await deleteSequenceList(payload, {
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
    if (original.courseSequenceNo !== current.courseSequenceNo) {
      return true;
    }
    if (
      original.enrollStartDateTime !== current.enrollStartDateTime ||
      original.enrollEndDateTime !== current.enrollEndDateTime
    ) {
      return true;
    }

    if (current.learningStartType === 'DAYS_AFTER_ENROLL') {
      if (original.learningStartDays !== current.learningStartDays) {
        return true;
      }
    }

    if (current.learningStartType === 'FIXED_DATE') {
      if (
        original.learningStartDateTime !== current.learningStartDateTime ||
        original.learningEndDateTime !== current.learningEndDateTime
      ) {
        return true;
      }
    }

    return false;
  };

  const handleSaveClick = async () => {
    console.log('##save');
    console.log('changeData:', changeData);
    console.log('gridData:', gridData.content);

    // 변경된 행만 추출
    const editedRows = changeData.filter((current, index) => {
      // const original = gridData.content[index];
      const original = gridData.content.find(
        (x) =>
          x.courseSequenceId === current.courseSequenceId &&
          x.courseSequenceNo === current.courseSequenceNo,
      );
      return isEdited(original, current);
    });

    console.log('## editedRows=>', editedRows);
    if (editedRows && editedRows.length === 0) {
      openAlert(t('변경된 항목이 없습니다.'));
      return;
    }

    const invalidItems = editedRows
      ?.map((x: any, index: number) => {
        let error = false;

        if (!x.enrollStartDateTime || !x.enrollEndDateTime) {
          console.log('수강일 누락');
          error = true;
        }
        if (!x.learningStartType) {
          console.log('학습시작입 타입 누락');
          error = true;
        } else if (x.learningStartType === 'FIXED_DATE') {
          if (!x.learningStartDateTime || !x.learningEndDateTime) {
            console.log('학습시작일 누락');
            error = true;
          }
        }

        return error ? { rowIndex: index + 1 } : null;
      })
      .filter(Boolean);

    if (invalidItems && invalidItems.length > 0) {
      openAlert(`${t('항목에 누락된 값이 있습니다')}`);
      return;
    }

    const payload = editedRows?.map((x: any) => {
      return {
        courseSequenceId: x.courseSequenceId ?? null,
        courseSequenceNo: parseInt(x.courseSequenceNo) ?? null,
        enrollStartDateTime: x.enrollStartDateTime ?? null,
        enrollEndDateTime: x.enrollEndDateTime ?? null,
        learningStartType: x.learningStartType ?? null,
        learningStartDays: x.learningStartType === 'DAYS_AFTER_ENROLL' ? x.learningStartDays : null,
        learningStartDateTime:
          x.learningStartType === 'FIXED_DATE' ? x.learningStartDateTime : null,
        learningEndDateTime: x.learningStartType === 'FIXED_DATE' ? x.learningEndDateTime : null,
      };
    });

    console.log('## payload=>', payload);
    await updateSequenceList(payload, {
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

  const handleInstanceChange = (param: any[]) => {
    if (!changeData || changeData.length === 0) {
      setChangeData(param);
    } else {
      const newChangeData = [...changeData]; // 변경본 복사

      param.forEach((element) => {
        let changedCol = '';

        if (element.courseSequenceNo !== null) changedCol = 'courseSequenceNo';
        if (element.enrollStartDateTime !== null) changedCol = 'enrollStartDateTime';
        if (element.enrollEndDateTime !== null) changedCol = 'enrollEndDateTime';
        if (element.learningStartDateTime !== null) changedCol = 'learningStartDateTime';
        if (element.learningEndDateTime !== null) changedCol = 'learningEndDateTime';
        if (element.learningStartDays !== null) changedCol = 'learningStartDays';

        if (changedCol !== '') {
          const idx = newChangeData.findIndex(
            (x) => x.courseSequenceId === element.courseSequenceId,
          );

          if (idx !== -1) {
            // 기존 row가 있을 경우 -> 해당 필드만 갱신
            newChangeData[idx] = {
              ...newChangeData[idx],
              [changedCol]: element[changedCol],
            };
          }
        }
      });
      setChangeData(newChangeData);
    }
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      {!courseIdProps ? (
        <CourseSequenceSearchForm
          provider={provider}
          onSubmit={onSubmit}
          onSearch={handleOnSearch}
        />
      ) : (
        <SequenceSearchForm provider={provider} onSubmit={onSubmit} onSearch={handleOnSearch} />
      )}
      <Divider />
      <GridBox
        columns={columns}
        gridData={gridData}
        multiple={true}
        disabledSelectionToggle
        title={t('차수 목록')}
        onChange={handleInstanceChange}
        onStateChange={handleStateChange}
        onRowsSelect={handleRowsSelect}
        hidePagination
        customButtonNode={
          courseIdProps && (
            <>
              <Input
                type={'number'}
                suffixText={t('개')}
                value={inputAdd}
                onChange={(e) => setInputAdd(parseInt(e.target.value))}
              />
              <Button
                variant="text"
                size="xs"
                label={t('LABEL.grid.header.add', '추가')}
                onClick={onAddRow}
              />
              <Input
                type={'number'}
                suffixText={t('개')}
                value={inputCopy}
                onChange={(e) => setInputCopy(parseInt(e.target.value))}
              />
              <CopyBatchButtons
                disabledCopy={selectedItems.length === 1 ? false : true}
                disabledBatch={selectedItems.length > 0 ? false : true}
                onCopyRow={onCopyRow}
                onBatch={onBatch}
              />
            </>
          )
        }
        excelButtons={
          <>
            {courseIdProps && (
              <GridExcelUploadButton validateUrl="/multilingual/excelUploadValidation" />
            )}
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/sequences/excel`}
              params={params}
              dataCount={gridData?.totalElements}
              disabled={!gridData?.totalElements}
            />
          </>
        }
        showRemove={courseIdProps ? true : false}
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

export const SequenceList = SequenceListComponent;
